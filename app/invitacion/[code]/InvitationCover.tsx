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
            <div className={`overflow-hidden h-full w-full absolute inset-0 transition-all duration-1000 ${isOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className='h-full w-full bg-[url(/img.png)] bg-cover bg-center absolute top-0 left-0 z-20 scale-x-[-1]'>
                </div>
                <div className='w-full h-full bg-[url(/ribbon.png)] bg-cover bg-center z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-x-[-1]'>
                </div>

                <div className='w-1/2 h-1/6 sm:h-1/6 bg-[url(/white_rose.png)] bg-contain bg-no-repeat bg-center z-40 absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-x-[-1]'></div>

                <div className='text-3xl shine-gold-text absolute top-[33%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 text-center px-4'>
                    Para {invitation.guest_name}
                </div>


                <div className='w-full h-full z-30 absolute flex items-center justify-center top-0 left-0'>
                    {/* button then show invitation */}
                    <button
                        onClick={handleOpen}
                        className='rounded-full size-20 mt-20 bg-[url(/gold.png)] text-xs bg-contain bg-center'
                    >
                        Toca aquí
                        <br />
                        para abrir
                    </button>
                </div>

                <Image
                    src='/ornamento.png'
                    alt='Flower Bottom'

                    className='absolute top-0 left-0 z-50 scale-x-[-1]'
                    width={300}
                    height={300}
                />
                <Image
                    src='/ornamento.png'
                    alt='Flower Bottom'

                    className=' absolute bottom-0 right-0 z-50'
                    width={300}
                    height={300}
                />

            </div>

            {/* invitation */}
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
                        <button
                            onClick={toggleMute}
                            className='bg-amber-700 hover:bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0'
                        >
                            {isMuted ? '🔇' : '🔊'}
                        </button>


                    </div>
                    <button
                        onClick={showScrollUp ? scrollToTop : scrollToRSVP}
                        className='bg-purple-700 hover:bg-purple-600 text-white w-auto p-7 h-8 rounded-full text-sm transition-colors flex items-center justify-center'
                        title={showScrollUp ? 'Volver arriba' : 'Ir a RSVP'}
                    >
                        {showScrollUp ? '⬆️' : 'Confirmar asistencia'}
                    </button>

                </div>


            )}

            {/* audio */}
            <audio ref={audioRef} src='/hasta_mi_final.m4a' />
        </div>
    )
}
