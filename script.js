// ══════════════════════════════════════════
//  🎂 BIRTHDAY WEBSITE — CONFIGURATION
// ══════════════════════════════════════════

const CONFIG = {
  recipientName: "Silviya",
  premiumCode: "29062006",
  birthdayMonth: 6,
  birthdayDay: 29,
};

// Memory card details
const MEMORIES = [
  {
    emoji: "🌅",
    photo: "photo1.jpg",
    title: "First time we met",
    text: "I still remember how nervous I was. The moment I saw you, I knew this would be something extraordinary. You smiled and the whole room got warmer."
  },
  {
    emoji: "🎶",
    photo: "photo2.jpg",
    title: "That night we laughed",
    text: "We talked for hours about everything and nothing. That was the night I realized you were someone I never wanted to stop talking to."
  },
  {
    emoji: "🌸",
    photo: "photo3.jpg",
    title: "When I knew you were special",
    text: "It wasn't one moment — it was a thousand small ones. The way you notice things others miss. The way you care, quietly and deeply."
  },
  {
    emoji: "✨",
    photo: "photo4.jpg",
    title: "Every moment with you",
    text: "There's a kind of magic in spending time with you. The world slows down and the best parts shine brighter. That's you — you make everything better."
  }
];

// ══════════════════════════════════════════
//  🚀 INIT
// ══════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll("#recipient-name, #premium-name");
  els.forEach(el => el.textContent = CONFIG.recipientName);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dateEl = document.getElementById("birthday-date");
  if (dateEl) {
    dateEl.textContent = `${months[CONFIG.birthdayMonth - 1]} ${CONFIG.birthdayDay} 🎂`;
  }

  createPetals();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// ══════════════════════════════════════════
//  📱 SCREEN NAVIGATION
// ══════════════════════════════════════════

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
    s.style.display = "none";
  });
  const target = document.getElementById(id);
  target.style.display = "flex";
  target.classList.add("active");
  window.scrollTo(0, 0);
}

function showFreeVersion() {
  showScreen("free-screen");
}

function showPremiumUnlock() {
  showScreen("unlock-screen");
  document.getElementById("code-input").value = "";
  document.getElementById("error-msg").textContent = "";
}

function checkCode() {
  const input = document.getElementById("code-input").value.trim().toLowerCase();
  const errorEl = document.getElementById("error-msg");

  if (input === CONFIG.premiumCode) {
    showScreen("premium-screen");
    setTimeout(launchConfetti, 400);
  } else {
    errorEl.textContent = "Hmm, that's not right. Try again 💭";
    document.getElementById("code-input").classList.add("shake");
    setTimeout(() => document.getElementById("code-input").classList.remove("shake"), 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("code-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkCode();
  });
});

// ══════════════════════════════════════════
//  ⏳ COUNTDOWN TIMER
// ══════════════════════════════════════════

function updateCountdown() {
  const now = new Date();
  let nextBirthday = new Date(now.getFullYear(), CONFIG.birthdayMonth - 1, CONFIG.birthdayDay);

  if (now > nextBirthday) {
    nextBirthday = new Date(now.getFullYear() + 1, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay);
  }

  const diff = nextBirthday - now;
  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2, "0");

  const dEl = document.getElementById("t-days");
  const hEl = document.getElementById("t-hours");
  const mEl = document.getElementById("t-mins");
  const sEl = document.getElementById("t-secs");

  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(minutes);
  if (sEl) sEl.textContent = pad(seconds);
}

// ══════════════════════════════════════════
//  🌸 FLOATING PETALS
// ══════════════════════════════════════════

function createPetals() {
  const container = document.getElementById("petals-container");
  const emojis = ["🌸", "🌷", "✨", "💖", "🌺", "⭐", "💫"];

  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = (0.7 + Math.random() * 1) + "rem";
    petal.style.animationDuration = (6 + Math.random() * 10) + "s";
    petal.style.animationDelay = (Math.random() * 10) + "s";
    container.appendChild(petal);
  }
}

// ══════════════════════════════════════════
//  🎉 CONFETTI BURST
// ══════════════════════════════════════════

function launchConfetti() {
  const container = document.getElementById("confetti");
  if (!container) return;
  container.innerHTML = "";
  const emojis = ["🎉", "🎊", "✨", "💖", "🌟", "🎈", "💫"];

  for (let i = 0; i < 24; i++) {
    const el = document.createElement("span");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.setProperty("--tx", (Math.random() * 260 - 130) + "px");
    el.style.setProperty("--ty", (Math.random() * -180 - 40) + "px");
    el.style.animationDelay = (Math.random() * 0.5) + "s";
    container.appendChild(el);
  }
}

// ══════════════════════════════════════════
//  🎵 MUSIC PLAYER
// ══════════════════════════════════════════

let isPlaying = false;

function toggleMusic() {
  const audio = document.getElementById("birthday-audio");
  const btn   = document.getElementById("play-btn");
  const vinyl = document.getElementById("vinyl");

  if (isPlaying) {
    audio.pause();
    btn.textContent = "▶ Play";
    vinyl.classList.remove("spinning");
    isPlaying = false;
  } else {
    audio.play().catch(() => {
      alert("Song file not found! Make sure favouritesong.mp3 is uploaded to GitHub.");
    });
    btn.textContent = "⏸ Pause";
    vinyl.classList.add("spinning");
    isPlaying = true;
  }
}

// ══════════════════════════════════════════
//  📸 MEMORY MODAL
// ══════════════════════════════════════════

function openMemory(index) {
  const mem = MEMORIES[index];

  // Show photo in modal
  let photoEl = document.getElementById("modal-photo");
  if (!photoEl) {
    photoEl = document.createElement("img");
    photoEl.id = "modal-photo";
    photoEl.style.cssText = "width:100%;border-radius:14px;margin-bottom:1rem;max-height:200px;object-fit:cover;";
    document.querySelector(".modal-content").insertBefore(photoEl, document.getElementById("modal-title"));
  }

  if (mem.photo) {
    photoEl.src = mem.photo;
    photoEl.style.display = "block";
    document.getElementById("modal-emoji").textContent = "";
  } else {
    photoEl.style.display = "none";
    document.getElementById("modal-emoji").textContent = mem.emoji;
  }

  document.getElementById("modal-title").textContent = mem.title;
  document.getElementById("modal-text").textContent  = mem.text;
  document.getElementById("memory-modal").classList.add("open");
}

function closeMemory() {
  document.getElementById("memory-modal").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("memory-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "memory-modal") closeMemory();
  });
});