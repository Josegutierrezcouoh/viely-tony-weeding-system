'use client'

import { useState, useRef } from 'react'
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
    const audioRef = useRef<HTMLAudioElement>(null)

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

    return (
        <div className=' h-screen overflow-scroll relative'>
            {/* cover */}
            <div className={`h-full w-full absolute inset-0 transition-all duration-1000 ${isOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className='h-full w-full bg-[url(/img.png)] bg-cover bg-center absolute top-0 left-0 z-20'>
                </div>
                <div className='w-full h-full bg-[url(/ribbon.png)] bg-cover bg-center z-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                </div>

                <div className='w-full h-full z-40 absolute flex items-center justify-center top-0 left-0'>
                    {/* button then show invitation */}
                    <button
                        onClick={handleOpen}
                        className='rounded-full size-20 mt-20 bg-white text-xs hover:bg-amber-600 transition-colors'
                    >
                        13.01.2026
                    </button>
                </div>
            </div>

            {/* invitation */}
            {isOpen && <Invitation invitation={invitation} />}

            {/* audio control */}
            {isOpen && (
                <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-amber-900/80 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-3'>
                    <Image 
                        src='/hasta mi final.jpg' 
                        alt='Cover' 
                        className='w-10 h-10 rounded-full object-cover'
                        width={100}
                        height={100}
                    />
                    <div className='flex gap-1 items-end'>
                        <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '20px', animationDelay: '0ms' }}></div>
                        <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '15px', animationDelay: '150ms' }}></div>
                        <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '25px', animationDelay: '300ms' }}></div>
                        <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '18px', animationDelay: '450ms' }}></div>
                        <div className='w-1 bg-white rounded-full animate-pulse' style={{ height: '22px', animationDelay: '600ms' }}></div>
                    </div>
                    <button
                        onClick={toggleMute}
                        className='bg-amber-700 hover:bg-amber-600 text-white w-8 h-8 rounded-full text-sm transition-colors flex items-center justify-center'
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                </div>
            )}

            {/* audio */}
            <audio ref={audioRef} src='/hasta_mi_final.m4a' />
        </div>
    )
}
