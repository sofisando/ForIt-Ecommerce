FROM node:22-alpine

WORKDIR /app

RUN corepack enable && \
    corepack prepare pnpm@10.34.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY domain/package.json ./domain/package.json
COPY apps/backend/package.json ./apps/backend/package.json

RUN pnpm install --frozen-lockfile

COPY domain ./domain
COPY apps/backend ./apps/backend

RUN pnpm --filter @forit/domain build

ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN DATABASE_URL="$DATABASE_URL" \
    pnpm --filter backend exec prisma generate \
    --schema src/infra/prisma/schema.prisma

RUN pnpm --filter backend build

RUN chmod +x apps/backend/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./apps/backend/docker-entrypoint.sh"]