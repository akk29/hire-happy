# Build Stage
FROM node:22.15.1-alpine AS build
WORKDIR /app
COPY ../../frontend /app
RUN ["npm","install"]
EXPOSE 3000
RUN ["npm","run","build"]

# Production Stage
FROM nginx:stable-alpine AS production
COPY ./infra/docker/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]