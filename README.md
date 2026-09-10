# ForIt Ecommerce

Backend de un sistema de e-commerce desarrollado con **Node.js, TypeScript, Express, PostgreSQL y Prisma**, siguiendo principios de **Clean Architecture y Domain-Driven Design (DDD)**.

El proyecto está organizado como un **monorepo administrado con pnpm** y contiene el dominio compartido mediante `@forit/domain`.

---

## 1. Tecnologías principales

* Node.js
* TypeScript
* Express
* PostgreSQL
* Prisma ORM
* pnpm
* JWT para autenticación
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

El cliente de Prisma generado se encuentra bajo:

```text
src/infra/generated/prisma
```

---

# 3. Requisitos

Para ejecutar el proyecto se necesita:

* Node.js
* pnpm
* PostgreSQL
* Git

La versión de Node utilizada durante el desarrollo fue:

```text
Node.js 22.12.0
```

La versión de pnpm utilizada fue:

```text
pnpm 10.34.1
```

Se recomienda utilizar versiones compatibles con las anteriores para reproducir el entorno.

---

# 4. PostgreSQL

El proyecto actualmente **no utiliza Docker Compose para PostgreSQL**.

Por lo tanto, PostgreSQL debe estar instalado y ejecutándose directamente en la máquina.

Antes de iniciar el backend, verificar que PostgreSQL esté levantado.

En Ubuntu, por ejemplo:

```bash
sudo systemctl status postgresql
```

Si está detenido:

```bash
sudo systemctl start postgresql
```

También puede verificarse utilizando:

```bash
sudo -u postgres psql
```

Si se obtiene una consola de PostgreSQL, el servidor está funcionando.

Para salir:

```sql
\q
```

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

# 6. Configurar las variables de entorno

Crear el archivo:

```text
.env
```

en la ubicación correspondiente al backend.

Configurar como mínimo la conexión a PostgreSQL.

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/forit_ecommerce"
```

Si el sistema utiliza variables adicionales para JWT u otros servicios, también deben configurarse.

---

# 7. Prisma

Prisma se utiliza como ORM para comunicarse con PostgreSQL.

Antes de ejecutar el backend, asegurarse de que la base de datos esté sincronizada con el esquema del proyecto.

Dependiendo del flujo utilizado en el proyecto, pueden utilizarse comandos como:

```bash
pnpm prisma generate
```

y, para aplicar migraciones:

```bash
pnpm prisma migrate dev
```

El comando exacto debe comprobarse en los scripts actuales del proyecto.

El cliente generado se encuentra dentro de:

```text
src/infra/generated/prisma
```

---

# 8. Orden para iniciar el sistema

El orden normal de ejecución es:

```text
1. PostgreSQL
      ↓
2. Base de datos disponible
      ↓
3. Backend
      ↓
4. Cliente HTTP / Postman / navegador
```

Por ejemplo:

### Terminal 1 — PostgreSQL

```bash
sudo systemctl start postgresql
```

Verificar:

```bash
sudo systemctl status postgresql
```

---

### Terminal 2 — Backend

Desde el proyecto:

```bash
cd apps/backend
pnpm run dev
```

> El comando exacto debe comprobarse en `package.json`. Si el proyecto tiene otro script para desarrollo, utilizar ese script.

Si todo está correctamente configurado, Express debería iniciar el servidor y quedar escuchando en el puerto configurado.

```text
http://localhost:3000
```

---

# 9. Endpoints de la API

Los endpoints exactos deben consultarse en:

```text
src/presentation/
```

especialmente en los archivos relacionados con:

```text
routes
controllers
```

La estructura esperada es conceptualmente:

```text
presentation/
├── controllers/
├── routes/
└── middlewares/
```

Para documentar la API, registrar para cada endpoint:

| Método    | Endpoint          | Autenticación | Descripción       |
| --------- | ----------------- | ------------- | ----------------- |
| POST      | `/users/register` | No            | Crear usuario     |
| POST      | `/users/login`    | No            | Iniciar sesión    |
| GET       | `/...`            | No/Sí         | Obtener recursos  |
| GET       | `/.../:id`        | No/Sí         | Obtener recurso   |
| PUT/PATCH | `/.../:id`        | Sí            | Modificar recurso |
| DELETE    | `/.../:id`        | Sí            | Eliminar recurso  |

---

# 12. Autenticación

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

# 16. Estructura del monorepo

El proyecto utiliza pnpm workspaces.

Una estructura aproximada es:

```text
ForIt_Ecommerce/
│
├── apps/
│   └── ...
│
├── packages/
│   └── ...
│
├── domain/
│
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── ...
```

El dominio compartido utiliza:

```text
@forit/domain
```

y el código utiliza aliases como:

```text
@app/*
@infra/*
@presentation/*
```

Esto permite evitar imports relativos excesivamente largos.

---

# 19. Docker

Actualmente el proyecto **no depende de Docker Compose**.

Por lo tanto, para levantar el sistema durante el desarrollo, no se debe hacer uso de:

```bash
docker compose up
```

porque la infraestructura de PostgreSQL actualmente se ejecuta directamente en la máquina.

Una futura incorporación de Docker Compose podría encapsular PostgreSQL y facilitar la reproducción del entorno, pero no forma parte del flujo actual.

---

# 20. Checklist de funcionamiento

Antes de considerar que el proyecto está correctamente levantado:

* [ ] PostgreSQL está ejecutándose.
* [ ] Existe la base de datos.
* [ ] `.env` está configurado.
* [ ] `pnpm install` terminó correctamente.
* [ ] Prisma tiene el cliente generado.
* [ ] Las migraciones/esquema están aplicados.
* [ ] El backend inicia sin errores.
* [ ] El puerto HTTP responde.
* [ ] Se puede ejecutar al menos una consulta contra PostgreSQL.
* [ ] Se puede crear o consultar un usuario.
* [ ] El login genera un JWT.
* [ ] Un endpoint protegido acepta un JWT válido.
* [ ] Un endpoint protegido rechaza una petición sin JWT.
* [ ] Los roles/permisos funcionan según lo esperado.

---

# 21. Próximo paso: documentar la API real

También conviene registrar:

* puerto real
* nombre de la base de datos
* variables de entorno
* scripts reales de `package.json`
* migraciones necesarias
* ejemplos de requests
* ejemplos de respuestas
* códigos HTTP esperados
* endpoints públicos
* endpoints protegidos
* roles necesarios
* colección de Postman, si existe

Esto convertiría el README en una guía completa de instalación y demostración del proyecto.
