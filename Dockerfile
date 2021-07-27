FROM node:14-alpine

LABEL author="Marty Zhang<marty8zhang@gmail.com>"

EXPOSE 3000/tcp

WORKDIR /app
ADD . .
RUN yarn install -s
