// secret_birthday26.js - Texto secuencial con cielo estrellado

// =========== CONFIGURACIÓN =======================
const CONFIG = {
  // Texto
  FADE_IN_DELAY: 50,
  FADE_OUT_DURATION: 600,
  EPILOGUE_DELAY: 1500,
  // Estrellas
  NUM_STARS: 200,
  STAR_SIZE_MIN: 0.5,
  STAR_SIZE_MAX: 1.8,
  STAR_OPACITY_MIN: 0.2,
  STAR_OPACITY_MAX: 1.0,
  STAR_TWINKLE_SPEED_MIN: 0.005,
  STAR_TWINKLE_SPEED_MAX: 0.025,
  STAR_TWINKLE_AMP_MIN: 0.4,
  STAR_TWINKLE_AMP_MAX: 0.8,
  // Meteoros
  METEOR_SPAWN_INTERVAL_MIN: 1200,
  METEOR_SPAWN_INTERVAL_MAX: 2400,
  METEOR_SPAWN_CHANCE: 0.5,
  METEOR_SPEED_X_MIN: 4,
  METEOR_SPEED_X_MAX: 10,
  METEOR_SPEED_Y_MIN: 0.8,
  METEOR_SPEED_Y_MAX: 1.8,
  METEOR_LIFETIME: 40,
  METEOR_TAIL_LENGTH: 25,
  // Música
  MUSIC_VOLUME: 0.8
};

// Contenido del mensaje
const lines = [
  "Sé que te dije que la universidad está llegando a su final.",
  "Que nuestros caminos pronto se separarán.",
  "Y que, con el tiempo,\nquizás el contacto entre nosotros se vuelva distante.",
  "Sé que cada uno tendrá que seguir su propia vida.",
  "Pero la verdad…",
  "Es que no quiero.",
  "No quiero perderte.",
  "Quiero que sigas siendo parte de mi vida.",
  "Quiero caminar contigo.",
  "Y si algún día la vida decide alejarnos…",
  "Si el tiempo nos pone en direcciones distintas…",
  "Desearía, desde lo más profundo de mi corazón,\nvolver a encontrarte.",
  "Encontrarme con una nueva Mariam.",
  "Más fuerte, más segura.",
  "Lista…",
  "Y que esa vez,\ndesee escribir una historia a mi lado."
];

// =========== VARIABLES GLOBALES =======================
let currentLineIndex = 0;
let isShowingLine = false;

// =========== SISTEMA DE TEXTO SECUENCIAL =======================
const text = document.getElementById('text');
const epilogue = document.getElementById('epilogue');

// Mostrar una línea con efecto fade-in
function showLine() {
  isShowingLine = true;
  
  // Limpiar clases de animación
  text.classList.remove('fade-in', 'fade-out');
  text.style.opacity = 0;
  // Cambiar texto
  text.textContent = lines[currentLineIndex];
  
  // Fade in después de un momento
  setTimeout(() => {
    text.classList.add('fade-in');
    isShowingLine = false;
  }, CONFIG.FADE_IN_DELAY);
}

// Avanzar a la siguiente línea
function advanceLine() {
  // Prevenir múltiples clicks mientras se anima
  if (isShowingLine) return;
  
  // Si estamos en la última línea, mostrar epílogo
  if (currentLineIndex === lines.length - 1) {
    showEpilogue();
    return;
  }
  
  // Fade out
  text.classList.add('fade-out');
  
  // Avanzar y mostrar siguiente línea
  setTimeout(() => {
    currentLineIndex++;
    showLine();
  }, CONFIG.FADE_OUT_DURATION);
}

// Mostrar epílogo final
function showEpilogue() {
  epilogue.textContent = "Una historia de nosotros dos";
  
  setTimeout(() => {
    epilogue.style.opacity = 1;
  }, CONFIG.EPILOGUE_DELAY);
}

// Manejar clicks en la pantalla
function handleScreenClick(event) {
  
  if (event.target === musicBtn || musicBtn.contains(event.target))  return;
  
  advanceLine();
}

// =========== SISTEMA DE CANVAS (ESTRELLAS) =======================
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let canvasWidth, canvasHeight;

// Ajustar tamaño del canvas a la ventana
function resizeCanvas() {
  canvasWidth = canvas.width = window.innerWidth;
  canvasHeight = canvas.height = window.innerHeight;
  
  // Regenerar estrellas con nuevas dimensiones
  if (stars.length > 0) {
    initializeStars();
  }
}

// Arrays para estrellas y meteoros
const stars = [];
const meteors = [];

// Crear estrellas normales
function initializeStars() {
  stars.length = 0; // Limpiar array
  
  for (let i = 0; i < CONFIG.NUM_STARS; i++) {
    stars.push({
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
      radius: Math.random() * (CONFIG.STAR_SIZE_MAX - CONFIG.STAR_SIZE_MIN) + CONFIG.STAR_SIZE_MIN,
      baseOpacity: Math.random() * (CONFIG.STAR_OPACITY_MAX - CONFIG.STAR_OPACITY_MIN) + CONFIG.STAR_OPACITY_MIN,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * (CONFIG.STAR_TWINKLE_SPEED_MAX - CONFIG.STAR_TWINKLE_SPEED_MIN) + CONFIG.STAR_TWINKLE_SPEED_MIN,
      twinkleAmplitude: Math.random() * (CONFIG.STAR_TWINKLE_AMP_MAX - CONFIG.STAR_TWINKLE_AMP_MIN) + CONFIG.STAR_TWINKLE_AMP_MIN
    });
  }
}

// Dibujar una estrella con efecto de brillo
function drawStar(star) {
  // Actualizar fase de parpadeo
  star.twinklePhase += star.twinkleSpeed;
  
  // Calcular opacidad con efecto sinusoidal
  const twinkleFactor = Math.sin(star.twinklePhase) * star.twinkleAmplitude;
  const opacity = Math.min(Math.max(star.baseOpacity + twinkleFactor, 0.1), 1);
  
  const haloRadius = star.radius * 5;
  
  // Núcleo de la estrella
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fill();
  
  // Halo difuso (gradiente radial)
  const haloGradient = ctx.createRadialGradient(
    star.x, star.y, star.radius,
    star.x, star.y, haloRadius
  );
  haloGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.25})`);
  haloGradient.addColorStop(0.5, `rgba(200, 220, 255, ${opacity * 0.15})`);
  haloGradient.addColorStop(1, `rgba(200, 220, 255, 0)`);
  
  ctx.fillStyle = haloGradient;
  ctx.beginPath();
  ctx.arc(star.x, star.y, haloRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Destellos en forma de cruz
  const glowOpacity = opacity * 0.2;
  ctx.strokeStyle = `rgba(255, 255, 255, ${glowOpacity})`;
  ctx.lineWidth = 0.6;
  
  // Línea horizontal
  ctx.beginPath();
  ctx.moveTo(star.x - haloRadius * 0.8, star.y);
  ctx.lineTo(star.x + haloRadius * 0.8, star.y);
  ctx.stroke();
  
  // Línea vertical
  ctx.beginPath();
  ctx.moveTo(star.x, star.y - haloRadius * 0.8);
  ctx.lineTo(star.x, star.y + haloRadius * 0.8);
  ctx.stroke();
}

// Crear un meteoro (estrella fugaz)
function createMeteor() {
  meteors.push({
    x: Math.random() * canvasWidth,
    y: Math.random() * (canvasHeight * 0.3), // Solo en el tercio superior
    velocityX: -(Math.random() * (CONFIG.METEOR_SPEED_X_MAX - CONFIG.METEOR_SPEED_X_MIN) + CONFIG.METEOR_SPEED_X_MIN),
    velocityY: Math.random() * (CONFIG.METEOR_SPEED_Y_MAX - CONFIG.METEOR_SPEED_Y_MIN) + CONFIG.METEOR_SPEED_Y_MIN,
    life: 0
  });
}

// Intentar generar un meteoro
function spawnMeteor() {
  if (Math.random() < CONFIG.METEOR_SPAWN_CHANCE) {
    createMeteor();
  }
}

// Dibujar un meteoro con cola
function drawMeteor(meteor) {
  // Actualizar posición
  meteor.x += meteor.velocityX;
  meteor.y += meteor.velocityY;
  meteor.life++;
  
  // Calcular opacidad basada en vida
  const opacity = 1 - meteor.life / CONFIG.METEOR_LIFETIME;
  
  // Cabeza brillante del meteoro
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.beginPath();
  ctx.arc(meteor.x, meteor.y, 2.2, 0, Math.PI * 2);
  ctx.fill();
  
  // Cola con gradiente
  const tailEndX = meteor.x - meteor.velocityX * CONFIG.METEOR_TAIL_LENGTH;
  const tailEndY = meteor.y - meteor.velocityY * CONFIG.METEOR_TAIL_LENGTH;
  
  const tailGradient = ctx.createLinearGradient(
    meteor.x, meteor.y,
    tailEndX, tailEndY
  );
  tailGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
  tailGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
  
  ctx.strokeStyle = tailGradient;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(meteor.x, meteor.y);
  ctx.lineTo(tailEndX, tailEndY);
  ctx.stroke();
}

// Loop principal de animación
function animateCanvas() {
  // Limpiar canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  // Dibujar todas las estrellas
  stars.forEach(star => drawStar(star));
  
  // Dibujar y actualizar meteoros
  for (let i = meteors.length - 1; i >= 0; i--) {
    const meteor = meteors[i];
    drawMeteor(meteor);
    
    // Eliminar meteoros que ya no son visibles
    const isOutOfBounds = 
      meteor.x < -100 || 
      meteor.x > canvasWidth + 100 || 
      meteor.y > canvasHeight + 100;
    const isDead = meteor.life > CONFIG.METEOR_LIFETIME;
    
    if (isOutOfBounds || isDead) {
      meteors.splice(i, 1);
    }
  }
  
  // Continuar animación
  requestAnimationFrame(animateCanvas);
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
  music.volume = CONFIG.MUSIC_VOLUME;
  
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

// Inicializar sistema de música
function initializeMusic() {
  musicBtn.addEventListener('click', (event) => {
    //event.stopPropagation();  // ← ESTO EVITA QUE EL CLICK LLEGUE AL DOCUMENT
    toggleMusic();
  });
  
  startMusic();
  console.log('✓ Sistema de música inicializado');
}

// =========== INICIALIZACIÓN =======================
function init() {
  console.log('✨ Inicializando secret_birthday26...');
  
  // Configurar canvas
  resizeCanvas();
  initializeStars();
  animateCanvas();
  
  // Configurar generación de meteoros
  setInterval(spawnMeteor, 
    CONFIG.METEOR_SPAWN_INTERVAL_MIN + 
    Math.random() * (CONFIG.METEOR_SPAWN_INTERVAL_MAX - CONFIG.METEOR_SPAWN_INTERVAL_MIN)
  );
  
  // Mostrar primera línea
  showLine();
  
  // Event listeners
  document.addEventListener('click', handleScreenClick);
  window.addEventListener('resize', resizeCanvas);

  initializeMusic();
  
  console.log('✓ Inicialización completa');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);