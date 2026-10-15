<?php
/**
 * Halaman Detail Proyek — project.php?id=1..N (data tambahan dari data/projects.php).
 */
require_once __DIR__ . '/config.php';

$PROJECT_DETAILS = require BASE_PATH . '/data/projects.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$index = $id - 1;

if (!isset($PROJECTS[$index])) {
    http_response_code(404);
    $SITE['title'] = 'Proyek tidak ditemukan';
    require __DIR__ . '/includes/header.php';
    echo '<section class="page-hero"><div class="container"><h1 class="section-title">404 — Proyek tidak ditemukan 😅</h1>'
        . '<p class="reveal" style="margin-top:1rem"><a class="btn btn-primary" href="projects.php">Kembali ke Daftar Proyek</a></p></div></section>';
    require __DIR__ . '/includes/footer.php';
    exit;
}

$p = $PROJECTS[$index];
$detail = $PROJECT_DETAILS[$id] ?? [];
$SITE['title'] = $p['title'] . ' — ' . $SITE['author'];

// Proyek terkait (kategori sama, kecuali diri sendiri)
$related = [];
foreach ($PROJECTS as $i => $other) {
    if ($i !== $index && $other['category'] === $p['category']) {
        $related[] = ['id' => $i + 1, 'data' => $other];
    }
}

require __DIR__ . '/includes/header.php';
?>

  <!-- ===== HERO DETAIL ===== -->
  <section class="page-hero">
    <div class="container">
      <p class="section-tag reveal">— Studi Kasus</p>
      <h1 class="section-title reveal"><?= e($p['title']) ?></h1>
      <p class="reveal" style="color:var(--text-muted); margin-top:.75rem"><?= e($p['cat_label']) ?></p>
    </div>
  </section>

  <section class="section">
    <div class="container narrow">
      <div class="project-thumb detail-thumb reveal visible" style="--g1:<?= e($p['g1']) ?>;--g2:<?= e($p['g2']) ?>">
        <span class="thumb-emoji" style="font-size:6rem"><?= e($p['emoji']) ?></span>
      </div>

      <div class="detail-meta reveal">
        <div class="tags"><?php foreach ($p['tags'] as $t): ?><span><?= e($t) ?></span><?php endforeach; ?></div>
        <?php if (!empty($detail['year'])): ?><span class="meta-chip">📅 <?= e($detail['year']) ?></span><?php endif; ?>
        <?php if (!empty($detail['role'])): ?><span class="meta-chip">🧑‍💻 <?= e($detail['role']) ?></span><?php endif; ?>
      </div>

      <h2 class="reveal" style="margin-top:2rem">Ringkasan</h2>
      <p class="reveal"><?= e($p['desc']) ?></p>

      <?php if (!empty($detail['challenge'])): ?>
      <h2 class="reveal">Tantangan</h2>
      <p class="reveal"><?= e($detail['challenge']) ?></p>
      <?php endif; ?>

      <?php if (!empty($detail['solution'])): ?>
      <h2 class="reveal">Solusi</h2>
      <p class="reveal"><?= e($detail['solution']) ?></p>
      <?php endif; ?>

      <?php if (!empty($detail['results'])): ?>
      <h2 class="reveal">Hasil</h2>
      <ul class="about-list reveal">
        <?php foreach ($detail['results'] as $r): ?>
        <li><span class="check">✓</span> <?= e($r) ?></li>
        <?php endforeach; ?>
      </ul>
      <?php endif; ?>

      <div class="detail-actions reveal" style="margin-top:2.5rem; display:flex; gap:1rem; flex-wrap:wrap">
        <a href="#" class="btn btn-primary" onclick="alert('Link demo proyek segera tersedia 🚀'); return false;">Live Demo</a>
        <a href="projects.php" class="btn btn-ghost">← Semua Proyek</a>
      </div>
    </div>
  </section>

  <?php if (!empty($related)): ?>
  <section class="section projects" style="padding-top:0">
    <div class="container">
      <p class="section-tag center reveal">— Terkait</p>
      <h2 class="section-title center reveal">Proyek serupa</h2>
      <div class="project-grid">
        <?php foreach ($related as $rel): $rp = $rel['data']; ?>
        <article class="project-card reveal visible">
          <a class="project-thumb" href="project.php?id=<?= (int)$rel['id'] ?>" style="--g1:<?= e($rp['g1']) ?>;--g2:<?= e($rp['g2']) ?>">
            <span class="thumb-emoji"><?= e($rp['emoji']) ?></span>
            <div class="project-overlay"><span class="ov-btn">↗</span></div>
          </a>
          <div class="project-info">
            <span class="project-cat"><?= e($rp['cat_label']) ?></span>
            <h3><a href="project.php?id=<?= (int)$rel['id'] ?>"><?= e($rp['title']) ?></a></h3>
            <p><?= e($rp['desc']) ?></p>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

<?php require __DIR__ . '/includes/footer.php'; ?>
