<?php
/**
 * Header bersama: <head>, meta SEO/OG, dan navbar.
 * Variabel $SITE harus tersedia dari config.php.
 */
if (!isset($SITE)) {
    require_once __DIR__ . '/../config.php';
}
$currentPage = basename($_SERVER['SCRIPT_NAME']);
?>
<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= e($SITE['title']) ?></title>
  <meta name="description" content="<?= e($SITE['description']) ?>" />
  <meta name="author" content="<?= e($SITE['author']) ?>" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="<?= e($SITE['title']) ?>" />
  <meta property="og:description" content="<?= e($SITE['description']) ?>" />
  <meta property="og:locale" content="id_ID" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css?v=<?= filemtime(BASE_PATH . '/style.css') ?>" />
</head>
<body>

  <!-- Cursor glow -->
  <div class="cursor-glow" aria-hidden="true"></div>

  <!-- ===== NAVBAR ===== -->
  <header class="navbar" id="navbar">
    <nav class="container nav-inner">
      <a href="index.php" class="logo">raka<span>.dev</span></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.php#home" class="nav-link<?= ($currentPage === 'index.php') ? ' active' : '' ?>">Beranda</a></li>
        <li><a href="about.php" class="nav-link<?= ($currentPage === 'about.php') ? ' active' : '' ?>">Tentang</a></li>
        <li><a href="projects.php" class="nav-link<?= ($currentPage === 'projects.php' || $currentPage === 'project.php') ? ' active' : '' ?>">Proyek</a></li>
        <li><a href="contact.php" class="nav-link<?= ($currentPage === 'contact.php') ? ' active' : '' ?>">Kontak</a></li>
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" id="themeToggle" aria-label="Ganti tema">
          <svg class="icon-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </button>
        <a href="contact.php" class="btn btn-primary btn-sm">Hubungi Saya</a>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  </header>
