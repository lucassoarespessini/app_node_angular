FROM node:14

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
ENTRYPOINT  npm start
