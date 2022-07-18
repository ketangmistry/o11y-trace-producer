// Require dependencies
const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { BasicTracerProvider, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const collectorOptions = {
    url: process.env.TRACE_RECEIVER_URL + '/v1/traces',
    headers: {
      Authorization: 'Bearer ' + process.env.GCLOUD_IDENTITY_TOKEN
    }, 
    concurrencyLimit: 10,
  };

const provider = new BasicTracerProvider();
const exporter = new OTLPTraceExporter(collectorOptions);

const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start()