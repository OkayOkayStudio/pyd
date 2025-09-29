// All extracted metrics from presentation.md
export const executiveMetrics = {
  healthScore: 2.5,
  pagesRanking: { current: 10, total: 88, percentage: 11.4 },
  domainRating: 0.4,
  trafficDrop: -68,
  monthlyVisitors: 51,
  industryMinimum: 20,
  industryAverage: 30
}

export const trafficData = [
  { date: 'Sep 4', impressions: 614, clicks: 19 },
  { date: 'Sep 5', impressions: 590, clicks: 18 },
  { date: 'Sep 6', impressions: 580, clicks: 17 },
  { date: 'Sep 7', impressions: 570, clicks: 16 },
  { date: 'Sep 8', impressions: 550, clicks: 15 },
  { date: 'Sep 9', impressions: 520, clicks: 14 },
  { date: 'Sep 10', impressions: 500, clicks: 13 },
  { date: 'Sep 11', impressions: 195, clicks: 12 },
  { date: 'Sep 12', impressions: 190, clicks: 11 },
  { date: 'Sep 13', impressions: 195, clicks: 10 },
  { date: 'Sep 14', impressions: 200, clicks: 9 },
  { date: 'Sep 15', impressions: 195, clicks: 8 },
  { date: 'Sep 16', impressions: 195, clicks: 7 },
  { date: 'Sep 17', impressions: 195, clicks: 6 },
]

export const revenueMetrics = {
  current: 500,
  potential: 50000,
  monthlyLoss: 49500,
  annualLoss: 594000
}

export const indexationIssues = [
  { issue: 'Pages not ranking', count: 78, severity: 'critical' },
  { issue: 'Duplicate content', count: 37, severity: 'critical' },
  { issue: 'Crawled not indexed', count: 17, severity: 'critical' },
  { issue: 'Orphan pages', count: 12, severity: 'high' }
]

export const indexationFunnel = [
  { stage: 'Pages Crawled', count: 88 },
  { stage: 'In Sitemap', count: 41 },
  { stage: 'Ranking', count: 10 },
  { stage: 'Getting Traffic', count: 6 }
]

export const domainAuthorityComparison = [
  { name: 'PYD', value: 0.4, color: '#FF4444' },
  { name: 'Minimum Target', value: 20, color: '#FFB700' },
  { name: 'Competitor Avg', value: 35, color: '#9CA3AF' },
  { name: 'Industry Leader', value: 50, color: '#00C853' }
]

export const speedMetrics = {
  currentSpeed: 1.5,
  targetSpeed: 0.5,
  slowPages: 87,
  totalPages: 88,
  distribution: {
    slow: 85,
    verySlow: 2,
    ok: 1
  }
}

export const competitorComparison = [
  { metric: 'Domain Rating', pyd: 0.4, compA: 35, compB: 42 },
  { metric: 'Traffic/Mo', pyd: 51, compA: 5000, compB: 8000 },
  { metric: 'Keywords', pyd: 35, compA: 500, compB: 800 },
  { metric: 'Backlinks', pyd: 3, compA: 250, compB: 400 }
]

export const keywordOpportunities = [
  { keyword: 'model agency la', position: 19, target: 5, volume: 40 },
  { keyword: 'modeling agencies los angeles', position: 29, target: 10, volume: 100 },
  { keyword: 'los angeles model agencies', position: 31, target: 10, volume: 70 }
]

export const technicalIssues = [
  { name: 'Page Speed', status: 'fail', count: '87/88' },
  { name: 'Mobile Ready', status: 'warning', count: 'needs work' },
  { name: 'Canonicals', status: 'fail', count: '37 missing' },
  { name: 'Schema', status: 'fail', count: 'none' },
  { name: 'HTTPS', status: 'pass', count: 'secure' },
  { name: 'Sitemap', status: 'fail', count: 'not submitted' }
]

export const contentIssues = [
  { type: 'Thin Content', count: 22 },
  { type: 'Duplicates', count: 37 },
  { type: 'Missing Meta', count: 3 },
  { type: 'Title Issues', count: 9 }
]

export const priorityMatrix = {
  highImpactLowEffort: ['Sitemap', 'Canonicals', 'Meta Tags'],
  highImpactHighEffort: ['Speed Optimization', 'Link Building'],
  lowImpactLowEffort: ['Social Tags', 'Minor Fixes'],
  lowImpactHighEffort: ['Site Redesign', 'Platform Migration']
}

export const quickActions = [
  { task: 'Submit sitemap to Google', time: '5 min', priority: 'critical' },
  { task: 'Remove /404 from sitemap', time: '10 min', priority: 'critical' },
  { task: 'Fix canonical tags (37 pages)', time: '2 days', priority: 'high' },
  { task: 'Investigate traffic drop', time: '1 day', priority: 'high' },
  { task: 'Begin speed optimization', time: 'Ongoing', priority: 'medium' }
]

export const actionPlan = [
  {
    phase: 'Phase 1',
    title: 'Emergency Stabilization',
    duration: '30 days',
    actions: [
      'Submit corrected sitemap to Google',
      'Fix canonical tag errors (37 pages)',
      'Remove 404 pages from sitemap',
      'Implement basic meta descriptions',
      'Fix site speed critical issues',
      'Set up Google Analytics tracking'
    ],
    outcomes: 'Stop bleeding, establish baseline tracking, fix blocking issues',
    metrics: 'Indexation recovery, speed improvement, error reduction'
  },
  {
    phase: 'Phase 2', 
    title: 'Content & Technical Foundation',
    duration: '30 days',
    actions: [
      'Optimize thin content pages (22 pages)',
      'Implement structured data markup',
      'Create content expansion strategy',
      'Fix duplicate content issues',
      'Improve mobile page experience',
      'Begin local SEO optimization'
    ],
    outcomes: 'Improved content quality, better user signals, technical compliance',
    metrics: 'Content depth increase, mobile scores, user engagement'
  },
  {
    phase: 'Phase 3',
    title: 'Growth & Authority Building', 
    duration: '30 days',
    actions: [
      'Launch link building campaign',
      'Create high-value content assets',
      'Target keyword opportunities',
      'Build industry partnerships',
      'Optimize conversion funnels',
      'Scale content production'
    ],
    outcomes: 'Domain authority growth, ranking improvements, traffic acceleration',
    metrics: 'Backlink acquisition, keyword rankings, organic traffic growth'
  }
]

export const roadmapData = [
  { week: 'Week 1', title: 'Technical Fixes', items: ['Sitemap', 'Canonicals', 'Speed audit'] },
  { week: 'Week 2', title: 'Content Optimization', items: ['Meta tags', 'Thin content', 'Schema'] },
  { week: 'Week 3', title: 'Link Building Start', items: ['Directory submissions', 'Outreach', 'Content'] },
  { week: 'Week 4', title: 'Monitor & Adjust', items: ['Track rankings', 'Measure speed', 'Refine strategy'] }
]

export const transformationData = [
  { metric: 'Pages Ranking', now: '10', target: '70+' },
  { metric: 'Monthly Traffic', now: '51', target: '1,000+' },
  { metric: 'Domain Rating', now: '0.4', target: '10+' },
  { metric: 'Keywords Ranking', now: '35', target: '200+' }
]

export const linkBuildingStrategy = {
  prMedia: 5,
  guestPosts: 15,
  directories: 30,
  total: 50
}

export const backlinksProfile = [
  { domain: 'models.com', dr: 79, type: 'Industry' },
  { domain: 'mainboard.com', dr: 72, type: 'Industry' },
  { domain: 'malemodelscene.net', dr: 55, type: 'Industry' }
]

export const topKeywords = [
  { keyword: 'eli crane height', position: 1, traffic: 28, type: 'Talent' },
  { keyword: 'brent assayag', position: 3, traffic: 6, type: 'Talent' },
  { keyword: 'ryan chun', position: 8, traffic: 6, type: 'Talent' },
  { keyword: 'pyd agency', position: 1, traffic: 54, type: 'Brand' }
]

export const geographicData = [
  { country: 'USA', traffic: 77, ctr: 5.26 },
  { country: 'Germany', traffic: 4.8, ctr: 10.75 },
  { country: 'UK', traffic: 3.4, ctr: 3.18 },
  { country: 'Australia', traffic: 2.4, ctr: 5.26 },
  { country: 'Canada', traffic: 2.4, ctr: 6.25 }
]

export const deviceData = [
  { device: 'Desktop', traffic: 49, ctr: 3.84 },
  { device: 'Mobile', traffic: 48.5, ctr: 6.26 },
  { device: 'Tablet', traffic: 2.5, ctr: 21.74 }
]

export const investmentBreakdown = [
  { category: 'Technical', amount: 3000, color: '#FF4444' },
  { category: 'SEO Management', amount: 3000, color: '#FFB700' },
  { category: 'Content', amount: 1500, color: '#00C853' },
  { category: 'Links', amount: 1500, color: '#3B82F6' }
]

export const roiProjection = [
  { month: 'Month 1', revenue: -9000 },
  { month: 'Month 2', revenue: 0 },
  { month: 'Month 3', revenue: 5000 },
  { month: 'Month 6', revenue: 20000 }
]

export const riskAssessment = {
  actionRisk: 20,
  inactionRisk: 80,
  successRate: 85,
  breakEven: '2-3 months'
}

export const successMetrics = [
  { metric: 'Pages Ranking', current: 10, target: '70+' },
  { metric: 'Traffic', current: 51, target: '1,000+' },
  { metric: 'Domain Rating', current: 0.4, target: '10+' },
  { metric: 'Keywords', current: 35, target: '200+' }
]

export const nextSteps = [
  { step: 'TODAY', action: 'Approve plan', status: 'pending' },
  { step: 'TOMORROW', action: 'Submit sitemap', status: 'pending' },
  { step: 'THIS WEEK', action: 'Critical fixes', status: 'pending' },
  { step: 'THIS MONTH', action: 'Full optimization', status: 'pending' }
]