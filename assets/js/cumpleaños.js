const pages = document.querySelectorAll('.page');
let currentPage = 0;

//Funcion para cambio de las páginas
function nextPage() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.remove('active');
    currentPage++;
    pages[currentPage].classList.add('active');
  }
}

//Petalos de sakura cayendo
const sakuraContainer = document.getElementById('sakura-container');

function createSakuraPetal(isSecret = false) {
  const petal = document.createElement('div');
  petal.classList.add('sakura');

  if (isSecret) {
    petal.classList.add('secret-petal');
    petal.addEventListener('click', () => {
      document.body.classList.add('fade-out');
      
      setTimeout(() => {
        window.location.href = 'secreto.html';
      }, 1200);
    });

  }

  const size = Math.random() * 8 + 8;
  if (isSecret) {
    petal.style.width = `16px`;
    petal.style.height = `16px`;

    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.animationDuration = '18s';
    petal.style.opacity = 0.9;
  } else {
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.animationDuration = Math.random() * 5 + 8 + 's';
    petal.style.opacity = Math.random() * 0.5 + 0.4;
  }

  sakuraContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 18000);
}

setInterval(createSakuraPetal, 500);

//Boton de musica
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

//Petalo secreto
music.addEventListener("timeupdate", () => {
  if (music.duration - music.currentTime <= 0.2) {
    secretDropped = true;
    createSakuraPetal(true);
  }
});