FROM node:alpine3.14

WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . /app

COPY wait-for-it.sh /app

EXPOSE 5050

CMD ["npm", "start"]