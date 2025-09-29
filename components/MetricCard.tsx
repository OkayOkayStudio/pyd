interface MetricCardProps {
  label: string
  value: string
  subtext?: string
  status?: 'critical' | 'warning' | 'success'
}

export default function MetricCard({ label, value, subtext, status = 'critical' }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-red-500'
      case 'warning': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-orange-500'
      case 'success': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-green-500'
      default: return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)]'
    }
  }

  return (
    <div className={`p-6 rounded-xl border ${getStatusColor()} backdrop-blur-sm`}>
      <div className="text-sm opacity-70 mb-2">{label}</div>
      <div className="text-4xl font-light mb-2">{value}</div>
      {subtext && <div className="text-sm opacity-60">{subtext}</div>}
    </div>
  )
}