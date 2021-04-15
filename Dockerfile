FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Add our code
COPY . .
# ADD . /opt/voting-app-service/
# WORKDIR /opt/voting-app-service/

RUN npm run docs

EXPOSE 8000

# Run the image as a non-root user
# RUN adduser -D myuser
# USER myuser

CMD npm run start
