FROM node:12.16.1-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm audit fix
COPY . .
RUN npm run build --prod
FROM nginx:1.15.8-alpine
COPY --from=builder /usr/src/app/dist/angular-ecommerce/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf