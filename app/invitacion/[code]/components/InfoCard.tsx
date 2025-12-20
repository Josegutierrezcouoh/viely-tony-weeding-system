import { ReactNode } from 'react'

interface InfoCardProps {
  icon: ReactNode
  title: string
  children: ReactNode
  className?: string
}

export default function InfoCard({ icon, title, children, className = '' }: InfoCardProps) {
  return (
    <div className={`bg-linear-to-br from-[#73026B]/5 to-white p-8 rounded-lg shadow-lg border border-[#73026B]/20 ${className}`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-2xl font-serif text-[#73026B]">{title}</h3>
      </div>
      {children}
    </div>
  )
}
