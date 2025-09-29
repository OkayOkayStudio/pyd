'use client'

import { motion } from 'framer-motion'
import { slides, slideNames } from '@/data/staticSlides'

interface ScrollViewProps {
  isDarkMode: boolean
}

export default function ScrollView({ isDarkMode }: ScrollViewProps) {
  // slideNames is now imported from markdown data

  return (
    <div className="pt-20 pb-20 px-8 scroll-view">
      <div className="max-w-7xl mx-auto">
        {slides.map((slide, index) => {
          const SlideComponent = slide.component
          
          return (
            <motion.section
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`mb-16 flex flex-col ${
                slide.sectionType === 'intro' ? 'justify-center' : ''
              }`}
              id={`slide-${index}`}
            >
                      <SlideComponent />

            </motion.section>
          )
        })}
      </div>
    </div>
  )
}