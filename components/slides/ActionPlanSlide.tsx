import { motion } from 'framer-motion'
import { actionPlan } from '@/data/metrics'
import { Calendar, CheckCircle, Clock, Users } from 'lucide-react'

export default function ActionPlanSlide() {
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase 1': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-red-500'
      case 'Phase 2': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-orange-500'
      case 'Phase 3': return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-yellow-500'
      default: return 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-green-500'
    }
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'Phase 1': return Clock
      case 'Phase 2': return Users
      case 'Phase 3': return CheckCircle
      default: return Calendar
    }
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        90-Day Action Plan
      </motion.h2>
      
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-left mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 border-l-blue-500 rounded-lg">
          <Calendar size={20} />
          <span className="text-lg">Structured Plan • Phased Implementation</span>
        </div>
      </motion.div>

      <div className="space-y-8">
        {actionPlan.map((phase, phaseIndex) => {
          const IconComponent = getPhaseIcon(phase.phase)
          
          return (
            <motion.div
              key={phase.phase}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + phaseIndex * 0.2 }}
              className={`rounded-xl p-6 border ${getPhaseColor(phase.phase)}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <IconComponent size={16} />
                  <div>
                    <h3 className="text-2xl font-light">{phase.phase}</h3>
                    <div className="text-lg opacity-80">{phase.title}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-light">{phase.duration}</div>
                  <div className="text-sm opacity-70">Timeline</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {phase.actions.map((action, actionIndex) => (
                  <motion.div
                    key={action}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.3 + phaseIndex * 0.2 + actionIndex * 0.05,
                      
                      
                    }}
                    className="bg-black/20 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className=" flex-shrink-0" />
                      <span className="text-sm font-medium">{action}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + phaseIndex * 0.2 }}
                className="bg-black/30 rounded-lg p-4 border border-white/10"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm mb-2">Expected Outcomes:</div>
                    <div className="text-sm opacity-80">{phase.outcomes}</div>
                  </div>
                  <div>
                    <div className="text-sm mb-2">Key Metrics:</div>
                    <div className="text-sm opacity-80">{phase.metrics}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 grid grid-cols-4 gap-4"
      >
        <div className="text-left">
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="text-2xl font-light ">Week 1-2</div>
            <div className="text-sm ">Emergency Fixes</div>
            <div className="text-xs  mt-1">Immediate action</div>
          </div>
        </div>

        <div className="text-left">
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-orange-500">
            <div className="text-2xl font-light ">Week 3-6</div>
            <div className="text-sm ">Foundation</div>
            <div className="text-xs  mt-1">Build stability</div>
          </div>
        </div>

        <div className="text-left">
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-yellow-500">
            <div className="text-2xl font-light ">Week 7-10</div>
            <div className="text-sm ">Growth</div>
            <div className="text-xs  mt-1">Scale content</div>
          </div>
        </div>

        <div className="text-left">
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <div className="text-2xl font-light ">Week 11-12</div>
            <div className="text-sm ">Optimization</div>
            <div className="text-xs  mt-1">Fine-tune results</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-8 text-left"
      >
        <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-blue-500 inline-block">
          <div className="text-lg  mb-2">
            <strong>Success Timeline:</strong> Significant improvements visible within 30 days
          </div>
          <div className="">
            Full recovery and growth acceleration by day 90
          </div>
        </div>
      </motion.div>
    </div>
  )
}