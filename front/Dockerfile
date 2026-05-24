FROM node:20-alpine AS builder
WORKDIR /app

COPY front/package.json ./
COPY front/package-lock.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.31

RUN rm /etc/nginx/conf.d/default.conf

COPY front/nginx/conf.d/displayify.conf /etc/nginx/conf.d/displayify.conf

COPY --from=builder /app/dist /var/www/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
