FROM node:14

RUN mkdir -p /frontend
RUN npm install -g @angular/cli@latest
WORKDIR /frontend
COPY . .
ENTRYPOINT  npm install && npm start
