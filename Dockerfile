FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn setup
EXPOSE 3000 5000
RUN yarn global add pm2
WORKDIR packages/frontend
RUN yarn build
WORKDIR ../backend/fiver
CMD pm2 serve ../../frontend/build 5000 && yarn start