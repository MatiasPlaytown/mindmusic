// ============================================================
// MINDMUSIC — app.js
// Todo el JS del sitio: íconos, utils, estado local, capa de datos
// (mock hoy, WordPress REST mañana), nav, e init de cada página.
// ============================================================

// ───────────────────────── ICONS ─────────────────────────

const MOOD_ICONS = {
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-4 2-8 8-13 6 5 8 9 8 13a7 7 0 0 1-7 7c-1.5 0-3-.5-4-1.5"/><path d="M11 20v-6M11 14l4-4"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  infinity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.5 8a4 4 0 0 0 0 8c2.5 0 3.5-2 5.5-4-2-2-3-4-5.5-4zM5.5 8a4 4 0 0 1 0 8c-2.5 0-3.5-2-5.5-4 2-2 3-4 5.5-4z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m4 19 6-11 3 5 2-3 5 9H4z"/></svg>',
};

const UI_ICONS = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h3.5L15 18h3.5M3 18h3.5l2-2.7M16 6h2.5M18.5 6 16 3.5M18.5 6 16 8.5M18.5 18 16 15.5M18.5 18 16 20.5"/></svg>',
  prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14l-11-7z"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg>',
  repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15 9-4 2-2 4 4-2z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7"/></svg>',
};

// ───────────────────────── UTILS ─────────────────────────

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${String(rem).padStart(2, '0')}`;
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function contentTypeName(id) {
  const ct = MOCK_DB.contentTypes.find((c) => c.id === id);
  return ct ? ct.name : id;
}

function moodById(id) {
  return MOCK_DB.moods.find((m) => m.id === id);
}

let toastTimer;
function showToast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// Portada tipo disco/funda: cada ítem de audio se dibuja como un vinilo
// dentro de una funda con el color del mood. Las playlists se ven como una
// pila de fundas (varios discos adentro), no como un ítem suelto más.
function coverHTML(kind, mood, trackCount) {
  const stackClass = kind === 'playlist' ? ' cover--stack' : '';
  const icon = mood ? (MOOD_ICONS[mood.icon] || '') : '';
  const moodBadge = mood ? `<span class="cover-mood-badge">${escapeHtml(mood.name)}</span>` : '';
  const countBadge = kind === 'playlist' && trackCount != null ? `<span class="cover-count">${trackCount} temas</span>` : '';
  return `
    <div class="cover${stackClass}" style="--m-ink:${mood ? mood.ink : ''}">
      ${moodBadge}
      <div class="disc"><div class="disc-icon">${icon}</div></div>
      ${countBadge}
    </div>
  `;
}

function buildFeed(tracks, playlists) {
  return [
    ...tracks.map((t) => ({ ...t, kind: 'track' })),
    ...playlists.map((p) => ({ ...p, kind: 'playlist' })),
  ];
}

// ───────────────────────── LOCAL STORAGE ─────────────────────────

const PROFILE_KEY = 'mm_profile';
const DEFAULT_PROFILE = { name: 'Invitado' };

function getProfile() {
  try {
    return Object.assign({}, DEFAULT_PROFILE, JSON.parse(localStorage.getItem(PROFILE_KEY) || '{}'));
  } catch (e) {
    return { ...DEFAULT_PROFILE };
  }
}

function saveProfile(p) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

function resetLocalData() {
  localStorage.removeItem(PROFILE_KEY);
}

// ───────────────────────── MOCK API ─────────────────────────
// Hoy lee de MOCK_DB (mock-data.js). El día que exista el endpoint real de
// WordPress, sólo cambia el cuerpo de estas funciones — las páginas que las
// llaman no cambian.

function apiDelay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchMoodList() {
  await apiDelay();
  return MOCK_DB.moods;
}

async function fetchAllTracks() {
  await apiDelay();
  return MOCK_DB.tracks;
}

async function fetchTracksByMood(moodId) {
  await apiDelay();
  return MOCK_DB.tracks.filter((t) => t.moodId === moodId);
}

async function fetchTracksByType(contentType) {
  await apiDelay();
  if (!contentType || contentType === 'todos') return MOCK_DB.tracks;
  return MOCK_DB.tracks.filter((t) => t.contentType === contentType);
}

async function fetchTrackById(id) {
  await apiDelay();
  return MOCK_DB.tracks.find((t) => t.id === id) || null;
}

async function fetchAllPlaylists() {
  await apiDelay();
  return MOCK_DB.playlists;
}

async function fetchPlaylistsByMood(moodId) {
  await apiDelay();
  return MOCK_DB.playlists.filter((p) => p.moodId === moodId);
}

async function fetchPlaylistById(id) {
  await apiDelay();
  return MOCK_DB.playlists.find((p) => p.id === id) || null;
}

// ───────────────────────── NAV ─────────────────────────

function initNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'nav-home', '': 'nav-home',
    'explorar.html': 'nav-explorar',
    'perfil.html': 'nav-perfil',
    'config.html': 'nav-config',
  };
  const activeId = map[page];
  if (activeId) document.getElementById(activeId)?.classList.add('active');

  const profile = getProfile();
  const initial = (profile.name || 'I').charAt(0).toUpperCase();
  document.querySelectorAll('.js-avatar').forEach((el) => (el.textContent = initial));
  document.querySelectorAll('.js-greet-name').forEach((el) => (el.textContent = profile.name));
  document.querySelectorAll('.nav-user-name').forEach((el) => (el.textContent = profile.name));
}

// ───────────────────────── HOME ─────────────────────────

let homeAllItems = [];
let homeActiveType = 'todos';

async function initHome() {
  initNav();
  renderMoodSkeletons();
  renderTrackSkeletons('home-tracks');

  const [moods, tracks, playlists] = await Promise.all([fetchMoodList(), fetchAllTracks(), fetchAllPlaylists()]);
  homeAllItems = buildFeed(tracks, playlists);

  renderMoodGrid(moods.slice(0, 4), document.getElementById('home-moods'));
  renderContentTabs();
  renderHomeTracks();
}

function renderMoodSkeletons() {
  const el = document.getElementById('home-moods');
  if (!el) return;
  el.innerHTML = Array.from({ length: 4 }).map(() => `
    <div class="mood-card">
      <div class="skeleton" style="width:44px;height:44px;border-radius:50%;margin-bottom:14px"></div>
      <div class="skeleton skel-line" style="width:70%"></div>
      <div class="skeleton skel-line short"></div>
    </div>
  `).join('');
}

function renderMoodGrid(moods, el) {
  if (!el) return;
  el.innerHTML = moods.map((m) => `
    <a class="mood-card" href="mood.html?id=${encodeURIComponent(m.id)}" style="--m-ink:${m.ink}">
      <div class="mood-icon">${MOOD_ICONS[m.icon] || ''}</div>
      <h3>${escapeHtml(m.name)}</h3>
      <p>${escapeHtml(m.subtitle)}</p>
      <span class="pill-btn">${escapeHtml(m.cta)}</span>
    </a>
  `).join('');
}

function renderContentTabs() {
  const el = document.getElementById('home-tabs');
  if (!el) return;
  const types = [{ id: 'todos', name: 'Todos' }, ...MOCK_DB.contentTypes];
  el.innerHTML = types.map((t) => `
    <button class="tab ${t.id === homeActiveType ? 'active' : ''}" data-type="${t.id}">${escapeHtml(t.name)}</button>
  `).join('');
  el.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      homeActiveType = btn.dataset.type;
      el.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b === btn));
      renderHomeTracks();
    });
  });
}

function renderTrackSkeletons(containerId, count = 4) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({ length: count }).map(() => `
    <div class="track-card">
      <div class="skeleton skel-thumb"></div>
      <div class="track-body">
        <div class="skeleton skel-line"></div>
        <div class="skeleton skel-line short"></div>
      </div>
    </div>
  `).join('');
}

// items mezcla tracks sueltos (cápsulas/mensajes/guiada) y playlists —
// cada uno navega a un destino distinto: player.html vs. playlist.html.
function renderTrackGrid(items, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!items.length) {
    el.innerHTML = `<div class="empty-state">No encontramos contenido para esa búsqueda.</div>`;
    return;
  }
  el.innerHTML = items.map((item) => {
    const mood = moodById(item.moodId);
    const isPlaylist = item.kind === 'playlist';
    const href = isPlaylist
      ? `playlist.html?id=${encodeURIComponent(item.id)}`
      : `player.html?id=${encodeURIComponent(item.id)}`;
    const meta = isPlaylist
      ? `Playlist · ${item.tracks.length} canciones`
      : `${escapeHtml(contentTypeName(item.contentType))} · ${fmtTime(item.duration)}`;
    return `
      <a class="track-card" href="${href}">
        ${coverHTML(isPlaylist ? 'playlist' : 'track', mood, isPlaylist ? item.tracks.length : null)}
        <div class="track-body">
          <h4>${escapeHtml(item.title)}</h4>
          <span>${meta}</span>
        </div>
      </a>
    `;
  }).join('');
}

function renderHomeTracks(query = '') {
  let list = homeActiveType === 'todos'
    ? homeAllItems
    : homeActiveType === 'playlists'
      ? homeAllItems.filter((i) => i.kind === 'playlist')
      : homeAllItems.filter((i) => i.kind === 'track' && i.contentType === homeActiveType);
  if (query) {
    list = list.filter((i) => i.title.toLowerCase().includes(query) || moodById(i.moodId)?.name.toLowerCase().includes(query));
  }
  renderTrackGrid(list, 'home-tracks');
}

// ───────────────────────── EXPLORAR ─────────────────────────

let explorarMoods = [];

async function initExplorar() {
  initNav();
  renderCatSkeletons();
  explorarMoods = await fetchMoodList();
  renderCatGrid(explorarMoods);

  const searchInput = document.getElementById('explorar-search');
  searchInput?.addEventListener('input', debounce((e) => {
    const q = e.target.value.trim().toLowerCase();
    const filtered = q ? explorarMoods.filter((m) => m.name.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q)) : explorarMoods;
    renderCatGrid(filtered);
  }, 150));
}

function renderCatSkeletons() {
  const el = document.getElementById('explorar-grid');
  if (!el) return;
  el.innerHTML = Array.from({ length: 6 }).map(() => `<div class="skeleton cat-card"></div>`).join('');
}

function renderCatGrid(moods) {
  const el = document.getElementById('explorar-grid');
  if (!el) return;
  if (!moods.length) {
    el.innerHTML = `<div class="empty-state">No encontramos ningún estado para esa búsqueda.</div>`;
    return;
  }
  el.innerHTML = moods.map((m) => `
    <a class="cat-card" href="mood.html?id=${encodeURIComponent(m.id)}" style="--m-ink:${m.ink}">
      <div class="cat-disc"><div class="disc-icon">${MOOD_ICONS[m.icon] || ''}</div></div>
      <div class="overlay">
        <p class="eyebrow">${escapeHtml(m.subtitle.toUpperCase())}</p>
        <h3>${escapeHtml(m.name)}</h3>
      </div>
    </a>
  `).join('');
}

// ───────────────────────── MOOD ─────────────────────────

async function initMoodPage() {
  initNav();
  const id = new URLSearchParams(location.search).get('id');
  const mood = moodById(id);

  if (!mood) {
    document.getElementById('mood-loading').innerHTML = `<div class="empty-state">No encontramos ese estado de ánimo.</div>`;
    return;
  }

  document.getElementById('mood-title').textContent = mood.name;
  document.getElementById('mood-sub').textContent = mood.subtitle;
  document.getElementById('mood-icon').innerHTML = MOOD_ICONS[mood.icon] || '';
  document.getElementById('mood-icon').style.setProperty('--m-ink', mood.ink);

  const [tracks, playlists] = await Promise.all([fetchTracksByMood(mood.id), fetchPlaylistsByMood(mood.id)]);
  document.getElementById('mood-loading').style.display = 'none';
  document.getElementById('mood-content').style.display = '';
  renderTrackGrid(buildFeed(tracks, playlists), 'mood-tracks');
}

// ───────────────────────── PLAYLIST ─────────────────────────
// Acá se lee la playlist "de atrás para adelante", como el dorso de una
// funda: todas las canciones apiladas una debajo de la otra, en orden.

async function initPlaylistPage() {
  initNav();
  const id = new URLSearchParams(location.search).get('id');
  const playlist = await fetchPlaylistById(id);

  if (!playlist) {
    document.getElementById('playlist-loading').innerHTML = `<div class="empty-state">No encontramos esa playlist.</div>`;
    return;
  }

  const mood = moodById(playlist.moodId);

  document.getElementById('playlist-loading').style.display = 'none';
  document.getElementById('playlist-content').style.display = '';

  const coverEl = document.getElementById('playlist-cover');
  coverEl.innerHTML = `<div class="disc"><div class="disc-icon">${mood ? (MOOD_ICONS[mood.icon] || '') : ''}</div></div>`;
  coverEl.style.setProperty('--m-ink', mood ? mood.ink : '');

  document.getElementById('playlist-eyebrow').textContent = mood ? mood.name.toUpperCase() : 'PLAYLIST';
  document.getElementById('playlist-title').textContent = playlist.title;
  document.getElementById('playlist-desc').textContent = playlist.desc;

  const listEl = document.getElementById('playlist-tracklist');
  listEl.innerHTML = playlist.tracks.map((song, i) => `
    <a class="tracklist-row" href="player.html?playlist=${encodeURIComponent(playlist.id)}&t=${i}">
      <span class="tl-index">${String(i + 1).padStart(2, '0')}</span>
      <span class="tl-play">${UI_ICONS.play}</span>
      <span class="tl-title">${escapeHtml(song.title)}</span>
      <span class="tl-duration">${fmtTime(song.duration)}</span>
    </a>
  `).join('');
}

// ───────────────────────── PLAYER ─────────────────────────

let playerTracks = [];
let playerIndex = -1;
let playerMood = null;
let playerPlaylist = null;
let audioEl = null;
let isShuffled = false;
let isRepeating = false;

async function initPlayerPage() {
  initNav();
  const params = new URLSearchParams(location.search);
  const playlistId = params.get('playlist');

  if (playlistId) {
    const playlist = await fetchPlaylistById(playlistId);
    if (!playlist) {
      document.getElementById('player-loading').innerHTML = `<div class="empty-state">No encontramos esa playlist.</div>`;
      return;
    }
    playerPlaylist = playlist;
    playerMood = moodById(playlist.moodId);
    playerTracks = playlist.tracks;
    const t = parseInt(params.get('t'), 10);
    playerIndex = Number.isInteger(t) && t >= 0 && t < playerTracks.length ? t : 0;
  } else {
    const id = params.get('id');
    const track = await fetchTrackById(id);
    if (!track) {
      document.getElementById('player-loading').innerHTML = `<div class="empty-state">No encontramos ese audio.</div>`;
      return;
    }
    playerPlaylist = null;
    playerMood = moodById(track.moodId);
    playerTracks = await fetchTracksByMood(track.moodId);
    playerIndex = playerTracks.findIndex((tr) => tr.id === track.id);
  }

  document.getElementById('player-loading').style.display = 'none';
  document.getElementById('player-content').style.display = '';

  audioEl = document.getElementById('player-audio');

  document.getElementById('shuffle-btn').addEventListener('click', () => {
    isShuffled = !isShuffled;
    document.getElementById('shuffle-btn').classList.toggle('active', isShuffled);
  });
  document.getElementById('repeat-btn').addEventListener('click', () => {
    isRepeating = !isRepeating;
    document.getElementById('repeat-btn').classList.toggle('active', isRepeating);
  });
  document.getElementById('prev-btn').addEventListener('click', () => stepTrack(-1));
  document.getElementById('next-btn').addEventListener('click', () => stepTrack(1));
  document.getElementById('play-main').addEventListener('click', togglePlay);

  const progressTrack = document.getElementById('progress-track');
  progressTrack.addEventListener('click', (e) => {
    if (!audioEl.duration) return;
    const rect = progressTrack.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audioEl.currentTime = ratio * audioEl.duration;
  });

  document.getElementById('player-visual').style.setProperty('--m-ink', playerMood ? playerMood.ink : '');

  loadTrack(playerIndex);
}

function loadTrack(index) {
  const t = playerTracks[index];

  if (playerPlaylist) {
    document.getElementById('mood-badge').textContent = `PLAYLIST · ${playerPlaylist.title.toUpperCase()}`;
  } else {
    document.getElementById('mood-badge').textContent = `MOOD ACTUAL: ${playerMood ? playerMood.name.toUpperCase() : ''}`;
  }
  document.getElementById('player-title').textContent = t.title;
  document.getElementById('player-desc').textContent = playerPlaylist ? playerPlaylist.desc : t.desc;

  audioEl.src = t.audioUrl;
  audioEl.currentTime = 0;
  setPlayingUI(false);

  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('time-current').textContent = '0:00';
  document.getElementById('time-total').textContent = fmtTime(t.duration);

  audioEl.onloadedmetadata = () => {
    document.getElementById('time-total').textContent = fmtTime(audioEl.duration || t.duration);
  };
  audioEl.ontimeupdate = () => {
    if (!audioEl.duration) return;
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('time-current').textContent = fmtTime(audioEl.currentTime);
  };
  audioEl.onended = () => {
    if (isRepeating) {
      audioEl.currentTime = 0;
      audioEl.play();
    } else {
      stepTrack(1);
    }
  };

  audioEl.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
}

function togglePlay() {
  if (!audioEl) return;
  if (audioEl.paused) {
    audioEl.play().then(() => setPlayingUI(true)).catch(() => showToast('No se pudo reproducir el audio'));
  } else {
    audioEl.pause();
    setPlayingUI(false);
  }
}

function setPlayingUI(playing) {
  const mainBtn = document.getElementById('play-main');
  const label = document.getElementById('player-label');
  const vinyl = document.getElementById('player-vinyl');
  const tonearm = document.getElementById('player-tonearm');
  mainBtn.innerHTML = playing ? UI_ICONS.pause : UI_ICONS.play;
  mainBtn.classList.toggle('playing', playing);
  label.innerHTML = playing ? UI_ICONS.pause : UI_ICONS.play;
  label.classList.toggle('playing', playing);
  vinyl.classList.toggle('playing', playing);
  tonearm.classList.toggle('playing', playing);
}

function stepTrack(dir) {
  if (playerTracks.length < 2) {
    audioEl.currentTime = 0;
    audioEl.play();
    return;
  }
  let nextIndex;
  if (isShuffled) {
    do {
      nextIndex = Math.floor(Math.random() * playerTracks.length);
    } while (nextIndex === playerIndex);
  } else {
    nextIndex = (playerIndex + dir + playerTracks.length) % playerTracks.length;
  }
  playerIndex = nextIndex;
  const params = new URLSearchParams(location.search);
  if (playerPlaylist) {
    params.set('playlist', playerPlaylist.id);
    params.set('t', playerIndex);
    params.delete('id');
  } else {
    params.set('id', playerTracks[playerIndex].id);
  }
  history.replaceState(null, '', `player.html?${params.toString()}`);
  loadTrack(playerIndex);
}

// ───────────────────────── PERFIL ─────────────────────────

function initPerfilPage() {
  initNav();
  renderPerfil();

  document.getElementById('edit-name-btn')?.addEventListener('click', () => openEditModal());
  document.getElementById('modal-cancel')?.addEventListener('click', closeEditModal);
  document.getElementById('modal-save')?.addEventListener('click', saveEditModal);
}

function renderPerfil() {
  const profile = getProfile();
  document.getElementById('perfil-name').textContent = profile.name;
  document.getElementById('perfil-avatar').textContent = (profile.name || 'I').charAt(0).toUpperCase();
  document.getElementById('perfil-name-value').textContent = profile.name;
}

function openEditModal() {
  const profile = getProfile();
  document.getElementById('modal-input').value = profile.name;
  document.getElementById('edit-modal').classList.add('open');
}
function closeEditModal() {
  document.getElementById('edit-modal').classList.remove('open');
}
function saveEditModal() {
  const value = document.getElementById('modal-input').value.trim();
  if (!value) return;
  const profile = getProfile();
  profile.name = value;
  saveProfile(profile);
  closeEditModal();
  renderPerfil();
  document.querySelectorAll('.js-avatar').forEach((el) => (el.textContent = value.charAt(0).toUpperCase()));
  document.querySelectorAll('.js-greet-name, .nav-user-name').forEach((el) => (el.textContent = value));
  showToast('Perfil actualizado');
}

// ───────────────────────── CONFIG ─────────────────────────

function initConfigPage() {
  initNav();
  document.getElementById('reset-data-btn')?.addEventListener('click', () => {
    if (!confirm('¿Borrar todos los datos guardados en este dispositivo?')) return;
    resetLocalData();
    showToast('Datos borrados');
    initNav();
  });
}

// ───────────────────────── ROUTER ─────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('home-container')) { initHome(); return; }
  if (document.getElementById('explorar-container')) { initExplorar(); return; }
  if (document.getElementById('mood-container')) { initMoodPage(); return; }
  if (document.getElementById('playlist-container')) { initPlaylistPage(); return; }
  if (document.getElementById('player-container')) { initPlayerPage(); return; }
  if (document.getElementById('perfil-container')) { initPerfilPage(); return; }
  if (document.getElementById('config-container')) { initConfigPage(); return; }
});
