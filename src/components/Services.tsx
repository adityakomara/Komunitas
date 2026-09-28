export default function Services() {
  const services = [
    {
      icon: '💻',
      title: 'Software Development',
      description: 'Pengembangan aplikasi web dan mobile dengan teknologi terkini. Dari konsep hingga deployment.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: '📊',
      title: 'Data Science & AI',
      description: 'Analisis data, machine learning, dan implementasi AI untuk solusi bisnis yang cerdas.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Pelatihan keamanan siber, penetration testing, dan audit keamanan infrastruktur IT.',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: '☁️',
      title: 'Cloud Computing',
      description: 'Migrasi cloud, arsitektur cloud-native, dan optimasi infrastruktur cloud untuk efisiensi.',
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Desain antarmuka yang intuitif dan pengalaman pengguna yang memorable untuk produk digital.',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: '📱',
      title: 'Workshop & Training',
      description: 'Program pelatihan intensif, bootcamp, dan workshop untuk meningkatkan skill IT anggota.',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <section id="layanan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            Layanan Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Apa yang Kami Tawarkan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai program dan layanan yang kami sediakan untuk mendukung perkembangan profesional di bidang teknologi informasi.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{service.icon}</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
              
              {/* Hover Gradient Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Tertarik dengan layanan kami?</h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Bergabunglah dengan TechNusa dan dapatkan akses ke berbagai program eksklusif untuk mengembangkan karir IT Anda.
            </p>
            <a
              href="#kontak"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Daftar Sekarang →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
