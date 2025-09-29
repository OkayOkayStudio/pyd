import { motion } from 'framer-motion'
import { AlertCircle, ShieldAlert } from 'lucide-react'

export default function TitleSlide() {
  return (
    <div className="text-left">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-light mb-6">
          SEO Audit Plan
        </h1>

        <h3 className="text-2xl  mb-8">PYD Agency</h3>
        <div className="text-base  mb-12">September 2025</div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gray-500/10  rounded-lg border border-[rgb(130_130_130_/_16%)] border-l-red-500"
        >
          <ShieldAlert size={12} />
          <span className="text-lg font-semibold">Confidential Report</span>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-lg "
        >
          Critical SEO Issues Identified • Emergency Action Required
        </motion.div>
      </motion.div>
    </div>
  )
}