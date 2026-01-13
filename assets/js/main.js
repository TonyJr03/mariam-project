//main.js - Navegación con efecto fade

//========== CONFIGURACIÓN ===================
const FADE_DURATION = 1000; // Tiempo del fade en milisegundos

// =========== FUNCIONES DE NAVEGACIÓN ================
// Función para navegar con efecto
function navigateWithFade(url) {
  if (!url) return; // Validación simple
  
  document.body.classList.add('fade-out');
  
  setTimeout(() => {
    window.location.href = url;
  }, FADE_DURATION);
}

// =========== INICIALIZACIÓN =======================

// Función para inicializar los event listeners de las burbujas
function initializeBubbles() {
  // Seleccionar todas las burbujas
  const bubbles = document.querySelectorAll('.bubble');
  
  // Agregar evento click a cada una
  bubbles.forEach(bubble => {
    bubble.addEventListener('click', (event) => {
      event.preventDefault(); // Prevenir navegación inmediata
      const targetUrl = bubble.dataset.target;
      navigateWithFade(targetUrl);
    });
  });
  
  console.log(`✓ ${bubbles.length} burbujas inicializadas`);
}

function init() {
  console.log('-- Inicializando main...');
  
  initializeBubbles();
  
  console.log('✓ Inicialización completa');
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', init);