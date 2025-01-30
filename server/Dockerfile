FROM node:22.12.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire server directory
COPY . .

# Expose the server port
EXPOSE 8080


CMD ["npm","start"]
