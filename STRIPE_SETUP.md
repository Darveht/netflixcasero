# Configuración de Stripe para Zambik

## 🚀 Pasos para configurar Stripe

### 1. Crear cuenta en Stripe
1. Ve a [https://stripe.com](https://stripe.com)
2. Crea una cuenta o inicia sesión
3. Activa el modo de prueba (Test Mode)

### 2. Obtener las claves API
1. Ve a **Developers** → **API keys**
2. Copia la **Publishable key** (pk_test_...)
3. Copia la **Secret key** (sk_test_...)

### 3. Crear productos y precios
1. Ve a **Products** → **Add product**
2. Crea 3 productos:

#### Plan Básico
- Nombre: Plan Básico Zambik
- Precio: $4.99 USD
- Tipo: Recurring (Mensual)
- Copia el **Price ID** (price_...)

#### Plan Premium
- Nombre: Plan Premium Zambik
- Precio: $9.99 USD
- Tipo: Recurring (Mensual)
- Copia el **Price ID** (price_...)

#### Plan Familiar
- Nombre: Plan Familiar Zambik
- Precio: $14.99 USD
- Tipo: Recurring (Mensual)
- Copia el **Price ID** (price_...)

### 4. Configurar Webhook (Opcional pero recomendado)
1. Ve a **Developers** → **Webhooks**
2. Click en **Add endpoint**
3. URL: `http://tu-servidor.com/webhook`
4. Eventos a escuchar:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copia el **Signing secret** (whsec_...)

### 5. Configurar variables de entorno
1. Copia `.env.example` a `.env`
2. Completa con tus claves:

```env
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret

STRIPE_PRICE_BASIC=price_id_del_plan_basico
STRIPE_PRICE_PREMIUM=price_id_del_plan_premium
STRIPE_PRICE_FAMILY=price_id_del_plan_familiar

CLIENT_URL=http://localhost:8080
PORT=3000
```

### 6. Actualizar subscription.html
Abre `subscription.html` y reemplaza:
```javascript
const stripe = Stripe('pk_test_TU_CLAVE_PUBLICA_AQUI');
```
Con tu clave pública real.

### 7. Instalar dependencias
```bash
npm install
```

### 8. Iniciar el servidor
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

### 9. Probar pagos
1. Abre tu aplicación en el navegador
2. Selecciona un plan
3. Usa tarjetas de prueba de Stripe:
   - **Éxito**: 4242 4242 4242 4242
   - **Requiere autenticación**: 4000 0025 0000 3155
   - **Declinada**: 4000 0000 0000 9995
   - Fecha: Cualquier fecha futura
   - CVC: Cualquier 3 dígitos
   - ZIP: Cualquier 5 dígitos

## 📝 Notas importantes

### Seguridad
- ⚠️ **NUNCA** expongas tu Secret Key en el frontend
- ⚠️ Siempre usa HTTPS en producción
- ⚠️ Valida webhooks con el signing secret

### Producción
Cuando estés listo para producción:
1. Desactiva el modo de prueba en Stripe
2. Obtén las claves de producción (pk_live_... y sk_live_...)
3. Actualiza las variables de entorno
4. Configura el webhook con tu URL de producción

### Flujo de pago
1. Usuario selecciona plan → Frontend
2. Frontend llama a `/create-checkout-session` → Backend
3. Backend crea sesión con Stripe → Stripe API
4. Stripe devuelve sessionId → Backend → Frontend
5. Frontend redirige a Stripe Checkout
6. Usuario completa pago en Stripe
7. Stripe redirige a `success_url` con session_id
8. Frontend verifica pago y actualiza Firebase
9. Stripe envía webhook a backend (confirmación adicional)

## 🔧 Troubleshooting

### Error: "No such price"
- Verifica que los Price IDs en `.env` sean correctos
- Asegúrate de estar en el modo correcto (test/live)

### Error: "Invalid API Key"
- Verifica que la clave sea correcta
- Asegúrate de usar sk_test_ en el backend y pk_test_ en el frontend

### Webhook no funciona
- Usa ngrok para testing local: `ngrok http 3000`
- Actualiza la URL del webhook en Stripe con la URL de ngrok

## 📚 Recursos
- [Documentación de Stripe](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Testing en Stripe](https://stripe.com/docs/testing)
