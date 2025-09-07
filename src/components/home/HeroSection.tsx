import '../../styles/home.css';

export const HeroSection = () => {

  const videojuegosDestacados = [
    { titulo: "The Last Adventure", descripcion: "Explora aventuras y emociones únicas.", imagenUrl: "https://swebtoon-phinf.pstatic.net/20240328_240/1711576904110LLXKh_JPEG/4EpisodeList_Mobile.jpg?type=crop540_540" },
    { titulo: "Racing Pro", descripcion: "Velocidad y adrenalina en cada carrera.", imagenUrl: "https://play-lh.googleusercontent.com/MRBqr4DVQRW2vV7omkkPvF5MEdLJtpZh3w8QUXL9BF2l5OvffsibDdXeLQQIPmFWV5M" },
    { titulo: "Fantasy World", descripcion: "Sumérgete en mundos llenos de magia y fantasía.", imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZvY-S89-pdt8sMs41HmX4nWCLgBrv_2S9ig&s" },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-white via-blue-50 to-blue-100 text-gray-900">

        {/* Hero Principal */}
        <div className="relative w-full h-screen">
          <img
            src="https://4kwallpapers.com/images/walls/thumbs_3t/16725.jpg"
            alt="Hero Videojuegos"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start px-8 lg:px-32 space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl animate-bounce hover:scale-105 transition-transform duration-1000 text-white">
              GameLoan: Préstamos de Videojuegos
            </h1>
            <p className="text-lg md:text-xl drop-shadow-sm text-gray-200 hover:text-yellow-300 transition-colors duration-700">
              Consigue los videojuegos que quieres sin pagar todo al contado. GameLoan te permite acceder a los títulos más populares y devolverlos en cómodos plazos.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <a href="/login" className="px-6 py-3 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transform hover:scale-105 transition-all">
                Empieza ahora
              </a>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="py-20 max-w-screen-xl mx-auto px-4 grid sm:grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Variedad de Juegos", desc: "Encuentra todo tipo de títulos para todos los gustos.", icon: "🎮" },
            { title: "Devoluciones Fáciles", desc: "Devuelve tus juegos sin complicaciones en los plazos acordados.", icon: "🔄" },
            { title: "Pagos Cómodos", desc: "Planifica tus pagos en cómodas cuotas según tu conveniencia.", icon: "💰" }
          ].map((b, i) => (
            <div key={i} className="bg-white p-16 rounded-2xl shadow-xl text-center hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
              <div className="text-5xl mb-4">{b.icon}</div>
              <h3 className="text-3xl font-bold mb-4">{b.title}</h3>
              <p className="text-gray-700 text-lg">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="py-20 flex flex-wrap justify-center gap-12">
          {[
            { num: "120+", label: "Juegos", color: "bg-blue-600" },
            { num: "80+", label: "Usuarios", color: "bg-green-600" },
            { num: "250+", label: "Préstamos", color: "bg-purple-600" }
          ].map((s, i) => (
            <div key={i} className={`${s.color} text-white p-16 rounded-2xl shadow-2xl text-center transform transition-all duration-700 hover:scale-110 hover:rotate-1 w-64`}>
              <p className="text-5xl font-bold">{s.num}</p>
              <p className="text-2xl">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Videojuegos Destacados */}
        <div className="py-24 max-w-screen-xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">Videojuegos Destacados</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12">
            {videojuegosDestacados.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-700">
                <img src={v.imagenUrl} alt={v.titulo} className="w-full h-72 object-cover" />
                <div className="p-8 text-center">
                  <h3 className="text-3xl font-bold mb-3">{v.titulo}</h3>
                  <p className="text-gray-700 text-lg">{v.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="py-24 bg-gradient-to-r from-blue-50 via-blue-100 to-white text-center">
          <h2 className="text-5xl font-bold mb-6">¿Listo para empezar?</h2>
          <p className="text-gray-700 mb-8 text-xl">Únete a GameLoan y empieza a disfrutar de tus videojuegos favoritos hoy mismo.</p>
          <a href="/login" className="px-10 py-4 bg-blue-600 rounded-lg font-bold text-white hover:bg-blue-500 transition-colors shadow-lg hover:shadow-2xl">
            Comenzar Ahora
          </a>
          <div className="loader-wrapper">
            <div className="packman"></div>
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>


      </section>
     

    </>
  );
};
