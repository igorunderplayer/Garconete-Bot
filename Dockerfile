FROM node:16-alpine

WORKDIR /application

COPY package.json ./
COPY yarn.lock ./

COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN yarn prisma generate

CMD ["yarn", "start"]
