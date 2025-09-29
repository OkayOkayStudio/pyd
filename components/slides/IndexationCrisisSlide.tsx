import { motion } from 'framer-motion'
import { indexationIssues, indexationFunnel } from '@/data/metrics'

export default function IndexationCrisisSlide() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)]'
      case 'high': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)]'
      default: return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)]'
    }
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-light text-left mb-12 hidden"
      >
        Indexation Crisis
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-12">
        {/* Coverage Issues Table */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-light mb-6 text-left ">Coverage Issues</h3>
          <div className="space-y-4">
            {indexationIssues.map((issue, index) => (
              <motion.div
                key={issue.issue}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-xl border ${getSeverityColor(issue.severity)}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold">{issue.issue}</span>
                  </div>
                  <div className="text-2xl font-light">{issue.count}</div>
                </div>
                <div className="text-sm opacity-70 mt-2 capitalize">{issue.severity} Priority</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Indexation Funnel */}
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-light mb-6 text-left ">Indexation Funnel</h3>
          <div className="space-y-6">
            {indexationFunnel.map((stage, index) => {
              const width = (stage.count / indexationFunnel[0].count) * 100
              const colors = ['bg-gray-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500']
              
              return (
                <motion.div
                  key={stage.stage}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">{stage.stage}</span>
                    <span className="text-2xl font-light">{stage.count}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-8 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                      className={`h-full ${colors[index]} flex items-center justify-center text-black font-light`}
                    >
                      {Math.round(width)}%
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-left"
      >
        <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] inline-block">
          <div className="text-left mb-3">
            <span className="text-2xl font-light ">89% of Content Invisible</span>
          </div>
          <div className="text-lg ">
            Only 6 pages out of 88 are actually getting traffic from Google
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-left text-lg "
      >
        <strong className="">Priority Fix:</strong> Submit sitemap → Fix canonicals → Add missing pages
      </motion.div>
    </div>
  )
}