export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 py-8 sm:py-12 md:py-16">
      <div className="text-center w-full max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-[#8A048C] mx-auto mb-4 sm:mb-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#73026B] mb-6 sm:mb-8 shine-text px-2" style={{ fontFamily: 'var(--font-fleur)' }}>
          Evento Privado
        </h1>
        
        <div className="w-24 sm:w-32 h-1 bg-[#8A048C] mx-auto mb-6 sm:mb-8 relative overflow-hidden">
          <div className="absolute inset-0 shine-effect"></div>
        </div>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-6 leading-relaxed px-2">
          Este es un evento por invitación exclusiva
        </p>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-[#8A048C]/20 mx-2">
          <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
            Si has recibido una invitación, por favor utiliza el enlace personalizado que te fue enviado para acceder a los detalles del evento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 gap-2 sm:gap-0">
            <svg className="w-6 h-6 text-[#8A048C] sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs sm:text-sm text-gray-500">Acceso restringido</span>
          </div>
        </div>
      </div>
    </div>
  );
}
