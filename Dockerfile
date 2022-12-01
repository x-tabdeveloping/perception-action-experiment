FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
ENV FIREBASE_API_KEY FIREBASE_API_KEY
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]