<?php
/**
 * Halaman Proyek — grid dengan filter kategori server-side (?filter=web|design|mobile|all).
 */
require_once __DIR__ . '/config.php';
$SITE['title'] = 'Proyek — ' . $SITE['author'];

$filter = isset($_GET['filter']) ? preg_replace('/[^a-z]/', '', strtolower($_GET['filter'])) : 'all';
$allowedFilters = ['all', 'web', 'design', 'mobile'];
if (!in_array($filter, $allowedFilters, true)) {
    $filter = 'all';
}

$visibleProjects = array_values(array_filter($PROJECTS, function ($p) use ($filter) {
    return $filter === 'all' || $p['category'] === $filter;
}));

require_once __DIR__ . '/includes/header.php';
?>

  <!-- ===== HERO HALAMAN ===== -->
  <section class="page-hero">
    <div class="container">
      <p class="section-tag reveal">— Portofolio</p>
      <h1 class="section-title reveal">Semua proyek<br/>yang pernah saya kerjakan</h1>
    </div>
  </section>

  <!-- ===== PROJECTS ===== -->
  <section class="section projects" id="projects">
    <div class="container">
      <div class="filter-bar reveal">
        <?php
        $filterLabels = ['all' => 'Semua', 'web' => 'Web App', 'design' => 'Design', 'mobile' => 'Mobile'];
        foreach ($filterLabels as $key => $label):
        ?>
        <a class="filter-btn<?= $filter === $key ? ' active' : '' ?>" href="projects.php?filter=<?= e($key) ?>"><?= e($label) ?></a>
        <?php endforeach; ?>
      </div>

      <?php if (empty($visibleProjects)): ?>
      <p class="empty-state reveal">Belum ada proyek pada kategori ini.</p>
      <?php else: ?>
      <div class="project-grid">
        <?php foreach ($visibleProjects as $p):
            $idx = array_search($p, $PROJECTS) + 1; // id stabil utk detail
        ?>
        <article class="project-card reveal visible">
          <a class="project-thumb" href="project.php?id=<?= $idx ?>" style="--g1:<?= e($p['g1']) ?>;--g2:<?= e($p['g2']) ?>">
            <span class="thumb-emoji"><?= e($p['emoji']) ?></span>
            <div class="project-overlay">
              <span class="ov-btn" title="Lihat detail">↗</span>
            </div>
          </a>
          <div class="project-info">
            <span class="project-cat"><?= e($p['cat_label']) ?></span>
            <h3><a href="project.php?id=<?= $idx ?>"><?= e($p['title']) ?></a></h3>
            <p><?= e($p['desc']) ?></p>
            <div class="tags"><?php foreach ($p['tags'] as $t): ?><span><?= e($t) ?></span><?php endforeach; ?></div>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>
    </div>
  </section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
