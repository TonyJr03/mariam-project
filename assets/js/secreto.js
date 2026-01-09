const lineas = [
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

const texto = document.getElementById("texto");

let idx = 0;
let mostrando = false;

//========= Funcion del texto ================
function mostrarLinea() {
  mostrando = true;
  texto.classList.remove("fade-in");
  texto.classList.remove("fade-out");

  texto.style.opacity = 0;
  texto.innerHTML = lineas[idx];

  setTimeout(() => {
    texto.classList.add("fade-in");
    mostrando = false;
  }, 50);
}

function avanzar() {
  if (mostrando) return;

  // Si estamos en la última línea: no avanzar texto, mostrar epílogo
  if (idx === lineas.length - 1) {
    const ep = document.getElementById("epilogo");
    ep.textContent = "Una historia de nosotros dos";
    setTimeout(() => {
      ep.style.opacity = 1;
    }, 1500);
    return;
  }

  texto.classList.add("fade-out");

  setTimeout(() => {
    idx++;
    mostrarLinea();
  }, 600);
}

// iniciar
mostrarLinea();

// click/tap para avanzar
document.addEventListener("click", (e) => {
  // si hicieron click en el botón de música → ignorar
  if (e.target.id === "music-btn" || e.target.closest("#music-btn")) return;
  
  avanzar();
});

// ======== SISTEMA DE ESTRELLAS + FUGACES ========
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

let w, h;
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Crear estrellas normales
const numStars = 200;
const stars = [];
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.3 + 0.5,
    o: Math.random() * 0.8 + 0.2,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleAmp: Math.random() * 0.4 + 0.4
  });
}

// Crear estrellas fugaces
const meteors = [];

function createMeteor() {
  // salen desde arriba y cruzan toda la pantalla
  const x = Math.random() * w;
  const y = Math.random() * (h * 0.3);

  // velocidades: horizontales amplias + vertical suave
  const vx = -(Math.random() * 6 + 4); // puede ir a izq o der
  const vy = Math.random() * 1 + 0.8; // más lento

  meteors.push({
    x, y, vx, vy, life: 0
  });
}

// frecuencia calmada pero visible
function spawnMeteor() {
  if (Math.random() < 0.5) { // 70% probabilidad en cada ciclo
    createMeteor();
  }
}

setInterval(spawnMeteor, 1200 + Math.random() * 1200);

// Dibujar
function animateStars() {
  ctx.clearRect(0, 0, w, h);

  // ⭐ estrellas normales
  stars.forEach(s => {
    s.twinklePhase += s.twinkleSpeed;
    const pulse = Math.sin(s.twinklePhase) * s.twinkleAmp;
    const opacity = Math.min(Math.max(s.o + pulse, 0.1), 1);
    const r = s.r;
    const haloRadius = r * 5;

    ctx.fillStyle = `rgba(255,255,255,${opacity})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
    ctx.fill();

    const haloGrad = ctx.createRadialGradient(s.x, s.y, r, s.x, s.y, haloRadius);
    haloGrad.addColorStop(0, `rgba(255,255,255,${opacity * 0.25})`);
    haloGrad.addColorStop(0.5, `rgba(200,220,255,${opacity * 0.15})`);
    haloGrad.addColorStop(1, `rgba(200,220,255,0)`);

    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(s.x, s.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    const glowOpacity = opacity * 0.2;
    ctx.strokeStyle = `rgba(255,255,255,${glowOpacity})`;
    ctx.lineWidth = 0.6;

    ctx.beginPath();
    ctx.moveTo(s.x - haloRadius * 0.8, s.y);
    ctx.lineTo(s.x + haloRadius * 0.8, s.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(s.x, s.y - haloRadius * 0.8);
    ctx.lineTo(s.x, s.y + haloRadius * 0.8);
    ctx.stroke();
  });

  // 🌠 estrellas fugaces
  meteors.forEach((m, i) => {
    m.x += m.vx;
    m.y += m.vy;
    m.life++;

    // Longitud de la cola
    const tail = 25;

    // Cabeza brillante (núcleo)
    ctx.fillStyle = `rgba(255,255,255,${1 - m.life / 40})`;
    ctx.beginPath();
    ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Cola degradada
    const grad = ctx.createLinearGradient(
      m.x, m.y,
      m.x - m.vx * tail,
      m.y - m.vy * tail
    );
    grad.addColorStop(0, `rgba(255,255,255,${1 - m.life / 40})`);
    grad.addColorStop(1, `rgba(255,255,255,0)`);

    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.vx * tail, m.y - m.vy * tail);
    ctx.stroke();

    // borrar cuando termine la vida o salga de pantalla
    if (m.life > 40 || m.x < -100 || m.x > w + 100 || m.y > h + 100) {
      meteors.splice(i, 1);
    }
  });

  requestAnimationFrame(animateStars);
}
animateStars();

//============= Musica =====================
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let musicPlaying = false;

function startMusic() {
  music.volume = 0.8;
  music.play().then(() => {
    musicPlaying = true;
    musicBtn.textContent = "⏸️";
  }).catch(() => {
    console.log("Esperando interacción para reproducir música...");
  });
}
startMusic();

musicBtn.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    musicBtn.textContent = "🎶";
  } else {
    music.play();
    musicBtn.textContent = "⏸️";
  }
  musicPlaying = !musicPlaying;
});