FROM node:16
WORKDIR /usr/src/frontend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]




