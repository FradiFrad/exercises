FROM node:14

# Create app directory in the image
RUN mkdir -p /usr/src/app
# Directory where the commands will be launched
WORKDIR /usr/src/app

# Bundle app source
COPY . .

CMD [ "node", "helloworld.js" ]
