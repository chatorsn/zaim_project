FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install --save-dev @types/pg

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
