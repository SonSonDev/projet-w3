FROM node:12 as build

WORKDIR /home/app

COPY package.json .
COPY ./yarn.lock .

RUN yarn

COPY . .

ARG EXPO_USERNAME
ARG EXPO_PASSWORD
RUN npm run expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD
RUN npm run expo publish --non-interactive

ARG REACT_APP_API_URL

RUN npm run build:web



FROM nginx:alpine

COPY --from=build /home/app/web-build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 19006
