# o11y Trace Producer
A containerized App which can be hosted on Google Cloud Platform, in particular Cloud Run. It is a front-end App which (will at one point) make back-end REST API client requests get some dummy data for presentation. It has OpenTelemetry libraries which will export data to an o11y Trace Receiver App.

## How to run
```
export GCLOUD_IDENTITY_TOKEN=$(gcloud auth print-identity-token)
export TRACE_RECEIVER_URL=<Cloud Run URL>
node --require './tracing.js' app.js
```