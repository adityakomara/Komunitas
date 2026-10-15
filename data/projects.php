<?php
/**
 * Data detail studi kasus per proyek (keyed by id, mulai 1).
 */
return [
    1 => [
        'year'      => '2025',
        'role'      => 'Lead Frontend Developer',
        'challenge' => 'NusaMart membutuhkan migrasi dari platform monolith ke arsitektur headless tanpa mengganggu transaksi harian yang sudah berjalan, serta memangkas waktu loading halaman produk hingga di bawah 2 detik.',
        'solution'  => 'Saya membangun lapisan storefront dengan Next.js dan Stripe, menerapkan ISR untuk halaman produk, skeleton loading, dan optimasi gambar agresif. Checkout disederhanakan menjadi 3 langkah dengan validasi real-time.',
        'results'   => ['Waktu checkout turun dari 6,8s menjadi 1,9s', 'Konversi naik 34% dalam 3 bulan', 'Core Web Vitals seluruh halaman "hijau"'],
    ],
    2 => [
        'year'      => '2024',
        'role'      => 'Design System Lead',
        'challenge' => 'Tim produk FinTech Nusantara memiliki tiga aplikasi dengan gaya visual berbeda-beda, menyebabkan kebingungan pengguna dan kerja ganda dalam development.',
        'solution'  => 'Merancang design system lengkap di Figma — token warna, tipografi, spacing, hingga 200+ komponen dengan dokumentasi aksesibilitas (WCAG AA) dan panduan implementasi untuk tim engineering.',
        'results'   => ['200+ komponen terdokumentasi', 'Waktu development fitur baru turun 45%', 'Audit aksesibilitas internal lulus WCAG AA'],
    ],
    3 => [
        'year'      => '2024',
        'role'      => 'Mobile Developer & Designer',
        'challenge' => 'Aplikasi meditasi perlu terasa tenang bahkan saat interaksi: transisi halus, animasi napas yang sinkron audio, dan performa mulus di perangkat low-end.',
        'solution'  => 'Membangun UI dengan React Native + Reanimated 3 agar seluruh animasi berjalan di native thread, plus visualizer audio-reactive berbasis shader untuk sesi pemanduan.',
        'results'   => ['50K+ unduhan dalam setahun', 'Rating 4.8 di App Store & Play Store', 'Frame rate stabil 60fps di perangkat entry-level'],
    ],
    4 => [
        'year'      => '2023',
        'role'      => 'Frontend Engineer',
        'challenge' => 'Insightly harus merender jutaan event per hari menjadi dashboard interaktif tanpa membuat browser jebol.',
        'solution'  => 'Implementasi virtualisasi daftar, agregasi data di sisi GraphQL, dan visualisasi D3.js dengan canvas rendering untuk dataset besar, plus WebSocket untuk feed real-time.',
        'results'   => ['Menangani 1M event/hari', 'Interaksi chart < 16ms (60fps)', 'Adopsi klien enterprise naik 2x'],
    ],
    5 => [
        'year'      => '2023',
        'role'      => 'Creative Developer',
        'challenge' => 'Ombak Studio ingin landing page yang membuat pengunjung berhenti scrolling — imersif namun tetap ringan dimuat.',
        'solution'  => 'Simulasi fluid WebGL berbasis GLSL custom yang di-degrade otomatis ke video statis pada perangkat lemah, dengan timeline GSAP ScrollTrigger untuk narasi halaman.',
        'results'   => ['Awwwards Honorable Mention', 'Dwell time rata-rata 3 menit', 'Performa tetap 90+ Lighthouse di mobile'],
    ],
    6 => [
        'year'      => '2022',
        'role'      => 'UX Designer & Flutter Developer',
        'challenge' => 'Alur pemesanan Rasa terlalu panjang: riset menunjukkan rata-rata 11 langkah dari buka aplikasi hingga bayar.',
        'solution'  => 'Riset ulang pengguna, pemetaan customer journey, lalu prototipe dan implementasi alur baru dengan Flutter — favorit & reorder sekali klik, pembayaran terintegrasi di layar menu.',
        'results'   => ['Waktu pemesanan turun 41%', 'Task success rate naik dari 68% ke 91%', 'Retensi 7-hari naik 23%'],
    ],
];
