import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { siteSpeedData } from '@/data/chartData'
import { Zap, Clock, AlertTriangle, Smartphone } from 'lucide-react'

export default function SiteSpeedSlide() {
  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        Site Speed
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="h-80 mb-8"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={siteSpeedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="metric" 
              stroke="#9CA3AF" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
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
                name === 'your' ? `${value}s` : `${value}s`,
                name === 'your' ? 'Your Site' : 'Industry Standard'
              ]}
            />
            <Bar dataKey="your" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="industry" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-red-500"
        >
          <div className="flex items-center gap-3 mb-4">
            <Smartphone size={16} className="" />
            <h3 className="text-2xl font-light ">Mobile Performance</h3>
          </div>
          <div className="text-4xl font-light  mb-2">2.1s</div>
          <div className="text-lg  mb-2">First Contentful Paint</div>
          <div className="text-sm ">4x slower than Google recommendation</div>
        </motion.div>

        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-orange-500"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock size={16} className="" />
            <h3 className="text-2xl font-light ">Page Load Time</h3>
          </div>
          <div className="text-4xl font-light  mb-2">4.8s</div>
          <div className="text-lg  mb-2">Full Page Load</div>
          <div className="text-sm ">Users expect under 3 seconds</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <Zap size={16} className="mx-auto mb-2 " />
            <div className="text-2xl font-light ">32%</div>
            <div className="text-sm ">Users Bounce</div>
            <div className="text-xs  mt-1">After 1-3s delay</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-orange-500">
            <AlertTriangle size={16} className="mx-auto mb-2 " />
            <div className="text-2xl font-light ">90%</div>
            <div className="text-sm ">Bounce Rate</div>
            <div className="text-xs  mt-1">At 5+ seconds</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-yellow-500">
            <Clock size={16} className="mx-auto mb-2 " />
            <div className="text-2xl font-light ">53%</div>
            <div className="text-sm ">Mobile Abandons</div>
            <div className="text-xs  mt-1">Google study data</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-left"
      >
        <div className="text-lg ">
          <strong className="">Core Web Vitals Impact:</strong> Google penalizes slow sites in search rankings
        </div>
      </motion.div>
    </div>
  )
}