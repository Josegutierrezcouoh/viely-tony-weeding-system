import { ReactNode } from 'react'

interface SimpleCardProps {
  children: ReactNode
  className?: string
  
}

export default function SimpleCard({ children, className = '', }: SimpleCardProps) {
  return (
    <div className={`p-6 bg-[#73026B]/5 rounded-lg border border-[#73026B]/20 ${className}`}>
      {children}
    </div>
    
  )
}
