FROM node:21-alpine

WORKDIR /app

RUN npm ci
RUN npm install -g prisma ts-node

CMD npm run dev