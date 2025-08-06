'use client'

export default function Hero() {
  return (
    <header id="hero" className="relative overflow-hidden bg-gray-950 min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 text-center bg-grid">
      <div className="z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 leading-tight mb-4 animate-fade-in-up">
          Convertimos tus ideas en productos digitales.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
          Soluciones simples, pragmáticas y efectivas para problemas reales.
        </p>
        <a href="#contact" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 animate-fade-in-up delay-400">
          Empecemos tu proyecto
        </a>
      </div>
    </header>
  )
}
