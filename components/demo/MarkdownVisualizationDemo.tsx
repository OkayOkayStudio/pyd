'use client'

import React, { useState } from 'react'
import ChartRenderer from '@/components/charts/ChartRenderer'

export default function MarkdownVisualizationDemo() {
  const [activeDemo, setActiveDemo] = useState('revenue-loss')

  // Sample data that would be parsed from markdown
  const demoData = {
    'revenue-loss': {
      title: 'Revenue Impact Analysis',
      subtitle: '$594,000 Annual Opportunity Cost',
      keyPoints: [
        'Current monthly revenue: $500 (estimated)',
        'Potential monthly revenue: $50,000',
        'Monthly loss: $49,500',
        'Annual loss: $594,000'
      ],
      insights: [
        'Competitors with similar services achieve $50K+ monthly',
        'Your conversion rate matches industry standards',
        'Traffic volume is sole limiting factor',
        'Every month of delay costs $49,500'
      ],
      charts: [
        {
          type: 'waterfall' as const,
          data: [
            { name: 'Current', value: 500, isPositive: true },
            { name: 'Lost Opportunity', value: -49500, isPositive: false },
            { name: 'Potential', value: 50000, isPositive: true }
          ],
          width: 500,
          height: 300,
          colors: ['#FF4444', '#00C853'],
          title: 'Monthly Revenue Waterfall'
        }
      ]
    },
    'site-speed': {
      title: '',
      subtitle: '98% of Pages Fail Core Web Vitals',
      keyPoints: [
        'Pages failing speed test: 87 of 88 (98%)',
        'Average Time to First Byte: 1,450ms',
        'Target TTFB: <500ms',
        'Only 1 page loads within acceptable time'
      ],
      charts: [
        {
          type: 'gauge' as const,
          data: [
            {
              value: 1.5,
              max: 3,
              target: 0.5,
              label: 's',
              zones: [
                { min: 0, max: 0.5, color: '#00C853', label: 'Good' },
                { min: 0.5, max: 1, color: '#FFB700', label: 'Fair' },
                { min: 1, max: 3, color: '#FF4444', label: 'Poor' }
              ]
            }
          ],
          width: 300,
          height: 200,
          title: 'Current Site Speed'
        }
      ]
    },
    'indexation-crisis': {
      title: 'Indexation & Crawling Crisis',
      subtitle: '88% of Content Invisible to Google',
      keyPoints: [
        'Only 10 pages currently ranking for any keywords',
        '41 pages in sitemap (missing 47 pages - 53%)',
        'No sitemap submitted to Google Search Console',
        'Multiple technical barriers preventing indexation'
      ],
      charts: [
        {
          type: 'funnel' as const,
          data: [
            { stage: 'Pages Total', count: 88, percentage: 100 },
            { stage: 'In Sitemap', count: 41, percentage: 47 },
            { stage: 'Crawled Successfully', count: 30, percentage: 34 },
            { stage: 'Currently Ranking', count: 10, percentage: 11 },
            { stage: 'Getting Traffic', count: 6, percentage: 7 }
          ],
          width: 400,
          height: 300,
          colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#F0F9FF'],
          title: 'Indexation Funnel Drop-off'
        }
      ]
    }
  }

  const currentDemo = demoData[activeDemo as keyof typeof demoData]

  return (
    <div className="max-w-7xl mx-auto p-8">
      
      {/* Demo Navigation */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Markdown + Visualization System Demo</h1>
        <p className="text-gray-600 mb-6">
          This demonstrates how markdown slide data integrates with the comprehensive chart system.
        </p>
        
        <div className="flex space-x-2">
          {Object.keys(demoData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeDemo === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Markdown Content */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold mb-2">{currentDemo.title}</h2>
            <p className="text-gray-600 mb-4">{currentDemo.subtitle}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Key Points</h3>
                <ul className="space-y-1">
                  {currentDemo.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              {'insights' in currentDemo && currentDemo.insights && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Insights</h3>
                  <ul className="space-y-1">
                    {currentDemo.insights.map((insight, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* System Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">System Features</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Markdown-based content management</li>
              <li>✅ Unified chart rendering system</li>
              <li>✅ Recharts + specialized libraries integration</li>
              <li>✅ Dynamic chart configuration</li>
              <li>✅ Responsive design</li>
              <li>✅ TypeScript support</li>
            </ul>
          </div>
        </div>

        {/* Right: Visualizations */}
        <div className="space-y-6">
          {currentDemo.charts.map((chart, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <ChartRenderer chart={chart} />
            </div>
          ))}
          
          {/* Chart Type Support */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Supported Chart Types</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded" />
                <span>Bar Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded" />
                <span>Line/Area Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded" />
                <span>Pie Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded" />
                <span>Scatter Plots</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded" />
                <span>Waterfall Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded" />
                <span>Funnel Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded" />
                <span>Gauge Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded" />
                <span>More coming...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-8 bg-gray-900 text-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
        <pre className="text-sm overflow-x-auto">
{`// In your slide component:
import ChartRenderer from '@/components/charts/ChartRenderer'

const chart = {
  type: 'waterfall',
  data: [
    { name: 'Current', value: 500, isPositive: true },
    { name: 'Lost', value: -49500, isPositive: false },
    { name: 'Potential', value: 50000, isPositive: true }
  ],
  width: 500,
  height: 300,
  colors: ['#FF4444', '#00C853'],
  title: 'Revenue Impact Analysis'
}

return <ChartRenderer chart={chart} />`}
        </pre>
      </div>
    </div>
  )
}