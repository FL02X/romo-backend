# Romo Backend

Backend API para gestión de vestidos, rentas y ventas, usando NestJS, Prisma y PostgreSQL.

---

## 🚀 Instalación y configuración paso a paso

### 1. Clona este repositorio

git clone <URL_DEL_REPOSITORIO>
cd romo-backend

### 2. Instala las dependencias

npm install

### 3. Configura el archivo .env

Crea un archivo .env en la raíz del proyecto con al menos:

DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/romodb"
JWT_SECRET="un_secreto_super_seguro"

Cambia `usuario`, `contraseña` y `romodb` por datos de una base de datos PostgreSQL.

### 4. Prepara la base de datos

Ten PostgreSQL corriendo y una base de datos creada (por ejemplo, `romodb`).

### 5. Ejecuta las migraciones de Prisma

npx prisma migrate deploy
(o en desarrollo: npx prisma migrate dev)

### 6. Genera el cliente de Prisma

npx prisma generate

### 7. Carga datos de ejemplo con la semilla

npx ts-node seed.ts

Esto creará usuarios, vestidos, rentas y ventas de ejemplo...

### 8. Levanta el servidor NestJS

npm run start:dev

El backend estará corriendo en http://localhost:3000.

---

## 🔑 Usuarios de prueba

Puedes iniciar sesión con:

- admin / admin (rol: ADMIN)
- staff / staff (rol: STAFF)

---

## 🌐 Endpoints principales

- Login: POST /auth/login
- Usuarios: GET /users
- Vestidos: GET /dresses
- Rentas: GET /rentals
- Ventas: GET /sales

NOTA: Todos los endpoints (excepto /auth/login) requieren autenticación JWT.

---

## 🛠️ Ejemplo de petición de login

curl -X POST http://localhost:3000/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin","password":"admin"}'

La respuesta incluirá un access_token que debes usar en el header Authorization para las siguientes peticiones:

Authorization: Bearer <access_token>

---

## 📝 Notas

- El frontend (por ejemplo, React) debe conectarse a http://localhost:3000/.
- CORS está habilitado para http://localhost:5173 por defecto.
- Puedes modificar el seed en seed.ts para agregar más datos de prueba.
