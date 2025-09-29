import { motion } from 'framer-motion'
import { Calendar, CheckCircle2, Clock } from 'lucide-react'

export default function RoadmapSlide() {
  const phases = [
    { phase: 'Week 1-2', title: 'Emergency Fixes', status: 'critical', items: ['Fix indexation', 'Submit sitemap', 'Canonical tags'] },
    { phase: 'Week 3-4', title: 'Technical Optimization', status: 'high', items: ['Page speed', 'Mobile optimization', 'Core Web Vitals'] },
    { phase: 'Month 2', title: 'Content Recovery', status: 'medium', items: ['Content audit', 'Keyword optimization', 'Internal linking'] },
    { phase: 'Month 3+', title: 'Growth Phase', status: 'success', items: ['Link building', 'Content expansion', 'Monitoring'] },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-red-500'
      case 'high': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-orange-500'
      case 'medium': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-yellow-500'
      case 'success': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-green-500'
      default: return 'bg-gray-500/20 border-[rgb(130_130_130_/_16%)]'
    }
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light text-left mb-12"
      >
        Recovery Roadmap
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`p-6 rounded-xl border-2 ${getStatusColor(phase.status)}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} />
              <span className="font-light">{phase.phase}</span>
            </div>
            <h3 className="text-xl font-light mb-4">{phase.title}</h3>
            <ul className="space-y-2">
              {phase.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}