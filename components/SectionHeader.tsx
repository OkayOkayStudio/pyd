interface SectionHeaderProps {
  section: string
  slideNumber: number
  totalSlides: number
}

export default function SectionHeader({ section, slideNumber, totalSlides }: SectionHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 px-6 py-4 bg-gradient-to-b from-black/50 to-transparent">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm opacity-60">PYD Agency SEO Audit</div>
          <div className="text-lg font-semibold">{section}</div>
        </div>
        <div className="text-sm opacity-60">
          {slideNumber} / {totalSlides}
        </div>
      </div>
    </div>
  )
}