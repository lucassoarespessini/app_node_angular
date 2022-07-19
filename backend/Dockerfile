FROM node:14

WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
VOLUME [ "/backend" ]
CMD npm start
