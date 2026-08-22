// MOCK_DB — datos de ejemplo con la misma forma que tendrá la futura API REST
// de WordPress (mobile_content-equivalente ya parseado como objeto plano).
// Cuando exista el endpoint real, sólo cambian las funciones fetch* en app.js —
// esta forma de datos (moods / contentTypes / tracks) se mantiene igual.

const MOCK_DB = {
  moods: [
    { id: 'calma',      name: 'Calma',      subtitle: 'Paz inmediata',      cta: 'INICIAR',  icon: 'leaf',     grad: 'linear-gradient(135deg,#22d3ee,#5b3df5)' },
    { id: 'energia',    name: 'Energía',    subtitle: 'Activa tu cuerpo',   cta: 'ELEVAR',   icon: 'bolt',     grad: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
    { id: 'foco',       name: 'Foco',       subtitle: 'Claridad mental',    cta: 'ENFOCAR',  icon: 'target',   grad: 'linear-gradient(135deg,#5b3df5,#8b5cf6)' },
    { id: 'flujo',      name: 'Flujo',      subtitle: 'Fluye sin esfuerzo', cta: 'FLUIR',    icon: 'infinity', grad: 'linear-gradient(135deg,#14b8a6,#22d3ee)' },
    { id: 'alegria',    name: 'Alegría',    subtitle: 'Sube tu ánimo',      cta: 'CELEBRAR', icon: 'sun',      grad: 'linear-gradient(135deg,#f472b6,#f59e0b)' },
    { id: 'relax',      name: 'Relax',      subtitle: 'Cero estrés',        cta: 'RELAJAR',  icon: 'moon',     grad: 'linear-gradient(135deg,#6366f1,#5b3df5)' },
    { id: 'superacion', name: 'Superación', subtitle: 'Fortaleza interior', cta: 'SUPERAR',  icon: 'mountain', grad: 'linear-gradient(135deg,#ef4444,#f59e0b)' },
  ],

  contentTypes: [
    { id: 'playlists', name: 'Playlists Emocionales' },
    { id: 'capsulas',  name: 'Cápsulas de Sonido' },
    { id: 'mensajes',  name: 'Audio Mensajes' },
    { id: 'guiada',    name: 'Música Guiada' },
  ],

  tracks: [
    { id: 'cal-1', title: 'Frecuencia de Calma Profunda', moodId: 'calma', contentType: 'guiada',    duration: 1500, desc: 'Un viaje sonoro de 25 minutos para bajar las revoluciones y volver al presente.' },
    { id: 'cal-2', title: 'Respiración Consciente',       moodId: 'calma', contentType: 'capsulas',  duration: 300,  desc: 'Una cápsula corta para resetear la respiración en cualquier momento del día.' },
    { id: 'cal-3', title: 'Playlist: Silencio Interior',  moodId: 'calma', contentType: 'playlists', duration: 2400, desc: 'Una selección de pistas suaves para acompañar momentos de introspección.' },

    { id: 'ene-1', title: 'Playlist: Activación Total',   moodId: 'energia', contentType: 'playlists', duration: 2100, desc: 'Ritmos que suben la energía antes de entrenar o encarar el día.' },
    { id: 'ene-2', title: 'Cápsula de Energía Rápida',    moodId: 'energia', contentType: 'capsulas',  duration: 240,  desc: 'Cuatro minutos para sacudirte el cansancio y arrancar con todo.' },
    { id: 'ene-3', title: 'Mensaje: Levántate y Brilla',  moodId: 'energia', contentType: 'mensajes',  duration: 180,  desc: 'Un audio mensaje corto para empezar la mañana con actitud.' },

    { id: 'foc-1', title: 'Concentración Profunda',       moodId: 'foco', contentType: 'guiada',    duration: 1800, desc: 'Sonido guiado para entrar en estado de foco sostenido.' },
    { id: 'foc-2', title: 'Playlist: Zona de Trabajo',    moodId: 'foco', contentType: 'playlists', duration: 2700, desc: 'Música instrumental pensada para trabajar sin distracciones.' },
    { id: 'foc-3', title: 'Cápsula Anti-Distracción',     moodId: 'foco', contentType: 'capsulas',  duration: 360,  desc: 'Una pausa corta para recuperar la atención cuando se dispersa.' },

    { id: 'flu-1', title: 'Fluye Sin Esfuerzo',           moodId: 'flujo', contentType: 'guiada',    duration: 1680, desc: 'Una guía sonora para soltar el control y dejarte llevar por la tarea.' },
    { id: 'flu-2', title: 'Playlist: Estado de Flow',     moodId: 'flujo', contentType: 'playlists', duration: 3000, desc: 'Una selección larga para sostener el estado de flujo creativo.' },
    { id: 'flu-3', title: 'Mensaje: Suelta el Control',   moodId: 'flujo', contentType: 'mensajes',  duration: 210,  desc: 'Un recordatorio corto para dejar de forzar y dejar que fluya.' },

    { id: 'ale-1', title: 'Playlist: Sube el Ánimo',      moodId: 'alegria', contentType: 'playlists', duration: 1920, desc: 'Canciones para recuperar la sonrisa en cualquier momento.' },
    { id: 'ale-2', title: 'Cápsula de Buen Humor',        moodId: 'alegria', contentType: 'capsulas',  duration: 270,  desc: 'Un empujón corto de buena onda para el momento que lo necesites.' },
    { id: 'ale-3', title: 'Mensaje: Celebra lo Simple',   moodId: 'alegria', contentType: 'mensajes',  duration: 165,  desc: 'Un mensaje breve para agradecer las cosas pequeñas del día.' },

    { id: 'rel-1', title: 'Relax Total',                  moodId: 'relax', contentType: 'guiada',    duration: 1500, desc: 'Sonido envolvente para soltar tensión de cuerpo y mente.' },
    { id: 'rel-2', title: 'Playlist: Cero Estrés',        moodId: 'relax', contentType: 'playlists', duration: 2280, desc: 'Música ambiental para bajar el estrés acumulado.' },
    { id: 'rel-3', title: 'Cápsula Antes de Dormir',      moodId: 'relax', contentType: 'capsulas',  duration: 480,  desc: 'Una cápsula pensada para preparar el cuerpo antes de dormir.' },

    { id: 'sup-1', title: 'Fortaleza Interior',           moodId: 'superacion', contentType: 'guiada',    duration: 1620, desc: 'Un audio guiado para conectar con tu fortaleza en momentos difíciles.' },
    { id: 'sup-2', title: 'Mensaje: Vos Podés',           moodId: 'superacion', contentType: 'mensajes',  duration: 195,  desc: 'Un mensaje corto de aliento para sostener el esfuerzo.' },
    { id: 'sup-3', title: 'Playlist: Supera Cualquier Reto', moodId: 'superacion', contentType: 'playlists', duration: 2520, desc: 'Música motivacional para acompañar procesos de superación.' },
  ],
};

// Completa cada track con los campos derivados que vendrían de la API real:
// thumbnail (foto stock), short_description, audioUrl (placeholder real) y template.
(function hydrateTracks() {
  const SOUNDHELIX_COUNT = 17;
  MOCK_DB.tracks.forEach((t, i) => {
    t.template = 'audio';
    t.short_description = t.desc.split('.')[0] + '.';
    t.thumbnail = `https://picsum.photos/seed/${t.moodId}-${i}/800/600`;
    t.audioUrl = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % SOUNDHELIX_COUNT) + 1}.mp3`;
  });
})();
