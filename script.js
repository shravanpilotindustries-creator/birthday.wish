/* ================================
   BIRTHDAY WEBSITE CONFIGURATION
   Change these values to personalize
   the website without editing HTML.
=================================== */
const config = {
  name: "Raj Sahu",
  shortName: "Raj",
  // Add an MP3 path here if you want music.
  // Example: music: "assets/birthday-song.mp3"
  music: ""
};

const $ = (selector) => document.querySelector(selector);
const welcome = $("#welcome");
const birthday = $("#birthday");
const loader = $("#loader");
const musicBtn = $("#musicBtn");
const canvas = $("#confettiCanvas");
const ctx = canvas.getContext("2d");

function applyConfig() {
  document.title = `Happy Birthday, ${config.name} 🎂`;
  $("#heroName").textContent = config.name;
  $("#navName").textContent = config.shortName;
  $("#finalName").textContent = config.shortName;
}

window.addEventListener("load", () => {
  applyConfig();
  setTimeout(() => loader.classList.add("hide"), 450);
});

let audio = null;
let musicPlaying = false;

function setupMusic() {
  if (!config.music) {
    musicBtn.textContent = "♪";
    musicBtn.title = "Add an MP3 path in script.js to enable music";
    return;
  }
  audio = new Audio(config.music);
  audio.loop = true;
  audio.volume = 0.35;
}

musicBtn.addEventListener("click", async () => {
  if (!audio) return;
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    musicBtn.textContent = "🔇";
  } else {
    try {
      await audio.play();
      musicPlaying = true;
      musicBtn.textContent = "🔊";
    } catch {
      musicBtn.textContent = "▶";
    }
  }
});

setupMusic();

$("#openGift").addEventListener("click", () => {
  welcome.classList.remove("active");
  welcome.classList.add("hidden");
  birthday.classList.remove("hidden");
  document.body.style.overflowX = "hidden";
  launchCelebration(180);
  createHearts(35);
  window.scrollTo({top: 0, behavior: "instant"});
  if (audio) {
    audio.play().then(() => {
      musicPlaying = true;
      musicBtn.textContent = "🔊";
    }).catch(() => {});
  }
});

$("#celebrateBtn").addEventListener("click", () => {
  launchCelebration(260);
  createHearts(55);
});

$("#replayBtn").addEventListener("click", () => {
  birthday.classList.add("hidden");
  welcome.classList.remove("hidden");
  window.scrollTo({top: 0, behavior: "smooth"});
});

function createHearts(count) {
  const icons = ["💖", "❤️", "✨", "🌹", "🎈"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "heart-particle";
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.bottom = `${-30 - Math.random() * 80}px`;
    el.style.animationDuration = `${3 + Math.random() * 3}s`;
    el.style.animationDelay = `${Math.random() * 1.2}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }
}

let pieces = [];
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchCelebration(count = 180) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  pieces = Array.from({length: count}, () => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * .35,
    size: 5 + Math.random() * 7,
    speed: 2 + Math.random() * 4,
    drift: -1.5 + Math.random() * 3,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -.15 + Math.random() * .3,
    shape: Math.random() > .5 ? "rect" : "circle"
  }));
  if (!animationId) animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces.forEach(p => {
    p.y += p.speed;
    p.x += p.drift;
    p.rotation += p.rotationSpeed;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, 1 - p.y / window.innerHeight));
    ctx.fillStyle = ["#ffffff", "#ffd166", "#ff2f68", "#7c3aed", "#06b6d4"][Math.floor(Math.random() * 5)];
    if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.7);
    else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  });
  pieces = pieces.filter(p => p.y < window.innerHeight + 30);
  if (pieces.length) animationId = requestAnimationFrame(animateConfetti);
  else { animationId = null; ctx.clearRect(0,0,window.innerWidth,window.innerHeight); }
}
