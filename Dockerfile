FROM node:hydrogen-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY certificados ./certificados

COPY filebeat.yml /app/filebeat.yml

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
