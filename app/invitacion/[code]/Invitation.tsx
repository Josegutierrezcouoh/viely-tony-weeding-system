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
    <div className="min-h-screen bg-linear-to-b from-black to-[red]/5 ">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/disco_ball.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-block">
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-fleur)' }}>
            Fiesta de Mary
          </h1>
          <p className="text-6xl md:text-8xl text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-fleur)', fontSize: '3rem' }}>
            Celebremos juntos mis 50 años
          </p>
          <p className="text-6xl md:text-8xl text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-fleur)', fontSize: '3rem' }}>
            28 de marzo, 2026
          </p>
            <p className="text-3xl md:text-4xl text-[#ffff] mb-2" style={{ fontFamily: 'var(--font-fleur)' }}>
              Invitado/a especial
            </p>
            <p className="text-xl md:text-2xl text-[#ffff] mb-4 font-light tracking-wide" style={{ fontFamily: 'var(--font-fleur)' }}>
              Acompáñame a celebrar
            </p>

            <p className="text-xl md:text-2xl text-white mb-4 font-light tracking-wide" style={{ fontFamily: 'var(--font-fleur)' }}>
              Pase para {invitation ? (
                <>
                  {invitation.max_guests} invitado(s)
                </>
              ) : (
                "No ha confirmado asistencia"
              )}
            </p>
        </div>
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Información del Evento */}
      <section className="py-16 bg-white bg-[url('/pattern.png')] bg-repeat">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl text-[#73026B] text-center mb-12" style={{ fontFamily: 'var(--font-fleur)' }}>
            Detalles del Evento
          </h2>

          <div className="mb-12">
            <InfoCard
              icon={
                <svg className="w-8 h-8 text-[#8A048C] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              title="Fecha y Hora "
              className="max-w-2xl mx-auto"
            >
              <div className="space-y-2 text-gray-700">
                <p className="text-lg"><span className="font-medium">Inicio:</span> 8:00 PM</p>
              </div>
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
              title="Ambiente"
              className="max-w-2xl mx-auto"
            >
              <p className="text-xl font-medium text-gray-700" >
                Fiesta y música
              </p>
            </InfoCard>
          </div>

          {/* Cumpleanera */}
          <div className="mb-12 text-center">

            <h3 className="text-3xl text-[#73026B] mb-6" style={{ fontFamily: 'var(--font-fleur)' }}>La Cumpleañera</h3>

            <div className="flex justify-center mb-6">
              <Image
                src="/mary.jpg"
                alt="Mary Canul"
                width={420}
                height={420}
                className="rounded-full object-cover border-4 border-[#8A048C]/30 shadow-xl"
              />
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-5xl text-gray-800 wrap-break-word" style={{ fontFamily: 'var(--font-fleur)' }}>Mary Canul</p>
            </div>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d321.4525255119984!2d-89.67604819520908!3d20.97371441979375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5673134ec7556b%3A0xc68edb4c8f94b373!2sLA%20LUPITA!5e0!3m2!1ses!2smx!4v1774240413197!5m2!1ses!2smx"
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
              href="https://maps.app.goo.gl/2yerDmBaXZMSvS6Y9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#8A048C] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#73026B] transition-colors shadow-lg"
            >
              Ver en Google Maps
            </a>
          </div>
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
              Más que regalos, agredezco tu compañía, aunque si deseas tener un detalle, con gusto puedes hacerlo en sobre.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#73026B] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <div className="mb-6">
          </div>
          <p className="text-3xl mb-2" style={{ fontFamily: 'var(--font-fleur)' }}>Fiesta de Mary</p>
          <p className="text-white/80">28 de marzo, 2026</p>
          <p className="text-white/60 mt-4 text-sm">
            Gracias por celebrar este dia especial conmigo
          </p>
        </div>
      </footer>
    </div>
  )
}
