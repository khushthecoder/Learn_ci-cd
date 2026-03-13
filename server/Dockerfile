FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate

FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat \
 && addgroup -S app && adduser -S app -G app \
 && mkdir -p /data && chown -R app:app /data
ENV NODE_ENV=production
ENV PORT=5001
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/prisma ./prisma
COPY --from=build --chown=app:app /app/src ./src
COPY --from=build --chown=app:app /app/package.json ./package.json
USER app
EXPOSE 5001
CMD ["node", "src/index.js"]

# code layout

# code layout

# code layout
