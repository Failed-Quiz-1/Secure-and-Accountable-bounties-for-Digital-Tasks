FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn setup
RUN yarn build
EXPOSE 3000 5000
RUN yarn global add pm2
WORKDIR packages/frontend
CMD pm2 serve build/ 5000 && cd ../backend/fiver && yarn start
