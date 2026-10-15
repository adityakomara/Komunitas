<?php
/**
 * Halaman Kontak — form dengan validasi server-side PHP.
 * Pesan disimpan ke data/messages.json (pengganti database).
 */
require_once __DIR__ . '/config.php';

// Fallback penghitung karakter UTF-8 bila ekstensi mbstring tidak terpasang
if (!function_exists('strlen_utf8')) {
    function strlen_utf8(string $str): int
    {
        if (function_exists('mb_strlen')) return mb_strlen($str, 'UTF-8');
        $len = preg_match_all('/./us', $str);
        return $len === false ? strlen($str) : $len;
    }
}
define('MESSAGES_FILE', BASE_PATH . '/data/messages.json');

$errors  = [];
$old     = ['name' => '', 'email' => '', 'subject' => '', 'message' => ''];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Token CSRF sederhana (session-based)
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $postedToken = $_POST['csrf_token'] ?? '';
    $sessionToken = $_SESSION['csrf_token'] ?? '';

    if (!$sessionToken || !hash_equals($sessionToken, $postedToken)) {
        $errors[] = 'Sesi kedaluwarsa. Silakan coba lagi.';
    }

    $old['name']    = trim($_POST['name'] ?? '');
    $old['email']   = trim($_POST['email'] ?? '');
    $old['subject'] = trim($_POST['subject'] ?? '');
    $old['message'] = trim($_POST['message'] ?? '');

    if ($old['name'] === '' || strlen_utf8($old['name']) < 2) {
        $errors['name'] = 'Nama minimal 2 karakter.';
    } elseif (strlen_utf8($old['name']) > 100) {
        $errors['name'] = 'Nama terlalu panjang (maks. 100 karakter).';
    }

    if ($old['email'] === '' || !filter_var($old['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Format email tidak valid.';
    }

    if ($old['subject'] === '') {
        $errors['subject'] = 'Subjek wajib diisi.';
    } elseif (strlen_utf8($old['subject']) > 150) {
        $errors['subject'] = 'Subjek terlalu panjang (maks. 150 karakter).';
    }

    if ($old['message'] === '' || strlen_utf8($old['message']) < 10) {
        $errors['message'] = 'Pesan minimal 10 karakter.';
    } elseif (strlen_utf8($old['message']) > 3000) {
        $errors['message'] = 'Pesan terlalu panjang (maks. 3000 karakter).';
    }

    // Honeypot anti-bot
    if (!empty($_POST['website'])) {
        $errors = []; // diam-diam tolak tanpa diproses
        $success = true;
    }

    if (empty($errors) && !$success) {
        $entry = [
            'time'    => date('Y-m-d H:i:s'),
            'name'    => $old['name'],
            'email'   => $old['email'],
            'subject' => $old['subject'],
            'message' => $old['message'],
            'ip'      => $_SERVER['REMOTE_ADDR'] ?? '-',
        ];

        $list = [];
        if (is_file(MESSAGES_FILE)) {
            $decoded = json_decode((string)file_get_contents(MESSAGES_FILE), true);
            if (is_array($decoded)) $list = $decoded;
        }
        $list[] = $entry;

        if (file_put_contents(MESSAGES_FILE, json_encode($list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX) !== false) {
            $success = true;
            // Opsional: kirim email notifikasi bila server mail tersedia
            @mail(
                $SITE['email'],
                '[Portfolio] Pesan baru: ' . $old['subject'],
                "Dari: {$old['name']} <{$old['email']}>\n\n{$old['message']}",
                'From: noreply@portfolio.local'
            );
            $old = ['name' => '', 'email' => '', 'subject' => '', 'message' => ''];
        } else {
            $errors[] = 'Gagal menyimpan pesan. Coba lagi nanti.';
        }
    }
}

// Token CSRF untuk form
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$SITE['title'] = 'Kontak — ' . $SITE['author'];
require __DIR__ . '/includes/header.php';
?>

  <!-- ===== HERO HALAMAN ===== -->
  <section class="page-hero">
    <div class="container">
      <p class="section-tag reveal">— Kontak</p>
      <h1 class="section-title reveal">Punya ide? Mari<br/>wujudkan bersama.</h1>
    </div>
  </section>

  <section class="section contact" id="contact">
    <div class="container contact-grid">
      <div class="contact-info">
        <p class="reveal">Saya selalu terbuka untuk kolaborasi proyek baru, posisi penuh waktu, atau sekadar ngobrol soal desain & teknologi.</p>
        <div class="contact-items reveal">
          <a href="mailto:<?= e($SITE['email']) ?>" class="contact-item"><span class="ci-icon">✉️</span> <?= e($SITE['email']) ?></a>
          <a class="contact-item"><span class="ci-icon">📍</span> <?= e($SITE['location']) ?></a>
          <div class="socials">
            <?php
            $socialIcons = [
                'GitHub'    => '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.68 5.38-5.24 5.67.41.35.77 1.05.77 2.12v3.14c0 .31.2.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
                'LinkedIn'  => '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.03-3.07-1.87-3.07-1.88 0-2.16 1.46-2.16 2.97V21H9z"/></svg>',
                'Dribbble'  => '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8.5 2.8C12 7 14.5 12.5 15.5 21M21.5 10.5c-6 0-11.5 1.5-16 5M2.7 13.5c4-3.5 9.5-5.5 16.5-5.2"/></svg>',
                'Instagram' => '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" stroke="none"/></svg>',
            ];
            foreach ($PROFILE['socials'] as $name => $url): ?>
            <a href="<?= e($url) ?>" aria-label="<?= e($name) ?>" class="social-btn" target="_blank" rel="noopener"><?= $socialIcons[$name] ?? e($name) ?></a>
            <?php endforeach; ?>
          </div>
        </div>
      </div>

      <form class="contact-form reveal visible" method="post" action="contact.php" novalidate>
        <input type="hidden" name="csrf_token" value="<?= e($_SESSION['csrf_token']) ?>" />
        <input type="text" name="website" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />

        <?php if ($success): ?>
        <div class="alert ok">✅ Terima kasih! Pesan Anda telah tersimpan dan akan segera saya balas.</div>
        <?php endif; ?>
        <?php if (!empty($errors)): ?>
        <div class="alert err">⚠️ Mohon periksa kembali formulir Anda.</div>
        <?php endif; ?>

        <div class="form-row">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" placeholder="Nama lengkap Anda" value="<?= e($old['name']) ?>" required />
            <?php if (!empty($errors['name'])): ?><small class="field-err"><?= e($errors['name']) ?></small><?php endif; ?>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="email@contoh.com" value="<?= e($old['email']) ?>" required />
            <?php if (!empty($errors['email'])): ?><small class="field-err"><?= e($errors['email']) ?></small><?php endif; ?>
          </div>
        </div>
        <div class="form-group">
          <label for="subject">Subjek</label>
          <input type="text" id="subject" name="subject" placeholder="Topik diskusi" value="<?= e($old['subject']) ?>" required />
          <?php if (!empty($errors['subject'])): ?><small class="field-err"><?= e($errors['subject']) ?></small><?php endif; ?>
        </div>
        <div class="form-group">
          <label for="message">Pesan</label>
          <textarea id="message" name="message" rows="5" placeholder="Ceritakan proyek Anda..." required><?= e($old['message']) ?></textarea>
          <?php if (!empty($errors['message'])): ?><small class="field-err"><?= e($errors['message']) ?></small><?php endif; ?>
        </div>
        <button type="submit" class="btn btn-primary btn-full">Kirim Pesan
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </form>
    </div>
  </section>

<?php require __DIR__ . '/includes/footer.php'; ?>
