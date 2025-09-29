interface NavigationProps {
  currentSlide: number
  totalSlides: number
  onNext: () => void
  onPrev: () => void
  onGoTo: (index: number) => void
}

export default function Navigation({ currentSlide, totalSlides, onNext, onPrev, onGoTo }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-50"
        >
          Previous
        </button>
        
        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoTo(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}