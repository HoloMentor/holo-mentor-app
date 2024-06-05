# Build the application
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig*.json ./

RUN yarn install

COPY . .

RUN yarn build

# Serve the build
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]