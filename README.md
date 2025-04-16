# FastMarketPlace 🛒

FastMarketPlace es una plataforma web de compra y venta de productos desarrollada con **React**, **Node.js** y **PostgreSQL**, que permite a los usuarios crear publicaciones, buscar productos, gestionarlos en un carrito de compras, y simular la experiencia completa de una tienda online.

---

## Tecnologías utilizadas 🛠️

### Frontend

- React + Vite
- TypeScript
- TailwindCSS + HeroUI
- Zustand (manejo de estado de búsqueda)
- Cloudinary (para imágenes)
- React Router DOM

### Backend

- Node.js + Express
- PostgreSQL
- JWT (autenticación)
- Middleware personalizados

---

## Estructura del proyecto 🗂️

```
├── backend
│   ├── controllers
│   ├── routes
│   ├── middlewares
│   ├── config (conexión a la DB)
│   └── index.js
├── frontend
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── context (Carrito)
│   ├── store (Zustand)
│   └── main.tsx
```

---

## Funcionalidades principales 💡

### 🧾 Crear publicación

- Formulario con validaciones.
- Vista previa antes de publicar.
- Almacenamiento de imágenes en Cloudinary.
- Publicación protegida con autenticación.

### 🔍 Búsqueda de productos

- Barra de búsqueda en el navbar.
- Resultados mostrados dinámicamente en el index.
- Filtrado por categorías dinámicas.

### 🛒 Carrito de compras

- Agregar productos desde la vista de detalles.
- Ver resumen del carrito.
- Confirmar compra mediante modal.
- Generación de número de orden aleatorio.

### 👤 Perfil de usuario

- Visualización de publicaciones propias.
- Eliminar publicaciones con confirmación mediante modal.

### 🔐 Autenticación

- Registro e inicio de sesión con token JWT.
- Persistencia de sesión y autorización protegida.

---

## Variables de entorno 🌍

`.env.local`

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
```

`.env` en backend

```env
DATABASE_URL=postgres://...
JWT_SECRET=tu_clave_secreta
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
```

---

## Cómo ejecutar el proyecto 🚀

### 1. Clonar el repositorio

```bash
git clone https://github.com/JeffVerdu/proyecto-final.git
cd fastmarketplace
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Consideraciones adicionales ⚠️

- Si la página se recarga manualmente, el carrito se sincroniza gracias al ID guardado en localStorage.
- Las imágenes se almacenan en CLOUDINARY y solo se guarda la URL en la base de datos.
- Las categorías no están en base de datos, pero se cargan dinámicamente desde un archivo JSON.

---

## Créditos 🙌

Proyecto final realizado por **Jeffrey Verdú**, **Sandy Alvarado** y **Cecilia Potella** para el curso de Desarrollo Full Stack JavaScript en la academia DesafioLatam.

---

## Licencia 📄

Este proyecto es de uso educativo y puede ser reutilizado para fines personales o profesionales.
