import React from 'react'
import { type MarkdownSlide } from '@/lib/types'
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
import PerformanceSlide from '@/components/slides/PerformanceSlide'
import OrganicKeywordsSlide from '@/components/slides/OrganicKeywordsSlide'
import OpportunitiesSlide from '@/components/slides/OpportunitiesSlide'
import RecommendationsSlide from '@/components/slides/RecommendationsSlide'
import DetailsSlide from '@/components/slides/DetailsSlide'
import CompetitorLinkAnalysisSlide from '@/components/slides/CompetitorLinkAnalysisSlide'
import DefaultSlide from '@/components/slides/DefaultSlide'

// Component mapping is handled in getSlideComponent function below

// Static slide data - organized by presentation flow
const markdownSlides: MarkdownSlide[] = [
  // ============================================
  // SECTION 1: OPENING CRISIS (Critical Issues)
  // ============================================
  {
    id: 'title',
    section: 'statement-of-work',
    type: 'content',
    priority: 'critical',
    tags: ['introduction', 'title', 'overview'],
    title: 'SEO Audit',
    subtitle: '',
    description: 'Analysis includes technical assessment, competitive landscape, and strategic recovery roadmap with measurable outcomes.',
    keyPoints: [],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'dashboard',
    section: 'analytics-reporting',
    type: 'content',
    priority: 'critical',
    tags: ['dashboard', 'overview', 'metrics', 'critical'],
    title: 'Executive Overview - SEO Health Dashboard',
    subtitle: ' Action Required',
    description: 'Your current SEO health shows a critical situation requiring immediate intervention. With only 11% of pages ranking and significant performance gaps across all areas, this analysis reveals urgent issues blocking your search engine success.',
    keyPoints: [
      'Health Score: 2.5/10 - Critical threshold',
      'Only 11.4% of pages are ranking in search results',
      'Domain authority near zero (0.4/100)',
      '68% traffic drop requires immediate investigation'
    ],
    insights: [
      'Multiple compounding technical issues creating perfect storm',
      'Site is essentially invisible to search engines',
      'Every day of delay costs potential revenue',
      'All issues are fixable with proper execution'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: [],
    chartType: 'dashboard',
    rawContent: ''
  },
  {
    id: 'performance',
    section: 'analytics-reporting',
    type: 'content',
    priority: 'high',
    tags: ['performance', 'metrics', 'charts', 'data'],
    title: 'Performance Metrics',
    subtitle: 'Live SEO Data from March - September 2025',
    description: 'Real-time performance data shows your SEO journey from crisis to recovery. Track key metrics including organic traffic growth, domain authority improvements, and search visibility increases over the past 6 months.',
    keyPoints: [
      'Organic traffic increased 4,700% from 1 to 47 monthly visits',
      'Domain rating improved from 0 to 3.3 with doubled referring domains',
      'Search impressions peaked at 360 with better ranking positions',
      'Interactive charts show live data with toggle functionality'
    ],
    insights: [
      'Traffic recovery demonstrates effectiveness of SEO implementation',
      'Authority building shows consistent upward trajectory',
      'Visibility improvements across all search intent categories',
      'Real-time data integration enables ongoing optimization'
    ],
    recommendations: [
      'Continue monitoring performance metrics for trend analysis',
      'Use interactive charts to identify peak performance periods',
      'Leverage real-time data for quick response to algorithm changes',
      'Share live dashboard with stakeholders for transparency'
    ],
    nextSteps: [
      '**TODAY:** Review interactive performance charts and metrics',
      '**THIS WEEK:** Identify top-performing periods for analysis',
      '**ONGOING:** Monitor real-time data for optimization opportunities'
    ],
    visualRequirements: ['Interactive multi-line chart with Google Sheets integration'],
    chartType: 'performance',
    rawContent: ''
  },
  {
    id: 'details',
    section: 'analytics-reporting',
    type: 'content',
    priority: 'medium',
    tags: ['details', 'data', 'analysis', 'interactive', 'reporting'],
    title: 'Details',
    subtitle: 'Comprehensive Data Analysis & Insights',
    description: 'Interactive data table with real-time information from Google Sheets. Features sortable columns, filtering capabilities, and dynamic column management for comprehensive data analysis and reporting.',
    keyPoints: [
      'Real-time data synchronization from Google Sheets',
      'Interactive sorting and filtering capabilities',
      'Dynamic column visibility management',
      'Professional data presentation with pagination'
    ],
    insights: [
      'Live data connection ensures current information',
      'Sortable interface enables quick data analysis',
      'Filtering tools allow focused examination of specific records',
      'Responsive design works across all device sizes'
    ],
    recommendations: [
      'Use sorting features to identify trends and patterns',
      'Apply filters to focus on specific data segments',
      'Toggle column visibility for presentations',
      'Export insights for offline analysis and reporting'
    ],
    nextSteps: [
      'Review all data points for completeness',
      'Identify key trends through sorting analysis',
      'Create filtered views for specific reporting needs',
      'Establish regular data review processes'
    ],
    visualRequirements: ['**Interactive data table:** Real-time Google Sheets integration', '**Sorting & filtering:** Full column management capabilities'],
    rawContent: ''
  },
  {
    id: 'technical-seo-overview',
    section: 'technical-seo',
    type: 'content',
    priority: 'high',
    tags: ['technical', 'overview', 'foundation', 'performance'],
    title: 'Overview',
    subtitle: '',
    description: 'PYD Agency\'s technical foundation shows mixed performance signals with significant optimization opportunities. While the site has established basic crawlability with 10 indexed pages generating organic traffic, critical technical improvements are needed to support the agency\'s growth ambitions and premium brand positioning.',
    keyPoints: [
      'Crawlability Score: Moderate (6 pages with organic traffic out of 10 indexed)',
      'Performance Grade: Needs Improvement',
      'Mobile Optimization: Requires Assessment',
      'Schema Implementation: Basic/Missing'
    ],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'crawlability-indexation',
    section: 'technical-seo',
    type: 'content',
    priority: 'high',
    tags: ['crawlability', 'indexation', 'google', 'visibility'],
    title: 'Crawlability & Indexation',
    subtitle: '',
    description: '',
    keyPoints: [
      '10 pages indexed in Google\'s search results',
      '6 pages actively generating organic traffic (47 visits/month combined)',
      '4 pages indexed but not ranking - potential quality or relevance issues'
    ],
    insights: [],
    recommendations: [
      'Implement comprehensive internal linking between model profiles',
      'Create HTML sitemap for better crawl efficiency',
      'Add breadcrumb navigation for improved site hierarchy',
      'Review and optimize the 4 non-performing indexed pages'
    ],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'xml-sitemap-robots',
    section: 'technical-seo',
    type: 'content',
    priority: 'critical',
    tags: ['sitemap', 'robots', 'crawling', 'configuration'],
    title: 'XML Sitemap & Robots.txt',
    subtitle: '',
    description: '',
    keyPoints: [
      '⚠️ XML Sitemap: Requires verification and optimization',
      '⚠️ Robots.txt: Needs configuration review'
    ],
    insights: [],
    recommendations: [
      'Generate dynamic XML sitemap including all model portfolios',
      'Create separate sitemaps for model profiles, service pages, blog content, and image galleries',
      'Configure optimized robots.txt with proper allow/disallow directives',
      'Submit sitemaps to Google Search Console with appropriate update frequencies'
    ],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'site-architecture',
    section: 'technical-seo',
    type: 'content',
    priority: 'high',
    tags: ['architecture', 'structure', 'urls', 'hierarchy'],
    title: 'Site Architecture',
    subtitle: '',
    description: '',
    keyPoints: [
      'Current structure appears flat with individual model pages receiving direct traffic',
      'URL structure needs optimization: /talent/all/[id]/[name] is suboptimal',
      'Lacking hierarchical organization and clear content categories',
      'Recommended structure: /models/[name] or /portfolio/[name]'
    ],
    insights: [],
    recommendations: [
      'Implement hierarchical site architecture with clear category structure',
      'Optimize URL structure to /models/[name] format with 301 redirects',
      'Create logical content groupings: New Faces, Editorial, Commercial',
      'Use hyphens instead of underscores, keep URLs short and descriptive'
    ],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'core-web-vitals',
    section: 'technical-seo',
    type: 'content',
    priority: 'critical',
    tags: ['performance', 'core-web-vitals', 'speed', 'user-experience'],
    title: 'Core Web Vitals',
    subtitle: '',
    description: '',
    keyPoints: [
      'Target: LCP (Largest Contentful Paint) < 2.5 seconds',
      'Target: INP (Interaction to Next Paint) < 200ms',
      'Target: CLS (Cumulative Layout Shift) < 0.1',
      'Common issues: Large model images, JavaScript galleries, dynamic loading'
    ],
    insights: [],
    recommendations: [
      'Convert all images to WebP format with lazy loading implementation',
      'Implement responsive images with srcset for different screen sizes',
      'Enable browser caching (1 year for static assets) and implement CDN',
      'Define image dimensions in HTML and preload critical fonts to prevent layout shifts'
    ],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'mobile-optimization',
    section: 'technical-seo',
    type: 'content',
    priority: 'critical',
    tags: ['mobile', 'responsive', 'mobile-first', 'user-experience'],
    title: 'Mobile Optimization',
    subtitle: '',
    description: '',
    keyPoints: [
      'Mobile-first indexing requires optimized mobile experience',
      'Essential: Responsive design with touch-optimized navigation (44x44px minimum)',
      'Critical: Fast mobile page speed (<3 seconds) and readable text (16px minimum)',
      'Required: Mobile-friendly image galleries and compressed images'
    ],
    insights: [],
    recommendations: [
      'Implement AMP (Accelerated Mobile Pages) for model portfolio pages',
      'Compress images more aggressively for mobile delivery',
      'Simplify navigation menu structure for mobile touch interaction',
      'Test all interactive elements on touch devices for optimal user experience'
    ],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'site-speed',
    section: 'technical-seo',
    type: 'content',
    priority: 'critical',
    tags: ['speed', 'performance', 'technical', 'pagespeed'],
    title: 'Site Speed',
    subtitle: '98% of Pages Fail Core Web Vitals',
    description: 'Page speed issues affect 87 of 88 pages, directly impacting rankings, user experience, and conversion rates.',
    keyPoints: [
      'Pages failing speed test: 87 of 88 (98%)',
      'Average Time to First Byte: 1,450ms',
      'Target TTFB: <500ms',
      'Average 3x slower than Google\'s recommendation',
      'Direct correlation with poor rankings (position 31.6)',
      'Mobile performance particularly affected'
    ],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Speedometer gauge** showing:', 'Current: 1.5s pointing to red zone', 'Target: <0.5s in green zone', 'Yellow zone: 0.5-1s', 'Scale: 0-3 seconds'],
    chartType: 'site-speed',
    rawContent: ''
  },
  {
    id: 'mobile-index',
    section: 'technical-seo',
    type: 'content',
    priority: 'critical',
    tags: ['mobile', 'core-web-vitals', 'performance', 'responsive'],
    title: 'Mobile-First Index Crisis',
    subtitle: '73% of Fashion Searches on Mobile - You\'re Not Ready',
    description: 'Mobile experience is failing all Core Web Vitals standards while the fashion industry sees 73% of searches from mobile devices.',
    keyPoints: [
      'Mobile CWV: All metrics in red zone',
      'Desktop performs 40% better than mobile',
      'Google uses mobile-first indexing',
      'Fashion industry: 73% mobile searches'
    ],
    insights: [
      'Mobile conversion rate: 40% lower',
      'Mobile traffic potential: 3x desktop',
      'Lost mobile revenue: ~$1,500/month'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Side-by-side gauges:** Mobile vs Desktop scores', '**Waterfall chart:** Loading sequence problems'],
    rawContent: ''
  },
  {
    id: 'schema-markup',
    section: 'technical-seo',
    type: 'content',
    priority: 'high',
    tags: ['schema', 'structured-data', 'rich-snippets', 'markup'],
    title: 'Schema Markup Implementation',
    subtitle: '',
    description: '',
    keyPoints: [
      'Current state: Basic or missing structured data implementation',
      'Required: Organization schema for homepage with Los Angeles location',
      'Essential: Person schema for each model page with professional details',
      'Important: LocalBusiness and ImageObject schemas for complete coverage'
    ],
    insights: [],
    recommendations: [
      'Implement Organization schema on homepage with PYD Agency details and Los Angeles address',
      'Add Person schema to each model page including name, image, height, and professional details',
      'Deploy LocalBusiness schema with service areas and global reach information',
      'Include ImageObject schema for model portfolios with photographer credits and descriptions'
    ],
    nextSteps: [],
    visualRequirements: [],
    rawContent: ''
  },
  {
    id: 'technical-checklist',
    section: 'technical-seo',
    type: 'content',
    priority: 'critical',
    tags: ['technical', 'checklist', 'issues', 'status'],
    title: 'Technical SEO Audit Results',
    subtitle: 'Comprehensive Technical Issue Assessment',
    description: 'Multiple technical failures compound to create near-complete search invisibility, with only 1 of 6 critical technical requirements currently passing.',
    keyPoints: [
      'Only 1 of 6 technical requirements passing',
      'Multiple critical failures blocking indexation',
      'Each issue compounds others\' negative impact',
      'Most fixes achievable within 1-2 weeks'
    ],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Stacked bar chart** showing:', 'Failed components: 5 (red)', 'Passed components: 1 (green)', 'Total height: 6 components'],
    rawContent: ''
  },
  {
    id: 'crawl-budget',
    section: 'technical-seo',
    type: 'content',
    priority: 'high',
    tags: ['crawl', 'budget', 'googlebot', 'efficiency'],
    title: 'Google Can\'t Crawl 53% of Your Site',
    subtitle: 'Wasting Precious Crawl Budget on Wrong Pages',
    description: 'Crawl budget analysis reveals Google is wasting 60% of its allocation on error pages and duplicates while missing important content.',
    keyPoints: [
      'Googlebot allocation: ~100 pages/day',
      'Currently crawling 404 pages (waste)',
      'Missing 47 important pages',
      'Inefficient URL structure'
    ],
    insights: [
      '60% of crawl budget wasted on low-value pages',
      'Fixing redirect chains saves 30% budget',
      'Proper robots.txt could improve efficiency 50%'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Funnel chart:** Crawl budget allocation', '**Pie chart:** Waste vs. productive crawling'],
    rawContent: ''
  },
  {
    id: 'indexation-crisis',
    section: 'technical-seo',
    type: 'content',
    priority: 'critical',
    tags: ['indexation', 'crawling', 'technical', 'funnel'],
    title: 'Indexation & Crawling Crisis',
    subtitle: '88% of Content Invisible to Google',
    description: 'Critical indexation failures mean Google cannot find or rank 78 of your 88 pages, essentially making your site invisible in search results.',
    keyPoints: [
      'Only 10 pages currently ranking for any keywords',
      '41 pages in sitemap (missing 47 pages - 53%)',
      'No sitemap submitted to Google Search Console',
      'Multiple technical barriers preventing indexation'
    ],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Funnel chart** showing progressive drop-off:', '88 pages total (top)', '41 in sitemap', '30 crawled successfully', '10 ranking', '6 getting traffic (bottom)'],
    chartType: 'indexation-crisis',
    rawContent: ''
  },
  {
    id: 'structured-data',
    section: 'technical-seo',
    type: 'content',
    priority: 'medium',
    tags: ['schema', 'structured-data', 'rich-snippets', 'ai'],
    title: 'Zero Schema = Invisible to AI',
    subtitle: 'Missing Structured Data Costs 30% CTR',
    description: 'Complete absence of structured data means missing rich snippets, knowledge panels, and AI-powered search features.',
    keyPoints: [
      'Current schema implementation: 0%',
      'Competitors average: 12 schema types',
      'Rich results eligibility: 0%',
      'AI systems can\'t understand your content'
    ],
    insights: [
      'Schema can improve CTR 30-50%',
      'Rich snippets achievable within 2-4 weeks',
      'Knowledge panel possible within 60 days'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Before/after SERP mockups:** Show rich results', '**Implementation timeline:** Gantt chart'],
    rawContent: ''
  },
  // ============================================
  // SECTION 2: DEEP DIVE ANALYSIS
  // ============================================

  {
    id: 'keyword-intent',
    section: 'keyword-analysis',
    type: 'content',
    priority: 'critical',
    tags: ['keywords', 'intent', 'mismatch', 'commercial'],
    title: '100% Wrong Intent = $0 Revenue',
    subtitle: 'Ranking for Names, Not Services - Missing All Commercial Value',
    description: 'Critical insight: 100% of your traffic comes from informational searches (talent names) while missing all commercial intent keywords that drive revenue.',
    keyPoints: [
      '100% of traffic from informational intent (talent names)',
      '0% from commercial intent keywords',
      '"Model agency LA" at position 19 (could be top 5)',
      'Competitors get 80% traffic from commercial terms'
    ],
    insights: [
      'Revenue impact: Current $19/month vs. Potential $2,000+/month',
      'Intent mismatch costs $1,981/month in lost revenue',
      'Quick wins available with intent optimization'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Pie charts:** Current intent mix vs. Optimal mix', '**Bar chart:** Revenue by intent type'],
    rawContent: ''
  },
  {
    id: 'organic-keywords',
    section: 'keyword-analysis',
    type: 'content',
    priority: 'high',
    tags: ['keywords', 'rankings', 'organic', 'ahrefs', 'performance'],
    title: 'Organic Keywords Performance',
    subtitle: 'Current Keyword Rankings & Optimization Opportunities',
    description: 'Comprehensive keyword ranking analysis showing current positions, search volumes, difficulty scores, and traffic potential. Interactive data table with sorting and filtering capabilities for strategic keyword optimization.',
    keyPoints: [
      'Live keyword ranking data from Ahrefs',
      'Position tracking with traffic potential analysis',
      'Search volume and commercial value insights',
      'Keyword difficulty scores for optimization planning'
    ],
    insights: [
      'Top performing keywords driving current organic traffic',
      'Opportunity keywords in positions 4-10 for quick wins',
      'High commercial value keywords with revenue potential'
    ],
    recommendations: [
      'Focus on opportunity keywords for positions 4-10',
      'Target high CPC keywords for revenue optimization',
      'Monitor position changes for ranking stability'
    ],
    nextSteps: [
      'Optimize content for opportunity keywords',
      'Create targeted landing pages for commercial keywords',
      'Implement position tracking automation'
    ],
    visualRequirements: ['**Interactive data table:** Sortable keyword rankings with filters', '**Performance metrics:** Position, Volume, KD, CPC, Traffic Potential'],
    rawContent: ''
  },
  {
    id: 'content-quality',
    section: 'on-page-seo',
    type: 'content',
    priority: 'high',
    tags: ['content', 'quality', 'thin', 'duplicate'],
    title: 'Content Quality Analysis',
    subtitle: 'Significant Content Optimization Required',
    description: 'Content analysis reveals widespread quality issues including thin content, duplicates, and missing optimization elements across 72 pages.',
    keyPoints: [
      '72 total pages with content issues (82%)',
      'Duplicate content splitting ranking signals',
      'Thin content provides no ranking value',
      'Missing elements reduce click-through rates'
    ],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Horizontal bar chart** showing:', 'Each issue type as separate bar', 'Length represents number of pages', 'Color coding: Red (critical), Yellow (important)'],
    rawContent: ''
  },
  {
    id: 'keyword-opportunities',
    section: 'on-page-seo',
    type: 'content',
    priority: 'high',
    tags: ['keywords', 'opportunities', 'rankings', 'potential'],
    title: 'Keyword Ranking Opportunities',
    subtitle: 'Quick Wins Within Reach',
    description: 'Several high-value keywords are ranking just outside valuable positions, presenting immediate opportunities for traffic growth through targeted optimization.',
    keyPoints: [
      'Moving from position 19 to top 5 = 10x traffic',
      'Combined opportunity: +2,000 visits/month',
      'Low competition for these terms (difficulty: 21-36)',
      'Quick wins achievable within 30-60 days'
    ],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Scatter plot** with:', 'X-axis: Current position (0-100)', 'Y-axis: Monthly search volume', 'Bubble size: Traffic potential', 'Color: Green (easy), Yellow (medium), Red (hard)'],
    rawContent: ''
  },
  {
    id: 'keyword-opportunities-detailed',
    section: 'on-page-seo',
    type: 'content',
    priority: 'high',
    tags: ['keywords', 'opportunities', 'rankings', 'potential', 'quick-wins', 'commercial-intent'],
    title: 'Top 10 Keyword Opportunities',
    subtitle: 'Strategic Targets with Clear Path to Page 1',
    description: 'Data-driven keyword opportunities showing positive momentum over 3 months, with commercial intent keywords presenting immediate traffic and revenue potential through targeted optimization.',
    keyPoints: [
      'Position improvements on 5 keywords in last 90 days (up to +23 positions)',
      'Combined opportunity: +2,500 visits/month within reach',
      'Low to medium competition (difficulty: 8-36)',
      'Quick wins achievable within 30 days for positions 19-31',
      'Brand term "pyd" has 900 searches but ranks #50'
    ],
    insights: [
      'Commercial keywords improving: "model agency los angeles" up 6 positions',
      'Still ranking for 0% commercial intent terms in top 10',
      'All high-value keywords include "LA" or "Los Angeles" - local SEO essential',
      'Talent name rankings strong but don\'t convert to business'
    ],
    recommendations: [
      'Priority 1: Optimize for keywords in positions 19-31 (immediate impact)',
      'Priority 2: Capture brand term "pyd" - should be position 1',
      'Priority 3: Create commercial intent content ("hire models", "book models")',
      'Priority 4: Build local SEO presence for LA-specific searches'
    ],
    nextSteps: [
      'Week 1: Optimize pages ranking 19-31 with targeted content updates',
      'Week 2: Create Google Business Profile for local searches',
      'Week 3: Build location-specific landing pages',
      'Week 4: Internal linking campaign from high-authority pages'
    ],
    // New property for keyword data table
    keywordData: [
      {
        keyword: 'model agency la',
        position: 19,
        volume: 40,
        difficulty: 21,
        difficultyLevel: 'Low-Medium',
        opportunity: 'Move to top 10 = 5-10x traffic',
        action: 'Optimize homepage title and create dedicated LA page',
        potentialTraffic: 20
      },
      {
        keyword: 'model agency los angeles',
        position: 29,
        positionChange: 6,
        volume: 100,
        difficulty: 36,
        difficultyLevel: 'Medium',
        opportunity: 'Momentum building - push to top 10',
        action: 'Build more local backlinks, enhance content',
        potentialTraffic: 40
      },
      {
        keyword: 'los angeles model agencies',
        position: 31,
        volume: 70,
        difficulty: 35,
        difficultyLevel: 'Medium',
        opportunity: 'Small push gets to page 2',
        action: 'Internal linking from talent pages',
        potentialTraffic: 25
      },
      {
        keyword: 'model agencies los angeles',
        position: 41,
        volume: 250,
        difficulty: 36,
        difficultyLevel: 'Medium',
        opportunity: 'Highest traffic potential keyword',
        action: 'Create comprehensive agency comparison content',
        potentialTraffic: 75
      },
      {
        keyword: 'modeling agencies la',
        position: 46,
        positionChange: 9,
        volume: 100,
        difficulty: 30,
        difficultyLevel: 'Medium',
        opportunity: 'Strong momentum - improved 9 positions',
        action: 'Add more modeling-specific content',
        potentialTraffic: 30
      },
      {
        keyword: 'pyd',
        position: 50,
        volume: 900,
        difficulty: 8,
        difficultyLevel: 'Easy',
        opportunity: 'Own your brand name - huge volume',
        action: 'Build brand authority signals and backlinks',
        potentialTraffic: 450
      },
      {
        keyword: 'agency los angeles',
        position: 52,
        volume: 150,
        difficulty: 26,
        difficultyLevel: 'Low-Medium',
        cpc: 194,
        opportunity: 'High commercial intent ($1.94 CPC)',
        action: 'Create service-specific landing pages',
        potentialTraffic: 45
      },
      {
        keyword: 'los angeles agency',
        position: 52,
        positionChange: 12,
        volume: 70,
        difficulty: 26,
        difficultyLevel: 'Low-Medium',
        opportunity: 'Improved 12 positions - maintain momentum',
        action: 'Continue current optimization strategy',
        potentialTraffic: 20
      },
      {
        keyword: 'ryan chun',
        position: 8,
        volume: 150,
        difficulty: 0,
        difficultyLevel: 'Easy',
        opportunity: 'Push to top 5 for immediate traffic',
        action: 'Enhance talent profile with more content',
        potentialTraffic: 30
      },
      {
        keyword: 'talent agencies in los angeles',
        position: 95,
        volume: 100,
        difficulty: 27,
        difficultyLevel: 'Low-Medium',
        opportunity: 'Different angle for agency searches',
        action: 'Create talent agency specific content',
        potentialTraffic: 30
      }
    ],
    // New property for comparison metrics
    comparisonMetrics: {
      totalKeywordsTracked: 32,
      keywordsImproved: 5,
      keywordsDeclined: 1,
      newKeywords: 8,
      averagePositionChange: 7.2,
      topPositionGain: {
        keyword: 'eli crane height',
        change: 23,
        currentPosition: 1
      }
    },
    // New property for missing opportunities
    missingOpportunities: [
      'fashion model agency',
      'commercial model agency',
      'male model agency',
      'female model agency',
      'hire models los angeles',
      'book models la'
    ],
    visualRequirements: [
      '**Opportunity Matrix:** X-axis: Current position (0-100), Y-axis: Monthly search volume, Bubble size: Traffic potential, Color: Green (difficulty 0-20), Yellow (21-40), Red (40+)',
      '**Progress Chart:** Show 3-month position changes for improved keywords',
      '**Table View:** Sortable table with all keyword metrics and opportunities'
    ],
    chartType: 'keyword-opportunities-detailed',
    rawContent: ''
  },
  {
    id: 'cannibalization',
    section: 'content-&-strategy',
    type: 'content',
    priority: 'medium',
    tags: ['cannibalization', 'keywords', 'internal', 'competition'],
    title: 'Internal Competition Killing Rankings',
    subtitle: 'Multiple Pages Fighting for Same Keywords',
    description: 'Content cannibalization analysis reveals 23 instances where multiple pages compete for the same keywords, confusing Google and suppressing rankings.',
    keyPoints: [
      '23 instances of keyword cannibalization',
      'Talent pages competing with category pages',
      'No clear topical authority structure',
      'Google confused about which page to rank'
    ],
    insights: [
      '"Model agency" split across 4 pages (-15 positions)',
      '"LA models" cannibalized by 6 pages (-20 positions)',
      'Resolution could improve rankings 10-25 positions'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Network diagram:** Show page relationships', '**Conflict zones:** Highlighted in red'],
    rawContent: ''
  },
  {
    id: 'opportunities',
    section: 'content-&-strategy',
    type: 'content',
    priority: 'high',
    tags: ['keywords', 'opportunities', 'commercial', 'strategy', 'targeting'],
    title: 'Opportunities',
    subtitle: 'Strategic Keyword Targeting for Commercial Growth',
    description: 'Comprehensive keyword opportunity analysis focusing on commercial intent keywords to drive revenue growth. Includes priority-based targeting strategy for primary keywords, long-tail phrases, and quick SEO wins.',
    keyPoints: [
      'Core business keywords for service identification',
      'Commercial intent keywords for transactional searches',
      'High-end positioning long-tail opportunities',
      'Service-specific keyword targeting strategy'
    ],
    insights: [
      'Primary focus on male modeling agency positioning',
      'Commercial intent keywords for booking and hiring',
      'Long-tail opportunities for luxury positioning',
      'Quick wins through existing talent page optimization'
    ],
    recommendations: [
      'Target core business keywords as Priority 1',
      'Develop commercial intent landing pages',
      'Optimize existing talent pages with modeling terms',
      'Create service-specific content for long-tail capture'
    ],
    nextSteps: [
      'Update talent pages with commercial keywords',
      'Create booking/hiring focused landing pages',
      'Develop content around male modeling services',
      'Implement strategic internal linking structure'
    ],
    visualRequirements: ['**Keyword priority matrix:** Core vs Commercial intent', '**Implementation timeline:** 30-day quick wins'],
    rawContent: ''
  },
  {
    id: 'recommendations',
    section: 'content-&-strategy',
    type: 'content',
    priority: 'high',
    tags: ['recommendations', 'implementation', 'strategy', 'content', 'services'],
    title: 'Recommendations',
    subtitle: 'Strategic Implementation Plan for Commercial Growth',
    description: 'Comprehensive implementation recommendations covering model profile optimization, service page development, location-based targeting, and technical schema updates to drive commercial keyword rankings and revenue growth.',
    keyPoints: [
      'Model profile page optimization with commercial keywords',
      'Service page development for booking and development',
      'Location-based prestige keyword targeting',
      'Brand integration and competitor positioning strategy'
    ],
    insights: [
      'Focus on commercial intent over informational searches',
      'Leverage location prestige (Beverly Hills, West Hollywood)',
      'Position against established competitors like Wilhelmina',
      'Integrate "Pursue Your Dreams" brand messaging throughout'
    ],
    recommendations: [
      'Create dedicated service pages for model booking',
      'Optimize existing model profiles with commercial terms',
      'Develop blog content for thought leadership',
      'Implement comprehensive schema markup updates'
    ],
    nextSteps: [
      'Prioritize service page creation first',
      'Update model profiles with booking keywords',
      'Begin blog content development program',
      'Schedule technical schema implementation'
    ],
    visualRequirements: ['**Implementation roadmap:** 60-90 day timeline', '**Priority matrix:** Service pages vs profile optimization'],
    rawContent: ''
  },

  {
    id: 'local-seo',
    section: 'local-optimization',
    type: 'content',
    priority: 'high',
    tags: ['local', 'gmb', 'map-pack', 'near-me'],
    title: 'Missing from LA Model Agency Searches',
    subtitle: 'Zero Local Presence = Missing 40% of Searches',
    description: 'Complete absence from local search results means missing high-intent "near me" searches that convert at 2-3x higher rates.',
    keyPoints: [
      'No Google Business Profile exists',
      'Missing from "model agency near me"',
      'Competitors dominate LA map pack',
      'Local intent = highest conversion rate'
    ],
    insights: [
      'Competitors average 85 reviews, 4.5 stars',
      'Local searches convert 2-3x better',
      'GMB setup takes 1 hour, impact within days'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Map visualization:** Competitors in LA area', '**Checklist graphic:** Red X\'s showing gaps'],
    rawContent: ''
  },
  {
    id: 'domain-authority',
    section: 'off-page-seo',
    type: 'content',
    priority: 'high',
    tags: ['authority', 'backlinks', 'comparison', 'gap'],
    title: 'Domain Authority Analysis',
    subtitle: 'Critical Authority Gap vs. Competition',
    description: 'With a Domain Rating of 0.4, your site has essentially zero authority in Google\'s eyes, requiring immediate link building to achieve minimum viability.',
    keyPoints: [
      'Your Domain Rating: 0.4 (critical)',
      'Minimum viable DR: 20',
      'Competitor average: 35-42',
      'Industry leader: 50+',
      'Gap to minimum: 19.6 points'
    ],
    insights: [],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Horizontal bar chart** comparing:', 'PYD: 0.4 (tiny red bar)', 'Minimum: 20 (yellow line marker)', 'Competitors: 35-42 (gray bars)', 'Leader: 50 (green bar)'],
    chartType: 'domain-authority',
    rawContent: ''
  },
  {
    id: 'backlink-velocity',
    section: 'off-page-seo',
    type: 'content',
    priority: 'high',
    tags: ['backlinks', 'velocity', 'growth', 'momentum'],
    title: 'Backlink Profile Assessment',
    subtitle: 'From 2 to 16 Referring Domains - Trajectory Needs Acceleration',
    description: 'Positive momentum story: referring domains increased 700% showing strategy works, but acceleration needed to reach competitive levels.',
    keyPoints: [
      'Referring domains increased 700% (2 → 16)',
      'Live backlinks grew 533% (3 → 19)',
      'Current velocity: ~3 new domains/month',
      'Need: 10+ new quality domains/month to compete'
    ],
    insights: [
      'Positive momentum shows strategy is working',
      'DR hasn\'t moved yet (normal - takes 2-3 months)',
      'Quality of new links will determine DR growth',
      'At current rate: 18 months to reach minimum viable DR'
    ],
    recommendations: [],
    nextSteps: [],
    visualRequirements: ['**Line graph:** Show exponential growth curve needed', 'Current trajectory (red) vs. required trajectory (green)'],
    rawContent: ''
  },
  {
    id: 'competitor-link-analysis',
    section: 'off-page-seo',
    type: 'content',
    priority: 'critical',
    tags: ['competitors', 'backlinks', 'analysis', 'benchmarking'],
    title: 'Competitor Link Analysis',
    subtitle: '',
    description: 'Ahrefs data from June-September 2025 reveals PYD Agency has 2 referring domains versus competitor average of 1,314 domains. With a Domain Rating of 0.4 compared to competitor average of 51.0, PYD faces a critical authority gap requiring immediate intervention.',
    keyPoints: [
      'PYD has 2 referring domains vs. competitors ranging from 176 to 3,413',
      'PYD Domain Rating 0.4 vs. competitor average 51.0',
      'IMG Models leads with 3,413 domains (1,707x more than PYD)',
      'PYD link velocity: 0.1 domains/week vs. IMG Models 62.3/week'
    ],
    insights: [
      'Extreme disparity: Even the smallest competitor (Vision LA) has 88x more domains',
      'Zero momentum: PYD adds 0.1 domains/week vs. 21.4 competitor average',
      'DR threshold not met: PYD\'s 0.4 DR is below Google\'s trust threshold (~10 DR)',
      'IMG dominance: IMG\'s 62 new domains weekly shows aggressive link building',
      'Market volatility: Photogenics lost 5.3% of domains, showing links can disappear',
      'LA Models stability: Despite lower velocity (4.1/week), maintains DR 49 with 402 domains'
    ],
    recommendations: [
      'Crisis response: Implement emergency link building to reach 50 domains in 30 days',
      'Velocity target: Increase from 0.1 to 10+ new domains weekly immediately',
      'DR milestone: Achieve DR 10 within 60 days (minimum trust threshold)',
      'Benchmark Vision LA: As smallest competitor, replicate their 176 domains strategy',
      'Study LA Models: Best DR efficiency (49 DR with only 402 domains)',
      'Monthly targets: Month 1: 50 domains, Month 2: 100 domains, Month 3: 150 domains'
    ],
    nextSteps: [],
    visualRequirements: ['**Competitor comparison tables:** Minimalist design with clear data hierarchy', '**Gap analysis charts:** Show competitive disparities'],
    rawContent: ''
  }
]

// Get component for a slide - returns custom component for specific slides, otherwise DefaultSlide
function getSlideComponent(slideId: string, markdownData: MarkdownSlide): React.ComponentType<any> {
  // Special handling for performance slide
  if (slideId === 'performance') {
    return () => React.createElement(PerformanceSlide, { markdownData })
  }
  
  // Special handling for organic keywords slide
  if (slideId === 'organic-keywords') {
    return () => React.createElement(OrganicKeywordsSlide, { markdownData })
  }
  
  // Special handling for opportunities slide
  if (slideId === 'opportunities') {
    return () => React.createElement(OpportunitiesSlide, { markdownData })
  }
  
  // Special handling for recommendations slide
  if (slideId === 'recommendations') {
    return () => React.createElement(RecommendationsSlide, { markdownData })
  }
  
  // Special handling for details slide
  if (slideId === 'details') {
    return () => React.createElement(DetailsSlide, { markdownData })
  }
  
  // Special handling for competitor link analysis slide
  if (slideId === 'competitor-link-analysis') {
    return () => React.createElement(CompetitorLinkAnalysisSlide, { markdownData })
  }
  
  // Return DefaultSlide with markdown data bound for all other slides
  return () => React.createElement(DefaultSlide, { markdownData })
}

// Create slides data structure
const slides = markdownSlides.map(markdownSlide => ({
  id: markdownSlide.id,
  component: getSlideComponent(markdownSlide.id, markdownSlide),
  description: markdownSlide.description,
  section: markdownSlide.section,
  sectionType: markdownSlide.type === 'section-intro' ? 'intro' as const : 'content' as const,
  markdown: markdownSlide,
  // Legacy data structure for backwards compatibility
  data: {
    headline: markdownSlide.title,
    subtitle: markdownSlide.subtitle,
    keyPoints: markdownSlide.keyPoints,
    insights: markdownSlide.insights,
    recommendations: markdownSlide.recommendations,
    nextSteps: markdownSlide.nextSteps,
    priority: markdownSlide.priority,
    tags: markdownSlide.tags,
    lastUpdated: new Date().toISOString()
  }
}))

// Generate slide names for display
const slideNames = markdownSlides.map(slide => {
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

// Export the slides data
export { slides, slideNames }