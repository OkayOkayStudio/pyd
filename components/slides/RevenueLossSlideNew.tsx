'use client'

import React from 'react'
import ChartRenderer from '@/components/charts/ChartRenderer'

// This demonstrates how slides can now use markdown data + visualizations
export default function RevenueLossSlideNew() {
  
  // Revenue loss waterfall data - this would come from markdown eventually
  const waterfallData = [
    { name: 'Current Revenue', value: 500, isPositive: true },
    { name: 'Lost Opportunity', value: -49500, isPositive: false },
    { name: 'Total Potential', value: 50000, isPositive: true }
  ]

  // Revenue loss chart configuration
  const revenueLossChart = {
    type: 'waterfall' as const,
    data: waterfallData,
    width: 500,
    height: 300,
    colors: ['#FF4444', '#00C853'],
    title: 'Monthly Revenue Impact',
    subtitle: '$594,000 Annual Opportunity Cost',
    config: {
      currency: true,
      showTotal: true
    }
  }

  // Alternative visualization - could be from markdown data
  const monthlyImpactData = [
    { month: 'Current', revenue: 500, potential: 50000 },
    { month: 'Month 1', revenue: 500, potential: 50000 },
    { month: 'Month 2', revenue: 500, potential: 50000 },
    { month: 'Month 3', revenue: 500, potential: 50000 },
    { month: 'Month 4', revenue: 500, potential: 50000 },
    { month: 'Month 5', revenue: 500, potential: 50000 }
  ]

  const comparisonChart = {
    type: 'bar' as const,
    data: monthlyImpactData,
    width: 400,
    height: 250,
    colors: ['#FF4444', '#00C853'],
    title: 'Current vs Potential Revenue',
    xAxis: 'month',
    config: {
      type: 'grouped',
      showStatus: true
    }
  }

  return (
    <div className="h-full grid grid-cols-2 gap-8">
      {/* Left Column - Key Insights */}
      <div className="flex flex-col justify-center space-y-6">
        
        {/* Critical Alert */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center">
            <div className="text-red-500 font-semibold text-sm">REVENUE CRISIS</div>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mt-2">
            $594K Annual Loss
          </h2>
          <p className="text-red-700 mt-2">
            Every month of delay costs $49,500 in lost opportunity
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Current Monthly</div>
            <div className="text-2xl font-bold text-gray-900">$500</div>
            <div className="text-xs text-red-500">Far below potential</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Potential Monthly</div>
            <div className="text-2xl font-bold text-green-600">$50,000</div>
            <div className="text-xs text-green-500">Based on competitors</div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>Competitors with similar services achieve $50K+ monthly revenue</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>Your conversion rate matches industry standards</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>Traffic volume is the sole limiting factor</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column - Visualizations */}
      <div className="space-y-6">
        
        {/* Main Waterfall Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ChartRenderer chart={revenueLossChart} />
        </div>

        {/* Secondary Bar Chart Comparison */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ChartRenderer chart={comparisonChart} />
          
          {/* Action Items */}
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-medium text-gray-900 mb-2">Immediate Actions Required:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-red-50 p-2 rounded text-red-800">Fix Technical Issues</div>
              <div className="bg-yellow-50 p-2 rounded text-yellow-800">Improve Rankings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}