FROM node:16-alpine

WORKDIR /application

COPY package*.json .
COPY yarn.lock .

RUN yarn
RUN yarn prisma generate

COPY . .

CMD ["yarn", "dev"]