# MINDMUSIC — Contexto del proyecto

## Qué es
PWA de música asociada a estados de ánimo, para un club de Playtown (hermana de RETOFIT, mismo patrón de arquitectura). El usuario elige un estado de ánimo puntual tocando una tarjeta (sin texto libre ni IA), navega por categorías de contenido y reproduce audio en un player dedicado. Sin registro ni login — experiencia directa.

## Stack
- **Multi-página estática**: sin build tools, sin framework.
- **CSS compartido**: `styles.css`.
- **JS compartido**: `app.js` (íconos, utils, estado, capa de datos, init de páginas).
- **Datos**: hoy **mock local** (`mock-data.js`). WordPress todavía no existe para este proyecto — cuando se cree (mismo patrón que Retofit: REST API con `mobile_content` como JSON string), sólo cambia el cuerpo de las funciones `fetch*` en `app.js`; las páginas que las llaman no cambian.
- **Audio**: real desde el día uno. Los `audioUrl` de `mock-data.js` apuntan a pistas de demo públicas (SoundHelix), pensadas específicamente para testear `<audio>`. Cuando haya canciones propias alojadas en WordPress, sólo se reemplaza esa URL.
- **Estado local**: `localStorage` (perfil — sin auth, sin streak/stats).

## Archivos del proyecto

| Archivo | Rol |
|---|---|
| `index.html` | Home: 4 estados destacados + tabs de contenido + grid recomendado |
| `explorar.html` | Catálogo completo de los 7 estados de ánimo (banners con foto) |
| `mood.html` | Contenido asociado a un estado (`?id=XXX`) |
| `player.html` | Reproductor de audio (`?id=XXX`) — controles reales sobre `<audio>` |
| `perfil.html` | Perfil editable (nombre) |
| `config.html` | Configuración — borrar datos locales |
| `app.js` | TODO el JS (íconos, utils, mock-API, nav, init de cada página) |
| `mock-data.js` | Datos mock con la forma que tendrá la futura respuesta de WordPress |
| `styles.css` | TODO el CSS (design system, nav, componentes) |

## Modelo de datos (`mock-data.js` → `MOCK_DB`)

- **`moods`** (7 estados): `{ id, name, subtitle, cta, icon, grad }` — Calma, Energía, Foco, Flujo, Alegría, Relax, Superación.
- **`contentTypes`** (4 categorías de contenido): Playlists Emocionales, Cápsulas de Sonido, Audio Mensajes, Música Guiada.
- **`tracks`**: ítems de audio, cada uno con `moodId` + `contentType` + `duration` + `desc` + `thumbnail` + `audioUrl`. Forma pensada para mapear 1:1 a un futuro artículo de WP (`title`/`thumbnail`/`short_description` a nivel lista, resto dentro de un `mobile_content`-equivalente a nivel detalle).

La capa de "API" en `app.js` (`fetchMoodList`, `fetchTracksByMood`, `fetchTracksByType`, `fetchTrackById`) lee de `MOCK_DB` — son funciones `async` con la misma firma que tendrían pegándole a un endpoint real, para que el swap futuro sea interno a esas funciones.

## localStorage keys
- `mm_profile` — `{ name }`

## Navegación entre páginas
- Nav bottom (mobile) / sidebar (desktop) en `index.html`, `explorar.html`, `perfil.html`, `config.html`.
- `mood.html` y `player.html` son pantallas de detalle (sin nav, con "← Volver" → `history.back()`), mismo criterio que `article.html`/`challenge.html` de Retofit.
- Estado tocado → `mood.html?id=XXX` → track tocado → `player.html?id=XXX`.
- El nav activo se resuelve en `initNav()` (app.js) según `location.pathname`.

## Convenciones
- No usar frameworks, no agregar build steps.
- CSS custom properties en `:root` (`--bg`, `--violet`, `--cyan`, `--card`, etc.), dark UI, radios grandes (`--rl: 24px`).
- Íconos de estado en `MOOD_ICONS` (app.js, SVG inline) — no tocar sin necesidad.
- El `app.js` detecta en qué página está por la presencia de IDs únicos en el DOM (`home-container`, `explorar-container`, `mood-container`, `player-container`, `perfil-container`, `config-container`).
- Skeletons/spinner mientras se "fetchea" el mock. Sin fallback a datos estáticos embebidos en el HTML.
- Buscadores (home y explorar) filtran en el cliente sobre los datos ya cargados en memoria — no hay backend de búsqueda.
