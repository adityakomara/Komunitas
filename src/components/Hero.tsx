export default function Hero() {
  return (
    <section id="beranda" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-white/80 text-sm">Organisasi IT Terdepan di Indonesia</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Membangun Masa Depan
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Digital Indonesia
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              TechNusa adalah organisasi profesional di bidang teknologi informasi yang berdedikasi untuk mengembangkan talenta digital, mendorong inovasi, dan membangun ekosistem teknologi yang kuat di Indonesia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#tentang"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 text-center"
              >
                Pelajari Lebih Lanjut
              </a>
              <a
                href="#kontak"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
              >
                Hubungi Kami
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-400">Anggota Aktif</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Project Selesai</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-400">Event Tahunan</div>
              </div>
            </div>
          </div>

          {/* Right Content - Code Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-500 text-xs ml-4">technusa-app.tsx</span>
                </div>
                <pre className="text-sm font-mono">
                  <code>
                    <span className="text-purple-400">{'import'}</span>
                    <span className="text-white">{' { '}</span>
                    <span className="text-cyan-400">{'Innovation'}</span>
                    <span className="text-white">{' } '}</span>
                    <span className="text-purple-400">{'from'}</span>
                    <span className="text-green-400">{" '@technusa'"}</span>
                    <span className="text-white">{';'}</span>
                    {'\n\n'}
                    <span className="text-purple-400">{'const'}</span>
                    <span className="text-blue-400">{' TechNusa'}</span>
                    <span className="text-white">{' = () => {'}</span>
                    {'\n'}
                    <span className="text-white">{'  '}</span>
                    <span className="text-purple-400">{'return'}</span>
                    <span className="text-white">{' ('}</span>
                    {'\n'}
                    <span className="text-white">{'    <'}</span>
                    <span className="text-cyan-400">{'Future'}</span>
                    {'\n'}
                    <span className="text-white">{'      '}</span>
                    <span className="text-green-400">{'vision'}</span>
                    <span className="text-white">{'='}</span>
                    <span className="text-yellow-300">{'"Digital Indonesia"'}</span>
                    {'\n'}
                    <span className="text-white">{'      '}</span>
                    <span className="text-green-400">{'mission'}</span>
                    <span className="text-white">{'='}</span>
                    <span className="text-yellow-300">{'"Innovate & Grow"'}</span>
                    {'\n'}
                    <span className="text-white">{'    >'}</span>
                    {'\n'}
                    <span className="text-white">{'      <'}</span>
                    <span className="text-cyan-400">{'Community'}</span>
                    <span className="text-white">{' />'}</span>
                    {'\n'}
                    <span className="text-white">{'      <'}</span>
                    <span className="text-cyan-400">{'Technology'}</span>
                    <span className="text-white">{' />'}</span>
                    {'\n'}
                    <span className="text-white">{'    </'}</span>
                    <span className="text-cyan-400">{'Future'}</span>
                    <span className="text-white">{'>'}</span>
                    {'\n'}
                    <span className="text-white">{'  );'}</span>
                    {'\n'}
                    <span className="text-white">{'};'}</span>
                  </code>
                </pre>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-3 shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
                <span className="text-2xl">🚀</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl p-3 shadow-lg animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                <span className="text-2xl">💡</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
