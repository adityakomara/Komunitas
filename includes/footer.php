<?php
/**
 * Footer bersama.
 */
if (!isset($SITE)) {
    require_once __DIR__ . '/../config.php';
}
?>
  <!-- ===== FOOTER ===== -->
  <footer class="footer">
    <div class="container footer-inner">
      <a href="index.php" class="logo">raka<span>.dev</span></a>
      <p>© <?= e((string)$SITE['year']) ?> <?= e($SITE['author']) ?>. Dibuat dengan ☕ dan banyak pixel.</p>
      <button class="to-top" id="toTop" aria-label="Kembali ke atas">↑</button>
    </div>
  </footer>

  <script src="script.js?v=<?= filemtime(BASE_PATH . '/script.js') ?>"></script>
</body>
</html>
