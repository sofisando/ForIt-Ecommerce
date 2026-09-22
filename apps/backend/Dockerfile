# ==========================================
# STAGE 1 — Builder
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && \
    corepack prepare pnpm@10.34.1 --activate

# Archivos de workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY domain/package.json ./domain/package.json
COPY apps/backend/package.json ./apps/backend/package.json

# Dependencias completas para construir
RUN pnpm install --frozen-lockfile

# Código fuente
COPY domain ./domain
COPY apps/backend ./apps/backend

# ==========================================
# Build domain
# ==========================================
RUN pnpm --filter @forit/domain build

# ==========================================
# Prisma generate
# ==========================================
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN DATABASE_URL="$DATABASE_URL" \
    pnpm --filter backend exec prisma generate \
    --schema src/infra/prisma/schema.prisma

# ==========================================
# Build backend
# ==========================================
RUN pnpm --filter backend build


# ==========================================
# STAGE 2 — Production dependencies
# ==========================================
FROM builder AS production-deps

# Generamos una instalación aislada del backend
# con solamente sus dependencias de producción.
RUN pnpm --filter backend deploy --prod --legacy /prod/backend


# ==========================================
# STAGE 3 — Production
# ==========================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Instalación aislada generada por pnpm deploy
COPY --from=production-deps /prod/backend/node_modules ./node_modules

# Código compilado
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/domain/dist ./domain/dist

# package.json del backend
COPY --from=production-deps /prod/backend/package.json ./package.json

EXPOSE 3000

CMD ["node", "apps/backend/dist/index.js"]