'use client'

import { useState, useRef, useEffect } from 'react'
import Invitation from './Invitation'
import Image from 'next/image'

interface Invitation {
    id: string
    guest_name: string
    max_guests: number
    rsvps?: {
        confirmed_guests: number
        attending: boolean
        created_at: string
    }
}

interface InvitationCoverProps {
    invitation: Invitation
}

export default function InvitationCover({ invitation }: InvitationCoverProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [showScrollUp, setShowScrollUp] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (!isOpen) return

        const handleScroll = () => {
            // Detectar si el usuario ha scrolleado más allá de la mitad de la página
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            // Cambiar el botón cuando esté en los últimos 40% de la página (cerca del formulario)
            const threshold = documentHeight - (windowHeight * 2)
            setShowScrollUp(scrollPosition > threshold)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isOpen])

    const handleOpen = () => {
        setIsOpen(true)
        audioRef.current?.play()
        
        // Solicitar pantalla completa
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error al intentar entrar en pantalla completa:', err)
            })
        }
    }

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const scrollToRSVP = () => {
        const rsvpSection = document.getElementById('rsvp-section')
        if (rsvpSection) {
            rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className=' h-screen overflow-y-scroll relative'>
            {/* cover */}
{!isOpen && (
<div className='relative w-full h-screen overflow-hidden bg-white'>
  {/* Disco ball grande (top-right) */}
  <img src="/disco_ball.png" alt="disco ball" loading="lazy"
       className="absolute top-8 right-8 w-28 sm:w-40 transform rotate-6 z-30 drop-shadow-lg" />

  {/* Disco ball pequeño (right-lower) */}
  <img src="/disco_ball.png" alt="disco ball small" loading="lazy"
       className="absolute top-40 right-16 w-16 sm:w-20 transform -rotate-12 z-20 opacity-90" />

    {/* Disco balls extra */}
    <img src="/disco_ball.png" alt="disco ball left" loading="lazy"
      className="absolute top-14 left-28 w-16 sm:w-24 transform rotate-12 z-20 opacity-90" />
    <img src="/disco_ball.png" alt="disco ball bottom" loading="lazy"
      className="absolute bottom-24 right-36 w-14 sm:w-20 transform -rotate-6 z-20 opacity-85" />
    <img src="/disco_ball.png" alt="disco ball lower left" loading="lazy"
      className="absolute bottom-20 left-24 w-12 sm:w-16 transform rotate-3 z-20 opacity-80" />

  {/* Copa (top-left) */}
  <img src="/copa.png" alt="copa" loading="lazy"
       className="absolute top-12 left-6 w-20 sm:w-28 transform -rotate-6 z-30" />

    {/* Copas extra */}
    <img src="/copa.png" alt="copa derecha" loading="lazy"
      className="absolute top-24 right-56 w-14 sm:w-20 transform rotate-10 z-20 opacity-85" />
    <img src="/copa.png" alt="copa inferior" loading="lazy"
      className="absolute bottom-10 left-10 w-16 sm:w-24 transform -rotate-12 z-20 opacity-80" />
    <img src="/copa.png" alt="copa inferior derecha" loading="lazy"
      className="absolute bottom-16 right-8 w-14 sm:w-20 transform rotate-8 z-20 opacity-75" />

  {/* Estrellas dispersas */}
  <img src="/estrella.png" alt="estrella 1" loading="lazy"
       className="absolute top-24 left-1/3 w-10 sm:w-14 z-25 opacity-90" />
  <img src="/estrella.png" alt="estrella 2" loading="lazy"
       className="absolute top-6 left-1/2 -translate-x-1/2 w-8 sm:w-12 z-25 opacity-80" />
  <img src="/estrella.png" alt="estrella 3" loading="lazy"
       className="absolute bottom-36 right-28 w-12 sm:w-16 z-25 opacity-85" />
    <img src="/estrella.png" alt="estrella 4" loading="lazy"
      className="absolute top-44 left-12 w-8 sm:w-12 z-25 opacity-80 rotate-12" />
    <img src="/estrella.png" alt="estrella 5" loading="lazy"
      className="absolute top-52 right-8 w-8 sm:w-12 z-25 opacity-75 -rotate-12" />
    <img src="/estrella.png" alt="estrella 6" loading="lazy"
      className="absolute bottom-52 left-1/4 w-10 sm:w-14 z-25 opacity-85 rotate-6" />
    <img src="/estrella.png" alt="estrella 7" loading="lazy"
      className="absolute bottom-14 left-1/2 -translate-x-1/2 w-8 sm:w-12 z-25 opacity-70" />
    <img src="/estrella.png" alt="estrella 8" loading="lazy"
      className="absolute top-1/3 right-1/4 w-7 sm:w-10 z-25 opacity-75" />
    <img src="/estrella.png" alt="estrella 9" loading="lazy"
      className="absolute top-1/3 left-1/4 w-7 sm:w-10 z-25 opacity-75" />

  {/* Contenedor central (texto / foto) */}
  <div className='absolute inset-0 flex items-center justify-center z-40'>
    <div className='relative w-full h-full'>
      <div className='absolute z-40 top-[30%] left-1/2 -translate-x-1/2 text-center px-4'>
        <p className='text-black/90 text-xl sm:text-2xl tracking-[0.2em] uppercase mb-3'>Invitación Especial</p>
        <h1 className='text-black text-5xl sm:text-7xl leading-tight' style={{ fontFamily: 'var(--font-fleur)' }}>
          Cumpleaños de Mary
        </h1>
      </div>

      <div className='w-full h-full z-50 absolute flex items-center justify-center top-0 left-0'>
        <button
          onClick={handleOpen}
          className='mt-36 rounded-full px-8 py-5 text-base sm:text-lg font-semibold text-[#3a0ca3] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform duration-300'
        >
          Toca aquí
          <br />
          para abrir la invitación
        </button>
      </div>

      <div className='absolute bottom-10 right-10 z-40 text-white/90 text-sm sm:text-base tracking-widest uppercase'>
        28 Marzo 2026
      </div>
    </div>
  </div>
</div>
)}

            {/* invitation component */}
            {isOpen && <Invitation invitation={invitation} />}

            {/* audio control */}
            {isOpen && (
                <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 rounded-full flex items-center gap-2'>
                    <div className='flex flex-row w-max items-center gap-3 bg-amber-900/80 backdrop-blur-sm px-3 py-2 rounded-full '>
                        <div className='flex flex-row gap-1 items-end'>
                            <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '20px', animationDelay: '0ms' }}></div>
                            <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '15px', animationDelay: '150ms' }}></div>
                            <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '25px', animationDelay: '300ms' }}></div>
                            <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '18px', animationDelay: '450ms' }}></div>
                            <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '22px', animationDelay: '600ms' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* audio */}
            <audio ref={audioRef} src='/jamaican_Bam-Bam.m4a' />
        </div>
    )
}
