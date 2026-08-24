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
| `playlist.html` | Tracklist de una playlist (`?id=XXX`) — canciones apiladas una debajo de otra, sin selector tipo grilla |
| `player.html` | Reproductor de audio (`?id=XXX` para un ítem suelto, o `?playlist=XXX&t=N` para una canción dentro de una playlist) — controles reales sobre `<audio>` |
| `perfil.html` | Perfil editable (nombre) |
| `config.html` | Configuración — borrar datos locales |
| `app.js` | TODO el JS (íconos, utils, mock-API, nav, init de cada página) |
| `mock-data.js` | Datos mock con la forma que tendrá la futura respuesta de WordPress |
| `styles.css` | TODO el CSS (design system, nav, componentes) |

## Modelo de datos (`mock-data.js` → `MOCK_DB`)

- **`moods`** (7 estados): `{ id, name, subtitle, cta, icon, grad }` — Calma, Energía, Foco, Flujo, Alegría, Relax, Superación.
- **`contentTypes`** (4 categorías de contenido): Playlists Emocionales, Cápsulas de Sonido, Audio Mensajes, Música Guiada.
- **`tracks`**: ítems de audio sueltos (cápsulas, audio mensajes, música guiada) — cada uno con `moodId` + `contentType` + `duration` + `desc` + `thumbnail` + `audioUrl`. Forma pensada para mapear 1:1 a un futuro artículo de WP (`title`/`thumbnail`/`short_description` a nivel lista, resto dentro de un `mobile_content`-equivalente a nivel detalle). Tocar un track lleva directo a `player.html?id=XXX`.
- **`playlists`**: varias canciones agrupadas (`{ id, moodId, title, desc, tracks: [{ title, duration, audioUrl }] }`). No son un ítem más del grid — tocar una playlist lleva a `playlist.html?id=XXX`, que muestra el tracklist completo apilado (una canción atrás de la otra, en el flujo normal de la página, no un carrusel/selector). Tocar una canción del tracklist lleva a `player.html?playlist=XXX&t=N`, donde la cola de reproducción (anterior/siguiente) recorre esa playlist en vez de las del mood.

La capa de "API" en `app.js` (`fetchMoodList`, `fetchTracksByMood`, `fetchTracksByType`, `fetchTrackById`, `fetchAllPlaylists`, `fetchPlaylistsByMood`, `fetchPlaylistById`) lee de `MOCK_DB` — son funciones `async` con la misma firma que tendrían pegándole a un endpoint real, para que el swap futuro sea interno a esas funciones.

## Sistema visual
Identidad basada en el objeto físico del disco/funda de vinilo (encaja con "primeros auxilios emocionales sonoros"): cada estado de ánimo tiene una tinta sólida (`mood.ink`) que tiñe su portada; los ítems sueltos se ven como un disco dentro de una funda (`.cover`), las playlists como una pila de fundas (`.cover--stack`). El reproductor (`player.html`) dibuja un vinilo real que gira mientras suena, con un brazo/aguja que se apoya al reproducir. Tipografía: `Fraunces` (display), `Work Sans` (cuerpo), `IBM Plex Mono` (duraciones, contadores, datos tipo "etiqueta de disco"). No usar imágenes de stock (picsum) para portadas — el arte de portada se dibuja en CSS a partir de `mood.ink` + `MOOD_ICONS`, no del campo `thumbnail` (que se mantiene en los datos sólo para el futuro swap a WordPress).

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
