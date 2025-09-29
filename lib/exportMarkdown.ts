import { slides } from '@/data/staticSlides'

export function exportToMarkdown(): string {
  const date = new Date().toLocaleDateString()
  
  let markdown = `# SEO Audit \n\n`
  markdown += `**PYD Agency - Comprehensive Analysis & Strategic Roadmap**\n\n`
  markdown += `*Generated on ${date}*\n\n`
  markdown += `---\n\n`

  let currentSection = ''
  
  slides.forEach((slide, index) => {
    // Add section headers
    if (slide.section !== currentSection) {
      currentSection = slide.section
      const sectionTitle = slide.section
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      markdown += `## ${sectionTitle}\n\n`
    }

    // Access the correct data structure - title is in data.headline
    const title = slide.data?.headline || slide.markdown?.title || 'Untitled'
    const subtitle = slide.data?.subtitle || slide.markdown?.subtitle || ''
    const description = slide.description || slide.markdown?.description || ''
    const keyPoints = slide.data?.keyPoints || slide.markdown?.keyPoints || []
    const insights = slide.data?.insights || slide.markdown?.insights || []
    const recommendations = slide.data?.recommendations || slide.markdown?.recommendations || []
    const nextSteps = slide.data?.nextSteps || slide.markdown?.nextSteps || []

    // Add slide number and title
    markdown += `### ${index + 1}. ${title}\n\n`
    
    // Add subtitle if it exists
    if (subtitle) {
      markdown += `**${subtitle}**\n\n`
    }
    
    // Add description if it exists
    if (description) {
      markdown += `${description}\n\n`
    }
    
    // Add key points
    if (keyPoints && keyPoints.length > 0) {
      markdown += `**Key Points:**\n\n`
      keyPoints.forEach(point => {
        markdown += `- ${point}\n`
      })
      markdown += `\n`
    }
    
    // Add insights
    if (insights && insights.length > 0) {
      markdown += `**Insights:**\n\n`
      insights.forEach(insight => {
        markdown += `- ${insight}\n`
      })
      markdown += `\n`
    }
    
    // Add recommendations
    if (recommendations && recommendations.length > 0) {
      markdown += `**Recommendations:**\n\n`
      recommendations.forEach(rec => {
        markdown += `- ${rec}\n`
      })
      markdown += `\n`
    }
    
    // Add next steps
    if (nextSteps && nextSteps.length > 0) {
      markdown += `**Next Steps:**\n\n`
      nextSteps.forEach(step => {
        markdown += `- ${step}\n`
      })
      markdown += `\n`
    }
    
    markdown += `---\n\n`
  })
  
  return markdown
}

export function downloadMarkdown(content: string, filename: string = 'seo-audit-report.md') {
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}