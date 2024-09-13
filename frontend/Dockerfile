FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

ARG VITE_APP_LINKED

ENV VITE_APP_LINKED=$VITE_APP_LINKED

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.27.1-alpine

COPY /path-to-certificates /etc/letsencrypt/live/kharcha.online/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

ENTRYPOINT [ "nginx", "-g" , "daemon off;" ]
