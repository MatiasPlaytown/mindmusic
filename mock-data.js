// MOCK_DB — datos de ejemplo con la misma forma que tendrá la futura API REST
// de WordPress (mobile_content-equivalente ya parseado como objeto plano).
// Cuando exista el endpoint real, sólo cambian las funciones fetch* en app.js —
// esta forma de datos (moods / contentTypes / tracks / playlists) se mantiene igual.

const MOCK_DB = {
  // `photo` = paisaje real (Unsplash) asociado al estado, usado como ambientación
  // de pantalla completa (hero, fondo de detalle) — no reemplaza el sistema de
  // disco/funda de las portadas de contenido, que sigue dibujándose en CSS.
  moods: [
    { id: 'calma',      name: 'Calma',      subtitle: 'Paz inmediata',      cta: 'INICIAR',  icon: 'leaf',     ink: '#4FB8C4', grad: 'linear-gradient(135deg,#5FCBD6,#2E7D8C)', photo: 'https://images.unsplash.com/photo-1580920824014-54845d91a8ad' },
    { id: 'energia',    name: 'Energía',    subtitle: 'Activa tu cuerpo',   cta: 'ELEVAR',   icon: 'bolt',     ink: '#E2703A', grad: 'linear-gradient(135deg,#F0924F,#C6491F)', photo: 'https://images.unsplash.com/photo-1489493512598-d08130f49bea' },
    { id: 'foco',       name: 'Foco',       subtitle: 'Claridad mental',    cta: 'ENFOCAR',  icon: 'target',   ink: '#8C6BD6', grad: 'linear-gradient(135deg,#A088E3,#5B3DA8)', photo: 'https://images.unsplash.com/photo-1744040982238-867d6a3f907f' },
    { id: 'flujo',      name: 'Flujo',      subtitle: 'Fluye sin esfuerzo', cta: 'FLUIR',    icon: 'infinity', ink: '#33A893', grad: 'linear-gradient(135deg,#4DBFA8,#1F7A69)', photo: 'https://images.unsplash.com/photo-1660613964716-12b8a0223e9a' },
    { id: 'alegria',    name: 'Alegría',    subtitle: 'Sube tu ánimo',      cta: 'CELEBRAR', icon: 'sun',      ink: '#E8AB3E', grad: 'linear-gradient(135deg,#F3C15E,#D98A22)', photo: 'https://images.unsplash.com/photo-1558306961-3e9e4ae532f6' },
    { id: 'relax',      name: 'Relax',      subtitle: 'Cero estrés',        cta: 'RELAJAR',  icon: 'moon',     ink: '#6F7FD1', grad: 'linear-gradient(135deg,#8B98E0,#4A56A8)', photo: 'https://images.unsplash.com/photo-1477840539360-4a1d23071046' },
    { id: 'superacion', name: 'Superación', subtitle: 'Fortaleza interior', cta: 'SUPERAR',  icon: 'mountain', ink: '#D1553C', grad: 'linear-gradient(135deg,#E17454,#A83A24)', photo: 'https://images.unsplash.com/photo-1550952953-b21b952780e1' },
  ],

  // Hoy todo el catálogo son playlists. Las otras categorías (cápsulas, audio
  // mensajes, música guiada) siguen previstas en el modelo pero no tienen
  // contenido grabado todavía — cuando exista, se vuelven a agregar acá.
  contentTypes: [
    { id: 'playlists', name: 'Playlists Emocionales' },
  ],

  // Ítems individuales (no playlists): cápsulas, audio mensajes, música guiada.
  // Vacío hasta que haya audio real de esas categorías; la capa fetch* y el
  // player siguen soportando el caso (`player.html?id=XXX`).
  tracks: [],

  // Playlists: varias canciones agrupadas una atrás de otra (tracklist), no ítems sueltos.
  // Cada una tiene su propia `photo` de portada: del mismo clima que la del
  // estado (`mood.photo`) pero nunca la misma imagen — el estado y su playlist
  // no se pueden ver como la misma cosa.
  // Los `audioUrl` son archivos propios servidos desde `audio/<mood>/` (mismo
  // origen que la app). Los estados sin melodías propias reusan el repertorio de
  // un estado afín: calma y flujo toman las de foco, energía las de superación.
  playlists: [
    {
      id: 'cal-pl', moodId: 'calma', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1634023233766-0c16b151bfb0', // lago con niebla
      title: 'Silencio Interior',
      desc: 'Una selección de pistas suaves para acompañar momentos de introspección.',
      tracks: [
        { title: 'Infinite Stillness', duration: 166, audioUrl: 'audio/foco/infinite-stillness.m4a' },
        { title: 'Warm Cycle',         duration: 159, audioUrl: 'audio/foco/warm-cycle.m4a' },
        { title: 'Deep Stillness',     duration: 178, audioUrl: 'audio/foco/deep-stillness.m4a' },
        { title: 'Still Life',         duration: 179, audioUrl: 'audio/foco/still-life.m4a' },
        { title: 'Warm Currents',      duration: 171, audioUrl: 'audio/foco/warm-currents.m4a' },
      ],
    },
    {
      id: 'ene-pl', moodId: 'energia', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1643724763266-a34c85397d1d', // ruta al amanecer
      title: 'Activación Total',
      desc: 'Ritmos que suben la energía antes de entrenar o encarar el día.',
      tracks: [
        { title: 'Steady Stride',    duration: 173, audioUrl: 'audio/superacion/steady-stride.m4a' },
        { title: 'Grand Ascent',     duration: 173, audioUrl: 'audio/superacion/grand-ascent.m4a' },
        { title: 'The Ascent II',    duration: 175, audioUrl: 'audio/superacion/the-ascent-ii.m4a' },
        { title: 'The Final Ascent', duration: 172, audioUrl: 'audio/superacion/the-final-ascent.m4a' },
        { title: 'The Ascent',       duration: 172, audioUrl: 'audio/superacion/the-ascent.m4a' },
      ],
    },
    {
      id: 'foc-pl', moodId: 'foco', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1583606638441-b9c746100447', // pinar en la bruma
      title: 'Zona de Trabajo',
      desc: 'Música instrumental pensada para trabajar sin distracciones.',
      tracks: [
        { title: 'Deep Stillness',     duration: 178, audioUrl: 'audio/foco/deep-stillness.m4a' },
        { title: 'Infinite Stillness', duration: 166, audioUrl: 'audio/foco/infinite-stillness.m4a' },
        { title: 'Still Life',         duration: 179, audioUrl: 'audio/foco/still-life.m4a' },
        { title: 'Warm Currents',      duration: 171, audioUrl: 'audio/foco/warm-currents.m4a' },
        { title: 'Warm Cycle',         duration: 159, audioUrl: 'audio/foco/warm-cycle.m4a' },
      ],
    },
    {
      id: 'flu-pl', moodId: 'flujo', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1504202252096-09abfa127db7', // agua corriendo entre piedras
      title: 'Estado de Flow',
      desc: 'Una selección larga para sostener el estado de flujo creativo.',
      tracks: [
        { title: 'Warm Currents',      duration: 171, audioUrl: 'audio/foco/warm-currents.m4a' },
        { title: 'Still Life',         duration: 179, audioUrl: 'audio/foco/still-life.m4a' },
        { title: 'Warm Cycle',         duration: 159, audioUrl: 'audio/foco/warm-cycle.m4a' },
        { title: 'Infinite Stillness', duration: 166, audioUrl: 'audio/foco/infinite-stillness.m4a' },
        { title: 'Deep Stillness',     duration: 178, audioUrl: 'audio/foco/deep-stillness.m4a' },
      ],
    },
    {
      id: 'ale-pl', moodId: 'alegria', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1475656106224-d72c2ab53e8d', // pasto a contraluz
      title: 'Sube el Ánimo',
      desc: 'Canciones para recuperar la sonrisa en cualquier momento.',
      tracks: [
        { title: 'Morning Light',  duration: 173, audioUrl: 'audio/alegria/morning-light.m4a' },
        { title: 'Morning Stride', duration: 173, audioUrl: 'audio/alegria/morning-stride.m4a' },
        { title: 'High Spirits',   duration: 155, audioUrl: 'audio/alegria/high-spirits.m4a' },
        { title: 'Island Hop',     duration: 175, audioUrl: 'audio/alegria/island-hop.m4a' },
        { title: 'Summer Sway',    duration: 182, audioUrl: 'audio/alegria/summer-sway.m4a' },
        { title: 'Clear Ascent',   duration: 176, audioUrl: 'audio/alegria/clear-ascent.m4a' },
      ],
    },
    {
      id: 'rel-pl', moodId: 'relax', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1507502707541-f369a3b18502', // luna entre nubes
      title: 'Cero Estrés',
      desc: 'Música ambiental para bajar el estrés acumulado.',
      tracks: [
        { title: 'Afloat',             duration: 119, audioUrl: 'audio/relax/afloat.m4a' },
        { title: 'Weightless',         duration: 181, audioUrl: 'audio/relax/weightless.m4a' },
        { title: 'Deep Resonance',     duration: 168, audioUrl: 'audio/relax/deep-resonance.m4a' },
        { title: 'Deep Stillness',     duration: 162, audioUrl: 'audio/relax/deep-stillness.m4a' },
        { title: 'Deepening Solitude', duration: 174, audioUrl: 'audio/relax/deepening-solitude.m4a' },
      ],
    },
    {
      id: 'sup-pl', moodId: 'superacion', contentType: 'playlists',
      photo: 'https://images.unsplash.com/photo-1760363958141-82cc82c2f46c', // cordón de montaña en ascenso
      title: 'Supera Cualquier Reto',
      desc: 'Música motivacional para acompañar procesos de superación.',
      tracks: [
        { title: 'The Ascent',       duration: 172, audioUrl: 'audio/superacion/the-ascent.m4a' },
        { title: 'Steady Stride',    duration: 173, audioUrl: 'audio/superacion/steady-stride.m4a' },
        { title: 'The Ascent II',    duration: 175, audioUrl: 'audio/superacion/the-ascent-ii.m4a' },
        { title: 'Grand Ascent',     duration: 173, audioUrl: 'audio/superacion/grand-ascent.m4a' },
        { title: 'The Final Ascent', duration: 172, audioUrl: 'audio/superacion/the-final-ascent.m4a' },
      ],
    },
  ],
};

// Completa cada ítem con los campos derivados que vendrían de la API real:
// thumbnail (foto stock, hoy sin uso visual — la portada se dibuja en CSS a partir
// del mood), short_description y template. Los `audioUrl` ya vienen declarados
// arriba: son archivos propios, no placeholders.
(function hydrateContent() {
  MOCK_DB.tracks.forEach((t, i) => {
    t.template = 'audio';
    t.short_description = t.desc.split('.')[0] + '.';
    t.thumbnail = `https://picsum.photos/seed/${t.moodId}-${i}/800/600`;
  });

  MOCK_DB.playlists.forEach((p, i) => {
    p.template = 'playlist';
    p.short_description = p.desc.split('.')[0] + '.';
    p.thumbnail = `https://picsum.photos/seed/pl-${p.moodId}-${i}/800/600`;
    p.tracks.forEach((song, si) => {
      song.id = `${p.id}-${si}`;
    });
  });
})();
