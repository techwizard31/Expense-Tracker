FROM node:18-alpine

WORKDIR /server

COPY package.json .

RUN npm install

# Ensure the necessary dependencies for SSL are installed
RUN apk add --no-cache openssl

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]