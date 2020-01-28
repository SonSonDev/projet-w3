FROM node:alpine as build

WORKDIR /home/app

COPY package.json .

RUN npm install

COPY . .

ARG REACT_APP_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /home/app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
