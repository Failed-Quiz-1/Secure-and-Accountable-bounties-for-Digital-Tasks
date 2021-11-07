FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn setup
RUN yarn build
EXPOSE 3000 5000
CMD yarn start:prod
