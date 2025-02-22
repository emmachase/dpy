FROM oven/bun:1 AS base
WORKDIR /app
COPY . .

FROM base AS prod-deps
RUN bun install --production --frozen-lockfile

FROM base AS build
RUN bun install --frozen-lockfile
RUN bun run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public

ENV NODE_ENV=production
CMD [ "bun", "/app/build/main.js" ]
