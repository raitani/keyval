FROM node:11.10.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
EXPOSE 3000
CMD [ "node", "index.js" ]
