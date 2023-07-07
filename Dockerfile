from node:18-alpine as builder

WORKDIR /app

COPY . ./

ENV NODE_ENV production

RUN npm run build

FROM gcr.io/distroless/nodejs18-debian11
USER 65534

COPY --from=builder /app/server/dist /app/server/dist
COPY --from=builder /app/server/node_modules /app/server/node_modules
COPY --from=builder /app/frontend/dist /app/frontend/dist
COPY --from=builder /app/frontend/node_modules /app/frontend/node_modules

WORKDIR /app/server

CMD ["dist/app.js"]

EXPOSE 3000
