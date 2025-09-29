'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import SmoothScrolling from '@/components/SmoothScrolling'
import ScrollView from '@/components/ScrollView'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { slides, slideNames } from '@/data/staticSlides'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [viewMode, setViewMode] = useState<'slides' | 'scroll'>('slides')
  
  const totalSlides = slides.length

  // slideNames is now imported from markdown data

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('presentation-theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('presentation-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'Escape') {
        exitFullscreen()
      } else if (e.key === 'f') {
        toggleFullscreen()
      } else if (e.key === 't') {
        toggleTheme()
      } else if (e.key === 'v') {
        toggleViewMode()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleNavMenu = () => {
    // Function kept for sidebar compatibility but no longer used
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'slides' ? 'scroll' : 'slides')
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <SidebarProvider 
      style={{
        '--sidebar-width': '320px',
        '--sidebar-width-mobile': '320px',
      } as React.CSSProperties}
    >
      <AppSidebar 
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        isFullscreen={isFullscreen}
        isDarkMode={isDarkMode}
        viewMode={viewMode}
        slides={slides}
        slideNames={slideNames}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onToggleFullscreen={toggleFullscreen}
        onToggleTheme={toggleTheme}
        onGoToSlide={goToSlide}
        onSetViewMode={setViewMode}
      />
      <SidebarInset className="transition-colors duration-300">
        <SmoothScrolling />
        {/* Header */}
        <div className="sticky top-0 z-20 min-h-16 max-h-16 backdrop-blur-[20px] flex flex-grow items-center gap-2 px-6 py-5  border-b opacity-70">
          <div className="grid flex-1 grid-cols-12 items-center gap-12">
            <div className="col-span-4 flex items-center gap-4">
              <SidebarTrigger />
              <div className="text-xs tracking-widest uppercase">
              PYD Agency
              </div>
            </div>
            <div className="col-span-8 flex justify-between items-center gap-6">
              <div className="text-xs tracking-wider uppercase">
                {slides[currentSlide].section && (
                  slides[currentSlide].section.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')
                )}
              </div>
              <div className="text-xs tracking-wider">
                P.{currentSlide + 1} / {totalSlides}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'slides' ? (

            <div className="max-w-[2800px]">
            
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ 
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="w-full"
                      >
                        <CurrentSlideComponent />
                      </motion.div>
                    </AnimatePresence>
                  </div>
      
        ) : (
          <ScrollView isDarkMode={isDarkMode} />
        )}

        {/* Floating Navigation Buttons */}
        {viewMode === 'slides' && (
          <div className="fixed bottom-6 right-6 z-30 flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-3 rounded-full backdrop-blur-sm border transition-all ${
                isDarkMode 
                  ? 'bg-gray-800/90 hover:bg-gray-700/90 border-gray-600 text-white disabled:opacity-30 disabled:cursor-not-allowed' 
                  : 'bg-slate-600/90 hover:bg-blue-700/90 border-gray-200 text-white disabled:opacity-30 disabled:cursor-not-allowed'
              }`}
              title="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`p-3 rounded-full backdrop-blur-sm border transition-all ${
                isDarkMode 
                  ? 'bg-gray-800/90 hover:bg-gray-700/90 border-gray-600 text-white disabled:opacity-30 disabled:cursor-not-allowed' 
                  : 'bg-slate-600/90 hover:bg-blue-700/90 border-gray-200 text-white disabled:opacity-30 disabled:cursor-not-allowed'
              }`}
              title="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      </SidebarInset>
    </SidebarProvider>
  )
}
