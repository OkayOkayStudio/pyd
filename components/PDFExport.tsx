'use client'

import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FileDown, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { slides } from '@/data/slides'

interface PDFExportProps {
  isDarkMode: boolean
  currentSlide: number
  slideNames: string[]
}

export default function PDFExport({ isDarkMode, currentSlide, slideNames }: PDFExportProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const exportToPDF = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      // Create PDF with 16:9 aspect ratio (landscape) - standard presentation size
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [297, 167] // 16:9 aspect ratio in mm (approximately A4 landscape proportions)
      })

      let isFirstPage = true

      // Get current presentation container to capture real content
      const presentationElement = document.querySelector('.presentation-container')
      
      if (!presentationElement) {
        // Fallback: Create static slides if presentation container not found
        await createStaticPDF(pdf)
        return
      }

      for (let i = 0; i < slides.length; i++) {
        setExportProgress(((i + 0.5) / slides.length) * 100)

        // Create a temporary slide container that matches your layout
        const slideContainer = document.createElement('div')
        slideContainer.style.position = 'fixed'
        slideContainer.style.top = '-10000px'
        slideContainer.style.left = '-10000px'
        slideContainer.style.width = '1920px'
        slideContainer.style.height = '1080px'
        slideContainer.style.backgroundColor = isDarkMode ? '#212126' : '#f3f4f6'
        slideContainer.style.color = isDarkMode ? 'white' : '#111827'
        slideContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif'
        slideContainer.style.padding = '60px 80px'
        slideContainer.style.boxSizing = 'border-box'
        slideContainer.style.zIndex = '-1'

        // Apply theme classes for Tailwind
        slideContainer.className = isDarkMode 
          ? 'bg-[#212126] text-white dark' 
          : 'bg-gray-200 text-gray-900'

        // Create slide layout
        const slideLayout = document.createElement('div')
        slideLayout.className = 'grid grid-cols-12 gap-20 h-full max-w-8xl mx-auto'
        slideLayout.style.height = '100%'

        // Left column
        const leftColumn = document.createElement('div')
        leftColumn.className = 'col-span-3 flex flex-col justify-center'
        leftColumn.innerHTML = `
          <div class="${isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-sm font-semibold mb-2">
            SLIDE ${i + 1} OF ${slides.length}
          </div>
          <h1 class="slide-title mb-12 leading-tight tracking-tight font-bold">
            ${slideNames[i]}
          </h1>
          <div class="${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-lg leading-relaxed">
            ${slides[i].description || 'Detailed analysis and insights for your SEO audit presentation.'}
          </div>
        `

        // Right column - render actual React component
        const rightColumn = document.createElement('div')
        rightColumn.className = 'col-span-9 flex items-center'
        rightColumn.style.paddingTop = '64px'
        rightColumn.style.paddingBottom = '64px'

        // Create a container for the React component
        const componentContainer = document.createElement('div')
        componentContainer.className = 'w-full'
        rightColumn.appendChild(componentContainer)

        slideLayout.appendChild(leftColumn)
        slideLayout.appendChild(rightColumn)
        slideContainer.appendChild(slideLayout)
        document.body.appendChild(slideContainer)

        try {
          // Render the actual React component
          const SlideComponent = slides[i].component
          const root = createRoot(componentContainer)
          
          // Render the component and wait for it to complete
          await new Promise((resolve) => {
            root.render(<SlideComponent />)
            // Give some time for component to render and any async content to load
            setTimeout(resolve, 500)
          })

          // Wait a bit more for any animations or async content
          await new Promise(resolve => setTimeout(resolve, 200))

          // Capture the slide
          const canvas = await html2canvas(slideContainer, {
            width: 1920,
            height: 1080,
            background: isDarkMode ? '#212126' : '#f3f4f6',
            logging: false,
            useCORS: true,
            allowTaint: true
          })

          if (!isFirstPage) {
            pdf.addPage([297, 167], 'landscape')
          }

          // Convert canvas to image and add to PDF
          const imgData = canvas.toDataURL('image/png', 0.8)
          pdf.addImage(imgData, 'PNG', 0, 0, 297, 167, '', 'FAST')

          isFirstPage = false

          // Clean up the React root
          root.unmount()
        } catch (error) {
          console.error(`Error rendering slide ${i}:`, error)
          // Continue with next slide even if this one fails
        }

        document.body.removeChild(slideContainer)

        // Update progress
        setExportProgress(((i + 1) / slides.length) * 100)
      }

      // Save the PDF
      const fileName = `PYD-SEO-Audit-Presentation-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)

    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
    } finally {
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  const createStaticPDF = async (pdf: jsPDF) => {
    // Fallback method for creating PDF with static content
    for (let i = 0; i < slides.length; i++) {
      if (i > 0) {
        pdf.addPage([297, 167], 'landscape')
      }

      // Add slide content using PDF text methods
      pdf.setFontSize(12)
      pdf.setTextColor(100, 100, 100)
      pdf.text(`SLIDE ${i + 1} OF ${slides.length}`, 20, 30)

      pdf.setFontSize(24)
      pdf.setTextColor(0, 0, 0)
      pdf.text(slideNames[i], 20, 50)

      pdf.setFontSize(12)
      pdf.setTextColor(100, 100, 100)
      const description = slides[i].description || 'Detailed analysis and insights for your SEO audit presentation.'
      const lines = pdf.splitTextToSize(description, 100)
      pdf.text(lines, 20, 70)

      // Add content area placeholder
      pdf.setDrawColor(200, 200, 200)
      pdf.setFillColor(245, 245, 245)
      pdf.rect(140, 40, 140, 80, 'FD')
      pdf.setTextColor(150, 150, 150)
      pdf.text('Slide Content Area', 210, 85, { align: 'center' })

      setExportProgress(((i + 1) / slides.length) * 100)
    }

    pdf.save('PYD-SEO-Audit-Presentation.pdf')
  }

  return (
    <>
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className={`p-2 rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
        }`}
        title="Export to PDF"
      >
        {isExporting ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
      </button>

      {/* Export Progress Overlay */}
      {isExporting && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className={`p-8 rounded-lg backdrop-blur-sm ${
            isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
          }`}>
            <div className="text-center">
              <Loader2 size={32} className="animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Exporting to PDF...</h3>
              <p className="text-sm opacity-70 mb-4">
                Processing slide {Math.ceil((exportProgress / 100) * slides.length)} of {slides.length}
              </p>
              <div className={`w-64 h-2 rounded-full overflow-hidden ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <p className="text-xs mt-2 opacity-50">
                This may take a few moments...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}