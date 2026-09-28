export default function Events() {
  const events = [
    {
      date: '15 Jan 2025',
      title: 'Tech Talk: AI & Machine Learning',
      description: 'Diskusi tentang implementasi AI dalam industri Indonesia dengan pembicara dari Google dan Tokopedia.',
      type: 'Seminar',
      status: 'Selesai',
      color: 'bg-blue-500',
    },
    {
      date: '20 Feb 2025',
      title: 'Hackathon: Smart City Challenge',
      description: 'Kompetisi 48 jam untuk menciptakan solusi teknologi bagi permasalahan kota pintar.',
      type: 'Hackathon',
      status: 'Selesai',
      color: 'bg-purple-500',
    },
    {
      date: '10 Mar 2025',
      title: 'Workshop: Cloud Native Development',
      description: 'Pelatihan intensif menggunakan Kubernetes, Docker, dan microservices architecture.',
      type: 'Workshop',
      status: 'Berlangsung',
      color: 'bg-green-500',
    },
    {
      date: '25 Apr 2025',
      title: 'TechNusa Annual Meetup 2025',
      description: 'Pertemuan tahunan seluruh anggota dengan networking session dan sharing knowledge.',
      type: 'Meetup',
      status: 'Akan Datang',
      color: 'bg-orange-500',
    },
  ];

  return (
    <section id="kegiatan" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
            Kegiatan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Event & Kegiatan Terbaru
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berbagai kegiatan rutin dan event spesial yang kami selenggarakan untuk mengembangkan kompetensi dan memperluas jaringan anggota.
          </p>
        </div>

        {/* Events Timeline */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Date */}
                <div className="flex-shrink-0">
                  <div className="bg-gray-50 rounded-xl px-4 py-3 text-center">
                    <div className="text-sm font-bold text-gray-900">{event.date}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`${event.color} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                      {event.type}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      event.status === 'Berlangsung' ? 'bg-green-100 text-green-700' :
                      event.status === 'Akan Datang' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Detail
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar CTA */}
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
            Lihat semua kegiatan
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
