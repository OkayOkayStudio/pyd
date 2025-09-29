import { motion } from 'framer-motion'
import { TrendingUp, Users } from 'lucide-react'

export default function CompetitorSlide() {
  const competitors = [
    { name: 'Competitor A', traffic: '+45%', rank: '#2' },
    { name: 'Competitor B', traffic: '+32%', rank: '#3' },
    { name: 'Competitor C', traffic: '+28%', rank: '#4' },
  ]

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light text-left mb-12"
      >
        While You Decline, Competitors Rise
      </motion.h2>
      
      <div className="space-y-6">
        {competitors.map((competitor, index) => (
          <motion.div
            key={competitor.name}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center justify-between p-6 bg-gray-500/10 rounded-xl"
          >
            <div className="flex items-center gap-4">
              <TrendingUp className="" size={16} />
              <div>
                <div className="text-xl font-light">{competitor.name}</div>
                <div className="">Market Position: {competitor.rank}</div>
              </div>
            </div>
            <div className="text-2xl font-light ">{competitor.traffic}</div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-left bg-gray-500/10 p-4 rounded-lg"
      >
        <div className=" font-light text-xl">Your ranking: Not in top 10</div>
      </motion.div>
    </div>
  )
}