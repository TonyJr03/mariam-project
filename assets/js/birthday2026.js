// birthday2026.js - Sistema de páginas, pétalos y música

// =========== CONFIGURACIÓN =======================
const FADE_DURATION = 1200;
const PETAL_INTERVAL = 500;
const PETAL_LIFETIME = 18000;
const MUSIC_VOLUME = 0.8;
const SECRET_PAGE_URL = 'secret_birthday26.html';

// =========== SISTEMA DE PÁGINAS =======================
const pages = document.querySelectorAll('.page');
let currentPage = 0;

// Avanzar a la siguiente página
function nextPage() {
  if (currentPage >= pages.length - 1) return;
  
  pages[currentPage].classList.remove('active');
  currentPage++;
  pages[currentPage].classList.add('active');
}

// Inicializar botones de navegación
function initializePageNavigation() {
  const nextButtons = document.querySelectorAll('[data-action="next-page"]');
  
  nextButtons.forEach(button => {
    button.addEventListener('click', nextPage);
  });
  
  console.log(`✓ ${nextButtons.length} botones de navegación inicializados`);
}

// =========== SISTEMA DE PÉTALOS =======================
const sakuraContainer = document.getElementById('sakura-container');

// Crear un pétalo de sakura
function createSakuraPetal(isSecret = false) {
  const petal = document.createElement('div');
  petal.classList.add('sakura');
  
  if (isSecret) {
    // Pétalo secreto con click para ir a secret.html
    petal.classList.add('secret-petal');
    petal.addEventListener('click', () => {
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = SECRET_PAGE_URL;
      }, FADE_DURATION);
    });
    
    petal.style.width = '16px';
    petal.style.height = '16px';
    petal.style.animationDuration = '18s';
    petal.style.opacity = '0.9';
  } else {
    // Pétalo normal con tamaño y duración aleatorios
    const size = Math.random() * 8 + 8;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    const duration = Math.random() * 5 + 8;
    petal.style.animationDuration = `${duration}s`;
    
    const opacity = Math.random() * 0.5 + 0.4;
    petal.style.opacity = `${opacity}`;
  }
  
  // Posición horizontal aleatoria
  petal.style.left = `${Math.random() * window.innerWidth}px`;
  // Agregar al DOM
  sakuraContainer.appendChild(petal);
  // Eliminar después de la animación
  setTimeout(() => {
    petal.remove();
  }, PETAL_LIFETIME);
}

// Generar pétalos continuamente
function startPetalGeneration() {
  setInterval(() => {
    createSakuraPetal(false);
  }, PETAL_INTERVAL);
  
  console.log('✓ Generación de pétalos iniciada');
}

// =========== SISTEMA DE MÚSICA =======================
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = musicBtn.querySelector('span');
let musicPlaying = false;

// Actualizar el ícono del botón
function updateMusicButton() {
  if (musicPlaying) {
    musicIcon.textContent = '⏸️';  // ← Solo cambiar texto
    musicBtn.setAttribute('aria-pressed', 'true');
    musicBtn.setAttribute('aria-label', 'Pausar música');
  } else {
    musicIcon.textContent = '🎶';  // ← Solo cambiar texto
    musicBtn.setAttribute('aria-pressed', 'false');
    musicBtn.setAttribute('aria-label', 'Reproducir música');
  }
}

// Intentar reproducir música automáticamente
function startMusic() {
  music.volume = MUSIC_VOLUME;
  
  music.play()
    .then(() => {
      musicPlaying = true;
      updateMusicButton();
      console.log('✓ Música reproduciéndose');
    })
    .catch(() => {
      console.log('⚠ Autoplay bloqueado. Esperando interacción del usuario...');
      updateMusicButton();
    });
}

// Alternar reproducción/pausa
function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
  } else {
    music.play();
    musicPlaying = true;
  }
  
  updateMusicButton();
}

// Detectar cuando la música está por terminar
function handleMusicTimeUpdate() {
  const timeRemaining = music.duration - music.currentTime;
  
  // Crear pétalo secreto 0.2 segundos antes del final
  if (timeRemaining <= 0.2 && timeRemaining > 0) {
    createSakuraPetal(true);
    console.log('✨ Pétalo secreto creado');
  }
}

// Inicializar sistema de música
function initializeMusic() {
  musicBtn.addEventListener('click', toggleMusic);
  music.addEventListener('timeupdate', handleMusicTimeUpdate);
  
  startMusic();
  console.log('✓ Sistema de música inicializado');
}

// =========== INICIALIZACIÓN =======================
function init() {
  console.log('-- Inicializando birthday2026...');
  
  initializePageNavigation();
  initializeMusic();
  startPetalGeneration();
  
  console.log('✓ Inicialización completa');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);