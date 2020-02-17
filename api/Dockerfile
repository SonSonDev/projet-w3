FROM node:alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --production=true --pure-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
