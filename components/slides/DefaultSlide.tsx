'use client'

import { type MarkdownSlide } from '@/lib/types'
import SlideChart from '@/components/charts/SlideCharts'
import { motion, AnimatePresence } from 'framer-motion'
interface DefaultSlideProps {
  markdownData?: MarkdownSlide
}

export default function DefaultSlide({ markdownData }: DefaultSlideProps) {
  const hasVisualRequirements = markdownData?.visualRequirements && markdownData.visualRequirements.length > 0
  
  // Check if slide has a chart - either by chartType or by slide ID in SLIDE_CHART_DATA
  const hasChart = markdownData?.chartType !== undefined || 
    (markdownData?.id && [
      'triple-crisis', 'revenue-loss', 'indexation-crisis', 'domain-authority', 'site-speed', 
      'technical-checklist', 'content-quality', 'priority-matrix', 'dashboard', 'keyword-opportunities', 
      'competitor-comparison', 'roi-projection', 'link-building', 'investment', 'roadmap-30',
      'internal-linking', 'traffic-collapse', 'geographic-performance', 'device-performance', 
      'backlink-profile', 'top-keywords', 'transformation-90', 'success-kpis', 'risk-assessment',
      'next-steps', 'cta-sitemap', 'contact', 'schema-implementation', 'competitor-gap',
      'keyword-intent', 'page-performance', 'mobile-index', 'serp-features', 'crawl-budget',
      'cannibalization', 'local-seo', 'backlink-velocity', 'structured-data', 'quick-wins',
      'action-plan', 'roi-timeline', 'keyword-opportunities-detailed'
    ].includes(markdownData.id))


  return (

<main className='flex flex-col pt-24 pb-12 px-8 justify-start items-start '>
<header className="max-w-6xl pb-24">

<motion.h1
          key={`title`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          className='slide-title font-bold'
          transition={{ 
            duration: 1,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
            {markdownData?.title || ''}
        
        </motion.h1>
          <motion.span
          className='slide-title'
          key={`desc`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ 
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
         {markdownData?.description || 'Detailed analysis and insights for your SEO audit presentation.'}
        
        </motion.span>
</header>
  <div className="grid grid-cols-12 gap-16">
    {/* Left Column - Title & Overview */}
    <div className="col-span-4">
      <div className=" z-10 sticky top-24 max-w-[520px]">
        {/* Key Points */}
        <motion.div
          key={`keypoints`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ 
            duration: 1,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {markdownData?.keyPoints && markdownData?.keyPoints.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-mono font-semibold mb-4 uppercase tracking-wider">
                Key Findings
              </h3>
              <ul className="space-y-3">
                {markdownData?.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="leading-snug" dangerouslySetInnerHTML={{ __html: point }} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Insights */}
        <motion.div
          key={`insights`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ 
            duration: 1,
            delay: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {markdownData?.insights && markdownData?.insights.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-mono font-semibold mb-4 uppercase tracking-wider">
                Insights
              </h3>
              <ul className="space-y-3">
                {markdownData?.insights.map((insight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="leading-snug">
                      {insight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
    
    {/* Right Columns - Report Content */}
    <div className="col-span-8">
      <div className="">

    <div className="h-full">
      <div className="max-w-6xl w-full">
        {/* Header section */}
        {markdownData?.subtitle && (
        <div className="mb-8 max-w-3xl">
            <p className="text-xl mb-6">{markdownData.subtitle}</p>
        </div>
          )}
        {/* Main content area */}
        <div className="hey">
          {hasChart && (
            <div className="flex justify-center">
              <SlideChart slideId={markdownData!.chartType || markdownData!.id} className="w-full" slideData={markdownData} />
            </div>
          )}
          
          {/* Text content section - only show recommendations and next steps */}
          <div className={`${hasChart ? '' : 'max-w-4xl mx-auto'}`}>
            {markdownData?.recommendations && markdownData.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {markdownData.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {markdownData?.nextSteps && markdownData.nextSteps.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
                <ul className="space-y-2">
                  {markdownData.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm" dangerouslySetInnerHTML={{ __html: step }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Visual requirements note (only shown if no chart is available) */}
        {hasVisualRequirements && !hasChart && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Visual Requirements:</h4>
            <ul className="text-sm space-y-1">
              {markdownData!.visualRequirements.map((req, i) => (
                <li key={i} className="text-gray-600">{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
    </div>
    </main>

  )
}