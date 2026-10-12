FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 9000

CMD ["node", "index.js"]
