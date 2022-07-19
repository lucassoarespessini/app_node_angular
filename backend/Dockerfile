FROM node:14

RUN mkdir -p /backend
WORKDIR /backend
COPY . .
ENTRYPOINT  npm install && npm start
