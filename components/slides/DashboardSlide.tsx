import { motion } from 'framer-motion'
import MetricCard from '@/components/MetricCard'
import { executiveMetrics } from '@/data/metrics'
import { Gauge, AlertTriangle } from 'lucide-react'

export default function DashboardSlide() {
  const metrics = [
    { 
      label: 'Pages Ranking', 
      value: `${executiveMetrics.pagesRanking.percentage}%`, 
      subtext: `${executiveMetrics.pagesRanking.current} of ${executiveMetrics.pagesRanking.total}`, 
      status: 'critical'
    },
    { 
      label: 'Domain Rating', 
      value: executiveMetrics.domainRating.toString(), 
      subtext: `Industry: ${executiveMetrics.industryAverage}+`, 
      status: 'critical'
    },
    { 
      label: 'Traffic Drop', 
      value: `${executiveMetrics.trafficDrop}%`, 
      subtext: 'Last Week', 
      status: 'critical'
    },
    { 
      label: 'Monthly Visitors', 
      value: executiveMetrics.monthlyVisitors.toString(), 
      subtext: 'Target: 1,000+', 
      status: 'critical'
    },
  ] as const

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Left Column - Health Score & Status */}
      <div className="flex flex-col justify-center space-y-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-xl p-6 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <Gauge size={24} className="mx-auto mb-3 " />
            <div className="text-sm  mb-2">Overall Health Score</div>
            <div className="text-4xl font-light ">{executiveMetrics.healthScore}/10</div>
            <div className="text-xs  mt-2">Critical threshold</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle size={20} className="" />
              <span className=" font-light"></span>
            </div>
            <div className="text-sm ">
              Immediate intervention required
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="p-4 rounded-lg bg-gray-500/10 border border-[rgb(130_130_130_/_16%)] backdrop-blur-sm h-full">
              <div className="mb-3">
                <div className="text-xs opacity-70">{metric.label}</div>
              </div>
              <div className="text-2xl font-light mb-1 ">{metric.value}</div>
              {metric.subtext && <div className="text-xs opacity-60">{metric.subtext}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}