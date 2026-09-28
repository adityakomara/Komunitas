export default function About() {
  return (
    <section id="tentang" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Tentang Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mengenal TechNusa Lebih Dekat
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami adalah komunitas profesional IT yang berkomitmen untuk memajukan ekosistem teknologi di Indonesia melalui kolaborasi, edukasi, dan inovasi.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Visi & Misi Kami</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Visi</h4>
                    <p className="text-white/80">Menjadi organisasi IT terdepan yang melahirkan talenta digital berkelas dunia dan mendorong transformasi digital Indonesia.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🚀</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Misi</h4>
                    <ul className="text-white/80 space-y-2">
                      <li>• Mengembangkan kompetensi anggota melalui pelatihan berkualitas</li>
                      <li>• Membangun jaringan profesional IT yang solid</li>
                      <li>• Mendorong inovasi dan riset teknologi</li>
                      <li>• Berkontribusi pada transformasi digital nasional</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-blue-200 rounded-2xl -z-10"></div>
          </div>

          {/* Right - Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Siapa Kami?
            </h3>
            <p className="text-gray-600 mb-6">
              TechNusa didirikan pada tahun 2018 oleh sekelompok profesional IT yang memiliki visi yang sama: membangun komunitas teknologi yang inklusif dan berdampak positif bagi Indonesia.
            </p>
            <p className="text-gray-600 mb-8">
              Dengan lebih dari 500 anggota aktif yang tersebar di berbagai kota di Indonesia, kami telah menjadi wadah bagi developer, designer, data scientist, dan profesional IT lainnya untuk belajar, berbagi, dan tumbuh bersama.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-blue-600 text-lg">💪</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Kolaborasi</h4>
                <p className="text-gray-500 text-xs mt-1">Bekerja bersama untuk hasil terbaik</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-purple-600 text-lg">🎓</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Edukasi</h4>
                <p className="text-gray-500 text-xs mt-1">Belajar tanpa henti</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-green-600 text-lg">💡</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Inovasi</h4>
                <p className="text-gray-500 text-xs mt-1">Selalu berpikir maju</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-orange-600 text-lg">🤝</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">Inklusivitas</h4>
                <p className="text-gray-500 text-xs mt-1">Terbuka untuk semua</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
