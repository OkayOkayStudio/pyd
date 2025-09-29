import { motion } from 'framer-motion'
import { revenueMetrics } from '@/data/metrics'

export default function RevenueLossSlide() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="text-left">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-light mb-8"
      >
        Revenue Impact Calculator
      </motion.h2>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-red-900/50 to-red-700/30 p-12 rounded-xl border border-[rgb(130_130_130_/_16%)] mb-8"
      >
        <div className="text-7xl font-light  mb-4">
          {formatCurrency(revenueMetrics.annualLoss)}
        </div>
        <div className="text-2xl  mb-4">Annual Revenue at Risk</div>
        <div className="text-xl ">Based on current traffic decline trend</div>
      </motion.div>

      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-500/10 p-8 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-red-500"
        >
          <div className="text-left mb-4">
            <h3 className="text-2xl font-light ">Current Revenue</h3>
          </div>
          <div className="text-4xl font-light  mb-2">
            {formatCurrency(revenueMetrics.current)}/month
          </div>
          <div className="">Severely underperforming</div>
        </motion.div>

        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-500/10 p-8 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-green-500"
        >
          <div className="text-left mb-4">
            <h3 className="text-2xl font-light ">Revenue Potential</h3>
          </div>
          <div className="text-4xl font-light  mb-2">
            {formatCurrency(revenueMetrics.potential)}/month
          </div>
          <div className="">With proper SEO optimization</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] inline-block">
          <div className="text-left mb-3">
            <span className="text-2xl font-light ">Monthly Opportunity Loss</span>
          </div>
          <div className="text-5xl font-light ">
            {formatCurrency(revenueMetrics.monthlyLoss)}
          </div>
          <div className="text-lg  mt-2">
            Every month without SEO optimization costs your business
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xl "
      >
        <strong className="">Time is money:</strong> Each day of delay = ~{formatCurrency(Math.round(revenueMetrics.monthlyLoss / 30))} lost
      </motion.div>
    </div>
  )
}