#!/bin/sh

set -eu

psql \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  -v ON_ERROR_STOP=1 \
  --set=app_user="$APP_DB_USER" \
  --set=app_password="$APP_DB_PASSWORD" \
  --set=migrator_user="$MIGRATOR_DB_USER" \
  --set=migrator_password="$MIGRATOR_DB_PASSWORD" \
  --set=admin_user="$ADMIN_DB_USER" \
  --set=admin_password="$ADMIN_DB_PASSWORD" \
  <<'EOSQL'

-- ==========================================
-- ROLES
-- ==========================================

CREATE ROLE :"app_user"
    LOGIN
    PASSWORD :'app_password';

CREATE ROLE :"migrator_user"
    LOGIN
    PASSWORD :'migrator_password';

CREATE ROLE :"admin_user"
    LOGIN
    PASSWORD :'admin_password';


-- ==========================================
-- MIGRATOR
-- ==========================================

GRANT CONNECT ON DATABASE "forit_db"
    TO :"migrator_user";

GRANT USAGE, CREATE
    ON SCHEMA public
    TO :"migrator_user";


-- ==========================================
-- APPLICATION
-- ==========================================

GRANT CONNECT ON DATABASE "forit_db"
    TO :"app_user";

GRANT USAGE
    ON SCHEMA public
    TO :"app_user";


-- ==========================================
-- ADMIN / DBA
-- ==========================================

GRANT CONNECT
    ON DATABASE "forit_db"
    TO :"admin_user";

GRANT USAGE, CREATE
    ON SCHEMA public
    TO :"admin_user";


-- ==========================================
-- ADMIN - EXISTING OBJECTS
-- ==========================================

GRANT ALL PRIVILEGES
    ON ALL TABLES IN SCHEMA public
    TO :"admin_user";

GRANT ALL PRIVILEGES
    ON ALL SEQUENCES IN SCHEMA public
    TO :"admin_user";

GRANT ALL PRIVILEGES
    ON ALL FUNCTIONS IN SCHEMA public
    TO :"admin_user";


-- ==========================================
-- DEFAULT PRIVILEGES - APPLICATION
-- Objects created by migrator
-- ==========================================

ALTER DEFAULT PRIVILEGES
    FOR ROLE :"migrator_user"
    IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE
    ON TABLES
    TO :"app_user";

ALTER DEFAULT PRIVILEGES
    FOR ROLE :"migrator_user"
    IN SCHEMA public
    GRANT USAGE, SELECT, UPDATE
    ON SEQUENCES
    TO :"app_user";


-- ==========================================
-- DEFAULT PRIVILEGES - ADMIN
-- Objects created by migrator
-- ==========================================

ALTER DEFAULT PRIVILEGES
    FOR ROLE :"migrator_user"
    IN SCHEMA public
    GRANT ALL PRIVILEGES
    ON TABLES
    TO :"admin_user";

ALTER DEFAULT PRIVILEGES
    FOR ROLE :"migrator_user"
    IN SCHEMA public
    GRANT ALL PRIVILEGES
    ON SEQUENCES
    TO :"admin_user";

ALTER DEFAULT PRIVILEGES
    FOR ROLE :"migrator_user"
    IN SCHEMA public
    GRANT ALL PRIVILEGES
    ON FUNCTIONS
    TO :"admin_user";

EOSQL