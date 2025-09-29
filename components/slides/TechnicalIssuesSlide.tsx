import { motion } from 'framer-motion'
import { technicalIssues } from '@/data/metrics'

export default function TechnicalIssuesSlide() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fail': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-red-500'
      case 'warning': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-orange-500'
      case 'pass': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-green-500'
      default: return ' bg-gray-500/20 border-[rgb(130_130_130_/_16%)]'
    }
  }


  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        Critical Technical Issues
      </motion.h2>
      
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-left mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10  rounded-lg">
          <span className="text-lg">{technicalIssues.length} Issues Found • {technicalIssues.filter(issue => issue.status === 'fail').length} Failed</span>
        </div>
      </motion.div>

      <div className="space-y-4 mb-8">
        {technicalIssues.map((issue, index) => {
          return (
            <motion.div
              key={issue.name}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`p-6 rounded-xl border ${getStatusColor(issue.status)}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-light">{issue.name}</div>
                  <div className="text-sm opacity-70 mt-1">
                    {issue.status === 'fail' && 'Critical technical issue blocking SEO performance'}
                    {issue.status === 'warning' && 'Needs optimization for better performance'}
                    {issue.status === 'pass' && 'Correctly implemented'}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-left">
                    <div className="text-2xl font-light">{issue.count}</div>
                    <div className="text-xs opacity-70">Status</div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-lg font-light capitalize">{issue.status}</div>
                    <div className="text-xs opacity-70">Result</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm opacity-80">
                <strong>Impact:</strong> 
                {issue.status === 'fail' && ' Severely hampering search engine visibility'}
                {issue.status === 'warning' && ' Moderately affecting user experience and rankings'}
                {issue.status === 'pass' && ' Positive contribution to SEO foundation'}
              </div>
              
              <div className="mt-2 text-sm opacity-80">
                <strong>Action:</strong> 
                {issue.status === 'fail' && ' Immediate fix required'}
                {issue.status === 'warning' && ' Optimize when possible'}
                {issue.status === 'pass' && ' Maintain current implementation'}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-red-500">
            <div className="text-2xl font-light  mb-2">{technicalIssues.filter(issue => issue.status === 'fail').length}</div>
            <div className="text-sm ">Failed</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-orange-500">
            <div className="text-2xl font-light  mb-2">{technicalIssues.filter(issue => issue.status === 'warning').length}</div>
            <div className="text-sm ">Warnings</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-4 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <div className="text-2xl font-light  mb-2">{technicalIssues.filter(issue => issue.status === 'pass').length}</div>
            <div className="text-sm ">Passing</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-8 text-left"
      >
        <div className="bg-gray-500/10 p-6 rounded-xl border border-[rgb(130_130_130_/_16%)] inline-block">
          <div className="text-lg  mb-2">
            <strong>Blocking Google:</strong> Technical issues prevent proper crawling and indexing
          </div>
          <div className="">
            Fix critical issues first → Clear Google's path to your content
          </div>
        </div>
      </motion.div>
    </div>
  )
}