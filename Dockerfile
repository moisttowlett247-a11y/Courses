FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY server.ts ./
COPY tsconfig.json ./

# Install tsx globally for server execution
RUN npm install -g tsx

EXPOSE 3000

CMD ["tsx", "server.ts"]
