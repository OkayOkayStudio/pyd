import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { domainAuthorityData } from '@/data/chartData'

export default function DomainAuthoritySlide() {
  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        Domain Authority Benchmark
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="h-80 mb-8"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={domainAuthorityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
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
              formatter={(value) => [`${value}`, 'Domain Rating']}
            />
            <Bar dataKey="rating" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="text-4xl font-light  mb-4">0.4</div>
            <div className="text-lg ">Your Domain Rating</div>
            <div className="text-sm  mt-2">Critically low authority</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-yellow-500">
            <div className="text-4xl font-light  mb-4">38</div>
            <div className="text-lg ">Industry Average</div>
            <div className="text-sm  mt-2">95x higher than yours</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-blue-500">
            <div className="text-4xl font-light  mb-4">65</div>
            <div className="text-lg ">Top Competitor</div>
            <div className="text-sm  mt-2">162x stronger than you</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-left"
      >
        <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] inline-block">
          <div className="text-lg  mb-2">
            <strong>Zero Trust Signal:</strong> Google doesn't see your site as authoritative
          </div>
          <div className="">
            Link building campaign essential for competitive visibility
          </div>
        </div>
      </motion.div>
    </div>
  )
}