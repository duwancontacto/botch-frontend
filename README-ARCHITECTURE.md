# Arquitectura de la Aplicación BOTCH Frontend

## Descripción General

Esta aplicación implementa una arquitectura moderna y escalable utilizando las mejores prácticas de React, TypeScript, y herramientas de gestión de estado y formularios.

## Tecnologías Principales

- **Next.js 15** - Framework de React con App Router
- **TypeScript** - Tipado estático para mayor robustez
- **TanStack Query** - Gestión de estado del servidor y caché
- **React Hook Form** - Gestión de formularios con validación
- **Zod** - Validación de esquemas en tiempo de ejecución
- **Tailwind CSS** - Framework de CSS utilitario
- **Axios** - Cliente HTTP para llamadas a la API

## Arquitectura de la Aplicación

### 1. Estructura de Directorios

```
src/
├── app/                    # App Router de Next.js
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI base
│   └── Register-*/       # Componentes específicos de registro
├── lib/                  # Utilidades y configuraciones
│   ├── hooks/            # Hooks personalizados
│   ├── providers/        # Providers de contexto
│   ├── schemas/          # Esquemas de validación
│   ├── services/         # Servicios de API
│   └── types/            # Tipos TypeScript
└── store/                # Estado global (Zustand)
```

### 2. Gestión de Estado del Servidor (TanStack Query)

#### Configuración del QueryClient

```typescript
// lib/providers/query-provider.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

#### Hooks Personalizados

- **`useDistributors`** - Query para obtener lista de distribuidores
- **`useRegisterDistributor`** - Mutación para registro de distribuidor
- **`useRegisterPointOfSale`** - Mutación para registro de punto de venta

### 3. Gestión de Formularios (React Hook Form + Zod)

#### Esquemas de Validación

```typescript
// lib/schemas/auth-schemas.ts
const distributorSchema = baseUserSchema.extend({
  distributorId: z.string().min(1, "Selecciona un distribuidor"),
  fullName: z.string().min(1, "El nombre completo es obligatorio"),
});
```

#### Integración en Componentes

```typescript
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
  setValue,
  watch,
} = useForm<DistributorFormData>({
  resolver: zodResolver(distributorSchema),
  defaultValues: {
    /* ... */
  },
});
```

### 4. Servicios de API

#### Clase AuthService

- **`registerDistributor`** - Registro de distribuidor
- **`registerPointOfSale`** - Registro de punto de venta
- **`getDistributors`** - Obtener lista de distribuidores

#### Manejo de Errores

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    // Manejo específico por tipo de error
  }
);
```

### 5. Componentes de UI

#### FormField

Componente de campo de formulario que integra:

- React Hook Form
- Validación de errores
- Estilos consistentes
- Indicadores de campos obligatorios

#### FormSelect

Componente de selección que integra:

- Opciones dinámicas
- Validación
- Estado de carga
- Manejo de errores

## Flujo de Datos

### 1. Registro de Usuario

1. **Usuario llena formulario** → React Hook Form valida con Zod
2. **Envío del formulario** → Hook de mutación de TanStack Query
3. **Llamada a API** → Servicio AuthService
4. **Respuesta del servidor** → Validación con esquema de respuesta
5. **Manejo de éxito/error** → Toast notifications + redirección

### 2. Carga de Distribuidores

1. **Componente se monta** → Hook `useDistributors`
2. **Query se ejecuta** → Servicio `getDistributors`
3. **Datos se cachean** → TanStack Query gestiona el estado
4. **UI se actualiza** → Opciones del select se renderizan

## Características de la Arquitectura

### ✅ Ventajas

- **Separación de responsabilidades** clara y definida
- **Reutilización de código** a través de hooks personalizados
- **Validación robusta** con esquemas Zod
- **Manejo de errores** centralizado y consistente
- **Caché inteligente** con TanStack Query
- **Tipado fuerte** con TypeScript
- **Componentes modulares** y reutilizables

### 🔧 Configuración

- **Variables de entorno** para configuración de API
- **Timeouts** configurados para llamadas HTTP
- **Retry logic** para operaciones fallidas
- **Stale time** optimizado para diferentes tipos de datos

### 📱 UX/UI

- **Estados de carga** con spinners
- **Validación en tiempo real** con mensajes de error
- **Notificaciones toast** para feedback del usuario
- **Botones deshabilitados** durante operaciones
- **Indicadores visuales** para campos obligatorios

## Mejores Prácticas Implementadas

1. **Error Boundaries** - Manejo robusto de errores
2. **Loading States** - Estados de carga consistentes
3. **Type Safety** - Validación de tipos en tiempo de compilación
4. **Schema Validation** - Validación de datos en tiempo de ejecución
5. **Optimistic Updates** - Actualizaciones optimistas del UI
6. **Cache Management** - Gestión inteligente del caché
7. **Form State Management** - Estado de formularios centralizado

## Configuración del Entorno

```bash
# Instalar dependencias
npm install

# Variables de entorno
NEXT_PUBLIC_API_URL=http://localhost:3001

# Ejecutar en desarrollo
npm run dev
```

## Estructura de la API Esperada

### Endpoints

- `POST /auth/register/distributor` - Registro de distribuidor
- `POST /auth/register/point-of-sale` - Registro de punto de venta
- `GET /distributors` - Lista de distribuidores

### Respuestas

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
```

Esta arquitectura proporciona una base sólida y escalable para el desarrollo futuro de la aplicación BOTCH.
