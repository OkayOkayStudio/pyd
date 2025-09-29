import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Target } from 'lucide-react'

export default function ROISlide() {
  const metrics = [
    { label: '3-Month ROI', value: '340%', icon: TrendingUp, color: '' },
    { label: 'Revenue Recovery', value: '$48K', icon: DollarSign, color: '' },
    { label: 'Traffic Increase', value: '+285%', icon: Target, color: 'text-purple-500' },
  ]

  return (
    <div className="text-left">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light mb-12"
      >
        Projected ROI
      </motion.h2>
      
      <div className="grid grid-cols-3 gap-8 mb-12">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/5 p-8 rounded-xl"
          >
            <metric.icon size={24} className={`mx-auto mb-4 ${metric.color}`} />
            <div className={`text-4xl font-light mb-2 ${metric.color}`}>{metric.value}</div>
            <div className="text-lg">{metric.label}</div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-xl"
      >
        <div className="text-2xl font-light mb-2">Investment: $12,000</div>
        <div className="text-lg ">Expected return within 90 days</div>
      </motion.div>
    </div>
  )
}