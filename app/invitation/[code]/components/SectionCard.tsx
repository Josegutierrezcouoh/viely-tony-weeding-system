import { ReactNode } from 'react'
import Image from 'next/image'

interface SectionCardProps {
    title: string
    children: ReactNode
    className?: string
    roseNumber?: number
}

export default function SectionCard({ title, children, className = '', roseNumber }: SectionCardProps) {
    return (
        <div className={`bg-white p-8 rounded-lg shadow-md border border-[#73026B]/20 ${className} relative` }>
            <h4 className="text-2xl font-serif text-[#73026B] mb-4 text-center">{title}</h4>
            <div className="space-y-2 text-center text-gray-700">
                {children}


                <Image src={`/rose_${roseNumber ?? 1}.png`}
                className='absolute top-0 left-0 rotate-45'
                    width={40}
                    height={40}
                    alt={''} />
            </div>
        </div>
    )
}
