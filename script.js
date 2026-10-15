/* ============================================================
   PORTFOLIO 2026 — Interactions
============================================================ */

// ---------- Theme toggle (dark-first, persisted) ----------
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// ---------- Navbar scroll state ----------
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

// ---------- Mobile menu ----------
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

// ---------- Active nav link on scroll (scrollspy) ----------
const sections = document.querySelectorAll("section[id]");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach((l) => {
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// ---------- Typewriter effect (hanya di beranda) ----------
const typewriterEl = document.getElementById("typewriter");
if (typewriterEl) {
  // Frasa dapat dioverride dari PHP via window.TYPED_PHRASES
  const phrases = Array.isArray(window.TYPED_PHRASES) && window.TYPED_PHRASES.length
    ? window.TYPED_PHRASES
    : [
        "aplikasi web yang cepat ⚡",
        "antarmuka yang memukau ✨",
        "pengalaman pengguna terbaik 💜",
        "animasi yang hidup 🎬",
      ];
  let pIdx = 0, cIdx = 0, deleting = false;

  function typeLoop() {
    const phrase = phrases[pIdx];
    typewriterEl.textContent = phrase.slice(0, cIdx);

    if (!deleting && cIdx < phrase.length) {
      cIdx++;
      setTimeout(typeLoop, 70);
    } else if (!deleting && cIdx === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
    } else if (deleting && cIdx > 0) {
      cIdx--;
      setTimeout(typeLoop, 35);
    } else {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(typeLoop, 350);
    }
  }
  typeLoop();
}

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 4) * 90}ms`;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Animated counters ----------
const counters = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
counters.forEach((c) => counterObserver.observe(c));

// ---------- Skill bars animate in view ----------
const bars = document.querySelector(".bars");
if (bars) {
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          bars.classList.add("animate");
          barObserver.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );
  barObserver.observe(bars);
}

// ---------- Project filtering (opsional, bila ada #filterBar) ----------
const filterBar = document.getElementById("filterBar");
if (filterBar) {
  const projectCards = document.querySelectorAll(".project-card");

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    e.preventDefault();

    filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
      if (show) {
        card.classList.remove("visible");
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("visible")));
      }
    });
  });
}

// ---------- Spotlight effect on skill cards ----------
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

// ---------- Cursor glow follow ----------
const glow = document.querySelector(".cursor-glow");
let gx = 0, gy = 0, tx = 0, ty = 0;

window.addEventListener("pointermove", (e) => {
  tx = e.clientX;
  ty = e.clientY;
});

(function moveGlow() {
  gx += (tx - gx) * 0.12;
  gy += (ty - gy) * 0.12;
  glow.style.left = gx + "px";
  glow.style.top = gy + "px";
  requestAnimationFrame(moveGlow);
})();

// ---------- Back to top ----------
const toTopBtn = document.getElementById("toTop");
if (toTopBtn) {
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- Validasi client-side utk form kontak PHP ----------
const phpForm = document.querySelector('form.contact-form[method="post"]');
if (phpForm) {
  phpForm.addEventListener("submit", (e) => {
    const name = phpForm.name.value.trim();
    const email = phpForm.email.value.trim();
    const subject = phpForm.subject.value.trim();
    const message = phpForm.message.value.trim();

    let msg = "";
    if (!name || !email || !subject || !message) {
      msg = "Mohon isi semua kolom terlebih dahulu 🙏";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg = "Format email belum valid 😅";
    }
    if (msg) {
      e.preventDefault();
      let box = phpForm.querySelector(".client-err");
      if (!box) {
        box = document.createElement("div");
        box.className = "alert err client-err";
        phpForm.prepend(box);
      }
      box.textContent = msg;
    }
  });
}
