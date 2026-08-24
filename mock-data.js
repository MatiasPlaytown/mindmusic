// MOCK_DB — datos de ejemplo con la misma forma que tendrá la futura API REST
// de WordPress (mobile_content-equivalente ya parseado como objeto plano).
// Cuando exista el endpoint real, sólo cambian las funciones fetch* en app.js —
// esta forma de datos (moods / contentTypes / tracks / playlists) se mantiene igual.

const MOCK_DB = {
  moods: [
    { id: 'calma',      name: 'Calma',      subtitle: 'Paz inmediata',      cta: 'INICIAR',  icon: 'leaf',     ink: '#4FB8C4', grad: 'linear-gradient(135deg,#5FCBD6,#2E7D8C)' },
    { id: 'energia',    name: 'Energía',    subtitle: 'Activa tu cuerpo',   cta: 'ELEVAR',   icon: 'bolt',     ink: '#E2703A', grad: 'linear-gradient(135deg,#F0924F,#C6491F)' },
    { id: 'foco',       name: 'Foco',       subtitle: 'Claridad mental',    cta: 'ENFOCAR',  icon: 'target',   ink: '#8C6BD6', grad: 'linear-gradient(135deg,#A088E3,#5B3DA8)' },
    { id: 'flujo',      name: 'Flujo',      subtitle: 'Fluye sin esfuerzo', cta: 'FLUIR',    icon: 'infinity', ink: '#33A893', grad: 'linear-gradient(135deg,#4DBFA8,#1F7A69)' },
    { id: 'alegria',    name: 'Alegría',    subtitle: 'Sube tu ánimo',      cta: 'CELEBRAR', icon: 'sun',      ink: '#E8AB3E', grad: 'linear-gradient(135deg,#F3C15E,#D98A22)' },
    { id: 'relax',      name: 'Relax',      subtitle: 'Cero estrés',        cta: 'RELAJAR',  icon: 'moon',     ink: '#6F7FD1', grad: 'linear-gradient(135deg,#8B98E0,#4A56A8)' },
    { id: 'superacion', name: 'Superación', subtitle: 'Fortaleza interior', cta: 'SUPERAR',  icon: 'mountain', ink: '#D1553C', grad: 'linear-gradient(135deg,#E17454,#A83A24)' },
  ],

  contentTypes: [
    { id: 'playlists', name: 'Playlists Emocionales' },
    { id: 'capsulas',  name: 'Cápsulas de Sonido' },
    { id: 'mensajes',  name: 'Audio Mensajes' },
    { id: 'guiada',    name: 'Música Guiada' },
  ],

  // Ítems individuales (no playlists): cápsulas, audio mensajes, música guiada.
  tracks: [
    { id: 'cal-1', title: 'Frecuencia de Calma Profunda', moodId: 'calma', contentType: 'guiada',    duration: 1500, desc: 'Un viaje sonoro de 25 minutos para bajar las revoluciones y volver al presente.' },
    { id: 'cal-2', title: 'Respiración Consciente',       moodId: 'calma', contentType: 'capsulas',  duration: 300,  desc: 'Una cápsula corta para resetear la respiración en cualquier momento del día.' },

    { id: 'ene-2', title: 'Cápsula de Energía Rápida',    moodId: 'energia', contentType: 'capsulas',  duration: 240,  desc: 'Cuatro minutos para sacudirte el cansancio y arrancar con todo.' },
    { id: 'ene-3', title: 'Mensaje: Levántate y Brilla',  moodId: 'energia', contentType: 'mensajes',  duration: 180,  desc: 'Un audio mensaje corto para empezar la mañana con actitud.' },

    { id: 'foc-1', title: 'Concentración Profunda',       moodId: 'foco', contentType: 'guiada',    duration: 1800, desc: 'Sonido guiado para entrar en estado de foco sostenido.' },
    { id: 'foc-3', title: 'Cápsula Anti-Distracción',     moodId: 'foco', contentType: 'capsulas',  duration: 360,  desc: 'Una pausa corta para recuperar la atención cuando se dispersa.' },

    { id: 'flu-1', title: 'Fluye Sin Esfuerzo',           moodId: 'flujo', contentType: 'guiada',    duration: 1680, desc: 'Una guía sonora para soltar el control y dejarte llevar por la tarea.' },
    { id: 'flu-3', title: 'Mensaje: Suelta el Control',   moodId: 'flujo', contentType: 'mensajes',  duration: 210,  desc: 'Un recordatorio corto para dejar de forzar y dejar que fluya.' },

    { id: 'ale-2', title: 'Cápsula de Buen Humor',        moodId: 'alegria', contentType: 'capsulas',  duration: 270,  desc: 'Un empujón corto de buena onda para el momento que lo necesites.' },
    { id: 'ale-3', title: 'Mensaje: Celebra lo Simple',   moodId: 'alegria', contentType: 'mensajes',  duration: 165,  desc: 'Un mensaje breve para agradecer las cosas pequeñas del día.' },

    { id: 'rel-1', title: 'Relax Total',                  moodId: 'relax', contentType: 'guiada',    duration: 1500, desc: 'Sonido envolvente para soltar tensión de cuerpo y mente.' },
    { id: 'rel-3', title: 'Cápsula Antes de Dormir',      moodId: 'relax', contentType: 'capsulas',  duration: 480,  desc: 'Una cápsula pensada para preparar el cuerpo antes de dormir.' },

    { id: 'sup-1', title: 'Fortaleza Interior',           moodId: 'superacion', contentType: 'guiada',    duration: 1620, desc: 'Un audio guiado para conectar con tu fortaleza en momentos difíciles.' },
    { id: 'sup-2', title: 'Mensaje: Vos Podés',           moodId: 'superacion', contentType: 'mensajes',  duration: 195,  desc: 'Un mensaje corto de aliento para sostener el esfuerzo.' },
  ],

  // Playlists: varias canciones agrupadas una atrás de otra (tracklist), no ítems sueltos.
  playlists: [
    {
      id: 'cal-pl', moodId: 'calma', contentType: 'playlists',
      title: 'Silencio Interior',
      desc: 'Una selección de pistas suaves para acompañar momentos de introspección.',
      tracks: [
        { title: 'Marea Baja',        duration: 250 },
        { title: 'Respiro Largo',     duration: 225 },
        { title: 'Cuarto Vacío',      duration: 302 },
        { title: 'Piel de Agua',      duration: 270 },
        { title: 'Últimas Luces',     duration: 375 },
      ],
    },
    {
      id: 'ene-pl', moodId: 'energia', contentType: 'playlists',
      title: 'Activación Total',
      desc: 'Ritmos que suben la energía antes de entrenar o encarar el día.',
      tracks: [
        { title: 'Primer Impulso',    duration: 200 },
        { title: 'Motor Encendido',   duration: 235 },
        { title: 'Subida',            duration: 245 },
        { title: 'Pulso Alto',        duration: 220 },
        { title: 'Sin Freno',         duration: 260 },
      ],
    },
    {
      id: 'foc-pl', moodId: 'foco', contentType: 'playlists',
      title: 'Zona de Trabajo',
      desc: 'Música instrumental pensada para trabajar sin distracciones.',
      tracks: [
        { title: 'Línea Recta',       duration: 285 },
        { title: 'Mesa Limpia',       duration: 310 },
        { title: 'Un Solo Punto',     duration: 295 },
        { title: 'Ruido Fuera',       duration: 230 },
        { title: 'Cierre de Foco',    duration: 330 },
      ],
    },
    {
      id: 'flu-pl', moodId: 'flujo', contentType: 'playlists',
      title: 'Estado de Flow',
      desc: 'Una selección larga para sostener el estado de flujo creativo.',
      tracks: [
        { title: 'Corriente',         duration: 300 },
        { title: 'Sin Fricción',      duration: 280 },
        { title: 'Deja Hacer',        duration: 360 },
        { title: 'Segunda Piel',      duration: 255 },
        { title: 'Vuelo Bajo',        duration: 320 },
      ],
    },
    {
      id: 'ale-pl', moodId: 'alegria', contentType: 'playlists',
      title: 'Sube el Ánimo',
      desc: 'Canciones para recuperar la sonrisa en cualquier momento.',
      tracks: [
        { title: 'Luz de Mediodía',   duration: 210 },
        { title: 'Paso Liviano',      duration: 195 },
        { title: 'Risa Fácil',        duration: 230 },
        { title: 'Domingo',           duration: 240 },
        { title: 'Buena Nueva',       duration: 205 },
      ],
    },
    {
      id: 'rel-pl', moodId: 'relax', contentType: 'playlists',
      title: 'Cero Estrés',
      desc: 'Música ambiental para bajar el estrés acumulado.',
      tracks: [
        { title: 'Última Hora del Día', duration: 315 },
        { title: 'Manta Pesada',        duration: 290 },
        { title: 'Sin Pendientes',      duration: 340 },
        { title: 'Ojos Cerrados',       duration: 370 },
        { title: 'Quietud',             duration: 275 },
      ],
    },
    {
      id: 'sup-pl', moodId: 'superacion', contentType: 'playlists',
      title: 'Supera Cualquier Reto',
      desc: 'Música motivacional para acompañar procesos de superación.',
      tracks: [
        { title: 'Primer Paso',       duration: 240 },
        { title: 'Cuesta Arriba',     duration: 270 },
        { title: 'No Aflojar',        duration: 230 },
        { title: 'Otra Vez de Pie',   duration: 255 },
        { title: 'La Marca',          duration: 300 },
      ],
    },
  ],
};

// Completa cada ítem con los campos derivados que vendrían de la API real:
// thumbnail (foto stock, hoy sin uso visual — la portada se dibuja en CSS a partir
// del mood), short_description, audioUrl (placeholder real) y template.
(function hydrateContent() {
  const SOUNDHELIX_COUNT = 17;
  let cursor = 0;
  const nextAudioUrl = () => `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(cursor++ % SOUNDHELIX_COUNT) + 1}.mp3`;

  MOCK_DB.tracks.forEach((t, i) => {
    t.template = 'audio';
    t.short_description = t.desc.split('.')[0] + '.';
    t.thumbnail = `https://picsum.photos/seed/${t.moodId}-${i}/800/600`;
    t.audioUrl = nextAudioUrl();
  });

  MOCK_DB.playlists.forEach((p, i) => {
    p.template = 'playlist';
    p.short_description = p.desc.split('.')[0] + '.';
    p.thumbnail = `https://picsum.photos/seed/pl-${p.moodId}-${i}/800/600`;
    p.tracks.forEach((song, si) => {
      song.id = `${p.id}-${si}`;
      song.audioUrl = nextAudioUrl();
    });
  });
})();
