<?php
declare(strict_types=1);

/**
 * Konfigurasi utama website portfolio (PHP Native).
 * Semua data profil & konten dikelola dari file ini agar mudah diubah.
 */

define('APP_NAME', 'raka.dev');
define('BASE_PATH', __DIR__);

// Identitas & SEO
$SITE = [
    'title'        => 'Raka Pratama — Creative Developer & Designer',
    'description'  => 'Portfolio Raka Pratama, creative developer & UI designer. Membangun pengalaman digital yang cepat, indah, dan bermakna.',
    'author'       => 'Raka Pratama',
    'email'        => 'halo@rakapatama.dev',
    'location'     => 'Jakarta, Indonesia',
    'year'         => date('Y'),
];

// Data profil untuk bagian About
$PROFILE = [
    'name'      => 'Raka Pratama',
    'tagline'   => 'Creative developer & UI designer dari Jakarta. Saya merancang dan membangun pengalaman digital yang cepat, indah, dan bermakna — dari landing page hingga aplikasi web skala besar.',
    'bio'       => [
        'Selama lebih dari 5 tahun, saya membantu startup dan brand mengubah ide menjadi produk digital yang dicintai pengguna. Fokus saya adalah persimpangan antara <em>desain yang memukau</em> dan <em>rekayasa yang andal</em>.',
        'Saya percaya detail kecil menciptakan pengalaman besar. Setiap piksel, setiap milidetik, setiap interaksi diperhitungkan.',
    ],
    'highlights' => [
        'Frontend & Full-stack Development',
        'Product & Interface Design',
        'Motion Design & Web Animation',
        'Optimasi Performa & SEO Teknis',
    ],
    'socials' => [
        'GitHub'     => 'https://github.com',
        'LinkedIn'   => 'https://linkedin.com',
        'Dribbble'   => 'https://dribbble.com',
        'Instagram'  => 'https://instagram.com',
    ],
];

// Statistik hero
$STATS = [
    ['num' => 5,  'plus' => true,  'label' => 'Tahun Pengalaman'],
    ['num' => 48, 'plus' => true,  'label' => 'Proyek Selesai'],
    ['num' => 32, 'plus' => false, 'label' => 'Klien Puas'],
    ['num' => 12, 'plus' => true,  'label' => 'Penghargaan'],
];

// Frasa efek ketik pada hero
$TYPEWRITER_PHRASES = [
    'aplikasi web yang cepat ⚡',
    'antarmuka yang memukau ✨',
    'pengalaman pengguna terbaik 💜',
    'animasi yang hidup 🎬',
];

// Teknologi pada marquee
$MARQUEE_TECH = ['React','TypeScript','Next.js','Node.js','Figma','Tailwind CSS','Three.js','GSAP','PostgreSQL','GraphQL','Framer Motion'];

// Keahlian (kartu)
$SKILL_CARDS = [
    ['icon' => '💻', 'title' => 'Development',  'desc' => 'Membangun aplikasi web modern, responsif, dan scalable.',                        'tags' => ['React','Next.js','TypeScript','Node.js']],
    ['icon' => '🎨', 'title' => 'Design',        'desc' => 'Merancang antarmuka bersih dengan sistem desain yang konsisten.',               'tags' => ['Figma','Design System','Prototyping']],
    ['icon' => '✨', 'title' => 'Motion & 3D',   'desc' => 'Menyuntuhkan kehidupan lewat animasi micro-interaction & WebGL.',               'tags' => ['GSAP','Framer Motion','Three.js']],
    ['icon' => '🚀', 'title' => 'Performance',   'desc' => 'Core Web Vitals sempurna, aksesibilitas, dan best practices.',                  'tags' => ['Lighthouse','SEO','A11y']],
];

// Keahlian (bar progres)
$SKILL_BARS = [
    ['label' => 'Frontend Development',     'value' => 95],
    ['label' => 'UI/UX Design',             'value' => 90],
    ['label' => 'Backend & API',            'value' => 82],
    ['label' => 'Motion & Creative Coding', 'value' => 88],
];

// Proyek portofolio
$PROJECTS = [
    ['category' => 'web',    'cat_label' => 'Web App · E-Commerce',  'emoji' => '🛒', 'g1' => '#6366f1', 'g2' => '#a855f7', 'title' => 'NusaMart — Marketplace Modern',  'desc' => 'Platform e-commerce headless dengan checkout < 2 detik dan konversi naik 34%.',                'tags' => ['Next.js','Stripe','Tailwind'],  'links' => ['Live Demo','#','Kode Sumber','#']],
    ['category' => 'design', 'cat_label' => 'Design · Fintech',      'emoji' => '🏦', 'g1' => '#f43f5e', 'g2' => '#fb923c', 'title' => 'Dompetku — Design System',       'desc' => 'Sistem desain lengkap untuk aplikasi keuangan dengan 200+ komponen aksesibel.',                 'tags' => ['Figma','Design Tokens','A11y'], 'links' => ['Case Study','#','Figma','#']],
    ['category' => 'mobile', 'cat_label' => 'Mobile · Health',       'emoji' => '🧘', 'g1' => '#10b981', 'g2' => '#22d3ee', 'title' => 'Tenangan — Meditation App',      'desc' => 'Aplikasi meditasi cross-platform dengan animasi audio-reactive, 50K+ unduhan.',              'tags' => ['React Native','Reanimated'],    'links' => ['Live Demo','#','Kode Sumber','#']],
    ['category' => 'web',    'cat_label' => 'Web App · SaaS',        'emoji' => '📊', 'g1' => '#8b5cf6', 'g2' => '#ec4899', 'title' => 'Insightly — Analytics Dashboard','desc' => 'Dashboard real-time menangani 1M event/hari dengan visualisasi interaktif.',                     'tags' => ['React','D3.js','GraphQL'],      'links' => ['Live Demo','#','Kode Sumber','#']],
    ['category' => 'design', 'cat_label' => 'Creative · WebGL',      'emoji' => '🌊', 'g1' => '#0ea5e9', 'g2' => '#6366f1', 'title' => 'Ombak — Immersive Landing',      'desc' => 'Landing page interaktif dengan simulasi fluid WebGL, Awwwards Honorable Mention.',            'tags' => ['Three.js','GLSL','GSAP'],       'links' => ['Live Demo','#']],
    ['category' => 'mobile', 'cat_label' => 'Mobile · Food',         'emoji' => '🍜', 'g1' => '#f59e0b', 'g2' => '#ef4444', 'title' => 'Rasa — Food Delivery UX',        'desc' => 'Redesign UX food delivery, memangkas waktu pemesanan hingga 41%.',                             'tags' => ['Flutter','UX Research'],        'links' => ['Case Study','#','Kode Sumber','#']],
];

// Pengalaman kerja (timeline)
$EXPERIENCES = [
    ['date' => '2023 — Sekarang', 'title' => 'Senior Creative Developer', 'company' => 'Studio Kilau · Jakarta',  'desc' => 'Memimpin tim frontend dalam membangun pengalaman web imersif untuk brand global. Menginisiasi design system internal yang mempercepat delivery 40%.'],
    ['date' => '2021 — 2023',     'title' => 'Frontend Engineer',         'company' => 'FinTech Nusantara',       'desc' => 'Membangun dashboard analytics real-time dan component library yang digunakan oleh 5 tim produk.'],
    ['date' => '2019 — 2021',     'title' => 'UI Designer & Developer',   'company' => 'Freelance',               'desc' => 'Merilis 20+ proyek untuk UMKM dan startup: dari branding, landing page, hingga aplikasi web penuh.'],
];

// Testimoni
$TESTIMONIALS = [
    ['name' => 'Anindya Kirana',  'role' => 'CEO, NusaMart',                    'initial' => 'A', 'g1' => '#6366f1', 'g2' => '#a855f7', 'quote' => 'Raka bukan sekadar developer — dia partner berpikir. Hasil kerjanya selalu melampaui ekspektasi, tepat waktu, dan rapi sampai detail terkecil.'],
    ['name' => 'Bagas Wirawan',   'role' => 'Head of Product, FinTech Nusantara','initial' => 'B', 'g1' => '#f43f5e', 'g2' => '#fb923c', 'quote' => 'Design system yang dibangun Raka mengubah cara tim kami bekerja. Konsistensi produk naik drastis dan waktu development terpangkas hampir separuh.'],
    ['name' => 'Citra Halim',     'role' => 'Marketing Director, Ombak Studio', 'initial' => 'C', 'g1' => '#10b981', 'g2' => '#22d3ee', 'quote' => 'Landing page yang dibuatnya benar-benar memukau — kami memenangkan penghargaan industri dan conversion naik dua kali lipat. Recommended!'],
];

/**
 * Helper escaping HTML — pakai di semua output dinamis.
 */
function e(string $str): string
{
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}
