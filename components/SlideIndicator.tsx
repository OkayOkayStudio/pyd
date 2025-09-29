interface SlideIndicatorProps {
  current: number
  total: number
  onSelect: (index: number) => void
  isDarkMode?: boolean
}

export default function SlideIndicator({ current, total, onSelect, isDarkMode = true }: SlideIndicatorProps) {
  return (
    <div className="flex gap-0 hidden">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`h-2 transition-all rounded-1 ${
            index === current 
              ? isDarkMode 
                ? 'w-8 bg-white' 
                : 'w-8 bg-gray-800'
              : isDarkMode 
                ? 'w-2 bg-white/30 hover:bg-white/50' 
                : 'w-2 bg-gray-800/30 hover:'
          }`}
        />
      ))}
    </div>
  )
}