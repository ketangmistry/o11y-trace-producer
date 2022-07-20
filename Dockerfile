FROM node:slim
ENV NODE_ENV = development
WORKDIR /app
COPY ["app.js", "tracing.js", "package.json", "package-lock.json", "./"]
RUN npm install --development
CMD ["node", "--require", "'./tracing.js'" "app.js" ]