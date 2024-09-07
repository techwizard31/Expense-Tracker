FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:1.27.1-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist .

EXPOSE 5173 

ENTRYPOINT [ "nginx", "-g" , "daemon off;" ]