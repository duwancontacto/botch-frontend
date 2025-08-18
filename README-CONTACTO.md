# Sistema de Contacto - Frontend BOTCH

Este documento describe cómo usar el sistema de contacto implementado en el frontend de BOTCH.

## 🚀 Características

- ✅ Formulario de contacto responsivo
- ✅ Validación en tiempo real
- ✅ Manejo de estados de carga y éxito
- ✅ Componentes reutilizables
- ✅ Botón flotante para mobile
- ✅ Modal de contacto
- ✅ Integración completa con el backend

## 📱 Componentes Disponibles

### 1. ContactForm

Formulario de contacto principal para páginas web.

```tsx
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <h1>Contacto</h1>
      <ContactForm />
    </div>
  );
}
```

**Props:**

- `onSuccess?: () => void` - Callback cuando el mensaje se envía exitosamente
- `className?: string` - Clases CSS adicionales

### 2. MobileContactForm

Formulario optimizado para dispositivos móviles.

```tsx
import { MobileContactForm } from "@/components/MobileContactForm";

export default function MobilePage() {
  return (
    <div>
      <MobileContactForm
        isModal={false}
        onSuccess={() => console.log("Mensaje enviado")}
      />
    </div>
  );
}
```

**Props:**

- `onSuccess?: () => void` - Callback de éxito
- `onClose?: () => void` - Callback para cerrar (si es modal)
- `className?: string` - Clases CSS adicionales
- `isModal?: boolean` - Si se usa dentro de un modal

### 3. ContactModal

Modal de contacto para dispositivos móviles.

```tsx
import { ContactModal } from "@/components/ContactModal";

export default function PageWithModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Abrir Contacto</button>

      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => console.log("Éxito")}
      />
    </div>
  );
}
```

**Props:**

- `isOpen: boolean` - Estado de apertura del modal
- `onClose: () => void` - Función para cerrar el modal
- `onSuccess?: () => void` - Callback de éxito

### 4. FloatingContactButton

Botón flotante de contacto que se puede usar en cualquier página.

```tsx
import { FloatingContactButton } from "@/components/FloatingContactButton";

export default function AnyPage() {
  return (
    <div>
      {/* Contenido de la página */}

      {/* Botón flotante de contacto */}
      <FloatingContactButton
        position="bottom-right"
        className="custom-styles"
      />
    </div>
  );
}
```

**Props:**

- `position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"` - Posición del botón
- `className?: string` - Clases CSS adicionales

### 5. useContactModal Hook

Hook personalizado para manejar el estado del modal.

```tsx
import { useContactModal } from "@/lib/hooks/use-contact-modal";

export default function PageWithModal() {
  const { isOpen, openModal, closeModal, toggleModal } = useContactModal();

  return (
    <div>
      <button onClick={openModal}>Abrir Contacto</button>
      <button onClick={closeModal}>Cerrar Contacto</button>
      <button onClick={toggleModal}>Toggle Contacto</button>

      {/* Modal aquí */}
    </div>
  );
}
```

**Retorna:**

- `isOpen: boolean` - Estado del modal
- `openModal: () => void` - Abrir modal
- `closeModal: () => void` - Cerrar modal
- `toggleModal: () => void` - Cambiar estado del modal

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# URL de la API del backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Configuración adicional
NEXT_PUBLIC_APP_NAME=BOTCH
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Integración en Layout

El botón flotante de contacto ya está integrado en el layout principal (`src/app/layout.tsx`), por lo que estará disponible en todas las páginas.

## 📱 Uso en Diferentes Contextos

### Página Dedicada de Contacto

```tsx
// src/app/contacto/page.tsx
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Contacto</h1>
      <ContactForm />
    </div>
  );
}
```

### Modal en Página Existente

```tsx
// Cualquier página
import { useContactModal } from "@/lib/hooks/use-contact-modal";
import { ContactModal } from "@/components/ContactModal";

export default function ExistingPage() {
  const { isOpen, openModal, closeModal } = useContactModal();

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-[#2a597e] text-white px-6 py-3 rounded-full"
      >
        Contactar
      </button>

      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
```

### Botón Flotante Personalizado

```tsx
// Página con botón flotante personalizado
import { FloatingContactButton } from "@/components/FloatingContactButton";

export default function CustomPage() {
  return (
    <div>
      {/* Contenido */}

      <FloatingContactButton
        position="bottom-left"
        className="!bg-red-500 hover:!bg-red-600"
      />
    </div>
  );
}
```

## 🎨 Personalización

### Estilos CSS

Todos los componentes usan Tailwind CSS y pueden ser personalizados con clases adicionales:

```tsx
<ContactForm className="max-w-lg mx-auto bg-gray-50 p-8 rounded-lg" />
<MobileContactForm className="space-y-6" />
<FloatingContactButton className="!bg-purple-500 hover:!bg-purple-600" />
```

### Temas y Colores

Los componentes usan los colores de BOTCH (`#2a597e`) pero pueden ser personalizados:

```tsx
// En tu CSS global
:root {
  --contact-primary: #2a597e;
  --contact-primary-hover: #1e3a5f;
  --contact-secondary: #f8f9fa;
}
```

## 🔒 Validación

### Validaciones del Frontend

- **Nombre**: Mínimo 2 caracteres
- **Email**: Formato válido de email
- **Mensaje**: Mínimo 10 caracteres
- **Campos obligatorios**: Todos los campos son requeridos

### Validaciones del Backend

- Validación adicional con `class-validator`
- Sanitización de datos
- Rate limiting (configurable)

## 📊 Estados del Formulario

### Estados Disponibles

1. **Idle**: Formulario listo para usar
2. **Loading**: Enviando mensaje
3. **Success**: Mensaje enviado exitosamente
4. **Error**: Error al enviar mensaje

### Manejo de Estados

```tsx
const { isLoading, isSuccess, error, submitForm } = useContactForm();

// El componente maneja automáticamente:
// - Mostrar spinner durante envío
// - Mostrar mensaje de éxito
// - Mostrar errores de validación
// - Deshabilitar botón durante envío
```

## 🚨 Manejo de Errores

### Tipos de Errores

- **Errores de validación**: Campos inválidos
- **Errores de red**: Problemas de conexión
- **Errores del servidor**: Respuestas de error del backend

### Mensajes de Error

Los errores se muestran automáticamente en el formulario con estilos apropiados:

```tsx
{
  error && (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-red-600 text-sm">{error}</p>
    </div>
  );
}
```

## 📱 Responsividad

### Breakpoints

- **Mobile**: < 768px - Formulario optimizado para móviles
- **Tablet**: 768px - 1024px - Formulario adaptativo
- **Desktop**: > 1024px - Formulario completo

### Adaptaciones por Dispositivo

- **Mobile**: Campos más grandes, espaciado optimizado
- **Tablet**: Tamaños intermedios
- **Desktop**: Tamaños estándar, layout horizontal

## 🧪 Testing

### Componentes Testeables

```tsx
// Ejemplo de test para ContactForm
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

test("envía formulario con datos válidos", async () => {
  render(<ContactForm />);

  fireEvent.change(screen.getByLabelText(/nombre/i), {
    target: { value: "Juan Pérez" },
  });

  fireEvent.click(screen.getByText(/enviar/i));

  expect(await screen.findByText(/mensaje enviado/i)).toBeInTheDocument();
});
```

## 🔄 Flujo de Datos

### 1. Usuario llena formulario

### 2. Validación del frontend

### 3. Envío al backend (`/contact`)

### 4. Procesamiento en el backend

### 5. Envío de emails

### 6. Respuesta al frontend

### 7. Actualización de UI

## 📈 Mejoras Futuras

- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Historial de mensajes
- [ ] Categorización de consultas
- [ ] Integración con CRM
- [ ] Analytics de contacto

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Formulario no envía**: Verificar conexión al backend
2. **Errores de validación**: Revisar formato de email y longitud de campos
3. **Modal no abre**: Verificar estado `isOpen` y función `onClose`
4. **Estilos no aplican**: Verificar clases de Tailwind CSS

### Debug

```tsx
// Agregar logs para debugging
const { submitForm } = useContactForm();

const handleSubmit = async (data) => {
  console.log("Enviando datos:", data);
  const result = await submitForm(data);
  console.log("Resultado:", result);
};
```

## 📚 Recursos Adicionales

- [Documentación del Backend](../botch/src/contact/README.md)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Next.js](https://nextjs.org/)

---

¿Necesitas ayuda adicional? ¡Contacta al equipo de desarrollo!
