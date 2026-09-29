# Alucarth.github.io

Portfolio construido con Vue 3 y Vite.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`
- npm

## Desarrollo

```sh
npm install
npm run dev
```

## Producción

```sh
npm run build
npm run preview
```

Las imágenes del proyecto se incluyen desde `img/` durante la compilación con
nombres versionados en `dist/`.

## Publicación en GitHub Pages

El workflow de GitHub Actions compila el proyecto con `npm run build` y publica
el contenido de `dist/` al hacer push a `master`. En la configuración del
repositorio, selecciona **Settings > Pages > Build and deployment > Source >
GitHub Actions** para usar este workflow.
