# Configuración de EmailJS para Correos de Bienvenida

## Paso 1: Crear cuenta en EmailJS (GRATIS)
1. Ve a https://www.emailjs.com/
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Verifica tu correo electrónico

## Paso 2: Configurar servicio de email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Conecta tu cuenta de correo
5. Copia el **Service ID** que aparece

## Paso 3: Crear plantilla de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este contenido para la plantilla:

**Subject:** ¡Bienvenido a Zambik, {{to_name}}!

**Content:**
```
{{{message_html}}}
```

4. Guarda y copia el **Template ID**

## Paso 4: Obtener clave pública
1. Ve a "Account" > "General"
2. Copia tu **Public Key**

## Paso 5: Actualizar el código
En el archivo `auth.html`, reemplaza:

```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Línea 1089
```
Con tu Public Key real.

Y en la función `sendWelcomeEmail`:
```javascript
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```
Reemplaza con tus IDs reales.

## Límites del plan gratuito
- 200 emails por mes
- Perfecto para empezar
- Sin tarjeta de crédito requerida

## Características del correo de bienvenida
✅ Diseño animado estilo Cartoon Network
✅ Gradientes de colores vibrantes
✅ Logo animado con efecto bounce
✅ Lista de características con iconos
✅ Botón call-to-action
✅ Diseño responsive
✅ Colores: morado, naranja, dorado, rosa

## Contenido del correo
- Saludo personalizado con el nombre del usuario
- Explicación de qué es Zambik
- Lista de contenido disponible:
  * Películas exclusivas de terror
  * Series originales
  * Estrenos anticipados
  * Contenido VIP
  * Descargas offline
- Botón para comenzar
- Footer con información de contacto

¡Listo! Ahora cada nuevo usuario recibirá un hermoso correo de bienvenida automáticamente.
