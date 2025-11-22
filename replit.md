# IBTV - Plataforma de Streaming

## Descripción del Proyecto
IBTV es una aplicación de streaming completa con autenticación de usuarios, gestión de suscripciones, configuración de perfiles y reproductor de video personalizado.

## Estructura del Proyecto

### Páginas HTML
1. **login.html** - Página de bienvenida con información de planes
2. **auth.html** - Autenticación (inicio de sesión y registro)
3. **subscription.html** - Selección de plan de suscripción
4. **profile-setup.html** - Configuración de perfil de usuario
5. **index.html** - Plataforma principal de streaming (5731 líneas)

### Flujo de Navegación
```
login.html → auth.html → subscription.html → profile-setup.html → index.html
```

## Tecnologías Utilizadas

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Font Awesome 6.5.1 (iconos)
- Google Translate API (traducción)

### Backend/Base de Datos
- Firebase Authentication (autenticación de usuarios)
- Firebase Realtime Database (almacenamiento de datos)
- Configuración de Firebase: Proyecto "clack-koder"

### Servidor
- Python HTTP Server en puerto 5000

## Características Principales

### Autenticación y Usuarios
- Registro de nuevos usuarios
- Inicio de sesión con email/contraseña
- Recuperación de contraseña
- Gestión de sesiones con Firebase Auth
- Verificación de estado de suscripción

### Sistema de Suscripciones
Tres planes disponibles:
- **Básico** ($4.99/mes): HD, 1 dispositivo, descargas
- **Premium** ($9.99/mes): 4K, 4 dispositivos, sin anuncios, contenido exclusivo
- **Familiar** ($14.99/mes): 4K, 6 dispositivos, perfiles familiares, control parental

### Perfiles de Usuario
- Creación de perfil personalizado
- 12 opciones de avatar (iconos con gradientes)
- Nombre de perfil personalizable
- Preferencias de idioma y reproducción

### Reproductor de Video
- Reproductor personalizado con controles nativos
- Soporte para múltiples pistas de audio
- Subtítulos en varios idiomas (español, inglés, portugués)
- Modo landscape automático en móviles
- Bloqueo de pantalla durante reproducción
- Sistema de descarga de contenido
- Indicadores EN VIVO para transmisiones
- Controles táctiles optimizados

### Catálogo de Contenido
Series y películas incluidas:
- NO TE MUEVAS (Terror/Thriller)
- EL ESPEJO DE ADENTRO (Drama/Romance)
- DON'T LOOK AWAY (Terror/Thriller)
- THE CANDLE MAN (Terror/Cortometraje)

### Funciones Adicionales
- Sistema de búsqueda de contenido
- Sección VIP con usuarios destacados
- Sistema de seguimiento de usuarios
- Ajustes personalizables (calidad, idioma, subtítulos)
- Notificaciones
- Control parental
- Sistema de traducción (español/inglés)

## Configuración de Firebase

**IMPORTANTE**: Las credenciales de Firebase están configuradas directamente en cada archivo HTML.

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCFQ_geG0HIv2EZ-bfKc97TJNtf2sdqPzc",
  authDomain: "clack-koder.firebaseapp.com",
  databaseURL: "https://clack-koder-default-rtdb.firebaseio.com",
  projectId: "clack-koder",
  storageBucket: "clack-koder.firebasestorage.app",
  messagingSenderId: "478151254938",
  appId: "1:478151254938:web:e2c00e3a5426bd192b9023",
  measurementId: "G-P29ME5Z3S1"
};
```

Las credenciales están configuradas en todos los archivos: `index.html`, `auth.html`, `subscription.html`, `profile-setup.html`.

## Estructura de Datos en Firebase

### Usuarios (`users/{userId}`)
```json
{
  "name": "string",
  "email": "string",
  "createdAt": "timestamp",
  "subscription": {
    "plan": "basic|premium|family",
    "name": "string",
    "price": "string",
    "startDate": "timestamp",
    "status": "active|inactive",
    "features": {}
  },
  "profile": {
    "name": "string",
    "avatar": {
      "index": "number",
      "data": {
        "type": "icon",
        "icon": "string",
        "gradient": "string"
      }
    },
    "createdAt": "timestamp",
    "preferences": {
      "language": "es|en",
      "autoplay": "boolean",
      "notifications": "boolean"
    }
  },
  "exclusive": "boolean (opcional)"
}
```

### Usuarios VIP (`vip_users/{userId}`)
```json
{
  "isVip": "boolean",
  "markedAt": "timestamp",
  "markedBy": "userId",
  "followers": "number",
  "followers_list": {
    "{followerId}": {
      "followedAt": "timestamp",
      "followerName": "string"
    }
  }
}
```

## Optimizaciones Móviles

- Viewport optimizado para dispositivos móviles
- Soporte para pantalla completa en iOS Safari
- Modo landscape automático para reproducción de video
- Controles táctiles optimizados
- Prevención de zoom no deseado
- Compatibilidad con Android y iOS

## Cómo Ejecutar el Proyecto

1. El servidor HTTP se ejecuta automáticamente en el puerto 5000
2. Abre la aplicación en el navegador
3. Comienza en `login.html` para ver la página de bienvenida
4. Navega a través del flujo de autenticación
5. Disfruta del contenido después de completar el registro

## Notas Importantes

- Todos los archivos HTML tienen Firebase SDK integrado
- El flujo de navegación es secuencial y validado
- La autenticación es obligatoria para acceder al contenido
- El servidor debe estar en el puerto 5000 para que funcione el webview
- Los videos están alojados en Dropbox

## Estado Actual

- ✅ Firebase SDK instalado en todas las páginas
- ✅ Flujo de autenticación completo
- ✅ Sistema de suscripciones implementado
- ✅ Reproductor de video funcional
- ✅ Servidor HTTP configurado en puerto 5000
- ✅ Navegación entre páginas operativa

## Cambios Recientes

**22 de noviembre de 2025**
- ✅ Eliminados atributos de integridad incorrectos de scripts Firebase que bloqueaban la carga
- ✅ Actualizadas credenciales de Firebase con valores reales del proyecto
- ✅ Corregida inicialización de la aplicación (initializeIBTVApp) para habilitar navegación
- ✅ Arreglado sistema de navegación entre secciones (Home, Search, VIP, Settings)
- ✅ Removido atributo `muted` del trailer para habilitar reproducción con audio
- ✅ Eliminados archivos innecesarios (security-config.js, setup-security.sh)
- ✅ Verificado funcionamiento completo del reproductor de video
- ✅ Confirmado funcionamiento de búsqueda y todas las funcionalidades

**21 de noviembre de 2025**
- Agregado Firebase SDK a index.html
- Configurado workflow de servidor HTTP en puerto 5000
- Verificada navegación entre todas las páginas
- Creada documentación del proyecto
