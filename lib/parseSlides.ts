import fs from 'fs'
import path from 'path'

export interface MarkdownSlide {
  id: string
  section: string
  type: 'content' | 'section-intro'
  priority: 'critical' | 'high' | 'medium' | 'low'
  tags: string[]
  title: string
  subtitle?: string
  description: string
  keyPoints: string[]
  insights: string[]
  recommendations: string[]
  nextSteps: string[]
  visualRequirements: string[]
  chartType?: string
  rawContent: string
}

export function parseMarkdownSlides(): MarkdownSlide[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'slides.md')
    const content = fs.readFileSync(filePath, 'utf8')
    
    // Split by slide separators (##)
    const slideBlocks = content.split(/^## /m).filter(block => block.trim())
    
    return slideBlocks.map(block => {
      const lines = block.split('\n')
      const title = lines[0].replace(/Slide\d*\s*/, '').trim()
      
      // Extract metadata
      const metadata: any = {}
      let contentStartIndex = 1
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line.startsWith('**') && line.includes(':**')) {
          const key = line.replace(/\*\*/g, '').split(':')[0].toLowerCase().replace(/\s/g, '')
          const value = line.split(':')[1].trim()
          
          if (key === 'tags') {
            metadata[key] = value.split(',').map(t => t.trim())
          } else {
            metadata[key] = value
          }
        } else if (line.startsWith('###')) {
          contentStartIndex = i
          break
        }
      }
      
      // Parse sections
      const remainingContent = lines.slice(contentStartIndex).join('\n')
      const sections = remainingContent.split(/^####\s/m)
      
      const slide: MarkdownSlide = {
        id: metadata.id || title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
        section: metadata.section || 'general',
        type: metadata.type === 'section-intro' ? 'section-intro' : 'content',
        priority: metadata.priority as 'critical' | 'high' | 'medium' | 'low' || 'medium',
        tags: metadata.tags || [],
        title: title,
        subtitle: metadata.subtitle,
        description: '',
        keyPoints: [],
        insights: [],
        recommendations: [],
        nextSteps: [],
        visualRequirements: [],
        rawContent: remainingContent
      }
      
      // Extract description from first section
      if (sections.length > 0) {
        const firstSection = sections[0]
        const descLines = firstSection.split('\n').filter(line => 
          line.trim() && 
          !line.trim().startsWith('#') && 
          !line.trim().startsWith('**') &&
          !line.trim().startsWith('|')
        )
        slide.description = descLines[0]?.trim() || ''
      }
      
      // Parse each section
      sections.forEach(section => {
        const sectionLines = section.split('\n')
        const sectionTitle = sectionLines[0]?.trim().toLowerCase()
        
        if (sectionTitle?.includes('key points')) {
          slide.keyPoints = extractListItems(section)
        } else if (sectionTitle?.includes('insights')) {
          slide.insights = extractListItems(section)
        } else if (sectionTitle?.includes('recommendations')) {
          slide.recommendations = extractListItems(section)
        } else if (sectionTitle?.includes('next steps')) {
          slide.nextSteps = extractListItems(section)
        } else if (sectionTitle?.includes('visual requirements')) {
          slide.visualRequirements = extractListItems(section)
        }
      })
      
      return slide
    })
  } catch (error) {
    console.error('Error parsing markdown slides:', error)
    return []
  }
}

function extractListItems(section: string): string[] {
  const lines = section.split('\n')
  return lines
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
    .map(line => line.replace(/^[\s\-\*]+/, '').trim())
    .filter(line => line.length > 0)
}

// Generate slide names for display
export function getSlideNames(slides: MarkdownSlide[]): string[] {
  return slides.map(slide => {
    // Clean up common title patterns
    let name = slide.title
      .replace(/Slide$/, '')
      .replace(/Analysis$/, '')
      .replace(/Assessment$/, '')
      .trim()
    
    // Handle section intros
    if (slide.type === 'section-intro') {
      return name.replace(/^Section Intro:\s*/, '')
    }
    
    return name
  })
}