# Zambik Streaming

## Overview
Zambik es una plataforma de streaming de peliculas y series. La aplicacion permite a los usuarios ver trailers, reproducir peliculas completas, y gestionar su experiencia de visualizacion.

## Project Structure
- `index.html` - Pagina principal de bienvenida
- `landing.html` - Pagina de planes y suscripciones
- `login.html` - Pagina de autenticacion (Firebase)
- `app.html` - Aplicacion principal con el catalogo y reproductor de video
- `subscription.html` - Pagina de suscripcion
- `profile-setup.html` - Configuracion de perfil
- `trial-offer.html` - Oferta de prueba gratuita
- `server.py` - Servidor Python para servir archivos estaticos

## Technologies
- HTML5/CSS3/JavaScript (Frontend)
- Firebase Auth y Realtime Database (Backend)
- Python http.server (Static file server)
- Dropbox (Video hosting)

## Recent Changes
- 2025-11-27: Corregido bug critico de reproduccion de video
  - El reproductor ahora limpia correctamente los elementos source anteriores antes de agregar nuevos
  - Esto previene que se reproduzca siempre el mismo video independientemente de la seleccion del usuario
  - Funciones corregidas: playMainContent, playZambikIntro, closeVideoPlayer

## Running the Application
El servidor se ejecuta automaticamente en el puerto 5000:
```
python server.py
```

## User Preferences
(No preferences recorded yet)

## Architecture Notes
- La app es principalmente frontend con Firebase como backend
- Los videos se alojan en Dropbox con URLs de descarga directa
- El reproductor incluye un intro de Zambik antes de cada video
- Soporte para subtitulos en multiples idiomas
- Sistema de control parental y configuracion de usuario
