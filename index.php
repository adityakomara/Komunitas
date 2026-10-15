<?php
/**
 * Beranda — Portfolio PHP Native.
 */
require_once __DIR__ . '/config.php';
$SITE['title'] = $SITE['title']; // judul default untuk beranda
require_once __DIR__ . '/includes/header.php';
?>

  <!-- ===== HERO ===== -->
  <section class="hero" id="home">
    <div class="hero-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="grid-overlay"></div>
    </div>
    <div class="container hero-inner">
      <p class="hero-badge reveal"><span class="dot"></span> Tersedia untuk proyek freelance</p>
      <h1 class="hero-title reveal">
        Halo, saya <span class="gradient-text"><?= e($PROFILE['name']) ?></span>.<br />
        Saya membangun
        <span class="typewriter" id="typewriter"></span>
      </h1>
      <p class="hero-sub reveal"><?= e($PROFILE['tagline']) ?></p>
      <div class="hero-cta reveal">
        <a href="projects.php" class="btn btn-primary">Lihat Karya Saya
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a href="contact.php" class="btn btn-ghost">Mari Berkolaborasi</a>
      </div>
      <div class="hero-stats reveal">
        <?php foreach ($STATS as $stat): ?>
        <div class="stat">
          <span class="stat-num" data-count="<?= (int)$stat['num'] ?>">0</span><span class="stat-plus"><?= $stat['plus'] ? '+' : '' ?></span>
          <p><?= e($stat['label']) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
    <a href="about.php" class="scroll-hint" aria-label="Scroll ke bawah">
      <span class="mouse"><span class="wheel"></span></span>
    </a>
  </section>

  <!-- ===== MARQUEE TECH ===== -->
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <?php for ($r = 0; $r < 2; $r++): ?>
        <?php foreach ($MARQUEE_TECH as $tech): ?>
          <span><?= e($tech) ?></span><i>✦</i>
        <?php endforeach; ?>
      <?php endfor; ?>
    </div>
  </div>

  <!-- ===== ABOUT (ringkasan) ===== -->
  <section class="section about" id="about">
    <div class="container about-grid">
      <div class="about-visual reveal">
        <div class="avatar-frame">
          <div class="avatar-placeholder">
            <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </div>
          <div class="frame-border"></div>
        </div>
        <div class="float-card float-card-1">
          <span>🎨</span>
          <div><strong>UI/UX Design</strong><small>Design system expert</small></div>
        </div>
        <div class="float-card float-card-2">
          <span>⚡</span>
          <div><strong>Performance</strong><small>100 Lighthouse score</small></div>
        </div>
      </div>
      <div class="about-content">
        <p class="section-tag reveal">— Tentang Saya</p>
        <h2 class="section-title reveal">Desain bertemu kode,<br/>ide bertemu eksekusi.</h2>
        <?php foreach ($PROFILE['bio'] as $para): ?>
        <p class="reveal"><?= $para /* sudah HTML aman dari config */ ?></p>
        <?php endforeach; ?>
        <ul class="about-list reveal">
          <?php foreach ($PROFILE['highlights'] as $hl): ?>
          <li><span class="check">✓</span> <?= e($hl) ?></li>
          <?php endforeach; ?>
        </ul>
        <a href="about.php" class="btn btn-ghost reveal">Selengkapnya tentang saya
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ===== SKILLS ===== -->
  <section class="section skills" id="skills">
    <div class="container">
      <p class="section-tag center reveal">— Keahlian</p>
      <h2 class="section-title center reveal">Stack & kemampuan<br/>yang saya kuasai</h2>
      <div class="skills-grid">
        <?php foreach ($SKILL_CARDS as $skill): ?>
        <div class="skill-card reveal">
          <div class="skill-icon"><?= e($skill['icon']) ?></div>
          <h3><?= e($skill['title']) ?></h3>
          <p><?= e($skill['desc']) ?></p>
          <div class="tags"><?php foreach ($skill['tags'] as $t): ?><span><?= e($t) ?></span><?php endforeach; ?></div>
        </div>
        <?php endforeach; ?>
      </div>
      <div class="bars">
        <?php foreach ($SKILL_BARS as $bar): ?>
        <div class="bar-item reveal">
          <div class="bar-head"><span><?= e($bar['label']) ?></span><span><?= (int)$bar['value'] ?>%</span></div>
          <div class="bar"><div class="bar-fill" style="--w:<?= (int)$bar['value'] ?>%"></div></div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ===== PROJECTS (preview 6) ===== -->
  <section class="section projects" id="projects">
    <div class="container">
      <p class="section-tag center reveal">— Portofolio</p>
      <h2 class="section-title center reveal">Proyek pilihan</h2>
      <div class="project-grid">
        <?php foreach ($PROJECTS as $i => $p): ?>
        <article class="project-card reveal">
          <a class="project-thumb" href="project.php?id=<?= $i + 1 ?>" style="--g1:<?= e($p['g1']) ?>;--g2:<?= e($p['g2']) ?>">
            <span class="thumb-emoji"><?= e($p['emoji']) ?></span>
            <div class="project-overlay">
              <span class="ov-btn" title="Lihat detail">↗</span>
            </div>
          </a>
          <div class="project-info">
            <span class="project-cat"><?= e($p['cat_label']) ?></span>
            <h3><a href="project.php?id=<?= $i + 1 ?>"><?= e($p['title']) ?></a></h3>
            <p><?= e($p['desc']) ?></p>
            <div class="tags"><?php foreach ($p['tags'] as $t): ?><span><?= e($t) ?></span><?php endforeach; ?></div>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
      <div class="center-cta reveal">
        <a href="projects.php" class="btn btn-ghost">Semua Proyek
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ===== EXPERIENCE / TIMELINE ===== -->
  <section class="section experience" id="experience">
    <div class="container narrow">
      <p class="section-tag center reveal">— Perjalanan</p>
      <h2 class="section-title center reveal">Pengalaman kerja</h2>
      <div class="timeline">
        <?php foreach ($EXPERIENCES as $exp): ?>
        <div class="timeline-item reveal">
          <div class="timeline-dot"></div>
          <span class="timeline-date"><?= e($exp['date']) ?></span>
          <h3><?= e($exp['title']) ?></h3>
          <p class="company"><?= e($exp['company']) ?></p>
          <p><?= e($exp['desc']) ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ===== TESTIMONIALS ===== -->
  <section class="section testimonials">
    <div class="container">
      <p class="section-tag center reveal">— Testimoni</p>
      <h2 class="section-title center reveal">Kata mereka</h2>
      <div class="testimonial-grid">
        <?php foreach ($TESTIMONIALS as $t): ?>
        <figure class="testimonial-card reveal">
          <div class="stars">★★★★★</div>
          <blockquote>"<?= e($t['quote']) ?>"</blockquote>
          <figcaption>
            <span class="t-avatar" style="--g1:<?= e($t['g1']) ?>;--g2:<?= e($t['g2']) ?>"><?= e($t['initial']) ?></span>
            <div><strong><?= e($t['name']) ?></strong><small><?= e($t['role']) ?></small></div>
          </figcaption>
        </figure>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ===== CTA KONTAK ===== -->
  <section class="section contact" id="contact">
    <div class="container contact-grid">
      <div class="contact-info">
        <p class="section-tag reveal">— Kontak</p>
        <h2 class="section-title reveal">Punya ide? Mari<br/>wujudkan bersama.</h2>
        <p class="reveal">Saya selalu terbuka untuk kolaborasi proyek baru, posisi penuh waktu, atau sekadar ngobrol soal desain & teknologi.</p>
        <div class="contact-items reveal">
          <a href="mailto:<?= e($SITE['email']) ?>" class="contact-item"><span class="ci-icon">✉️</span> <?= e($SITE['email']) ?></a>
          <a href="contact.php" class="contact-item"><span class="ci-icon">📬</span> Kirim pesan lewat form →</a>
        </div>
      </div>
      <div class="contact-form-card reveal">
        <p>Formulir kontak lengkap tersedia di halaman khusus — dengan validasi server-side PHP.</p>
        <a href="contact.php" class="btn btn-primary btn-full">Buka Halaman Kontak
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </a>
      </div>
    </div>
  </section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
