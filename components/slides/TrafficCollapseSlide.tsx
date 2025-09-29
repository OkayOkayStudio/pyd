import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { trafficCollapseData } from '@/data/chartData'

export default function TrafficCollapseSlide() {
  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-light text-left mb-4 hidden"
      >
        Traffic Collapse Timeline
      </motion.h2>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-left mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10  rounded-lg">
          <span className="text-lg">September 4-17, 2025 • Search Console Data</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="h-96 mb-8"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trafficCollapseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#9CA3AF" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
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
                name === 'impressions' ? `${value} impressions` : `${value} clicks`,
                name === 'impressions' ? 'Search Impressions' : 'Clicks'
              ]}
            />
            <ReferenceLine x="Sep 10" stroke="#FFB700" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#EF4444"
              strokeWidth={4}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#EF4444', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="text-4xl font-light  mb-4">-68%</div>
            <div className="text-lg ">Impressions Lost</div>
            <div className="text-sm  mt-2">614 → 195 per week</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="text-4xl font-light  mb-4">Sept 11</div>
            <div className="text-lg ">Drop Started</div>
            <div className="text-sm  mt-2">Massive visibility loss</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="text-4xl font-light  mb-4">7 Days</div>
            <div className="text-lg ">To Recover</div>
            <div className="text-sm  mt-2">Action window closing</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-left"
      >
        <div className="text-lg ">
          <strong className="">Potential Causes:</strong> Algorithm penalty • Technical blocking • Competitor surge
        </div>
      </motion.div>
    </div>
  )
}