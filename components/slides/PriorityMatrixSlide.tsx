import { motion } from 'framer-motion'
import { priorityMatrix } from '@/data/metrics'

export default function PriorityMatrixSlide() {
  const quadrants = [
    {
      quadrant: 'High Impact, Quick Win',
      actions: priorityMatrix.highImpactLowEffort,
      description: 'Do First - Maximum value with minimal effort',
      color: 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] '
    },
    {
      quadrant: 'High Impact, Long Term', 
      actions: priorityMatrix.highImpactHighEffort,
      description: 'Schedule - Important but requires significant resources',
      color: 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] '
    },
    {
      quadrant: 'Low Impact, Quick Win',
      actions: priorityMatrix.lowImpactLowEffort, 
      description: 'Delegate - Easy wins when time allows',
      color: 'bg-gray-500/10 border-[rgb(130_130_130_/_16%)] '
    },
    {
      quadrant: 'Low Impact, High Effort',
      actions: priorityMatrix.lowImpactHighEffort,
      description: 'Eliminate - Not worth the investment',
      color: 'bg-gray-500/20 border-[rgb(130_130_130_/_16%)] '
    }
  ]

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        Priority Matrix
      </motion.h2>
      
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-left mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10  rounded-lg">
          <span className="text-lg">Impact vs Effort Analysis • {Object.values(priorityMatrix).flat().length} Actions Prioritized</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        {quadrants.map((quadrant, quadrantIndex) => {
          return (
            <motion.div
              key={quadrant.quadrant}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.2 + quadrantIndex * 0.1,
                
                
              }}
              className={`rounded-xl p-6 border ${quadrant.color}`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-light">{quadrant.quadrant}</h3>
              </div>
              
              <div className="mb-4 text-sm opacity-80">{quadrant.description}</div>
              
              <div className="space-y-3">
                {quadrant.actions.map((action, actionIndex) => (
                  <motion.div
                    key={action}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.3 + quadrantIndex * 0.1 + actionIndex * 0.05
                    }}
                    className="bg-black/20 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                      <span className="font-medium">{action}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + quadrantIndex * 0.1 }}
                className="mt-4 text-left"
              >
                <div className="text-sm opacity-70">
                  {quadrant.actions.length} action{quadrant.actions.length !== 1 ? 's' : ''} in this quadrant
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 grid grid-cols-4 gap-4"
      >
        <div className="text-left">
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <div className="text-2xl font-light  mb-2">{priorityMatrix.highImpactLowEffort.length}</div>
            <div className="text-sm ">Quick Wins</div>
            <div className="text-xs  mt-1">Start immediately</div>
          </div>
        </div>

        <div className="text-left">
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-orange-500">
            <div className="text-2xl font-light  mb-2">{priorityMatrix.highImpactHighEffort.length}</div>
            <div className="text-sm ">Strategic</div>
            <div className="text-xs  mt-1">Long-term focus</div>
          </div>
        </div>

        <div className="text-left">
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-yellow-500">
            <div className="text-2xl font-light  mb-2">{priorityMatrix.lowImpactLowEffort.length}</div>
            <div className="text-sm ">Low Priority</div>
            <div className="text-xs  mt-1">When time allows</div>
          </div>
        </div>

        <div className="text-left">
          <div className="bg-gray-500/20 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="text-2xl font-light  mb-2">{priorityMatrix.lowImpactHighEffort.length}</div>
            <div className="text-sm ">Eliminate</div>
            <div className="text-xs  mt-1">Not worth effort</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-left"
      >
        <div className="text-lg ">
          <strong className="">Recommended Sequence:</strong> Execute Quick Wins → Build momentum → Tackle strategic initiatives
        </div>
      </motion.div>
    </div>
  )
}