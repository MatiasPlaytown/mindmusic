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

let homeAllTracks = [];
let homeActiveType = 'todos';

async function initHome() {
  initNav();
  renderMoodSkeletons();
  renderTrackSkeletons('home-tracks');

  const [moods, tracks] = await Promise.all([fetchMoodList(), fetchAllTracks()]);
  homeAllTracks = tracks;

  renderMoodGrid(moods.slice(0, 4), document.getElementById('home-moods'));
  renderContentTabs();
  renderHomeTracks();

  const searchInput = document.getElementById('home-search');
  searchInput?.addEventListener('input', debounce((e) => {
    renderHomeTracks(e.target.value.trim().toLowerCase());
  }, 150));
}

function renderMoodSkeletons() {
  const el = document.getElementById('home-moods');
  if (!el) return;
  el.innerHTML = Array.from({ length: 4 }).map(() => `
    <div class="mood-card">
      <div class="skeleton" style="width:52px;height:52px;border-radius:50%;margin-bottom:12px"></div>
      <div class="skeleton skel-line" style="width:70%"></div>
      <div class="skeleton skel-line short"></div>
    </div>
  `).join('');
}

function renderMoodGrid(moods, el) {
  if (!el) return;
  el.innerHTML = moods.map((m) => `
    <a class="mood-card" href="mood.html?id=${encodeURIComponent(m.id)}">
      <div class="mood-icon" style="background:${m.grad}">${MOOD_ICONS[m.icon] || ''}</div>
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
      renderHomeTracks(document.getElementById('home-search')?.value.trim().toLowerCase());
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

function renderTrackGrid(tracks, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!tracks.length) {
    el.innerHTML = `<div class="empty-state">No encontramos contenido para esa búsqueda.</div>`;
    return;
  }
  el.innerHTML = tracks.map((t) => {
    const mood = moodById(t.moodId);
    return `
      <a class="track-card" href="player.html?id=${encodeURIComponent(t.id)}">
        <div class="track-thumb">
          <img src="${t.thumbnail}" alt="${escapeHtml(t.title)}" loading="lazy">
          <span class="track-mood-badge" style="background:${mood ? mood.grad : 'rgba(0,0,0,.4)'}">${mood ? escapeHtml(mood.name) : ''}</span>
        </div>
        <div class="track-body">
          <h4>${escapeHtml(t.title)}</h4>
          <span>${escapeHtml(contentTypeName(t.contentType))} · ${fmtTime(t.duration)}</span>
        </div>
      </a>
    `;
  }).join('');
}

function renderHomeTracks(query = '') {
  let list = homeActiveType === 'todos' ? homeAllTracks : homeAllTracks.filter((t) => t.contentType === homeActiveType);
  if (query) {
    list = list.filter((t) => t.title.toLowerCase().includes(query) || moodById(t.moodId)?.name.toLowerCase().includes(query));
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
  el.innerHTML = moods.map((m, i) => `
    <a class="cat-card" href="mood.html?id=${encodeURIComponent(m.id)}">
      <img src="https://picsum.photos/seed/cat-${m.id}/800/500" alt="${escapeHtml(m.name)}" loading="lazy">
      <div class="overlay">
        <p class="eyebrow">${escapeHtml(m.subtitle.toUpperCase())}</p>
        <h3>${escapeHtml(m.name)}</h3>
      </div>
      <span class="cat-play">${UI_ICONS.play}</span>
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
  document.getElementById('mood-icon').style.background = mood.grad;

  const tracks = await fetchTracksByMood(mood.id);
  document.getElementById('mood-loading').style.display = 'none';
  document.getElementById('mood-content').style.display = '';
  renderTrackGrid(tracks, 'mood-tracks');
}

// ───────────────────────── PLAYER ─────────────────────────

let playerTracks = [];
let playerIndex = -1;
let audioEl = null;
let isShuffled = false;
let isRepeating = false;

async function initPlayerPage() {
  initNav();
  const id = new URLSearchParams(location.search).get('id');
  const track = await fetchTrackById(id);

  if (!track) {
    document.getElementById('player-loading').innerHTML = `<div class="empty-state">No encontramos ese audio.</div>`;
    return;
  }

  playerTracks = await fetchTracksByMood(track.moodId);
  playerIndex = playerTracks.findIndex((t) => t.id === track.id);

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

  loadTrack(playerIndex);
}

function loadTrack(index) {
  const mood = moodById(playerTracks[index].moodId);
  const t = playerTracks[index];

  document.getElementById('mood-badge').textContent = `MOOD ACTUAL: ${mood.name.toUpperCase()}`;
  document.getElementById('player-title').textContent = t.title;
  document.getElementById('player-desc').textContent = t.desc;

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
  const core = document.getElementById('player-core');
  mainBtn.innerHTML = playing ? UI_ICONS.pause : UI_ICONS.play;
  mainBtn.classList.toggle('playing', playing);
  core.innerHTML = playing ? UI_ICONS.pause : UI_ICONS.play;
  core.classList.toggle('playing', playing);
  document.querySelectorAll('.ring').forEach((r) => r.classList.toggle('pulse', playing));
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
  params.set('id', playerTracks[playerIndex].id);
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
  if (document.getElementById('player-container')) { initPlayerPage(); return; }
  if (document.getElementById('perfil-container')) { initPerfilPage(); return; }
  if (document.getElementById('config-container')) { initConfigPage(); return; }
});
