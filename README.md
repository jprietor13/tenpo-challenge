# 🧭 Tenpo Challenge — React + TypeScript

Este proyecto implementa una aplicación **SPA en React + TypeScript** que cumple con los criterios del challenge técnico.  
Incluye autenticación simulada, persistencia de token, contexto público/privado, fetch de datos con paginación infinita e integración de **TailwindCSS** con soporte **dark/light mode**.

---

## 🚀 Tecnologías principales

- ⚛️ **React + TypeScript** — estructura tipada, modular y escalable.  
- 🧠 **React Context API** — manejo global de autenticación (login/logout).  
- 💾 **LocalStorage + custom AuthService** — persistencia segura del token.  
- 🌐 **Axios** — cliente HTTP configurado con interceptor para envío de token.  
- 🎨 **TailwindCSS** — estilos responsivos y tema oscuro/claro dinámico.  
- 🔄 **IntersectionObserver API** — paginación infinita sin librerías externas.  

---

## 🧩 Arquitectura del proyecto

```
src/
├── api/
│   └── axiosConfig.ts         # Configuración global de Axios con interceptor
├── context/
│   └── AuthContext.tsx        # Contexto de autenticación global (login/logout)
├── hooks/
│   ├── useAuth.ts             # Hook para consumir el contexto de auth
│   ├── useHomeItems.ts        # Hook con lógica de paginación infinita
│   └── useTheme.ts            # Hook para alternar dark/light mode
├── pages/
│   ├── LoginPage.tsx          # Página pública de login
│   └── HomePage.tsx           # Página privada con lista e infinite scroll
├── services/
│   └── AuthService.ts         # Abstracción para manejo de token en localStorage
├── types/
│   └── global.d.ts            # Tipos globales (Item, AuthContext)
├── App.tsx                    # Rutas públicas/privadas
├── main.tsx                   # Punto de entrada principal
└── index.css                  # Estilos globales con TailwindCSS
```

### 💡 Decisiones arquitectónicas

- **Separación de responsabilidades (SOLID):**  
  - Lógica de autenticación → `AuthContext`  
  - Persistencia → `AuthService`  
  - Lógica de UI → Hooks (`useHomeItems`, `useTheme`)  
  - Presentación → Componentes `pages/*`

- **Context público/privado:**  
  El `AuthProvider` envuelve toda la app y expone `isAuthenticated`.  
  Enrutamiento controlado (login público / home privada) que puede ser extensible a módulos futuros:
  - `ChangePasswordPage` (público)
  - `UserProfilePage` (privado)

- **Persistencia del token:**  
  Se guarda en **localStorage** mediante `AuthService`, permitiendo mantener sesión al recargar la app.  
  El `AuthContext` sincroniza este estado y expone funciones `login` / `logout`.

- **Axios con interceptor:**  
  Cada request agrega el header `Authorization: Bearer <token>` automáticamente.

---

## 📦 Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/jprietor13/tenpo-challenge.git
cd tenpo-challenge
```

### 2️⃣ Instalar dependencias
```bash
yarn install
```
(o `npm install`)

### 3️⃣ Ejecutar la app en desarrollo
```bash
yarn dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

---

## 🧠 Flujo de la aplicación

1. **LoginPage:**  
   - Usuario ingresa email y contraseña.  
   - Se genera un *token fake* (`btoa(email:password)`).
   - Token se almacena vía `AuthService` en `localStorage`.

2. **HomePage:**  
   - Página privada accesible solo si el usuario está autenticado.  
   - Se obtienen datos simulados desde la api `jsonplaceholder.typicode.com/posts`.  
   - Se replica la lista para alcanzar 2000 elementos (simulación de dataset grande).  
   - Se renderiza progresivamente con `IntersectionObserver` (infinite scroll) de a 50 cada que llega el bottom 0 de la ventana.  
   - Permite cambiar entre **modo claro/oscuro** (persistente).  
   - Botón de *logout* limpia el token y redirige a Login.

---

## ⚙️ Estrategia de token y logout

- **Token fake:**  
  Persistido en `localStorage` por medio de `AuthService` (métodos `saveToken`, `getToken`, `clearToken`).

- **Logout:**  
  - Limpia token de `localStorage`.  
  - Actualiza el contexto global (`setToken(null)`).  
  - Redirige automáticamente a la ruta pública `/login`.  
  - Si hay múltiples pestañas abiertas, el logout se propaga gracias al listener del evento `storage`.

---

## 🔄 Estrategia de renderizado y paginación

La **lista del Home** implementa un **infinite scroll con IntersectionObserver**,  
por las siguientes razones:

- **Performance:** no se renderizan los 2000 elementos de una vez.  
- **UX fluida:** el scroll carga bloques de 50 ítems cuando el usuario llega al final.  
- **Nativo:** sin dependencias externas, aprovecha la API del navegador.  
- **Escalable:** puede reemplazarse fácilmente por una paginación real desde backend (`_page` y `_limit` en JSONPlaceholder).

---

## 💡 Mejora teórica propuesta (eficiencia de llamadas)

Actualmente, los datos se obtienen de una sola llamada a `/posts` y se multiplican localmente.  
En un entorno real, se recomienda:

```ts
GET /posts?_limit=50&_page=1
```

Y usar paginación incremental con `useEffect` para evitar traer los 2000 elementos desde el inicio.  
Esto:
- Reduce el consumo de ancho de banda.  
- Mejora el *time-to-interactive*.  
- Permite caching por página y control de estado (React Query o SWR).

---

## 🎨 Estilos y responsividad

- Se utilizó **TailwindCSS** por su rapidez y flexibilidad.  
- Diseño totalmente **responsivo** (móvil, tablet, desktop).  
- Tema **dark/light** controlado mediante `useTheme` y `localStorage`.  
- Transiciones suaves (`transition-colors`, `duration-300`).

---

## 🧾 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `yarn dev` | Ejecuta el servidor de desarrollo |
| `yarn build` | Genera la build de producción |
| `yarn preview` | Sirve la build para ver el resultado final |
| `yarn lint` | Ejecuta linter de TypeScript |

---

## 🧱 Estructura modular y escalabilidad

El proyecto está diseñado para crecer.  
Agregar nuevos módulos solo requiere crear nuevas páginas y rutas dentro del router principal, reutilizando el contexto de autenticación y el tema global.

**Ejemplo de extensión futura:**
- `/profile` → datos del usuario autenticado.  
- `/change-password` → módulo público de recuperación.  

---

## 👨‍💻 Autor

**Juan Prieto**  
Frontend Developer  
📧 juan.prieto@email.com  
💻 Desarrollado para Tenpo 2025  
