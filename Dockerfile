# Smallest Dockerfile ever
FROM nginx
WORKDIR /usr/share/nginx/html
COPY public .