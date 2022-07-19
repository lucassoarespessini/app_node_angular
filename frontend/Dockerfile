FROM node:14

RUN mkdir -p /frontend
WORKDIR /frontend
COPY . .
ENTRYPOINT  npm install && npm start
