'use client'

import { useState } from 'react'
import { FileDown, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { slides } from '@/data/slides'

interface PDFExportSimpleProps {
  isDarkMode: boolean
  currentSlide: number
  slideNames: string[]
  setCurrentSlide: (slide: number) => void
}

export default function PDFExportSimple({ isDarkMode, currentSlide, slideNames, setCurrentSlide }: PDFExportSimpleProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const exportToPDF = async () => {
    setIsExporting(true)
    setExportProgress(0)

    try {
      // Store original slide
      const originalSlide = currentSlide

      // Create PDF with 16:9 aspect ratio
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [297, 167]
      })

      let isFirstPage = true

      for (let i = 0; i < slides.length; i++) {
        setExportProgress(((i + 0.5) / slides.length) * 100)

        // Navigate to slide
        setCurrentSlide(i)

        // Wait for slide to render
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Find the main content area
        const contentElement = document.querySelector('.pt-20.pb-0.px-8.min-h-screen') as HTMLElement
        
        if (contentElement) {
          // Capture the current slide
          const canvas = await html2canvas(contentElement, {
            width: 1920,
            height: 1080,
            scale: 0.5,
            backgroundColor: isDarkMode ? '#212126' : '#f3f4f6',
            logging: false,
            useCORS: true,
            allowTaint: true,
            foreignObjectRendering: true
          })

          if (!isFirstPage) {
            pdf.addPage([297, 167], 'landscape')
          }

          const imgData = canvas.toDataURL('image/png', 0.8)
          pdf.addImage(imgData, 'PNG', 0, 0, 297, 167, '', 'FAST')

          isFirstPage = false
        }

        // Update progress
        setExportProgress(((i + 1) / slides.length) * 100)
      }

      // Restore original slide
      setCurrentSlide(originalSlide)

      // Save the PDF
      const fileName = `PYD-SEO-Audit-Presentation-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)

    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
      // Restore original slide on error
      setCurrentSlide(currentSlide)
    } finally {
      setIsExporting(false)
      setExportProgress(0)
    }
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
                Please wait while we capture each slide...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}