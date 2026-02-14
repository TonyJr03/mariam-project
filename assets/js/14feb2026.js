// 14feb2026.js - Sistema interactivo de corazón con amor y amistad

// =========== CONFIGURACIÓN =======================

const CONFIG = {
  // Animaciones
  TRANSITION_DURATION: 400,
  MESSAGE_DELAY: 300,
  
  // LocalStorage
  STORAGE_KEY: 'heart-14feb2026'
};

// Mensajes según el estado
const MESSAGES = {
  'mucho-amor': {
    title: "Un corazón lleno de amor 💕",
    text: "Si esto es amor... entonces gracias por confiarme algo tan grande. Lo recibo como se recibe algo frágil y verdadero: con cuidado, con paciencia, con intención. Y te prometo que este amor solo crecerá, porque lo cuidaré como lo más preciado que he tenido."
  },
  
  'mucha-amistad': {
    title: "La base de todo 💙",
    text: "La amistad también es una forma profunda de querer. Y si ese es el lugar que ocupo en tu vida, te agradezco que me permitas estar ahí. Porque la amistad verdadera es el cimiento sobre el cual todo lo demás puede crecer."
  },
  
  'mayor-amor': {
    title: "El amor prevalece 💗",
    text: "Saber que hay algo más que simple cercanía me hace sonreir. No lo apresuro, no lo exijo, solo valoro. Porque lo que crece sin presión suele ser lo más fuerte."
  },
  
  'mayor-amistad': {
    title: "La amistad primero 🤝",
    text: "Que me veas como alguien importante en tu mundo ya es algo que no doy por sentado. No todo tiene que convertirse en otra cosa para ser significativo. A veces, estar cerca... ya es suficiente."
  },
  
  'equilibrado': {
    title: "El balance perfecto ⚖️",
    text: "Tal vez lo nuestro no necesite definirse todavía. Hay sentimientos que viven en ese punto medio donde no son solo amistad, pero tampoco necesitan ser más. Y quizás, por ahora, eso esté bien."
  },
  
  'poco': {
    title: "Un corazón por llenar 🤍",
    text: "Gracias por la honestidad. Incluso lo pequeño, cuando es sincero, vale más que una ilusión grande. Yo prefiero la verdad tranquila antes que algo que no se sienta real."
  }
};


// =========== VARIABLES GLOBALES =======================

let amorValue = 0;
let amistadValue = 0;


// =========== ELEMENTOS DEL DOM =======================

const heartSvg = document.getElementById('heart-svg');
const heartContainer = document.querySelector('.heart-container');
const fillAmor = document.getElementById('fill-amor');
const fillAmistad = document.getElementById('fill-amistad');

const sliderAmor = document.getElementById('slider-amor');
const sliderAmistad = document.getElementById('slider-amistad');
const valueAmor = document.getElementById('value-amor');
const valueAmistad = document.getElementById('value-amistad');

const totalFill = document.getElementById('total-fill');      
const totalValue = document.getElementById('total-value');

const revealBtn = document.getElementById('reveal-btn');
const messageSection = document.getElementById('message-section');
const messageOverlay = document.getElementById('message-overlay');
const messageTitle = document.getElementById('message-title');
const messageText = document.getElementById('message-text');
const closeBtnX = document.getElementById('close-btn-x');
const closeBtn = document.getElementById('close-btn');

// =========== SISTEMA DE SLIDERS =======================

// Actualizar el corazón visualmente
function updateHeart() {
  // Altura del relleno de amor (0-90, porque el corazón va de y=10 a y=100)
  const heightAmor = (amorValue / 100) * 80;
  const heightAmistad = (amistadValue / 100) * 80;

  // Posición Y: comienza desde abajo (100) y sube según el valor
  const yPositionAmor = 90 - heightAmor;
  const yPositionAmistad = yPositionAmor - heightAmistad;
  
  fillAmor.setAttribute('y', yPositionAmor);
  fillAmor.setAttribute('height', heightAmor);

  fillAmistad.setAttribute('y', yPositionAmistad);
  fillAmistad.setAttribute('height', heightAmistad);

  // Opacidad (0 a 1)
  const opacityTotal = (amorValue + amistadValue) / 100;
  fillAmor.setAttribute('opacity', opacityTotal);
  fillAmistad.setAttribute('opacity', opacityTotal);
}

// Actualizar indicadores visuales
function updateIndicators() {
  const total = amorValue + amistadValue;
  
  // Actualizar valores de texto
  valueAmor.textContent = `${amorValue}%`;
  valueAmistad.textContent = `${amistadValue}%`;
  totalValue.textContent = total;
  
  // Crear efecto de "gases mezclándose"
  updateGasEffect();
}

// Crear el efecto de gases mezclándose en la barra
function updateGasEffect() {
  const total = amorValue + amistadValue;
  
  // Si no hay nada, la barra está vacía
  if (total === 0) {
    totalFill.style.background = 'transparent';
    totalFill.style.opacity = '0';
    return;
  }
  
  // Calcular proporciones
  const amorProportion = amorValue / 100;
  const amistadProportion = amistadValue / 100;
  
  // Opacidad general basada en el total (el "tubo se llena")
  const overallOpacity = total / 100;
  
  // Crear gradiente que simula gases mezclándose
  // Amor tiende a la izquierda, amistad a la derecha
  
  if (amorValue > 0 && amistadValue === 0) {
    // Solo amor: todo rosa
    totalFill.style.background = `linear-gradient(
      90deg,
      var(--color-amor-dark),
      var(--color-amor-mid),
      var(--color-amor-light)
    )`;
  } 
  else if (amistadValue > 0 && amorValue === 0) {
    // Solo amistad: todo azul
    totalFill.style.background = `linear-gradient(
      90deg,
      var(--color-amistad-light),
      var(--color-amistad-mid),
      var(--color-amistad-dark)
    )`;
  }
  else {
    // Ambos presentes: mezcla gradual
    // Calcular puntos de transición basados en proporciones
    
    const amorEnd = amorProportion * 100;
    const amistadStart = (1 - amistadProportion) * 100;
    const mixZone = (amorEnd + amistadStart) / 2;
    
    // Crear gradiente con zona de mezcla
    totalFill.style.background = `linear-gradient(
      90deg,
      var(--color-amor-dark) 0%,
      var(--color-amor-mid) ${amorEnd * 0.2}%,
      var(--color-amor-light) ${amorEnd * 0.6}%,
      rgba(255, 105, 180, 0.8) ${amorEnd * 0.8}%,
      rgba(200, 130, 200, 0.9) ${mixZone - 5}%,
      rgba(150, 150, 220, 0.9) ${mixZone}%,
      rgba(100, 170, 230, 0.9) ${mixZone + 5}%,
      rgba(107, 213, 237, 0.8) ${amistadStart* 1.2}%,
      var(--color-amistad-light) ${amistadStart * 1.4}%,
      var(--color-amistad-mid) ${amistadStart * 1.8}%,
      var(--color-amistad-dark) 100%
    )`;
  }
  
  // Aplicar opacidad según el total (efecto de "llenado del tubo")
  totalFill.style.opacity = overallOpacity.toString();
}

// Actualizar animación de latido
function updateHeartbeat() {
  const total = amorValue + amistadValue;
  
  // Quitar todas las clases de latido
  heartContainer.classList.remove('beating', 'beating-intense');
  
  // Si tiene contenido, añadir latido
  if (total > 0 && total < 100) {
    heartContainer.classList.add('beating');
  } else if (total === 100) {
    heartContainer.classList.add('beating-intense');
  }
}

// Manejar cambio en slider de amor
function handleAmorChange() {
  const newAmor = parseInt(sliderAmor.value);
  
  // Si la suma excede 100, ajustar amistad
  if (newAmor + amistadValue > 100) {
    amistadValue = 100 - newAmor;
    sliderAmistad.value = amistadValue;
  }
  
  amorValue = newAmor;
  
  updateHeart();
  updateIndicators();
  updateHeartbeat();
  saveToLocalStorage();
}

// Manejar cambio en slider de amistad
function handleAmistadChange() {
  const newAmistad = parseInt(sliderAmistad.value);
  
  // Si la suma excede 100, ajustar amor
  if (amorValue + newAmistad > 100) {
    amorValue = 100 - newAmistad;
    sliderAmor.value = amorValue;
  }
  
  amistadValue = newAmistad;
  
  updateHeart();
  updateIndicators();
  updateHeartbeat();
  saveToLocalStorage();
}

// =========== EVALUACIÓN DE ESTADOS =======================

// Determinar el estado según los valores
function evaluateState(amor, amistad) {
  const total = amor + amistad;
  
  // Regla 1: Mucho amor (amor ≥ 90)
  if (amor >= 90) {
    return 'mucho-amor';
  }
  
  // Regla 2: Mucha amistad (amistad ≥ 90)
  if (amistad >= 90) {
    return 'mucha-amistad';
  }
  
  // Regla 3: Poco (total < 50)
  if (total < 50) {
    return 'poco';
  }
  
  // Regla 4: Equilibrado (ambos entre 40-60)
  if (amor - amistad <= 20 && amor - amistad >= -20 && amor >= 30 && amistad >= 30) {
    return 'equilibrado';
  }

  // Regla 5: Mayor amor (amor entre 50-89 Y mayor que amistad)
  if (amor >= 50 && amor < 90 && amor > amistad) {
    return 'mayor-amor';
  }
  
  // Regla 6: Mayor amistad (amistad entre 50-89 Y mayor que amor)
  if (amistad >= 50 && amistad < 90 && amistad > amor) {
    return 'mayor-amistad';
  }
  
  // Estado por defecto (casos no cubiertos)
  return 'poco';
}

// Mostrar el mensaje según el estado
function revealMessage() {
  // Evaluar estado
  const state = evaluateState(amorValue, amistadValue);
  const message = MESSAGES[state];
  
  // Actualizar contenido del mensaje
  messageTitle.textContent = message.title;
  messageText.textContent = message.text;
  
  // Mostrar modal
  messageSection.classList.add('show');
  
  console.log(`Estado revelado: ${state}`);
}

// Cerrar el modal
function closeMessage() {
  messageSection.classList.remove('show');
}

// =========== LOCAL STORAGE =======================

// Guardar estado en localStorage
function saveToLocalStorage() {
  const state = {
    amor: amorValue,
    amistad: amistadValue,
    fecha: new Date().toISOString()
  };
  
  localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state));
}

// Cargar estado desde localStorage
function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
    
    if (saved) {
      const state = JSON.parse(saved);
      
      // Restaurar valores
      amorValue = state.amor || 0;
      amistadValue = state.amistad || 0;
      
      // Actualizar sliders
      sliderAmor.value = amorValue;
      sliderAmistad.value = amistadValue;
      
      // Actualizar visuales
      updateHeart();
      updateIndicators();
      updateHeartbeat();
      
      console.log('✓ Estado cargado desde localStorage:', state);
    }
  } catch (error) {
    console.warn('No se pudo cargar el estado guardado:', error);
  }
}


// =========== INICIALIZACIÓN =======================

function init() {
  console.log('💕 Inicializando 14 de Febrero 2026...');
  
  // Cargar estado guardado
  loadFromLocalStorage();
  
  // Event listeners para sliders
  sliderAmor.addEventListener('input', handleAmorChange);
  sliderAmistad.addEventListener('input', handleAmistadChange);
  
  // Event listener para botón revelar
  revealBtn.addEventListener('click', revealMessage);
  // Event listeners para cerrar modal
  closeBtnX.addEventListener('click', closeMessage);
  closeBtn.addEventListener('click', closeMessage);
  messageOverlay.addEventListener('click', closeMessage);
  console.log('✓ Inicialización completa');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);