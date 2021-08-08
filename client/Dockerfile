# build environment
FROM node:lts-alpine as build
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL $REACT_APP_SERVER_URL
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]