FROM node:12.16.0

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

COPY . .

RUN npm run build

EXPOSE 9700

CMD [ "npm", "start" ]