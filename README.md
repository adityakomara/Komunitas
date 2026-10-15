# Portfolio 2026 — Website PHP Native

Portfolio modern & menarik dibangun dengan **PHP Native murni** (tanpa framework, tanpa database) — multi-halaman dengan desain dark/light mode, animasi scroll, dan form kontak yang diproses server-side.

## ✨ Fitur
- 🧩 **PHP Native multi-page** — Beranda, Tentang, Proyek (dengan filter kategori via GET), Detail Proyek (studi kasus), Kontak
- 🌗 **Dark/Light Mode** — tersimpan otomatis di `localStorage`
- ⌨️ **Efek typewriter**, 📊 animated counters, 🎬 reveal on scroll, 🖱️ cursor glow & spotlight kartu skill
- 🔍 **Filter proyek server-side** — `projects.php?filter=web|design|mobile`
- 📬 **Form kontak fungsional** — validasi server-side PHP, pesan disimpan ke `data/messages.json`, opsi notifikasi `mail()`, proteksi **CSRF token** + **honeypot anti-bot**
- 🔗 **URL dinamis** — `project.php?id=1` lengkap dengan halaman 404 & proyek terkait
- 🛡️ Semua output dinamis di-escape dengan helper `e()` (anti-XSS)
- 📱 Fully responsive + ♿ mendukung `prefers-reduced-motion`

## 🚀 Cara Menjalankan
Persyaratan: PHP >= 8.0 (ekstensi mbstring opsional).

```bash
php -S localhost:8080
# lalu buka http://localhost:8080/index.php
```

Untuk hosting bersama (cPanel, dll.), cukup upload seluruh folder — rename `index.php` menjadi default document bila perlu.

## 📁 Struktur File
```
├── index.php            # Beranda (hero, about ringkas, skills, proyek, timeline, testimoni)
├── about.php            # Halaman Tentang (profil lengkap + keahlian + pengalaman)
├── projects.php         # Daftar proyek + filter kategori (?filter=...)
├── project.php          # Detail studi kasus proyek (?id=1..6) + proyek terkait
├── contact.php          # Form kontak dgn validasi server-side + CSRF + honeypot
├── config.php           # ⭐ SEMUA data profil/konten dikelola di sini
├── includes/
│   ├── header.php       # <head>, meta SEO/OG, navbar (aktif sesuai halaman)
│   └── footer.php       # Footer + script
├── data/
│   ├── projects.php     # Data detail studi kasus per proyek
│   └── messages.json    # (dibuat otomatis) hasil submit form kontak
├── style.css            # Desain & animasi (CSS variables untuk tema)
└── script.js            # Interaksi frontend
```

## 🎨 Kustomisasi Cepat
- **Nama, email, sosial media, proyek, pengalaman, testimoni**: edit `config.php` — tidak perlu menyentuh file HTML sama sekali.
- **Detail studi kasus proyek**: edit `data/projects.php`.
- **Warna tema**: variabel di `:root` pada `style.css` (`--primary`, `--gradient`, dst.)
- **Foto profil**: ganti `.avatar-placeholder` dengan `<img src="foto.jpg">` di `index.php` / `about.php`.

## 📝 Catatan Keamanan
- Input form divalidasi & di-sanitasi di server; tampilan memakai escaping `htmlspecialchars`.
- Token CSRF berbasis session + field honeypot untuk menahan bot sederhana.
- Folder `data/` harus dapat ditulis web server (`chmod 755`/`775`) agar pesan tersimpan.
