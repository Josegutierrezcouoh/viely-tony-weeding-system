interface Stats {
  totalInvitations: number
  totalGuests: number
  confirmedGuests: number
  pendingRSVPs: number
}

interface StatsCardsProps {
  stats: Stats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Invitaciones Enviadas',
      value: stats.totalInvitations,
      icon: '📨',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      title: 'Total Invitados',
      value: stats.totalGuests,
      icon: '👥',
      color: 'bg-purple-50 text-purple-700'
    },
    {
      title: 'Confirmados',
      value: stats.confirmedGuests,
      icon: '✅',
      color: 'bg-green-50 text-green-700'
    },
    {
      title: 'Pendientes',
      value: stats.pendingRSVPs,
      icon: '⏳',
      color: 'bg-amber-50 text-amber-700'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`text-4xl ${card.color} w-16 h-16 rounded-full flex items-center justify-center`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
