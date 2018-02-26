FROM node:carbon

EXPOSE 9700

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Bundle app source
COPY . /usr/src/app

# COPY package.json /usr/src/app/
RUN npm install

# Create the chat build
RUN npm run build

WORKDIR /usr/src/app

# CMD npm start
CMD npm start
