'use client'

import { type MarkdownSlide } from '@/lib/types'

interface CompetitorLinkAnalysisSlideProps {
  markdownData: MarkdownSlide
  isDarkMode?: boolean
}

export default function CompetitorLinkAnalysisSlide({ markdownData, isDarkMode = false }: CompetitorLinkAnalysisSlideProps) {
  const competitiveData = [
    { agency: 'IMG Models', domains: '3,413', dr: '67', weeklyVelocity: '62.3 avg', growth: '+382 (+12.6%)' },
    { agency: 'Next Management', domains: '1,748', dr: '63', weeklyVelocity: '25.0 avg', growth: '-3 (-0.2%)' },
    { agency: 'Photogenics Media', domains: '830', dr: '44', weeklyVelocity: '13.5 avg', growth: '-46 (-5.3%)' },
    { agency: 'LA Models', domains: '402', dr: '49', weeklyVelocity: '4.1 avg', growth: '+7 (+1.8%)' },
    { agency: 'Vision Los Angeles', domains: '176', dr: '32', weeklyVelocity: '2.2 avg', growth: '+2 (+1.1%)' },
    { agency: 'PYD Agency', domains: '2', dr: '0.4', weeklyVelocity: '0.1 avg', growth: '+1 (+100%)' }
  ]

  const gapAnalysis = [
    { metric: 'Referring Domains', pyd: '2', average: '1,314', multiple: '657x' },
    { metric: 'Domain Rating', pyd: '0.4', average: '51.0', multiple: '128x' },
    { metric: 'Weekly Link Velocity', pyd: '0.1', average: '21.4', multiple: '214x' }
  ]

  const individualComparison = [
    { competitor: 'IMG Models', domainMultiple: '1,707x', drMultiple: '168x' },
    { competitor: 'Next Management', domainMultiple: '874x', drMultiple: '158x' },
    { competitor: 'Photogenics Media', domainMultiple: '415x', drMultiple: '110x' },
    { competitor: 'LA Models', domainMultiple: '201x', drMultiple: '123x' },
    { competitor: 'Vision Los Angeles', domainMultiple: '88x', drMultiple: '80x' }
  ]

  const velocityTracking = [
    { week: 'Jul 7', pyd: '1', img: '78', gap: '-77' },
    { week: 'Jul 14', pyd: '0', img: '70', gap: '-70' },
    { week: 'Jul 21', pyd: '0', img: '88', gap: '-88' },
    { week: 'Aug 18', pyd: '0', img: '39', gap: '-39' },
    { week: 'Sep 22', pyd: '0', img: '14', gap: '-14' }
  ]

  return (
    <div className="slide-container p-16 pt-32">
      <div className="slide-content max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="slide-header mb-12">
          <h1 className="slide-title text-5xl font-bold mb-6">
            {markdownData.title}
          </h1>
          <div className="text-lg leading-relaxed max-w-4xl mb-8">
            <p>{markdownData.description}</p>
          </div>
        </div>

        {/* Key Findings */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Findings</h2>
          <div className="grid grid-cols-2 gap-6">
            {markdownData.keyPoints?.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Landscape Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Competitive Landscape</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Agency</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">Referring Domains</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">Domain Rating</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">New Domains/Week</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">3-Month Growth</th>
                </tr>
              </thead>
              <tbody>
                {competitiveData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-100 ${item.agency === 'PYD Agency' ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                  >
                    <td className={`py-3 px-4 font-medium ${item.agency === 'PYD Agency' ? 'text-red-700' : ''}`}>
                      {item.agency}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-sm">{item.domains}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm">{item.dr}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm">{item.weeklyVelocity}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm">{item.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gap Analysis */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Competitive Gap Analysis</h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Metric</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">PYD Agency</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">Competitor Avg</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">Gap Multiple</th>
                  </tr>
                </thead>
                <tbody>
                  {gapAnalysis.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{item.metric}</td>
                      <td className="py-3 px-4 text-right font-mono text-sm text-red-600">{item.pyd}</td>
                      <td className="py-3 px-4 text-right font-mono text-sm">{item.average}</td>
                      <td className="py-3 px-4 text-right font-mono text-sm font-bold text-red-600">{item.multiple}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">PYD vs. Individual Competitors</h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Competitor</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">Domain Multiple</th>
                    <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">DR Multiple</th>
                  </tr>
                </thead>
                <tbody>
                  {individualComparison.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{item.competitor}</td>
                      <td className="py-3 px-4 text-right font-mono text-sm font-bold text-red-600">{item.domainMultiple}</td>
                      <td className="py-3 px-4 text-right font-mono text-sm font-bold text-red-600">{item.drMultiple}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Insights</h2>
          <div className="grid grid-cols-1 gap-3">
            {markdownData.insights?.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
          <div className="grid grid-cols-1 gap-3">
            {markdownData.recommendations?.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-base">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Link Velocity Tracking */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Link Velocity Tracking</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200 max-w-2xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-sm text-gray-600">Week Ending</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">PYD New Domains</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">IMG New Domains</th>
                  <th className="text-right py-3 px-4 font-medium text-sm text-gray-600">Gap</th>
                </tr>
              </thead>
              <tbody>
                {velocityTracking.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{item.week}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-red-600">{item.pyd}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm">{item.img}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm font-bold text-red-600">{item.gap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="slide-footer mt-16 pt-8 border-t border-opacity-20">
          <div className="text-sm opacity-70 italic">
            Data source: Ahrefs competitor analysis, June 30 - September 22, 2025
          </div>
        </div>
      </div>
    </div>
  )
}