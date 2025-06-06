# Base-Vue

[![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-^4.0-blueviolet)](https://vitejs.dev/)
[![License](https://img.shields.io/github/license/Eduardo-Karpinski/Base-Vue)](./LICENSE)

Modern frontend project built with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/), fully compatible with the [Base Spring Boot API](https://github.com/Eduardo-Karpinski/Base).

---

## 📁 Project Structure

This project follows a modular architecture with clear separation of concerns:

```
src/
│
├── assets/             # Static assets like CSS
│   └── main.css
│
├── components/         # Reusable Vue components
│   └── UserForm.vue
│
├── composables/        # Reusable composition functions
│   ├── useConfirm.ts
│   ├── useShake.ts
│   ├── useToast.ts
│   └── useUser.ts
│
├── layouts/            # Application layout wrappers
│   ├── AuthLayout.vue
│   └── DefaultLayout.vue
│
├── models/             # TypeScript models and interfaces
│   ├── ApiErrorResponse.ts
│   └── User.ts
│
├── router/             # Route configuration
│   └── index.ts
│
├── services/           # API communication logic
│   └── api.ts
│
├── stores/             # Pinia state management
│   └── auth.ts
│
├── utils/              # Utility functions
│   ├── date.ts
│   ├── errorHandler.ts
│   └── validationRules.ts
│
└── views/              # Application views (router pages)
    ├── DashboardView.vue
    ├── LoginView.vue
    └── UserView.vue
```

---

## 🔐 Best Practices and Security

This project follows frontend best practices, including Axios interceptors for consistent request/response handling and secure configurations.

```ts
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 5000,
  withCredentials: true,
})
```

It logs requests/responses for easier debugging and ensures errors are captured and handled gracefully. TypeScript usage and modular structure also increase safety and maintainability.

---

## 🚀 Running the Project

### Prerequisites

- Node.js 16+
- npm or yarn

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Lint the project

```bash
npm run lint
```

---

## 🔗 Backend Integration

This frontend is designed to work with the Spring Boot API running on port `8080`, exposing REST endpoints.  
👉 [Base - Spring Boot API](https://github.com/Eduardo-Karpinski/Base)

---

## 💬 Contributing

Pull requests and suggestions are welcome!

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more details.

---

## 🛡️ Layout-Based Security Architecture

The routing system is structured around **layout-based access control**, using two main components:

- `AuthLayout`: used for public pages such as Login
- `DefaultLayout`: used for protected routes that require authentication or specific roles

This architecture promotes clean separation between unauthenticated and authenticated views:

```ts
const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [{ path: '', name: 'Login', component: LoginView }],
  },
  {
    path: '/',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: DashboardView },
      { path: 'usuarios', name: 'Usuarios', component: UserView, meta: { requiresAdmin: true } },
    ],
  },
]
```

### 🔐 Navigation Guards

The app uses route guards to protect access based on authentication and user roles:

```ts
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/' }
  }

  if (to.meta.requiresAdmin && !auth.isAdmin) {
    return { path: '/dashboard' }
  }

  return true
})
```

This ensures that only authenticated users (and optionally admins) can access certain views, enhancing the application's security model.
