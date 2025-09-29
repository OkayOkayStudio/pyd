import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { contentIssuesData } from '@/data/chartData'
import { FileText, AlertCircle, Search, Users } from 'lucide-react'

export default function ContentIssuesSlide() {
  const COLORS = ['#EF4444', '#F97316', '#EAB308', '#10B981']

  const renderLabel = (entry: any) => {
    return `${entry.name}: ${entry.value}`
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        Content Quality Analysis
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-light mb-6 text-left ">Content Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentIssuesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentIssuesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-light mb-6 text-left ">Critical Issues</h3>
          
          <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle size={12} className="" />
              <span className="text-xl font-light ">Thin Content</span>
            </div>
            <div className="text-2xl font-light  mb-2">67%</div>
            <div className="">Pages under 300 words</div>
          </div>

          <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-orange-500">
            <div className="flex items-center gap-3 mb-3">
              <Search size={12} className="" />
              <span className="text-xl font-light ">Missing Keywords</span>
            </div>
            <div className="text-2xl font-light  mb-2">89%</div>
            <div className="">No target keyword focus</div>
          </div>

          <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] border-l-yellow-500">
            <div className="flex items-center gap-3 mb-3">
              <Users size={12} className="" />
              <span className="text-xl font-light ">Poor UX Signals</span>
            </div>
            <div className="text-2xl font-light  mb-2">78%</div>
            <div className="">High bounce rate pages</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-8">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <FileText size={16} className="mx-auto mb-2 " />
            <div className="text-2xl font-light ">59</div>
            <div className="text-sm ">Thin Pages</div>
            <div className="text-xs  mt-1">Under 300 words</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-orange-500">
            <Search size={16} className="mx-auto mb-2 " />
            <div className="text-2xl font-light ">78</div>
            <div className="text-sm ">No Keywords</div>
            <div className="text-xs  mt-1">Missing optimization</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-yellow-500">
            <AlertCircle size={16} className="mx-auto mb-2 " />
            <div className="text-2xl font-light ">23</div>
            <div className="text-sm ">Duplicate Meta</div>
            <div className="text-xs  mt-1">Title/description</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <Users size={16} className="mx-auto mb-2 " />
            <div className="text-2xl font-light ">10</div>
            <div className="text-sm ">Quality Pages</div>
            <div className="text-xs  mt-1">Properly optimized</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-8 text-left"
      >
        <div className="text-lg ">
          <strong className="">Content Strategy Needed:</strong> 90% of content fails to meet SEO standards
        </div>
      </motion.div>
    </div>
  )
}