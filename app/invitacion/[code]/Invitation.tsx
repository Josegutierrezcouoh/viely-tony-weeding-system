import Image from "next/image"
import Countdown from "../../components/Countdown"
import RSVPForm from "../../components/RSVPForm"
import InfoCard from "./components/InfoCard"
import SimpleCard from "./components/SimpleCard"
import SectionCard from "./components/SectionCard"

type InvitationContentProps = {
  invitation: {
    id: string
    guest_name: string
    max_guests: number
    rsvps?: {
      confirmed_guests: number
      attending: boolean
      created_at: string
    }
  }
}

export default function Invitation({ invitation }: InvitationContentProps) {
  const rsvp = invitation?.rsvps
  const hasResponded = !!rsvp

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-300 to-[red]/5 ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/01_nuestra_historia.jpeg"
            alt="Viely y Tony"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-block">
              <svg className="w-16 h-16 md:w-24 md:h-24 text-[#8A048C] mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl text-[#73026B] mb-6 leading-tight shine-text" style={{ fontFamily: 'var(--font-fleur)' }}>
            Viely & Tony
          </h1>
          <div className="w-24 h-1 bg-[#8A048C] mx-auto mb-6 relative overflow-hidden">
            <div className="absolute inset-0 shine-effect"></div>
          </div>
          <p className="text-xl md:text-2xl text-[#73026B] mb-4 font-light tracking-wide shine-text">
            Nos casamos
          </p>
          <p className="text-4xl md:text-5xl text-[#73026B] mb-8 shine-text" style={{ fontFamily: 'var(--font-fleur)' }}>
            02 de Enero, 2026
          </p>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border-2 border-[#8A048C]/30 inline-block">
            <p className="text-3xl md:text-4xl text-[#73026B] mb-2" style={{ fontFamily: 'var(--font-fleur)' }}>
              Estimado/a
            </p>
            <p className="text-2xl md:text-3xl text-[#8A048C] font-medium">
              {invitation.guest_name},
            </p>
            <p className="text-xl md:text-2xl text-[#73026B] mb-4 font-light tracking-wide">
              Acompáñanos
            </p>

             Pase para {invitation ? (
              <>
                {invitation.max_guests} invitado(s)
              </>
            ) : (
              "No ha confirmado asistencia"
            )}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Información de la Ceremonia */}
      <section className="py-16 bg-white bg-[url('/pattern.png')] bg-repeat">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl text-[#73026B] text-center mb-12" style={{ fontFamily: 'var(--font-fleur)' }}>
            Ceremonia de Boda
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <InfoCard
              icon={
                <svg className="w-8 h-8 text-[#8A048C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="Fecha y Hora"
            >
              <div className="space-y-2 text-gray-700">
                <p className="text-lg"><span className="font-medium">Misa:</span> 6:00 PM</p>
                <p className="text-lg"><span className="font-medium">Ceremonia Civil:</span> 8:00 PM</p>
              </div>
            </InfoCard>

            <InfoCard
              icon={
                <svg className="w-8 h-8 text-[#8A048C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Lugar"
            >
              <p className="text-xl font-medium text-gray-700">Quinta el Paraíso</p>
            </InfoCard>
          </div>

          {/* Código de Vestimenta */}
          <div className="mb-12">
            <InfoCard
              icon={
                <svg className="w-8 h-8 text-[#8A048C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              title="Código de Vestimenta"
              className="max-w-2xl mx-auto"
            >
              <p className="text-xl font-medium text-gray-700">Formal / Semi-formal</p>
            </InfoCard>
          </div>

          {/* Iglesia */}
          <div className="mb-12">
            <InfoCard
              icon={
                <svg className="w-8 h-8 text-[#8A048C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              title="Ceremonia Religiosa"
              className="max-w-2xl mx-auto"
            >
              <p className="text-xl font-medium text-gray-700">Iglesia San Juan Bautista</p>
            </InfoCard>
          </div>

          {/* Novios */}
          <div className="mb-12 text-center">

            <h3 className="text-3xl font-serif text-[#73026B] mb-6">Los Novios</h3>
            <div className="flex flex-row items-center justify-center mb-8">
              <Image src={"/white_rose.png"} alt={""} width={100} height={100} className="scale-x-[-1]" />
              
              <Image src={"/white_rose.png"} alt={""} width={100} height={100} />
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <p className="text-4xl text-gray-800 wrap-break-word" style={{ fontFamily: 'var(--font-fleur)' }}>Argimiro Antonio <br /> Ávila Manzanilla</p>
              <p className="text-4xl text-gray-800 wrap-break-word" style={{ fontFamily: 'var(--font-fleur)' }}>Viely Rosaura <br /> Pacab Canul</p>
            </div>

          </div>



          {/* Padres */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <SectionCard title="Padres del Novio" roseNumber={1}>
              <p>Alberto Antonio Ávila Montalvo</p>
              <p>Silvia del Socorro Manzanilla Ku</p>
            </SectionCard>
            <SectionCard title="Padres de la Novia" roseNumber={2}>
              <p>Bernardino Pacab Dzul</p>
              <p>Ligia Feliciana Canul Dzul</p>
            </SectionCard>
          </div>

          {/* Padrinos */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <SectionCard title="Padrinos del Novio" roseNumber={3}>
              <p>Genaro Montalvo Montalvo</p>
              <p>María del Rosario Cabrera Fuentes</p>
            </SectionCard>
            <SectionCard title="Padrinos de la Novia" roseNumber={4}>
              <p>Eduardo Raúl Pacab Chan</p>
              <p>Landy María May Couoh</p>
            </SectionCard>
          </div>

          {/* Damas de Honor */}
          <div className="mb-12">
            <h3 className="text-3xl font-serif text-[#73026B] text-center mb-8">Damas de Honor</h3>
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
                <div key={index} className="p-4  text-center">
                  <p className="text-gray-800">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pajes */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif text-[#73026B] mb-6">Pajes</h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <p className="text-gray-800 p-4">Adam Antonio Ávila Pacab</p>
              <p className="text-gray-800 p-4">Ingrid Daniela Rojas Pacab</p>
            </div>
            <div className="flex flex-row items-center justify-center mb-8">
              <Image src={"/petalos.png"} alt={""} width={100} height={100} />
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Fotos */}
      <section className="py-16 bg-linear-to-b from-white to-[#73026B]/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl text-[#73026B] text-center mb-12" style={{ fontFamily: 'var(--font-fleur)' }}>
            Nuestra Historia
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "01_nuestra_historia.jpeg",
              "02_nuestra_historia.jpeg",
              "03_nuestra_historia.jpeg",
              "04_nuestra_historia.jpeg",
              "06_nuestra_historia.jpeg",
              "07_nuestra_historia.jpeg",
              "08_nuestra_historia.jpeg",
              "09_nuestra_historia.jpeg",
              "10_nuestra_historia.jpeg",
              "13_nuestra_historia.jpeg",
              "14_nuestra_historia.jpeg",
              "16_nuestra_historia.jpeg",

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
          <h2 className="text-5xl md:text-6xl text-[#73026B] text-center mb-12" style={{ fontFamily: 'var(--font-fleur)' }}>
            Ubicación
          </h2>
          <div className="rounded-lg overflow-hidden shadow-2xl border-4 border-[#73026B]/20">


            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d936.0278344202555!2d-89.28235096684233!3d20.212693954283314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f57053dacf0187b%3A0xf5479fdfba6e03e5!2sQuinta%20Paraiso!5e0!3m2!1sen!2smx!4v1766207059143!5m2!1sen!2smx"
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
              href="https://maps.app.goo.gl/o4siwukbxyZBvsUP7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#8A048C] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#73026B] transition-colors shadow-lg"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp-section" className="py-16 bg-linear-to-b from-[#73026B]/5 to-white">
        <div className="max-w-6xl mx-auto px-4">
          {!hasResponded ? (
            <RSVPForm
              invitationId={invitation.id}
              maxGuests={invitation.max_guests}
              guestName={invitation.guest_name}
            />
          ) : (
            <div className="text-center py-12">
              <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg p-8 max-w-md">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>

                {rsvp.attending ? (
                  <>
                    <h3 className="text-2xl font-serif text-[#73026B] mb-2">
                      ¡Gracias por confirmar!
                    </h3>
                    <p className="text-gray-700">
                      Confirmaste <strong>{rsvp.confirmed_guests}</strong> personas.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-serif text-gray-800 mb-2">
                      Respuesta registrada
                    </h3>
                    <p className="text-gray-600">
                      Lamentamos que no puedas acompañarnos 💐
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Obsequios */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl text-[#73026B] text-center mb-8" style={{ fontFamily: 'var(--font-fleur)' }}>
            Obsequios
          </h2>
          <div className="bg-linear-to-br from-[#73026B]/5 to-white p-8 rounded-lg shadow-lg border border-[#73026B]/20">
            <p className="text-center text-gray-700 text-lg mb-8">
              Para nosotros tu presencia será lo más importante, pero si deseas darnos un obsequio con gusto te aceptamos un sobre o una transferencia.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md border border-[#8A048C]/30 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#8A048C] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <h3 className="text-2xl font-serif text-[#73026B] text-center">Datos de Transferencia</h3>
              </div>
              <div className="space-y-3 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tarjeta</p>
                  <p className="text-xl font-mono font-medium text-gray-800">5256 7821 2303 4095</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Banco</p>
                  <p className="text-lg font-medium text-gray-800">Banamex</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Titular</p>
                  <p className="text-lg font-medium text-gray-800">Viely Rosaura Pacab Canul</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#73026B] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <div className="mb-6">
            <svg className="w-12 h-12 text-white/70 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-3xl mb-2" style={{ fontFamily: 'var(--font-fleur)' }}>Viely & Tony</p>
          <p className="text-white/80">02 de Enero, 2026</p>
          <p className="text-white/60 mt-4 text-sm">
            Con todo nuestro amor, esperamos celebrar este día especial contigo
          </p>
        </div>
      </footer>
    </div>
  )
}
