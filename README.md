# Descripcción del proyecto
Este es un pequeño proyecto de Next.js que tiene como funcion principal ejemplificar el consumo de un API con esta tecnología, mediante el manejo de "publicaciones".

## Instrucciones de instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Crea un archivo .env en la raíz del proyecto y define las variables de entorno:
   ```env
   NEXT_PUBLIC_API_URL=https://api.example.com
   ```
   
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre la aplicación en tu navegador en `http://localhost:3000`.

## Comandos disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión de producción del proyecto.
- `npm start`: Inicia el servidor en modo producción (requiere haber ejecutado previamente `npm run build`).

## Decisiones técnicas tomadas

- Se empleó Axios para las solicitudes HTTP por su simplicidad y soporte para promesas.

## Mejoras

- Se añadio un boton para la eliminación de los post.
