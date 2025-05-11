# Build Stage
FROM node:10.24.0-alpine AS build
WORKDIR /app
ADD ./frontend/package.json /app/
ADD ./frontend/package-lock.json /app/
RUN ["npm","install"]
COPY ./frontend /app
EXPOSE 3000
RUN ["npm","run","build"]

# Production Stage
FROM nginx:stable-alpine AS production
COPY ./frontend/docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]