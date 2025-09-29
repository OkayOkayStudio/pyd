import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface MarkdownSlideData {
  id: string
  section: string
  sectionType: 'intro' | 'content'
  priority: 'critical' | 'high' | 'medium' | 'low'
  tags: string[]
  title: string
  subtitle?: string
  description: string
  content: string
  keyPoints?: string[]
  insights?: string[]
  recommendations?: string[]
  nextSteps?: string[]
  tables?: any[]
  metrics?: any[]
  phases?: any[]
  quickActions?: any[]
}

export function parseMarkdownSlides(markdownContent: string): MarkdownSlideData[] {
  // Split content by slide separators (##)
  const slideBlocks = markdownContent.split(/^## /m).filter(block => block.trim())
  
  return slideBlocks.map(block => {
    // Parse the slide block
    const lines = block.split('\n')
    const title = lines[0].replace('Slide', '').trim()
    
    // Extract metadata
    const metadata: any = {}
    let contentStart = 1
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('**') && line.includes(':**')) {
        const key = line.replace(/\*\*/g, '').split(':')[0].toLowerCase().replace(' ', '')
        const value = line.split(':')[1].trim()
        
        if (key === 'tags') {
          metadata[key] = value.split(',').map(t => t.trim())
        } else {
          metadata[key] = value
        }
        contentStart = i + 1
      } else if (line.startsWith('###')) {
        contentStart = i
        break
      }
    }
    
    // Parse content sections
    const remainingContent = lines.slice(contentStart).join('\n')
    const sections = remainingContent.split(/^###\s/m)
    
    const slide: MarkdownSlideData = {
      id: metadata.id || title.toLowerCase().replace(/\s+/g, '-'),
      section: metadata.section || 'general',
      sectionType: metadata.type as 'intro' | 'content' || 'content',
      priority: metadata.priority as 'critical' | 'high' | 'medium' | 'low' || 'medium',
      tags: metadata.tags || [],
      title: title,
      subtitle: metadata.subtitle,
      description: '',
      content: remainingContent,
      keyPoints: [],
      insights: [],
      recommendations: [],
      nextSteps: [],
      tables: [],
      metrics: [],
      phases: [],
      quickActions: []
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
      } else if (sectionTitle?.includes('quick actions')) {
        slide.quickActions = extractNumberedItems(section)
      } else if (sectionTitle && !slide.description) {
        // First section becomes description
        const desc = sectionLines.slice(1).join('\n').trim()
        slide.description = desc.split('\n')[0] // First paragraph
      }
    })
    
    return slide
  })
}

function extractListItems(section: string): string[] {
  const lines = section.split('\n')
  return lines
    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
    .map(line => line.replace(/^[\s\-\*]+/, '').trim())
    .filter(line => line.length > 0)
}

function extractNumberedItems(section: string): any[] {
  const lines = section.split('\n')
  return lines
    .filter(line => /^\d+\./.test(line.trim()))
    .map(line => {
      const parts = line.split(' - ')
      if (parts.length >= 3) {
        return {
          task: parts[0].replace(/^\d+\.\s*\*\*/, '').replace(/\*\*.*$/, ''),
          time: parts[1],
          priority: parts[2].toLowerCase()
        }
      }
      return { task: line.replace(/^\d+\.\s*/, ''), time: '', priority: 'medium' }
    })
}

export function loadMarkdownSlides(): MarkdownSlideData[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'slides.md')
    const markdownContent = fs.readFileSync(filePath, 'utf8')
    return parseMarkdownSlides(markdownContent)
  } catch (error) {
    console.error('Error loading markdown slides:', error)
    return []
  }
}