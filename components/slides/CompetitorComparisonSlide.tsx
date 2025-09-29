import { motion } from 'framer-motion'
import { competitorComparison } from '@/data/metrics'

export default function CompetitorComparisonSlide() {

  const formatValue = (value: number | string, metric: string) => {
    if (typeof value === 'number') {
      if (metric === 'Traffic/Mo' && value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`
      }
      return value.toString()
    }
    return value
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        Competitive Landscape
      </motion.h2>
      
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-left mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10  rounded-lg">
          <span className="text-lg">You vs. Top Competitors</span>
        </div>
      </motion.div>

      <div className="space-y-6">
        {competitorComparison.map((comparison, index) => {
          return (
            <motion.div
              key={comparison.metric}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-red-500"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-light">{comparison.metric}</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.3 + index * 0.1,
                    
                    
                  }}
                  className="p-4 rounded-lg border bg-gray-500/10 border-[rgb(130_130_130_/_16%)]  text-left"
                >
                  <div className="text-xs font-semibold mb-2 opacity-70">#3</div>
                  <div className="font-light text-lg mb-2">You (PYD)</div>
                  <div className="text-2xl font-light mb-1">{formatValue(comparison.pyd, comparison.metric)}</div>
                  <div className="text-xs opacity-70 mt-2">Dead last</div>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1,
                    
                    
                  }}
                  className="p-4 rounded-lg border bg-gray-500/10 border-[rgb(130_130_130_/_16%)]  text-left"
                >
                  <div className="text-xs font-semibold mb-2 opacity-70">#2</div>
                  <div className="font-light text-lg mb-2">Competitor A</div>
                  <div className="text-2xl font-light mb-1">{formatValue(comparison.compA, comparison.metric)}</div>
                  <div className="text-xs opacity-70 mt-2">Strong position</div>
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1,
                    
                    
                  }}
                  className="p-4 rounded-lg border bg-gray-500/10 border-[rgb(130_130_130_/_16%)]  text-left"
                >
                  <div className="text-xs font-semibold mb-2 opacity-70">#1</div>
                  <div className="font-light text-lg mb-2">Competitor B</div>
                  <div className="text-2xl font-light mb-1">{formatValue(comparison.compB, comparison.metric)}</div>
                  <div className="text-xs opacity-70 mt-2">Market leader</div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="mt-4 text-left text-sm "
              >
                {comparison.metric === 'Domain Rating' && `Gap: ${Math.round(comparison.compB / comparison.pyd)}x behind leader`}
                {comparison.metric === 'Traffic/Mo' && `Gap: ${Math.round(comparison.compB / comparison.pyd)}x behind leader`}
                {comparison.metric === 'Keywords' && `Gap: ${Math.round(comparison.compB / comparison.pyd)}x behind leader`}
                {comparison.metric === 'Backlinks' && `Gap: ${Math.round(comparison.compB / comparison.pyd)}x behind leader`}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-left"
      >
        <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] inline-block">
          <div className="text-lg  mb-2">
            <strong>Market Position:</strong> Consistently last place across all metrics
          </div>
          <div className="">
            Immediate competitive strategy required to gain market share
          </div>
        </div>
      </motion.div>
    </div>
  )
}