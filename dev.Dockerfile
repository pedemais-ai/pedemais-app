FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
RUN npm install -g prisma ts-node

CMD npm run dev