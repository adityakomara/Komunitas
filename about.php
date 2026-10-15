<?php
/**
 * Halaman Tentang — profil lengkap, keahlian, dan pengalaman.
 */
require_once __DIR__ . '/config.php';
$SITE['title'] = 'Tentang — ' . $SITE['author'];
require_once __DIR__ . '/includes/header.php';
?>

  <!-- ===== HERO HALAMAN ===== -->
  <section class="page-hero">
    <div class="container">
      <p class="section-tag reveal">— Tentang Saya</p>
      <h1 class="section-title reveal">Desain bertemu kode,<br/>ide bertemu eksekusi.</h1>
    </div>
  </section>

  <!-- ===== ABOUT ===== -->
  <section class="section about" id="about-detail">
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
        <h2 class="section-title reveal">Halo, saya <span class="gradient-text"><?= e($PROFILE['name']) ?></span> 👋</h2>
        <?php foreach ($PROFILE['bio'] as $para): ?>
        <p class="reveal"><?= $para ?></p>
        <?php endforeach; ?>
        <ul class="about-list reveal">
          <?php foreach ($PROFILE['highlights'] as $hl): ?>
          <li><span class="check">✓</span> <?= e($hl) ?></li>
          <?php endforeach; ?>
        </ul>
        <a href="#" class="btn btn-ghost reveal" onclick="alert('Siapkan CV kamu di sini 😊'); return false;">Unduh CV
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>
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

<?php require_once __DIR__ . '/includes/footer.php'; ?>
