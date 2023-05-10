# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /client/

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages
RUN npm install

# copy all files into the image
COPY ./ ./

# run the webpack and start the server
CMD ["npm", "run", "docker-build"]
