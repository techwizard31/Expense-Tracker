FROM node:18-alpine

# Ensure the necessary dependencies for SSL are installed
RUN apk add --no-cache openssl

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]