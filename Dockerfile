FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]