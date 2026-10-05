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

El `index.html` de la raíz guarda las rutas del compilado, pero en desarrollo el
plugin `publishedRootIndex` de `vite.config.js` las sustituye por
`/src/index.js` al vuelo. No hay que editar nada a mano entre dev y build.

## Producción

```sh
npm run build
npm run preview
```

El **archivo que se publica es el `index.html` de la raíz**, y el compilado vive
en `dist/` con nombres fijos (sin hash) para que ese HTML siempre lo encuentre:

```
.
├── index.html              # <- archivo publicado en la raíz del sitio
└── dist/
    ├── index.html          # equivalente para deploys que usan dist/ como raíz
    └── assets/
        ├── index.js        # nombre fijo
        ├── index.css       # nombre fijo
        ├── img/…
        └── fonts/…
```

Las rutas internas del compilado son relativas (`base: './'`), así que el mismo
`dist/` funciona en la raíz de un dominio, en `https://usuario.github.io/repo/` o
en cualquier subcarpeta.

### Hosting sin compilación

`dist/` está versionado en git a propósito, ya que el destino de publicación
solo admite archivos estáticos y no compila. El flujo es:

1. `npm run build` (regenera `dist/` con los nombres fijos)
2. `git add dist && git commit` para subir el compilado
3. Publicar la raíz del proyecto completa (`index.html` + `dist/`)

> Si prefieres subir un único archivo, la alternativa es
> `vite-plugin-singlefile`, que mete el JS y el CSS dentro del `index.html`.

## Publicación en GitHub Pages

El workflow de GitHub Actions compila el proyecto con `npm run build` y publica
el contenido de `dist/` al hacer push a `master`. En la configuración del
repositorio, selecciona **Settings > Pages > Build and deployment > Source >
GitHub Actions** para usar este workflow.
