export interface KeywordData {
  keyword: string
  position: number
  positionChange?: number
  volume: number
  difficulty: number
  difficultyLevel: string
  cpc?: number
  opportunity: string
  action: string
  potentialTraffic: number
}

export interface ComparisonMetrics {
  totalKeywordsTracked: number
  keywordsImproved: number
  keywordsDeclined: number
  newKeywords: number
  averagePositionChange: number
  topPositionGain: {
    keyword: string
    change: number
    currentPosition: number
  }
}

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
  // New properties for keyword opportunities
  keywordData?: KeywordData[]
  comparisonMetrics?: ComparisonMetrics
  missingOpportunities?: string[]
}