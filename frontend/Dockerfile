FROM node:14

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
VOLUME [ "/frontend" ]
CMD npm start
