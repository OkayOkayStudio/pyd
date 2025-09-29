import { motion } from 'framer-motion'
import { Search, AlertCircle } from 'lucide-react'

export default function IndexationSlide() {
  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light text-left mb-12"
      >
        Indexation Crisis
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-500/10 p-8 rounded-xl text-left"
        >
          <AlertCircle size={24} className="mx-auto mb-4 " />
          <div className="text-2xl font-light  mb-2">78 Pages</div>
          <div className="text-lg">Not Indexed by Google</div>
        </motion.div>
        
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-500/10 p-8 rounded-xl text-left"
        >
          <Search size={24} className="mx-auto mb-4 " />
          <div className="text-2xl font-light  mb-2">10 Pages</div>
          <div className="text-lg">Currently Ranking</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-left"
      >
        <div className="text-xl ">89% of your content is invisible to search engines</div>
      </motion.div>
    </div>
  )
}