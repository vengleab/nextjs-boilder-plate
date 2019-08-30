FROM node:8.16.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN npm run webpack
CMD [ "npm", "start" ]
