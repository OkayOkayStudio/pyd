'use client'

import { LayoutGrid, Scroll } from 'lucide-react'

interface ViewSwitcherProps {
  viewMode: 'slides' | 'scroll'
  onToggle: (mode: 'slides' | 'scroll') => void
  isDarkMode: boolean
}

export default function ViewSwitcher({ viewMode, onToggle, isDarkMode }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onToggle('slides')}
        className={`p-2 rounded-sm transition-all duration-200 ${
          viewMode === 'slides'
            ? isDarkMode 
              ? 'bg-white/20 text-white' 
              : 'bg-black/20 text-black'
            : isDarkMode 
              ? 'hover:bg-white/10 text-gray-400' 
              : 'hover:bg-black/10 text-gray-600'
        }`}
        title="Slide View"
      >
        <LayoutGrid size={14} />
      </button>
      <button
        onClick={() => onToggle('scroll')}
        className={`p-2 rounded-sm transition-all duration-200 ${
          viewMode === 'scroll'
            ? isDarkMode 
              ? 'bg-white/20 text-white' 
              : 'bg-black/20 text-black'
            : isDarkMode 
              ? 'hover:bg-white/10 text-gray-400' 
              : 'hover:bg-black/10 text-gray-600'
        }`}
        title="Scroll View"
      >
        <Scroll size={14} />
      </button>
    </div>
  )
}