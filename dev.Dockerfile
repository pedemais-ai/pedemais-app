FROM node:21-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

RUN npm ci
RUN npm install -g prisma ts-node next

CMD npm run dev