import { motion } from 'framer-motion'
import { keywordOpportunities } from '@/data/metrics'
import { Target, Search, TrendingUp, Star } from 'lucide-react'

export default function KeywordOpportunitiesSlide() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-green-500'
      case 'Medium': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-yellow-500'
      case 'Hard': return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-orange-500'
      default: return ' bg-gray-500/10 border-[rgb(130_130_130_/_16%)] border-l-red-500'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return Star
      case 'Medium': return Target
      default: return Search
    }
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="slide-title font-light text-left mb-8"
      >
        Keyword Opportunities
      </motion.h2>
      
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-left mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 border-l-blue-500 rounded-lg">
          <Target size={20} />
          <span className="text-lg">Quick Win Opportunities • 15,000+ Monthly Searches</span>
        </div>
      </motion.div>

      <div className="space-y-4 mb-8">
        {keywordOpportunities.map((keyword, index) => {
          const PriorityIcon = getPriorityIcon(keyword.priority)
          
          return (
            <motion.div
              key={keyword.keyword}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-gray-500/10 rounded-xl p-6 border border-[rgb(130_130_130_/_16%)] border-l-blue-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <PriorityIcon size={12} className={
                    keyword.priority === 'High' ? '' : 
                    keyword.priority === 'Medium' ? '' : ''
                  } />
                  <div>
                    <div className="text-xl font-light ">{keyword.keyword}</div>
                    <div className="text-sm ">{keyword.intent}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-left">
                    <div className="text-2xl font-light">{keyword.volume}</div>
                    <div className="text-xs ">Monthly Searches</div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-lg border text-left ${getDifficultyColor(keyword.difficulty)}`}>
                    <div className="font-light">{keyword.difficulty}</div>
                    <div className="text-xs opacity-70">Difficulty</div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-2xl font-light ">{keyword.currentRank || 'N/A'}</div>
                    <div className="text-xs ">Current Rank</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-sm ">
                <strong className="">Opportunity:</strong> {keyword.opportunity}
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
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-green-500">
            <TrendingUp size={24} className="mx-auto mb-4 " />
            <div className="text-4xl font-light  mb-2">8,500</div>
            <div className="text-lg ">Easy Wins</div>
            <div className="text-sm  mt-2">Low competition volume</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-blue-500">
            <Target size={24} className="mx-auto mb-4 " />
            <div className="text-4xl font-light  mb-2">24</div>
            <div className="text-lg ">High Intent</div>
            <div className="text-sm  mt-2">Commercial keywords</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-left"
        >
          <div className="bg-gray-500/10 rounded-lg p-6 border border-[rgb(130_130_130_/_16%)] border-l-yellow-500">
            <Star size={24} className="mx-auto mb-4 " />
            <div className="text-4xl font-light  mb-2">6</div>
            <div className="text-lg ">Priority Targets</div>
            <div className="text-sm  mt-2">Immediate focus areas</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-left"
      >
        <div className="text-lg ">
          <strong className="">Strategy:</strong> Target easy wins first → Build authority → Tackle competitive terms
        </div>
      </motion.div>
    </div>
  )
}