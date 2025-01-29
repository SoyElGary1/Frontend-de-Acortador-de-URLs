# Frontend de Acortador de URLs

Una aplicación frontend moderna en React para acortar URLs, con funciones avanzadas para gestionar y buscar URLs acortadas.

## Características

- **Acortamiento de URLs**
  - Crea URLs cortas a partir de URLs largas
  - Copia códigos cortos o URLs de redirección completas
  - Visualiza URLs originales y acortadas
  - Validación en tiempo real

- **Gestión de URLs**
  - Edita URLs acortadas existentes
  - Elimina URLs acortadas
  - Consulta estadísticas de las URLs (cantidad de accesos, fecha de creación)
  - Persistencia en almacenamiento local

- **Capacidades de búsqueda**
  - Busca entre tus URLs acortadas
  - Encuentra cualquier URL acortada en el sistema
  - Resultados de búsqueda en tiempo real
  - Búsqueda por código corto o URL original

- **Interfaz de usuario**
  - Diseño moderno y responsive
  - Funcionalidad para copiar al portapapeles
  - Retroalimentación visual para acciones
  - Estados de carga y manejo de errores
  - Función de reinicio para limpiar todos los datos

## Stack Tecnológico

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (para íconos)
- Vite (herramienta de compilación)

## Integración con la API

El frontend se integra con los siguientes endpoints de la API:

- `POST /shorten` - Crea una nueva URL acortada
- `GET /shorten/{shortUrl}` - Obtiene detalles de una URL y permite buscar
- `GET /shorten/{shortUrl}/stats` - Obtiene estadísticas de la URL
- `PUT /shorten/{shortUrl}` - Actualiza una URL
- `DELETE /shorten/{shortUrl}` - Elimina una URL

## Primeros Pasos

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```  
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```  
4. Abre tu navegador y ve a `http://localhost:5173`

## Configuración del Entorno

La aplicación espera que la API backend esté ejecutándose en `http://localhost:8080`. La URL base para redirecciones está configurada como `http://localhost:8080/redirect/`.

## Estructura del Proyecto

- `src/types.ts` - Interfaces TypeScript para las solicitudes y respuestas de la API
- `src/api.ts` - Funciones de integración con la API
- `src/App.tsx` - Componente principal de la aplicación
- `src/index.css` - Estilos globales e importaciones de Tailwind CSS

## Uso

1. **Acortar URLs**
   - Ingresa una URL en el campo de entrada
   - Haz clic en "Acortar URL"
   - Copia el código corto o la URL completa de redirección

2. **Gestión de URLs**
   - Consulta todas tus URLs acortadas
   - Edita URLs con el botón de edición
   - Elimina URLs con el botón de eliminación
   - Consulta estadísticas con el botón de estadísticas

3. **Búsqueda de URLs**
   - Usa la barra de búsqueda para encontrar URLs
   - La búsqueda funciona con códigos cortos y URLs originales
   - Visualiza detalles de cualquier URL acortada en el sistema

4. **Restablecer datos**
   - Haz clic en el botón "Restablecer Todo" para borrar todas las URLs almacenadas
   - Se requerirá confirmación antes de la eliminación

## Construcción para Producción

Para crear una compilación de producción:

```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist`.

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva funcionalidad'`)
4. Envía los cambios a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request
