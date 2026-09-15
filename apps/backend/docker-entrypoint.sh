#!/bin/sh

set -e

echo "======================================"
echo " Iniciando backend ForIt"
echo "======================================"

cd /app/apps/backend

echo "Aplicando migraciones de Prisma..."

pnpm exec prisma migrate deploy --schema src/infra/prisma/schema.prisma

echo "Migraciones aplicadas correctamente."

echo "Iniciando servidor..."

exec node dist/index.js