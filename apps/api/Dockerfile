FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/
COPY packages ./packages

RUN yarn install --frozen-lockfile

COPY . .

WORKDIR /app/apps/api
RUN yarn build

FROM node:22-alpine AS production
WORKDIR /app

COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY apps/api/package.json ./package.json
COPY

EXPOSE 3000

CMD ["node", "dist/main"]
