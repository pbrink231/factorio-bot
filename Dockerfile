FROM node:10-alpine

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

CMD node index.json
EXPOSE 8081