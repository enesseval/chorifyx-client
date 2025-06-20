# Base image
FROM node:20-alpine AS builder

WORKDIR /app

# Paketleri kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kodu kopyala
COPY . .

# Next.js üretim dosyalarını oluştur
RUN npm run build --no-lint

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# client node_modules kopyala
COPY --from=builder /app/node_modules ./node_modules
# build edilmiş dosyaları kopyala
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
