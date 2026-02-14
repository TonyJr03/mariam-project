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

// Función para actualizar el color de la burbuja del 14 de febrero
function updateValentineBubbleColor() {
  const valentineBubble = document.querySelector('[data-target="14feb2026.html"]');
  
  if (!valentineBubble) return; // Si no existe la burbuja, salir
  
  try {
    const saved = localStorage.getItem('heart-14feb2026');
    
    if (!saved) {
      // No hay estado guardado, usar color por defecto (gris)
      valentineBubble.setAttribute('data-state', 'poco');
      return;
    }
    
    const state = JSON.parse(saved);
    const lastState = state.lastState;
    
    if (!lastState) {
      // No hay estado revelado, usar color por defecto
      valentineBubble.setAttribute('data-state', 'poco');
      return;
    }
    
    // Asignar el estado como data-attribute para aplicar estilos CSS
    valentineBubble.setAttribute('data-state', lastState);
    
  } catch (error) {
    console.warn('Error al cargar estado del corazón:', error);
    valentineBubble.setAttribute('data-state', 'poco');
  }
}

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
  updateValentineBubbleColor(); // Actualizar color de burbuja del 14 de febrero
  
  console.log('✓ Inicialización completa');
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', init);