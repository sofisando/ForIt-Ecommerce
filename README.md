# ForIt Ecommerce

Backend de un sistema de e-commerce desarrollado con **Node.js, TypeScript, Express, PostgreSQL y Prisma**, siguiendo principios de **Clean Architecture y Domain-Driven Design (DDD)**.

El proyecto está organizado como un **monorepo administrado con pnpm** y contiene el dominio compartido mediante `@forit/domain`.

La infraestructura de desarrollo utiliza **Docker Compose** para ejecutar PostgreSQL, las migraciones de Prisma y el backend de forma reproducible.

---

# 1. Tecnologías principales

* Node.js 22
* TypeScript
* Express
* PostgreSQL 17
* Prisma ORM
* pnpm
* Docker
* Docker Compose
* JWT para autenticación
* bcrypt para almacenamiento seguro de contraseñas
* Clean Architecture
* Domain-Driven Design (DDD)

La aplicación está separada en capas:

```text
application/
infra/
presentation/
domain/
```

La idea principal es evitar que la lógica de negocio dependa directamente de Express, Prisma o PostgreSQL.

---

# 2. Arquitectura general

El flujo general de una petición es:

```text
Cliente
   │
   ▼
Express / HTTP
   │
   ▼
Presentation
   │
   ▼
Application
   │
   ▼
Domain
   │
   ▼
Infrastructure
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

### Presentation

Se ocupa de HTTP:

* rutas
* controllers
* middlewares
* validación relacionada con HTTP
* respuestas HTTP

### Application

Contiene los casos de uso de la aplicación.

Por ejemplo:

```text
Crear usuario
Iniciar sesión
Crear producto
Obtener productos
Actualizar información
```

### Domain

Contiene las reglas propias del negocio.

El proyecto utiliza entidades y Value Objects.

Entre los Value Objects implementados se encuentran:

* `Money`
* `Email`
* `DNI`
* `PasswordHash`

Esto permite evitar que el dominio trabaje simplemente con strings o números sin validación.

### Infrastructure

Contiene las implementaciones concretas de acceso a recursos externos.

Principalmente:

* Prisma
* PostgreSQL
* repositorios
* configuración de persistencia
* migraciones
* infraestructura Docker

El cliente de Prisma generado se encuentra bajo:

```text
apps/backend/src/infra/generated/prisma
```

---

# 3. Estructura del monorepo

El proyecto utiliza pnpm workspaces.

Una estructura simplificada es:

```text
ForIt_Ecommerce/
│
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── application/
│   │   │   ├── infra/
│   │   │   ├── presentation/
│   │   │   └── index.ts
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── prisma.config.ts
│   │   └── tsconfig.json
│   │
│   └── frontend/
│
├── domain/
│   ├── src/
│   ├── package.json
│   └── tsconfig.build.json
│
├── docker/
│   └── postgres/
│       └── init/
│           └── 01-create-roles.sh
│
├── .dev.env
├── .env
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── tsconfig.json
```

El dominio compartido utiliza:

```text
@forit/domain
```

El backend utiliza aliases como:

```text
@app/*
@infra/*
@presentation/*
```

Esto permite evitar imports relativos excesivamente largos.

---

# 4. Requisitos

Para ejecutar el proyecto se necesita:

* Node.js
* pnpm
* Docker
* Docker Compose
* Git

Versiones utilizadas durante el desarrollo:

```text
Node.js 22.12.0
pnpm 10.34.1
PostgreSQL 17
```

Docker se encarga de ejecutar PostgreSQL y los servicios asociados, por lo que **no es necesario instalar PostgreSQL directamente en la máquina para utilizar el flujo Docker del proyecto**.

---

# 5. Instalación del proyecto

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd ForIt_Ecommerce
```

Instalar las dependencias:

```bash
pnpm install
```

Esto instala las dependencias del monorepo y de sus workspaces.

---

# 6. Variables de entorno

El proyecto utiliza diferentes archivos de entorno según el contexto.

### Desarrollo local

El backend utiliza:

```text
.dev.env
```

Este archivo contiene la configuración necesaria para ejecutar el backend directamente desde la máquina, utilizando PostgreSQL local si corresponde.

El script de desarrollo carga este archivo mediante Node.js:

```bash
node --env-file=../../.dev.env --import tsx --watch --tsconfig tsconfig.json src/index.ts
```

### Docker Compose

Docker Compose utiliza:

```text
.env
```

Este archivo contiene las variables utilizadas por la infraestructura Docker.

Los archivos de entorno **no deben subirse al repositorio**, ya que pueden contener credenciales y secretos.

Como mínimo, el entorno Docker utiliza variables relacionadas con:

```text
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB

APP_DB_USER
APP_DB_PASSWORD

MIGRATOR_DB_USER
MIGRATOR_DB_PASSWORD

ADMIN_DB_USER
ADMIN_DB_PASSWORD

DATABASE_URL_APP
DATABASE_URL_MIGRATOR
DATABASE_URL_ADMIN

JWT_SECRET
```

Las credenciales reales deben mantenerse fuera del código fuente.

---

# 7. PostgreSQL y Docker Compose

El proyecto utiliza **Docker Compose para contenerizar PostgreSQL**.

La arquitectura principal es:

```text
Docker Compose
│
├── postgres
│   └── PostgreSQL 17
│
├── migration
│   └── Prisma migrate deploy
│
└── backend
    └── Node.js + Express
```

El flujo de inicio es:

```text
PostgreSQL
    │
    ▼
Healthcheck
    │
    ▼
Migration
    │
    ├── Prisma migrate deploy
    │
    ▼
Migration finalizada correctamente
    │
    ▼
Backend
```

El backend depende de que las migraciones hayan finalizado correctamente antes de iniciarse.

---

# 8. Roles de PostgreSQL

El proyecto implementa separación de privilegios mediante diferentes roles de PostgreSQL.

La finalidad es evitar que la aplicación utilice una cuenta con permisos administrativos sobre la base de datos.

La separación es:

```text
forit
    │
    └── Bootstrap de PostgreSQL

forit_app
    │
    └── Backend
        SELECT / INSERT / UPDATE / DELETE

forit_migrator
    │
    └── Prisma migrations
        DDL / cambios de esquema

forit_admin
    │
    └── Administración
        Prisma Studio / tareas DBA
```

### `forit`

Es el usuario utilizado inicialmente por la imagen oficial de PostgreSQL para crear e inicializar la base de datos.

No se utiliza como usuario de ejecución del backend.

### `forit_app`

Es el usuario utilizado por el backend.

Cuenta con permisos orientados a las operaciones necesarias de la aplicación:

```text
SELECT
INSERT
UPDATE
DELETE
```

No se utiliza para ejecutar migraciones.

### `forit_migrator`

Es utilizado exclusivamente por Prisma para ejecutar migraciones:

```bash
prisma migrate deploy
```

Tiene permisos necesarios para realizar cambios estructurales en el esquema.

### `forit_admin`

Es el usuario destinado a tareas administrativas y de desarrollo.

Tiene permisos amplios sobre los objetos de la base de datos y se utiliza, entre otras herramientas, para Prisma Studio.

No se utiliza como credencial del backend.

La separación permite aplicar el principio de **least privilege**, reduciendo el impacto potencial de un compromiso de la aplicación.

---

# 9. Prisma

Prisma se utiliza como ORM para comunicarse con PostgreSQL.

El esquema se encuentra en:

```text
apps/backend/src/infra/prisma/schema.prisma
```

La configuración de Prisma se encuentra en:

```text
apps/backend/prisma.config.ts
```

Las migraciones se almacenan en:

```text
apps/backend/src/infra/prisma/migrations/
```

El cliente generado se encuentra en:

```text
apps/backend/src/infra/generated/prisma/
```

### Generar el cliente

Cuando sea necesario regenerar el cliente:

```bash
pnpm --filter backend exec prisma generate
```

### Crear una migración durante desarrollo

Las nuevas modificaciones del esquema se pueden convertir en migraciones mediante:

```bash
pnpm --filter backend exec prisma migrate dev --name <nombre>
```

### Aplicar migraciones

En el entorno Docker, las migraciones se ejecutan mediante:

```bash
prisma migrate deploy
```

Esto se realiza en el servicio `migration` antes de iniciar el backend.

---

# 10. Ejecución con Docker Compose

Para iniciar la infraestructura principal:

```bash
docker compose up --build
```

Esto inicia:

```text
postgres
migration
backend
```

El servicio `migration` es un contenedor de ejecución única.

Una vez que:

```text
prisma migrate deploy
```

finaliza correctamente, el contenedor termina y Docker Compose permite iniciar el backend.

El backend queda disponible en:

```text
http://localhost:3000
```

---

# 11. Prisma Studio

Prisma Studio está configurado como un servicio administrativo opcional.

No se inicia automáticamente con:

```bash
docker compose up
```

Para iniciarlo:

```bash
docker compose --profile admin up studio
```

Studio utiliza la conexión correspondiente al usuario:

```text
forit_admin
```

y queda disponible en:

```text
http://localhost:5555
```

El servicio se ejecuta mediante:

```bash
prisma studio --port 5555 --browser none
```

El uso de un perfil permite mantener esta herramienta administrativa separada del flujo normal de ejecución.

Para detener Studio:

```bash
docker compose stop studio
```

La base de datos PostgreSQL no necesita exponer directamente el puerto `5432` al host para utilizar Prisma Studio.

---

# 12. Seguridad de la base de datos

El proyecto incorpora diferentes medidas orientadas a la seguridad de PostgreSQL:

### Separación de roles

La aplicación, las migraciones y la administración utilizan credenciales diferentes.

```text
Backend       → forit_app
Migrations    → forit_migrator
Administración → forit_admin
```

### Least privilege

El backend no utiliza una cuenta administrativa.

Sus permisos están limitados a las operaciones necesarias para funcionar.

### Default privileges

PostgreSQL utiliza `ALTER DEFAULT PRIVILEGES` para garantizar que los objetos creados posteriormente por el rol de migraciones puedan recibir automáticamente los permisos correspondientes.

Esto evita tener que otorgar manualmente permisos a cada tabla nueva.

### PostgreSQL no expuesto directamente

El servicio PostgreSQL no necesita publicar:

```text
5432:5432
```

al host para que el backend o Prisma Studio funcionen.

Los servicios se comunican mediante la red interna de Docker Compose.

### Credenciales fuera del código

Las contraseñas y secretos se almacenan mediante variables de entorno y no forman parte del código fuente.

---

# 13. Autenticación

El backend utiliza JWT.

Cuando un usuario inicia sesión correctamente, el servidor genera un token.

El middleware de autenticación trabaja con una estructura similar a:

```ts
AuthenticatedUser {
    userId: string;
    role: string;
}
```

Las rutas protegidas esperan que el cliente envíe el JWT mediante el header:

```http
Authorization: Bearer <TOKEN>
```

Flujo:

```text
POST login
    │
    ▼
Credenciales válidas
    │
    ▼
JWT
    │
    ▼
Authorization: Bearer TOKEN
    │
    ▼
Middleware
    │
    ▼
AuthenticatedUser
    │
    ▼
Controller
```

---

# 14. Endpoints de la API

Los endpoints exactos deben consultarse en:

```text
apps/backend/src/presentation/
```

especialmente en:

```text
controllers/
routes/
```

Conceptualmente, la API contiene operaciones como:

| Método    | Endpoint          | Autenticación | Descripción       |
| --------- | ----------------- | ------------- | ----------------- |
| POST      | `/users/register` | No            | Crear usuario     |
| POST      | `/users/login`    | No            | Iniciar sesión    |
| GET       | `/...`            | No/Sí         | Obtener recursos  |
| GET       | `/.../:id`        | No/Sí         | Obtener recurso   |
| PUT/PATCH | `/.../:id`        | Sí            | Modificar recurso |
| DELETE    | `/.../:id`        | Sí            | Eliminar recurso  |

Esta sección debe actualizarse a medida que se incorporen nuevos endpoints.

---

# 15. Desarrollo local sin Docker

El backend también puede ejecutarse directamente desde la máquina para desarrollo.

El script de desarrollo es:

```bash
pnpm run dev
```

Este comando utiliza `.dev.env` para cargar las variables de entorno correspondientes al entorno local.

El flujo es:

```text
PostgreSQL local
      │
      ▼
.dev.env
      │
      ▼
pnpm run dev
      │
      ▼
Express
```

Este flujo es independiente del entorno Docker Compose.

---

# 16. Tests

El backend utiliza Vitest.

Para ejecutar los tests:

```bash
pnpm --filter backend test
```

También existe un script destinado a pruebas relacionadas con la conexión a la base de datos:

```bash
pnpm --filter backend run test:db
```

---

# 17. Scripts principales

Algunos comandos utilizados durante el desarrollo son:

### Instalar dependencias

```bash
pnpm install
```

### Ejecutar backend en desarrollo

```bash
pnpm run dev
```

### Ejecutar tests

```bash
pnpm --filter backend test
```

### Generar cliente Prisma

```bash
pnpm --filter backend exec prisma generate
```

### Crear migración

```bash
pnpm --filter backend exec prisma migrate dev --name <nombre>
```

### Levantar infraestructura Docker

```bash
docker compose up --build
```

### Levantar Prisma Studio

```bash
docker compose --profile admin up studio
```

---

# 18. Checklist de funcionamiento

Antes de considerar que el proyecto está correctamente levantado:

* [ ] Las dependencias están instaladas.
* [ ] Las variables de entorno están configuradas.
* [ ] Docker está funcionando.
* [ ] PostgreSQL inicia correctamente.
* [ ] El healthcheck de PostgreSQL es correcto.
* [ ] Las migraciones se ejecutan correctamente.
* [ ] El backend utiliza `forit_app`.
* [ ] Las migraciones utilizan `forit_migrator`.
* [ ] El backend inicia después de las migraciones.
* [ ] El puerto HTTP responde.
* [ ] Se puede crear o consultar un usuario.
* [ ] El login genera un JWT.
* [ ] Un endpoint protegido acepta un JWT válido.
* [ ] Un endpoint protegido rechaza una petición sin JWT.
* [ ] Los roles y permisos de PostgreSQL funcionan según lo esperado.
* [ ] Prisma Studio puede iniciarse mediante el perfil `admin`.
* [ ] Prisma Studio puede acceder a la base de datos mediante `forit_admin`.

---

# 19. Flujo completo de infraestructura

El flujo actual del proyecto puede resumirse de la siguiente manera:

```text
                    Docker Compose
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         │
      PostgreSQL 17                   │
            │                         │
            │ healthcheck             │
            ▼                         │
      forit_migrator                  │
            │                         │
            │ Prisma                  │
            │ migrate deploy          │
            ▼                         │
      Database schema                 │
            │                         │
            ▼                         │
        forit_app                     │
            │                         │
            ▼                         │
         Backend                      │
            │                         │
            ▼                         │
       Express API                    │
                                      │
      ┌───────────────────────────────┘
      │
      ▼
 Optional admin profile
      │
      ▼
 Prisma Studio
      │
      ▼
  forit_admin
```

Esta arquitectura permite separar claramente:

```text
Runtime de la aplicación
        ≠
Migraciones
        ≠
Administración de la base de datos
```

y proporciona una base para continuar incorporando controles de seguridad, auditoría y automatización mediante CI/CD.

---

# 20. Próximos pasos

Algunas mejoras previstas para el proyecto:

* Documentar todos los endpoints reales de la API.
* Incorporar ejemplos de requests y responses.
* Completar la colección de Postman.
* Incorporar pruebas de integración.
* Incorporar controles de seguridad en GitHub Actions.
* Automatizar el proceso de migraciones en CI/CD.
* Incorporar logging y auditoría de PostgreSQL.
* Analizar políticas de acceso y Row-Level Security cuando sean necesarias.
* Preparar el despliegue del backend en un entorno cloud.
* Documentar la estrategia de backups y recuperación de la base de datos.
