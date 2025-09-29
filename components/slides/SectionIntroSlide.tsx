import { motion } from 'framer-motion'

interface SectionIntroSlideProps {
  title: string
  description: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
}

export default function SectionIntroSlide({ title, description, icon: Icon }: SectionIntroSlideProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-left max-w-4xl"
      >
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="slide-title font-light mb-6 leading-tight hidden"
        >
          {title}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl  leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  )
}