FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm ci -s && npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]