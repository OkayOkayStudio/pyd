import { motion } from 'framer-motion'
import { AlertTriangle, TrendingDown, DollarSign } from 'lucide-react'

export default function TripleCrisisSlide() {
  const crises = [
    { title: 'Traffic Collapse', value: '-68%', icon: TrendingDown, color: '' },
    { title: 'Revenue Loss', value: '$12K/month', icon: DollarSign, color: '' },
    { title: 'Ranking Drop', value: '89% pages', icon: AlertTriangle, color: '' },
  ]

  return (
    <div className="text-left">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light mb-12"
      >
        The Triple Crisis
      </motion.h2>
      
      <div className="grid grid-cols-3 gap-8">
        {crises.map((crisis, index) => (
          <motion.div
            key={crisis.title}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="p-6 bg-white/5 rounded-xl"
          >
            <crisis.icon size={24} className={`mx-auto mb-4 ${crisis.color}`} />
            <h3 className="text-xl font-light mb-2">{crisis.title}</h3>
            <div className={`text-2xl font-light ${crisis.color}`}>{crisis.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}