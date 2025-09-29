"use client"

import * as React from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Eye,
  LayoutGrid,
  Download,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import ViewSwitcher from '@/components/ViewSwitcher'
import SlideIndicator from '@/components/SlideIndicator'
import { exportToMarkdown, downloadMarkdown } from '@/lib/exportMarkdown'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  currentSlide: number
  totalSlides: number
  isFullscreen: boolean
  isDarkMode: boolean
  viewMode: 'slides' | 'scroll'
  slides: any[]
  slideNames: string[]
  onPrevSlide: () => void
  onNextSlide: () => void
  onToggleFullscreen: () => void
  onToggleTheme: () => void
  onGoToSlide: (index: number) => void
  onSetViewMode: (mode: 'slides' | 'scroll') => void
}

export function AppSidebar({ 
  currentSlide,
  totalSlides,
  isFullscreen,
  isDarkMode,
  viewMode,
  slides,
  slideNames,
  onPrevSlide,
  onNextSlide,
  onToggleFullscreen,
  onToggleTheme,
  onGoToSlide,
  onSetViewMode,
  ...props 
}: AppSidebarProps) {
  const { state } = useSidebar()
  
  const handleExportMarkdown = () => {
    const markdown = exportToMarkdown()
    downloadMarkdown(markdown, 'pyd-seo-audit-report.md')
  }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-6 py-5 min-h-16 max-h-16 border-b opacity-70">
          <Image 
            src="/logo.svg" 
            alt="PYD Agency Logo" 
            width={24} 
            height={24} 
            className="flex-shrink-0"
          />
          {state !== "collapsed" && (
            <div className="text-xs tracking-wider uppercase font-bold whitespace-nowrap overflow-hidden text-ellipsis">SEO Audit</div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex flex-col gap-0 px-0 py-0 h-full">
        {/* Slide Index */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="text-xs font-medium px-6 pb-0 py-4 opacity-70 flex-shrink-0">
            Index
          </div>
          <ScrollArea 
            className="flex-1" 
            style={{ 
              overflowY: 'auto', 
              overscrollBehavior: 'contain',
              scrollbarGutter: 'stable'
            }}
            onWheel={(e) => e.stopPropagation()}
            onScroll={(e) => e.stopPropagation()}
          >
            <div 
              className="px-0 py-0 pb-24"
              style={{ minHeight: '100%' }} // Temporary: force content to be taller than container to test scrolling
            >
              {(() => {
                let currentSection = ''
                return slides.map((slide, index) => {
                  const showSectionHeader = slide.section !== currentSection
                  if (showSectionHeader) {
                    currentSection = slide.section
                  }
                  
                  const sectionTitle = slide.section
                    ? slide.section.split('-').map((word: string) => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')
                    : 'General'
                  
                  return (
                    <div key={index}>
                      {showSectionHeader && (
                        <div className="px-6 pb-2 m-0 mt-4 pt-6 text-[10px] font-extralight font-mono uppercase tracking-wider border-t opacity-70 whitespace-nowrap overflow-hidden text-ellipsis">
                          {sectionTitle}
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onGoToSlide(index)}
                        className={`w-full justify-start text-left h-auto p-3 py-2 mb-0 transition-all duration-300 ${
                          currentSlide === index
                            ? 'bg-secondary text-primary'
                            : slide.sectionType === 'intro'
                              ? 'hover:bg-accent'
                              : 'hover:bg-accent'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 px-3">
                            {currentSlide === index && (
                              <div className="w-2 h-2 bg-current rounded-full"></div>
                            )}
                            {slide.sectionType === 'intro' && (
                              <div className="text-xs bg-yellow-200 text-black px-2 py-0 font-normal">
                                INTRO
                              </div>
                            )}
                            <div className={`text-sm ${slide.sectionType === 'intro' ? 'font-normal' : 'font-normal'} text-left whitespace-nowrap overflow-hidden text-ellipsis`}>
                              {slideNames[index]}
                            </div>
                          </div>
                          <div className="text-xs opacity-70">{index + 1}</div>
                        </div>
                      </Button>
                    </div>
                  )
                })
              })()}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        {/* Control Section */}
        <div className="px-4 py-2 space-y-2">
          {/* Export Button */}
          <div className="mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportMarkdown}
              className="w-full text-xs"
            >
              <Download className="h-3 w-3 mr-2" />
              Export as Markdown
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 justify-between">
          {/* View Mode Toggle */}
          <ViewSwitcher
            viewMode={viewMode}
            onToggle={onSetViewMode}
            isDarkMode={isDarkMode}
          />
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFullscreen}
              className="flex-0"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </SidebarContent>
      <Separator />

      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 px-2 py-2 overflow-hidden">
          <div className="text-xs opacity-60">
            <p className="whitespace-nowrap">Prepared on 9/26/25 for PYD</p>
          </div>
          {state !== "collapsed" && (
            <Image 
              src="/okayokay.svg" 
              alt="OkayOkay Logo" 
              width={60} 
              height={16} 
              className="flex-shrink-0 opacity-60"
            />
          )}
        </div>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
