import { motion } from 'framer-motion'
import { Zap, Clock } from 'lucide-react'

export default function SpeedSlide() {
  return (
    <div className="text-left">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light mb-12"
      >
        
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-500/10 p-8 rounded-xl"
        >
          <Clock size={64} className="mx-auto mb-4 " />
          <div className="text-5xl font-light  mb-2">8.2s</div>
          <div className="text-xl">Average Load Time</div>
          <div className="text-sm  mt-2">Google recommends &lt; 3s</div>
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-500/10 p-8 rounded-xl"
        >
          <Zap size={64} className="mx-auto mb-4 " />
          <div className="text-5xl font-light  mb-2">23</div>
          <div className="text-xl">PageSpeed Score</div>
          <div className="text-sm  mt-2">Out of 100</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <div className="text-lg ">Slow sites lose 7% conversion rate per second delay</div>
      </motion.div>
    </div>
  )
}