import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { roiProjectionData } from '@/data/chartData'
import { TrendingUp, DollarSign, Target, Calendar } from 'lucide-react'

export default function ROIProjectionSlide() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        12-Month ROI Projection
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="h-80 mb-8"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={roiProjectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF" 
              fontSize={12}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value, name) => [
                formatCurrency(Number(value)),
                name === 'revenue' ? 'Monthly Revenue' : 'Investment'
              ]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={1}
              dot={{ fill: '#10B981', strokeWidth: 1, r: 3 }}
              activeDot={{ r: 4, stroke: '#10B981', strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="investment"
              stroke="#EF4444"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#EF4444', strokeWidth: 1, r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <TrendingUp size={24} className="mx-auto mb-4 " />
            <div className="text-4xl font-light  mb-2">427%</div>
            <div className="text-lg ">12-Month ROI</div>
            <div className="text-sm  mt-2">Conservative projection</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <DollarSign size={24} className="mx-auto mb-4 " />
            <div className="text-4xl font-light  mb-2">{formatCurrency(45000)}</div>
            <div className="text-lg ">Monthly Revenue</div>
            <div className="text-sm  mt-2">By month 12</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <Target size={24} className="mx-auto mb-4 " />
            <div className="text-4xl font-light  mb-2">6</div>
            <div className="text-lg ">Months</div>
            <div className="text-sm  mt-2">To break even</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-500/10 rounded-xl p-6 border border-[rgb(130_130_130_/_16%)] border-l-green-500"
        >
          <h3 className="text-2xl font-light  mb-4">Revenue Growth</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="">Month 3:</span>
              <span className=" font-light">{formatCurrency(8000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="">Month 6:</span>
              <span className=" font-light">{formatCurrency(18000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="">Month 9:</span>
              <span className=" font-light">{formatCurrency(32000)}</span>
            </div>
            <div className="flex justify-between border-t border-[rgb(130_130_130_/_16%)] pt-3">
              <span className=" font-light">Month 12:</span>
              <span className=" font-light text-xl">{formatCurrency(45000)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gray-500/10 rounded-xl p-6 border border-[rgb(130_130_130_/_16%)] border-l-green-500"
        >
          <h3 className="text-2xl font-light mb-4">Key Milestones</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="" />
              <span className="">Month 2: Technical fixes complete</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="" />
              <span className="">Month 4: Content optimization done</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="" />
              <span className="">Month 6: Link building momentum</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="" />
              <span className="">Month 8: Authority established</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-purple-400" />
              <span className="">Month 12: Market leadership</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-8 text-left"
      >
        <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] inline-block">
          <div className="text-lg  mb-2">
            <strong>Conservative Estimate:</strong> {formatCurrency(540000)} annual revenue by year-end
          </div>
          <div className="">
            Based on industry benchmarks and current market conditions
          </div>
        </div>
      </motion.div>
    </div>
  )
}