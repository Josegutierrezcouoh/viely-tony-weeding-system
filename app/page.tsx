import Image from "next/image";
import Countdown from "./components/Countdown";
import RSVPForm from "./components/RSVPForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/WhatsApp Image 2025-09-18 at 7.13.31 PM (1).jpeg"
            alt="Viely y Tony"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-block">
              <svg className="w-16 h-16 md:w-24 md:h-24 text-rose-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-rose-900 mb-6 leading-tight">
            Viely & Tony
          </h1>
          <div className="w-24 h-1 bg-rose-600 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-rose-800 mb-4 font-light tracking-wide">
            Nos casamos
          </p>
          <p className="text-3xl md:text-4xl font-serif text-rose-900 mb-8">
            02 de Enero, 2026
          </p>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Con gran alegría y amor, te invitamos a celebrar nuestra unión en matrimonio
          </p>
        </div>
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Información de la Ceremonia */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-12">
            Ceremonia de Boda
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-lg shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-serif text-rose-900">Fecha y Hora</h3>
              </div>
              <div className="space-y-2 text-gray-700">
                <p className="text-lg"><span className="font-medium">Misa:</span> 6:00 PM</p>
                <p className="text-lg"><span className="font-medium">Ceremonia Civil:</span> 8:00 PM</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-lg shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-rose-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-2xl font-serif text-rose-900">Lugar</h3>
              </div>
              <p className="text-xl font-medium text-gray-700">Quinta el Paraíso</p>
            </div>
          </div>

          {/* Novios */}
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-serif text-rose-900 mb-6">Los Novios</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-rose-50 rounded-lg">
                <p className="text-xl text-gray-800">Argimiro Antonio Ávila Manzanilla</p>
              </div>
              <div className="p-6 bg-rose-50 rounded-lg">
                <p className="text-xl text-gray-800">Viely Rosaura Pacab Canul</p>
              </div>
            </div>
          </div>

          {/* Padres */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-rose-100">
              <h4 className="text-2xl font-serif text-rose-900 mb-4 text-center">Padres del Novio</h4>
              <div className="space-y-2 text-center text-gray-700">
                <p>Alberto Antonio Ávila Montalvo</p>
                <p>Silvia del Socorro Manzanilla Ku</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-rose-100">
              <h4 className="text-2xl font-serif text-rose-900 mb-4 text-center">Padres de la Novia</h4>
              <div className="space-y-2 text-center text-gray-700">
                <p>Bernardino Pacab Dzul</p>
                <p>Ligia Feliciana Canul Dzul</p>
              </div>
            </div>
          </div>

          {/* Padrinos */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-rose-100">
              <h4 className="text-2xl font-serif text-rose-900 mb-4 text-center">Padrinos del Novio</h4>
              <div className="space-y-2 text-center text-gray-700">
                <p>Genaro Montalvo Montalvo</p>
                <p>María del Rosario Cabrera Fuentes</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-rose-100">
              <h4 className="text-2xl font-serif text-rose-900 mb-4 text-center">Padrinos de la Novia</h4>
              <div className="space-y-2 text-center text-gray-700">
                <p>Eduardo Raúl Pacab Chan</p>
                <p>Landy María May Couoh</p>
              </div>
            </div>
          </div>

          {/* Damas de Honor */}
          <div className="mb-12">
            <h3 className="text-3xl font-serif text-rose-900 text-center mb-8">Damas de Honor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Claudia Ajeli Pacab Canul",
                "Julissa Janet Ávila Manzanilla",
                "Mónica Nacira Carrillo Buenfil",
                "Pamela del Carmen Durán Farfán",
                "María Concepción Montero Martín",
                "Ileana Beatriz Carvajal Estrella",
                "Thalia Lucely Chan Argáez",
                "Alba Verónica González Ucán",
                "Flor de Ageldy Cuy Santamaria",
                "Alondra Celeste Aldana Canché",
                "Candy Georgina Canul Alejos",
                "Sara Guadalupe Caamal Pinzón",
                "Wendy Aracelly Chan Briceño",
                "María Zusuki Magaña Pacheco",
                "Lidia Margarita Interian Interian",
              ].map((name, index) => (
                <div key={index} className="p-4 bg-rose-50 rounded-lg text-center border border-rose-100">
                  <p className="text-gray-800">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pajes */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif text-rose-900 mb-6">Pajes</h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-6 bg-rose-50 rounded-lg border border-rose-100">
                <p className="text-gray-800">Adam Antonio Ávila Pacab</p>
              </div>
              <div className="p-6 bg-rose-50 rounded-lg border border-rose-100">
                <p className="text-gray-800">Ingrid Daniela Rojas Pacab</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Fotos */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-12">
            Nuestra Historia
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "WhatsApp Image 2025-09-18 at 7.13.31 PM.jpeg",
              "WhatsApp Image 2025-09-18 at 7.13.32 PM (1).jpeg",
              "WhatsApp Image 2025-09-18 at 7.13.32 PM (2).jpeg",
              "WhatsApp Image 2025-09-18 at 7.13.32 PM (3).jpeg",
              "WhatsApp Image 2025-09-18 at 7.13.35 PM (1).jpeg",
              "WhatsApp Image 2025-09-18 at 7.13.35 PM (2).jpeg",
              "WhatsApp Image 2025-09-18 at 7.13.36 PM (1).jpeg",
              "WhatsApp Image 2025-09-18 at 7.13.37 PM.jpeg",
            ].map((img, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={`/img/${img}`}
                  alt={`Viely y Tony ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-12">
            Ubicación
          </h2>
          <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-rose-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0965364977676!2d-89.61789!3d21.00000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAwJzAwLjAiTiA4OcKwMzcnMDQuNCJX!5e0!3m2!1ses!2smx!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps/search/Quinta+el+Para%C3%ADso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors shadow-lg"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-rose-900 text-center mb-4">
            Confirma tu Asistencia
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Por favor, confirma tu asistencia antes del 20 de diciembre de 2025
          </p>
          <RSVPForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <svg className="w-12 h-12 text-rose-200 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-2xl font-serif mb-2">Viely & Tony</p>
          <p className="text-rose-200">02 de Enero, 2026</p>
          <p className="text-rose-300 mt-4 text-sm">
            Con todo nuestro amor, esperamos celebrar este día especial contigo
          </p>
        </div>
      </footer>
    </div>
  );
}
