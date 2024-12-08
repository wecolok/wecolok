FROM node:18-alpine AS build
WORKDIR /app

COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages

RUN yarn install --frozen-lockfile --optional

COPY . .

WORKDIR /app/apps/web
RUN yarn build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

COPY --from=build /app/apps/web/dist ./

RUN rm -f /etc/nginx/conf.d/*

COPY /apps/web/nginx.conf /etc/nginx/conf.d/web.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
