import TitleSlide from '@/components/slides/TitleSlide'
import DashboardSlide from '@/components/slides/DashboardSlide'
import TrafficCollapseSlide from '@/components/slides/TrafficCollapseSlide'
import RevenueLossSlide from '@/components/slides/RevenueLossSlide'
import IndexationCrisisSlide from '@/components/slides/IndexationCrisisSlide'
import DomainAuthoritySlide from '@/components/slides/DomainAuthoritySlide'
import SiteSpeedSlide from '@/components/slides/SiteSpeedSlide'
import CompetitorComparisonSlide from '@/components/slides/CompetitorComparisonSlide'
import KeywordOpportunitiesSlide from '@/components/slides/KeywordOpportunitiesSlide'
import TechnicalIssuesSlide from '@/components/slides/TechnicalIssuesSlide'
import ContentIssuesSlide from '@/components/slides/ContentIssuesSlide'
import PriorityMatrixSlide from '@/components/slides/PriorityMatrixSlide'
import ActionPlanSlide from '@/components/slides/ActionPlanSlide'
import ROIProjectionSlide from '@/components/slides/ROIProjectionSlide'
import SectionIntroSlide from '@/components/slides/SectionIntroSlide'
import SchemaOptimizationSlide from '@/components/slides/SchemaOptimizationSlide'
import { FileText, Wrench, Edit, Target, ExternalLink, BarChart, MapPin, Zap } from 'lucide-react'
import * as metrics from './metrics'
import * as chartData from './chartData'

// Import markdown parsing capability
interface MarkdownSlideData {
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

interface SlideData {
  id: string
  component: React.ComponentType<any>
  description: string
  section?: string
  sectionType?: 'intro' | 'content'
  // Enhanced data structure - can be populated from markdown
  markdown?: MarkdownSlideData
  // Traditional data structure (keeping for backwards compatibility)
  data?: {
    // Metrics and KPIs
    metrics?: any[]
    chartData?: any[]
    tables?: any[]
    // Textual content
    headline?: string
    subtitle?: string
    keyPoints?: string[]
    insights?: string[]
    // Visual elements
    charts?: {
      type: 'bar' | 'line' | 'pie' | 'gauge' | 'funnel' | 'table'
      data: any[]
      config?: any
    }[]
    // Action items
    recommendations?: string[]
    nextSteps?: string[]
    priority?: 'critical' | 'high' | 'medium' | 'low'
    // Meta information
    tags?: string[]
    lastUpdated?: string
  }
}

export const sections = [
  { id: 'statement-of-work', name: 'Statement of Work & Agreement', icon: FileText },
  { id: 'technical-seo', name: 'Technical SEO Analysis', icon: Wrench },
  { id: 'on-page-seo', name: 'On-Page SEO Optimization', icon: Edit },
  { id: 'content-strategy', name: 'Content & Strategy Development', icon: Target },
  { id: 'off-page-seo', name: 'Off-Page SEO & Authority', icon: ExternalLink },
  { id: 'analytics-reporting', name: 'Analytics & Performance Tracking', icon: BarChart },
  { id: 'local-seo', name: 'Local SEO Optimization', icon: MapPin },
  { id: 'geo', name: 'Generative Engine Optimization', icon: Zap }
]

export const slides: SlideData[] = [
  // Section 1: Statement of Work & Agreement
  {
    id: 'sow-intro',
    component: () => SectionIntroSlide({ 
      title: 'Statement of Work & Agreement', 
      description: 'Project scope, investment breakdown, and next steps for your SEO transformation.',
      icon: FileText
    }),
    section: 'statement-of-work',
    sectionType: 'intro',
    description: 'Section introduction for Statement of Work & Agreement'
  },
  { 
    id: 'title', 
    component: TitleSlide,
    section: 'statement-of-work',
    sectionType: 'content',
    description: 'Welcome to your comprehensive SEO audit presentation. This analysis reveals critical issues affecting your website\'s search engine performance and provides a clear roadmap to recovery.'
  },
  { 
    id: 'roi-projection', 
    component: ROIProjectionSlide,
    section: 'statement-of-work',
    sectionType: 'content',
    description: 'Investment and return projections showing break-even within 2-3 months. The $9k monthly investment targets $20k revenue by month 6, with 85% success rate based on similar recovery projects.'
  },

  // Section 2: Technical SEO Analysis
  {
    id: 'tech-intro',
    component: () => SectionIntroSlide({ 
      title: 'Technical SEO Analysis', 
      description: 'Deep dive into technical issues blocking your search engine performance.',
      icon: Wrench
    }),
    section: 'technical-seo',
    sectionType: 'intro',
    description: 'Section introduction for Technical SEO Analysis'
  },
  { 
    id: 'traffic-collapse', 
    component: TrafficCollapseSlide,
    section: 'technical-seo',
    sectionType: 'content',
    description: 'Dramatic 68% traffic decline analysis. Your site experienced a severe drop from 614 to 195 daily impressions, indicating critical technical or algorithmic issues requiring immediate attention.',
    data: {
      headline: 'Catastrophic Traffic Collapse',
      subtitle: '68% Impression Drop - Emergency Investigation Required',
      chartData: chartData.trafficCollapseData,
      charts: [{
        type: 'line',
        data: chartData.trafficCollapseData,
        config: {
          xAxis: 'date',
          yAxis: ['impressions', 'clicks'],
          colors: ['#FF4444', '#FFB700']
        }
      }],
      keyPoints: [
        'Traffic dropped from 614 to 195 daily impressions (68% decline)',
        'Collapse occurred around September 11th',
        'Click-through rate improved to 7.69% (149% increase)',
        'Average position improved to 38.5 (21% better)'
      ],
      insights: [
        'Severe impression drop suggests algorithmic penalty or technical blocking',
        'Improved CTR indicates remaining traffic is more targeted',
        'Position improvements suggest content quality is not the issue',
        'Timeline suggests sudden technical or indexing problem'
      ],
      recommendations: [
        'Investigate Google Search Console for manual penalties',
        'Check robots.txt and crawling permissions',
        'Review server logs for 4xx/5xx errors around Sep 11',
        'Audit recent site changes or deployments'
      ],
      priority: 'critical',
      tags: ['traffic', 'collapse', 'emergency', 'technical']
    }
  },
  { 
    id: 'indexation-crisis', 
    component: IndexationCrisisSlide,
    section: 'technical-seo',
    sectionType: 'content',
    description: 'Critical indexation funnel breakdown. Of 88 crawled pages, only 10 are ranking and 6 generate traffic. Major issues include duplicate content and crawling problems blocking Google access.'
  },
  { 
    id: 'site-speed', 
    component: SiteSpeedSlide,
    section: 'technical-seo',
    sectionType: 'content',
    description: 'Site speed performance analysis shows 87 of 88 pages loading slowly at 1.5 seconds versus the 0.5 second target. This impacts both user experience and search rankings significantly.'
  },
  { 
    id: 'technical-issues', 
    component: TechnicalIssuesSlide,
    section: 'technical-seo',
    sectionType: 'content',
    description: 'Critical technical audit results showing multiple blocking issues. Failed elements include page speed, canonicals, schema markup, and sitemap submission - all preventing optimal search performance.'
  },
  { 
    id: 'action-plan', 
    component: ActionPlanSlide,
    section: 'technical-seo',
    sectionType: 'content',
    description: 'Comprehensive 90-day  divided into three phases: emergency stabilization, content foundation building, and growth acceleration. Each phase includes specific actions and measurable outcomes.',
    data: {
      headline: '90-Day Recovery Action Plan',
      subtitle: 'Strategic Roadmap to SEO Success',
      phases: metrics.actionPlan,
      quickActions: metrics.quickActions,
      keyPoints: [
        'Phase 1: Emergency stabilization (30 days)',
        'Phase 2: Content & technical foundation (30 days)',
        'Phase 3: Growth & authority building (30 days)',
        'Measurable outcomes defined for each phase'
      ],
      recommendations: [
        'Begin Phase 1 immediately - every day costs revenue',
        'Allocate dedicated resources for each phase',
        'Monitor metrics weekly during recovery',
        'Adjust timeline based on early results'
      ],
      nextSteps: [
        'Approve investment and timeline',
        'Assign internal team members',
        'Schedule weekly progress reviews',
        'Establish success metrics tracking'
      ],
      priority: 'high',
      tags: ['action-plan', 'roadmap', 'phases', 'recovery']
    }
  },

  // Section 3: On-Page SEO Optimization
  {
    id: 'onpage-intro',
    component: () => SectionIntroSlide({ 
      title: 'On-Page SEO Optimization', 
      description: 'Content optimization opportunities and keyword strategy improvements.',
      icon: Edit
    }),
    section: 'on-page-seo',
    sectionType: 'intro',
    description: 'Section introduction for On-Page SEO Optimization'
  },
  { 
    id: 'keyword-opportunities', 
    component: KeywordOpportunitiesSlide,
    section: 'on-page-seo',
    sectionType: 'content',
    description: 'Keyword ranking opportunities analysis identifies high-potential terms currently ranking on page 2-3. Strategic optimization could capture significant additional traffic from industry-relevant searches.'
  },
  { 
    id: 'content-issues', 
    component: ContentIssuesSlide,
    section: 'on-page-seo',
    sectionType: 'content',
    description: 'Content quality assessment revealing thin content on 22 pages, 37 duplicates, and missing optimization elements. These issues prevent pages from ranking effectively in search results.'
  },

  // Section 4: Content & Strategy Development
  {
    id: 'content-intro',
    component: () => SectionIntroSlide({ 
      title: 'Content & Strategy Development', 
      description: 'Strategic content planning and competitive positioning analysis.',
      icon: Target
    }),
    section: 'content-strategy',
    sectionType: 'intro',
    description: 'Section introduction for Content & Strategy Development'
  },
  { 
    id: 'competitor-comparison', 
    component: CompetitorComparisonSlide,
    section: 'content-strategy',
    sectionType: 'content',
    description: 'Competitive landscape analysis positioning you consistently last across all key metrics. Competitors achieve 100x more traffic, 20x more keywords, and significantly higher domain authority scores.',
    data: {
      headline: 'Competitive Landscape Analysis',
      subtitle: 'Significant Performance Gaps Across All Metrics',
      tables: [chartData.competitorTableData],
      competitorData: metrics.competitorComparison,
      keyPoints: [
        'PYD ranks last across all key performance metrics',
        'Competitors achieve 100x more monthly traffic',
        'Domain authority gap: 0.4 vs 35-42 (industry)',
        'Keyword ranking deficit: 35 vs 500-800 (competitors)'
      ],
      insights: [
        'Massive opportunity exists - market is clearly viable',
        'Competitors prove demand exists for your services',
        'Your positioning/content may not match market needs',
        'Technical issues likely preventing competitive performance'
      ],
      recommendations: [
        'Study competitor content strategies and keyword focus',
        'Analyze competitor backlink profiles for opportunities',
        'Implement competitor keyword targeting',
        'Consider competitive content gaps as quick wins'
      ],
      priority: 'high',
      tags: ['competitors', 'analysis', 'benchmarking', 'opportunity']
    }
  },

  // Section 5: Off-Page SEO & Authority
  {
    id: 'offpage-intro',
    component: () => SectionIntroSlide({ 
      title: 'Off-Page SEO & Authority', 
      description: 'Domain authority building and strategic link acquisition planning.',
      icon: ExternalLink
    }),
    section: 'off-page-seo',
    sectionType: 'intro',
    description: 'Section introduction for Off-Page SEO & Authority'
  },
  { 
    id: 'domain-authority', 
    component: DomainAuthoritySlide,
    section: 'off-page-seo',
    sectionType: 'content',
    description: 'Domain authority comparison reveals a concerning 0.4 rating versus industry standards of 20+ minimum and 50+ for leaders. This severely limits your competitive positioning and ranking potential.'
  },
  { 
    id: 'priority-matrix', 
    component: PriorityMatrixSlide,
    section: 'off-page-seo',
    sectionType: 'content',
    description: 'Strategic priority matrix organizing all identified issues by impact versus effort required. Quick wins include sitemap submission and canonical fixes, while long-term goals focus on authority building.'
  },

  // Section 6: Analytics & Performance Tracking
  {
    id: 'analytics-intro',
    component: () => SectionIntroSlide({ 
      title: 'Analytics & Performance Tracking', 
      description: 'Current performance metrics and success measurement framework.',
      icon: BarChart
    }),
    section: 'analytics-reporting',
    sectionType: 'intro',
    description: 'Section introduction for Analytics & Performance Tracking'
  },
  { 
    id: 'dashboard', 
    component: DashboardSlide,
    section: 'analytics-reporting',
    sectionType: 'content',
    description: 'Executive overview of your current SEO health. Key metrics show a health score of 2.5/10 with only 11% of pages ranking and significant performance gaps across all areas.',
    data: {
      headline: 'SEO Health Dashboard',
      subtitle: ' Action Required',
      metrics: [
        { 
          label: 'Pages Ranking', 
          value: `${metrics.executiveMetrics.pagesRanking.percentage}%`, 
          subtext: `${metrics.executiveMetrics.pagesRanking.current} of ${metrics.executiveMetrics.pagesRanking.total}`, 
          status: 'critical'
        },
        { 
          label: 'Domain Rating', 
          value: metrics.executiveMetrics.domainRating.toString(), 
          subtext: `Industry: ${metrics.executiveMetrics.industryAverage}+`, 
          status: 'critical'
        },
        { 
          label: 'Traffic Drop', 
          value: `${metrics.executiveMetrics.trafficDrop}%`, 
          subtext: 'Last Week', 
          status: 'critical'
        },
        { 
          label: 'Monthly Visitors', 
          value: metrics.executiveMetrics.monthlyVisitors.toString(), 
          subtext: 'Target: 1,000+', 
          status: 'critical'
        },
      ],
      keyPoints: [
        'Health Score: 2.5/10 - Critical threshold',
        'Only 11.4% of pages are ranking in search results',
        'Domain authority near zero (0.4/100)',
        '68% traffic drop requires immediate investigation'
      ],
      priority: 'critical',
      tags: ['dashboard', 'overview', 'metrics', 'critical']
    }
  },
  { 
    id: 'revenue-loss', 
    component: RevenueLossSlide,
    section: 'analytics-reporting',
    sectionType: 'content',
    description: 'Current revenue impact assessment. With only $500 monthly revenue against a $50k potential, you\'re losing $594k annually due to poor search visibility and ranking performance.'
  },

  // Section 7: Local SEO Optimization
  {
    id: 'local-intro',
    component: () => SectionIntroSlide({ 
      title: 'Local SEO Optimization', 
      description: 'Geographic targeting and local search optimization opportunities.',
      icon: MapPin
    }),
    section: 'local-seo',
    sectionType: 'intro',
    description: 'Section introduction for Local SEO Optimization'
  },

  // Section 8: Generative Engine Optimization
  {
    id: 'geo-intro',
    component: () => SectionIntroSlide({ 
      title: 'Generative Engine Optimization', 
      description: 'Preparing for AI-powered search and structured data optimization.',
      icon: Zap
    }),
    section: 'geo',
    sectionType: 'intro',
    description: 'Section introduction for Generative Engine Optimization'
  },
  {
    id: 'schema-optimization',
    component: SchemaOptimizationSlide,
    section: 'geo',
    sectionType: 'content',
    description: 'Schema markup implementation strategy and entity optimization for AI-powered search engines. Critical gaps in structured data prevent optimal visibility in generative search results.'
  }
]