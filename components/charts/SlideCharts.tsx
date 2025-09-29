'use client'

import React from 'react'
import ChartFactory, { CHART_COLORS } from './ChartFactory'
import { GaugeChart, FunnelChart, WaterfallChart, MatrixChart, PyramidChart, TimelineChart } from './SpecializedCharts'
import KeywordOpportunitiesTable from './KeywordOpportunitiesTable'

// Chart data based on slide requirements
export const SLIDE_CHART_DATA = {
  // Triple Crisis - Three vertical bar charts
  'triple-crisis': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <h4 className="font-semibold mb-2">Visibility Crisis</h4>
          <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-end justify-center">
            <div className="w-12 bg-red-500 rounded-t" style={{ height: '11%' }}>
              <div className="text-white text-xs font-bold p-1">11%</div>
            </div>
            <div className="w-12 bg-gray-300 ml-1" style={{ height: '89%' }}></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">Only 11% of pages ranking</p>
        </div>
        <div className="text-center">
          <h4 className="font-semibold mb-2">Authority Crisis</h4>
          <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-end justify-center">
            <div className="w-12 bg-red-500 rounded-t" style={{ height: '0.8%' }}>
              <div className="text-white text-xs font-bold p-1">0.4</div>
            </div>
            <div className="w-12 bg-gray-300 ml-1" style={{ height: '100%' }}></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">DR 0.4 vs minimum 20</p>
        </div>
        <div className="text-center">
          <h4 className="font-semibold mb-2">Technical Crisis</h4>
          <div className="bg-gray-100 rounded-lg p-4 h-32 flex items-end justify-center">
            <div className="w-12 bg-red-500 rounded-t" style={{ height: '98%' }}>
              <div className="text-white text-xs font-bold p-1">98%</div>
            </div>
            <div className="w-12 bg-green-500 ml-1" style={{ height: '2%' }}></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">98% of pages fail speed tests</p>
        </div>
      </div>
    )
  },

  // Revenue Loss - Waterfall chart
  'revenue-loss': {
    type: 'waterfall',
    component: () => (
      <WaterfallChart
        title="Monthly Revenue Impact"
        data={[
          { name: 'Current Revenue', value: 500, type: 'total' },
          { name: 'Lost Opportunity', value: -49500, type: 'negative' },
          { name: 'Potential Revenue', value: 50000, type: 'total' }
        ]}
      />
    )
  },

  // Indexation Crisis - Funnel chart
  'indexation-crisis': {
    type: 'funnel',
    component: () => (
      <FunnelChart
        title="Page Discovery & Ranking Funnel"
        data={[
          { name: 'Total Pages', value: 88, color: CHART_COLORS.progress.competitor },
          { name: 'In Sitemap', value: 41, color: CHART_COLORS.status.high },
          { name: 'Crawled Successfully', value: 30, color: CHART_COLORS.status.medium },
          { name: 'Currently Ranking', value: 10, color: CHART_COLORS.status.critical },
          { name: 'Getting Traffic', value: 6, color: CHART_COLORS.status.critical }
        ]}
      />
    )
  },

  // Domain Authority - Horizontal bar chart
  'domain-authority': {
    type: 'horizontal-bar',
    component: () => (
      <ChartFactory
        type="horizontal-bar"
        title="Domain Authority Comparison"
        data={[
          { name: 'PYD Agency', value: 0.4 },
          { name: 'Minimum Viable', value: 20 },
          { name: 'Competitor Avg', value: 38 },
          { name: 'Industry Leader', value: 50 }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.status.high, CHART_COLORS.progress.competitor, CHART_COLORS.status.good]}
        height={200}
      />
    )
  },

  // Site Speed - Speedometer gauge
  'site-speed': {
    type: 'gauge',
    component: () => (
      <GaugeChart
        title="Page Speed Performance"
        value={1.5}
        min={0}
        max={3}
        unit="s"
        zones={[
          { min: 0, max: 0.5, color: CHART_COLORS.status.good, label: 'Fast' },
          { min: 0.5, max: 1.5, color: CHART_COLORS.status.high, label: 'Moderate' },
          { min: 1.5, max: 3, color: CHART_COLORS.status.critical, label: 'Slow' }
        ]}
      />
    )
  },

  // Technical Checklist - Stacked bar chart
  'technical-checklist': {
    type: 'stacked-bar',
    component: () => (
      <ChartFactory
        type="stacked-bar"
        title="Technical SEO Components Status"
        data={[
          { 
            name: 'SEO Components', 
            'Failed': 5, 
            'Passed': 1 
          }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.status.good]}
        height={200}
      />
    )
  },

  // Content Quality - Horizontal bars
  'content-quality': {
    type: 'horizontal-bar',
    component: () => (
      <ChartFactory
        type="horizontal-bar"
        title="Content Issues by Type"
        data={[
          { name: 'Duplicate Content', value: 37 },
          { name: 'Thin Content', value: 22 },
          { name: 'Title Issues', value: 9 },
          { name: 'Missing Meta', value: 3 },
          { name: 'Missing H1', value: 1 }
        ]}
        colors={[CHART_COLORS.status.critical]}
        height={250}
      />
    )
  },

  // Priority Matrix - 2x2 matrix
  'priority-matrix': {
    type: 'matrix',
    component: () => (
      <MatrixChart
        title="Strategic Priority Matrix"
        xLabel="Effort Required"
        yLabel="Business Impact"
        data={[
          { name: 'Submit Sitemap', x: 10, y: 90, size: 20, color: CHART_COLORS.status.good },
          { name: 'Fix Canonicals', x: 25, y: 85, size: 18, color: CHART_COLORS.status.good },
          { name: 'Speed Optimization', x: 80, y: 90, size: 22, color: CHART_COLORS.status.high },
          { name: 'Content Creation', x: 85, y: 75, size: 16, color: CHART_COLORS.status.high },
          { name: 'Social Tags', x: 15, y: 25, size: 12, color: CHART_COLORS.status.medium },
          { name: 'Site Redesign', x: 95, y: 20, size: 24, color: CHART_COLORS.status.critical }
        ]}
        quadrants={[
          { label: 'Low Impact\nLow Effort', color: '#F3F4F6' },
          { label: 'High Impact\nLow Effort\n(DO FIRST)', color: '#D1FAE5' },
          { label: 'Low Impact\nHigh Effort\n(AVOID)', color: '#FEE2E2' },
          { label: 'High Impact\nHigh Effort\n(SCHEDULE)', color: '#FEF3C7' }
        ]}
      />
    )
  },

  // Dashboard - Multi-metric display
  'dashboard': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-red-800 mb-2">Pages Ranking</h4>
          <div className="text-3xl font-bold text-red-600">11.4%</div>
          <p className="text-sm text-red-600">10 of 88 pages</p>
          <div className="text-xs text-red-500 mt-1">CRITICAL</div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-red-800 mb-2">Domain Rating</h4>
          <div className="text-3xl font-bold text-red-600">0.4</div>
          <p className="text-sm text-red-600">Industry standard: 30+</p>
          <div className="text-xs text-red-500 mt-1">CRITICAL</div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-red-800 mb-2">Traffic Drop</h4>
          <div className="text-3xl font-bold text-red-600">-68%</div>
          <p className="text-sm text-red-600">Last week</p>
          <div className="text-xs text-red-500 mt-1">CRITICAL</div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-red-800 mb-2">Monthly Visitors</h4>
          <div className="text-3xl font-bold text-red-600">51</div>
          <p className="text-sm text-red-600">Target: 1,000+</p>
          <div className="text-xs text-red-500 mt-1">CRITICAL</div>
        </div>
      </div>
    )
  },

  // Keyword Opportunities - Scatter plot
  'keyword-opportunities': {
    type: 'scatter',
    component: () => (
      <ChartFactory
        type="scatter"
        title="Keyword Ranking Opportunities"
        data={[
          { name: 'model agency la', x: 19, y: 40, value: 400 },
          { name: 'modeling agencies la', x: 29, y: 100, value: 1000 },
          { name: 'la model agencies', x: 31, y: 70, value: 700 },
          { name: 'talent agency la', x: 100, y: 50, value: 500 }
        ]}
        colors={[CHART_COLORS.status.good]}
        height={300}
      />
    )
  },

  // Competitor Comparison - Grouped bars
  'competitor-comparison': {
    type: 'bar',
    component: () => (
      <div className="space-y-4">
        <ChartFactory
          type="bar"
          title="Traffic Comparison (Monthly Visitors)"
          data={[
            { name: 'PYD', value: 51 },
            { name: 'Competitor A', value: 5000 },
            { name: 'Competitor B', value: 8000 }
          ]}
          colors={[CHART_COLORS.status.critical, CHART_COLORS.progress.competitor, CHART_COLORS.progress.competitor]}
          height={200}
        />
        <ChartFactory
          type="bar"
          title="Domain Rating Comparison"
          data={[
            { name: 'PYD', value: 0.4 },
            { name: 'Competitor A', value: 35 },
            { name: 'Competitor B', value: 42 }
          ]}
          colors={[CHART_COLORS.status.critical, CHART_COLORS.progress.competitor, CHART_COLORS.progress.competitor]}
          height={200}
        />
      </div>
    )
  },

  // ROI Projection - Area chart
  'roi-projection': {
    type: 'area',
    component: () => (
      <ChartFactory
        type="area"
        title="6-Month ROI Projection"
        data={[
          { name: 'Month 1', investment: 9000, revenue: 500 },
          { name: 'Month 2', investment: 6000, revenue: 6500 },
          { name: 'Month 3', investment: 6000, revenue: 11000 },
          { name: 'Month 4', investment: 6000, revenue: 16000 },
          { name: 'Month 5', investment: 6000, revenue: 21000 },
          { name: 'Month 6', investment: 6000, revenue: 26000 }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.status.good]}
        height={300}
      />
    )
  },

  // Link Building - Pyramid chart
  'link-building': {
    type: 'pyramid',
    component: () => (
      <PyramidChart
        title="Link Acquisition Strategy"
        data={[
          { name: 'High Authority Links (DR 70+)', value: 5, color: CHART_COLORS.status.good },
          { name: 'Medium Authority Links (DR 40-70)', value: 15, color: CHART_COLORS.status.high },
          { name: 'Foundation Links (DR 20-40)', value: 30, color: CHART_COLORS.status.medium }
        ]}
      />
    )
  },

  // Investment Breakdown - Pie chart
  'investment': {
    type: 'pie',
    component: () => (
      <ChartFactory
        type="pie"
        title="Month 1 Investment Breakdown"
        data={[
          { name: 'Technical SEO Fixes', value: 3000 },
          { name: 'SEO Management', value: 3000 },
          { name: 'Content Creation', value: 1500 },
          { name: 'Link Building', value: 1500 }
        ]}
        colors={[CHART_COLORS.priority.critical, CHART_COLORS.priority.high, CHART_COLORS.priority.medium, CHART_COLORS.status.good]}
        height={300}
      />
    )
  },

  // 30-Day Roadmap - Timeline
  'roadmap-30': {
    type: 'timeline',
    component: () => (
      <TimelineChart
        title="30-Day Recovery Timeline"
        totalDays={30}
        data={[
          { name: 'Submit Sitemap', start: 0, duration: 1, priority: 'high' },
          { name: 'Fix Canonicals', start: 1, duration: 3, priority: 'high' },
          { name: 'Speed Optimization', start: 4, duration: 7, priority: 'high' },
          { name: 'Content Enhancement', start: 14, duration: 7, priority: 'medium' },
          { name: 'Monitoring Setup', start: 21, duration: 9, priority: 'low' }
        ]}
      />
    )
  },

  // Internal Linking - Tree diagram
  'internal-linking': {
    type: 'custom',
    component: () => (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">Internal Link Architecture</h3>
        <div className="flex flex-col items-center space-y-4">
          {/* Homepage at top */}
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
            Homepage
          </div>
          
          {/* Main sections */}
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white px-3 py-1 rounded text-sm">Services</div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex space-x-2">
                <div className="bg-gray-300 px-2 py-1 rounded text-xs">Modeling</div>
                <div className="bg-gray-300 px-2 py-1 rounded text-xs">Talent</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white px-3 py-1 rounded text-sm">About</div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="flex space-x-2">
                <div className="bg-gray-300 px-2 py-1 rounded text-xs">Team</div>
                <div className="bg-gray-300 px-2 py-1 rounded text-xs">History</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-green-500 text-white px-3 py-1 rounded text-sm">Contact</div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="bg-gray-300 px-2 py-1 rounded text-xs">Locations</div>
            </div>
          </div>
          
          {/* Orphan pages floating separately */}
          <div className="mt-8 border-t pt-4 w-full">
            <h4 className="text-sm font-medium text-red-600 mb-2">Orphan Pages (0 internal links)</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs border border-red-200">
                  Page {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-red-600">Orphan Pages</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <div className="text-2xl font-bold text-yellow-600">41</div>
              <div className="text-sm text-yellow-600">Weak Pages (1 link)</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-green-600">Well-linked (5+ links)</div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Traffic Collapse - Line chart with dramatic drop
  'traffic-collapse': {
    type: 'line',
    component: () => (
      <ChartFactory
        type="line"
        title="Traffic Collapse Analysis"
        data={[
          { name: 'Sep 1', value: 614 },
          { name: 'Sep 5', value: 580 },
          { name: 'Sep 10', value: 550 },
          { name: 'Sep 11', value: 195 }, // Dramatic drop
          { name: 'Sep 15', value: 180 },
          { name: 'Sep 20', value: 195 },
          { name: 'Today', value: 195 }
        ]}
        colors={[CHART_COLORS.status.critical]}
        height={300}
      />
    )
  },

  // Geographic Performance - World map representation
  'geographic-performance': {
    type: 'custom',
    component: () => (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">Geographic Traffic Distribution</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-100 rounded">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-3"></div>
              <span className="font-medium">United States</span>
            </div>
            <div className="text-right">
              <div className="font-bold">77%</div>
              <div className="text-sm text-gray-600">160 clicks, 5.26% CTR</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-100 rounded">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mr-3"></div>
              <span className="font-medium">Germany</span>
            </div>
            <div className="text-right">
              <div className="font-bold">4.8%</div>
              <div className="text-sm text-green-600">10 clicks, 10.75% CTR ⭐</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-100 rounded">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-600 rounded-full mr-3"></div>
              <span className="font-medium">United Kingdom</span>
            </div>
            <div className="text-right">
              <div className="font-bold">3.4%</div>
              <div className="text-sm text-gray-600">7 clicks, 3.18% CTR</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
              <span className="font-medium">Australia</span>
            </div>
            <div className="text-right">
              <div className="font-bold">2.4%</div>
              <div className="text-sm text-gray-600">5 clicks, 5.26% CTR</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
              <span className="font-medium">Canada</span>
            </div>
            <div className="text-right">
              <div className="font-bold">2.4%</div>
              <div className="text-sm text-gray-600">5 clicks, 6.25% CTR</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <h4 className="font-medium text-yellow-800 mb-1">Key Insight</h4>
          <p className="text-sm text-yellow-700">Germany shows 2x higher CTR than US market - expansion opportunity</p>
        </div>
      </div>
    )
  },

  // Device Performance - Grouped columns
  'device-performance': {
    type: 'bar',
    component: () => (
      <div className="space-y-4">
        <ChartFactory
          type="bar"
          title="Traffic Distribution by Device"
          data={[
            { name: 'Desktop', value: 102 },
            { name: 'Mobile', value: 101 },
            { name: 'Tablet', value: 5 }
          ]}
          colors={[CHART_COLORS.progress.competitor]}
          height={200}
        />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <div className="text-lg font-bold text-blue-600">3.84%</div>
            <div className="text-sm text-blue-600">Desktop CTR</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <div className="text-lg font-bold text-green-600">6.26%</div>
            <div className="text-sm text-green-600">Mobile CTR (63% higher!)</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded p-3">
            <div className="text-lg font-bold text-purple-600">21.74%</div>
            <div className="text-sm text-purple-600">Tablet CTR</div>
          </div>
        </div>
      </div>
    )
  },

  // Backlink Profile - Bubble chart representation
  'backlink-profile': {
    type: 'custom',
    component: () => (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">Current Backlink Profile</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-100 border-l-4 border-green-500">
            <div>
              <div className="font-bold text-green-800">models.com</div>
              <div className="text-sm text-green-600">Industry Relevance: Excellent</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">79</div>
              <div className="text-xs text-green-600">Domain Rating</div>
              <div className="text-sm text-gray-600">1 link</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-100 border-l-4 border-blue-500">
            <div>
              <div className="font-bold text-blue-800">mainboard.com</div>
              <div className="text-sm text-blue-600">Industry Relevance: Excellent</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">72</div>
              <div className="text-xs text-blue-600">Domain Rating</div>
              <div className="text-sm text-gray-600">1 link</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-indigo-100 border-l-4 border-indigo-500">
            <div>
              <div className="font-bold text-indigo-800">malemodelscene.net</div>
              <div className="text-sm text-indigo-600">Industry Relevance: Very Good</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">55</div>
              <div className="text-xs text-indigo-600">Domain Rating</div>
              <div className="text-sm text-gray-600">3 links</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
          <h4 className="font-medium text-red-800 mb-2">Gap Analysis</h4>
          <p className="text-sm text-red-700">Need 47+ more referring domains to reach competitive levels. Current average DR: 68.7 (excellent quality foundation).</p>
        </div>
      </div>
    )
  },

  // Top Keywords - Grouped bars with performance
  'top-keywords': {
    type: 'custom',
    component: () => (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">Current Keyword Performance</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-100 rounded">
            <div>
              <div className="font-bold">pyd agency</div>
              <div className="text-sm text-green-600">Brand keyword</div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">1</div>
                <div>
                  <div className="font-bold">54 visits</div>
                  <div className="text-sm text-green-600">90% CTR</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded">
            <div>
              <div className="font-bold">eli crane height</div>
              <div className="text-sm text-gray-600">Talent keyword</div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">1</div>
                <div>
                  <div className="font-bold">28 visits</div>
                  <div className="text-sm text-gray-600">35% CTR</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
            <div>
              <div className="font-bold">brent assayag</div>
              <div className="text-sm text-gray-600">Talent keyword</div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-500 text-white px-2 py-1 rounded text-sm font-bold">3</div>
                <div>
                  <div className="font-bold">6 visits</div>
                  <div className="text-sm text-gray-600">5.77% CTR</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-3 mt-4">
            <h4 className="font-medium text-red-800 mb-2">Missing Commercial Keywords</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span>"model agency la"</span>
                <span className="text-red-600">Not ranking (40 searches/mo)</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span>"modeling agencies los angeles"</span>
                <span className="text-red-600">Not ranking (100 searches/mo)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Transformation 90-day - Multi-line chart
  'transformation-90': {
    type: 'line',
    component: () => (
      <ChartFactory
        type="area"
        title="90-Day Transformation Targets"
        data={[
          { name: 'Current', traffic: 51, ranking_pages: 10, domain_rating: 0.4 },
          { name: '30 Days', traffic: 200, ranking_pages: 30, domain_rating: 2 },
          { name: '60 Days', traffic: 500, ranking_pages: 50, domain_rating: 5 },
          { name: '90 Days', traffic: 1000, ranking_pages: 70, domain_rating: 10 }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.status.good, CHART_COLORS.status.medium]}
        height={300}
      />
    )
  },

  // Success KPIs - Dashboard with gauges
  'success-kpis': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <GaugeChart
          title="Organic Traffic"
          value={51}
          max={2500}
          unit=" visits"
          zones={[
            { min: 0, max: 500, color: CHART_COLORS.status.critical, label: 'Critical' },
            { min: 500, max: 1500, color: CHART_COLORS.status.high, label: 'Growing' },
            { min: 1500, max: 2500, color: CHART_COLORS.status.good, label: 'Target' }
          ]}
        />
        <GaugeChart
          title="Pages Ranking"
          value={10}
          max={88}
          unit=" pages"
          zones={[
            { min: 0, max: 30, color: CHART_COLORS.status.critical, label: 'Critical' },
            { min: 30, max: 60, color: CHART_COLORS.status.high, label: 'Improving' },
            { min: 60, max: 88, color: CHART_COLORS.status.good, label: 'Good' }
          ]}
        />
        <GaugeChart
          title="Domain Rating"
          value={0.4}
          max={50}
          unit=""
          zones={[
            { min: 0, max: 10, color: CHART_COLORS.status.critical, label: 'Critical' },
            { min: 10, max: 30, color: CHART_COLORS.status.high, label: 'Building' },
            { min: 30, max: 50, color: CHART_COLORS.status.good, label: 'Strong' }
          ]}
        />
        <GaugeChart
          title="Average Position"
          value={31.6}
          min={1}
          max={100}
          unit=""
          zones={[
            { min: 1, max: 10, color: CHART_COLORS.status.good, label: 'Excellent' },
            { min: 10, max: 30, color: CHART_COLORS.status.high, label: 'Good' },
            { min: 30, max: 100, color: CHART_COLORS.status.critical, label: 'Poor' }
          ]}
        />
      </div>
    )
  },

  // Risk Assessment - Matrix
  'risk-assessment': {
    type: 'matrix',
    component: () => (
      <MatrixChart
        title="Risk Assessment Matrix"
        xLabel="Probability"
        yLabel="Impact"
        data={[
          { name: 'Action Risk', x: 20, y: 30, size: 16, color: CHART_COLORS.status.good },
          { name: 'Inaction Risk', x: 80, y: 85, size: 24, color: CHART_COLORS.status.critical },
          { name: 'Technical Failure', x: 15, y: 50, size: 18, color: CHART_COLORS.status.high },
          { name: 'Market Changes', x: 30, y: 25, size: 14, color: CHART_COLORS.status.medium }
        ]}
        quadrants={[
          { label: 'Low Probability\nLow Impact', color: '#F3F4F6' },
          { label: 'High Probability\nLow Impact', color: '#FEF3C7' },
          { label: 'Low Probability\nHigh Impact', color: '#FEE2E2' },
          { label: 'High Probability\nHigh Impact\n(CRITICAL)', color: '#FECACA' }
        ]}
      />
    )
  },

  // Next Steps - Timeline with immediate actions
  'next-steps': {
    type: 'custom',
    component: () => (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">Immediate Action Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">TODAY</div>
            <div className="flex-1 p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="font-medium">Approve audit findings and </div>
              <div className="text-sm text-gray-600">Access Google Search Console • Review investment</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">DAY 1</div>
            <div className="flex-1 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
              <div className="font-medium">Critical Technical Fixes</div>
              <div className="text-sm text-gray-600">Submit sitemap • Fix robots.txt • Remove 404 errors</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">WEEK 1</div>
            <div className="flex-1 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <div className="font-medium">Foundation Building</div>
              <div className="text-sm text-gray-600">Canonical tags • Speed optimization • Tracking setup</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">WEEK 2</div>
            <div className="flex-1 p-3 bg-green-50 border-l-4 border-green-500 rounded">
              <div className="font-medium">Growth Initiatives</div>
              <div className="text-sm text-gray-600">Content optimization • Link building • Mobile improvements</div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // CTA Sitemap - Action card
  'cta-sitemap': {
    type: 'custom',
    component: () => (
      <div className="p-6 text-center">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">IMMEDIATE ACTION REQUIRED</h3>
          <div className="text-4xl font-bold mb-2">5 MINUTES</div>
          <div className="text-lg mb-6">To fix your sitemap and start recovery</div>
          
          <div className="bg-white text-gray-800 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-bold mb-3">Quick Fix Steps:</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex items-center"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>Log into Google Search Console</li>
              <li className="flex items-center"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>Navigate to "Sitemaps" section</li>
              <li className="flex items-center"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>Enter: sitemap.xml</li>
              <li className="flex items-center"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">4</span>Click "Submit"</li>
              <li className="flex items-center"><span className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">5</span>Verify successful submission</li>
            </ol>
          </div>
          
          <div className="bg-red-400 text-white p-4 rounded-lg">
            <div className="font-bold">Impact:</div>
            <div className="text-sm">Google doesn't know 47 pages exist • Every day costs potential rankings</div>
          </div>
        </div>
      </div>
    )
  },

  // Contact - Clean contact card
  'contact': {
    type: 'custom',
    component: () => (
      <div className="flex items-center justify-center p-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Recover?</h3>
          <p className="mb-6">Transform your $594,000 annual opportunity into reality</p>
          
          <div className="bg-white text-gray-800 p-4 rounded-lg mb-6">
            <div className="space-y-2 text-sm">
              <div><strong>Email:</strong> your.email@agency.com</div>
              <div><strong>Phone:</strong> 555-123-4567</div>
              <div><strong>Calendar:</strong> calendly.com/yourlink</div>
            </div>
          </div>
          
          <div className="bg-blue-400 p-4 rounded-lg text-sm">
            <div className="font-bold mb-2">Included:</div>
            <div>30-day money-back guarantee • Weekly reporting • Dedicated account management</div>
          </div>
        </div>
      </div>
    )
  },

  // Schema Implementation - Waterfall
  'schema-implementation': {
    type: 'waterfall',
    component: () => (
      <WaterfallChart
        title="Schema Implementation Progress"
        data={[
          { name: 'Current', value: 0, type: 'total' },
          { name: 'Organization', value: 20, type: 'positive' },
          { name: 'LocalBusiness', value: 20, type: 'positive' },
          { name: 'Person', value: 30, type: 'positive' },
          { name: 'ImageObject', value: 20, type: 'positive' },
          { name: 'FAQPage', value: 10, type: 'positive' },
          { name: 'Target: 100%', value: 100, type: 'total' }
        ]}
      />
    )
  },

  // Keyword Intent - Pie charts for intent mix
  'keyword-intent': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">Current Intent Mix</h4>
          <ChartFactory
            type="pie"
            data={[
              { name: 'Informational', value: 100 }
            ]}
            colors={[CHART_COLORS.status.critical]}
            height={200}
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Optimal Intent Mix</h4>
          <ChartFactory
            type="pie"
            data={[
              { name: 'Commercial', value: 60 },
              { name: 'Informational', value: 25 },
              { name: 'Transactional', value: 15 }
            ]}
            colors={[CHART_COLORS.status.good, CHART_COLORS.status.medium, CHART_COLORS.status.high]}
            height={200}
          />
        </div>
      </div>
    )
  },

  // Page Performance - Treemap
  'page-performance': {
    type: 'custom',
    component: () => (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Page Performance Hierarchy</h4>
        <div className="grid grid-cols-8 gap-2 h-48">
          <div className="col-span-3 bg-green-500 rounded p-2 text-white text-xs">
            <div className="font-semibold">Top Pages (10)</div>
            <div>Getting Traffic</div>
          </div>
          <div className="col-span-2 bg-yellow-500 rounded p-2 text-white text-xs">
            <div className="font-semibold">Ranking (15)</div>
            <div>Positions 11-30</div>
          </div>
          <div className="col-span-3 bg-red-500 rounded p-2 text-white text-xs">
            <div className="font-semibold">Invisible (78)</div>
            <div>Zero Traffic</div>
          </div>
        </div>
      </div>
    )
  },

  // Mobile Index - Side-by-side gauges
  'mobile-index': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">Mobile Score</h4>
          <GaugeChart
            value={25}
            maxValue={100}
            title="Core Web Vitals"
            color={CHART_COLORS.status.critical}
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Desktop Score</h4>
          <GaugeChart
            value={65}
            maxValue={100}
            title="Core Web Vitals"
            color={CHART_COLORS.status.high}
          />
        </div>
      </div>
    )
  },

  // SERP Features - Stacked bar chart
  'serp-features': {
    type: 'stacked-bar',
    component: () => (
      <ChartFactory
        type="stacked-bar"
        title="SERP Feature Ownership"
        data={[
          { name: 'Featured Snippets', you: 0, competitor: 12 },
          { name: 'Local Pack', you: 0, competitor: 8 },
          { name: 'FAQ Schema', you: 0, competitor: 15 },
          { name: 'Image Pack', you: 0, competitor: 6 },
          { name: 'Video Results', you: 0, competitor: 4 }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.progress.competitor]}
        height={300}
      />
    )
  },

  // Technical Checklist - Stacked bar
  'technical-checklist': {
    type: 'custom',
    component: () => (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Technical SEO Status</h4>
        <div className="flex h-16 bg-gray-200 rounded-lg overflow-hidden">
          <div className="flex-1 bg-red-500 flex items-center justify-center text-white font-bold">
            Failed: 5
          </div>
          <div className="w-16 bg-green-500 flex items-center justify-center text-white font-bold">
            Passed: 1
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Only 1 of 6 critical technical requirements currently passing
        </div>
      </div>
    )
  },

  // Crawl Budget - Funnel and Pie charts
  'crawl-budget': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">Crawl Budget Allocation</h4>
          <ChartFactory
            type="pie"
            data={[
              { name: 'Productive Crawling', value: 40 },
              { name: 'Wasted on Errors', value: 60 }
            ]}
            colors={[CHART_COLORS.status.good, CHART_COLORS.status.critical]}
            height={200}
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Budget Efficiency</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-red-100 rounded">
              <span>404 Pages</span>
              <span className="font-bold">30%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-100 rounded">
              <span>Duplicate Content</span>
              <span className="font-bold">20%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-red-100 rounded">
              <span>Redirect Chains</span>
              <span className="font-bold">10%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-100 rounded">
              <span>Valuable Content</span>
              <span className="font-bold">40%</span>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Content Quality - Horizontal bar chart
  'content-quality': {
    type: 'horizontal-bar',
    component: () => (
      <ChartFactory
        type="horizontal-bar"
        title="Content Issues by Category"
        data={[
          { name: 'Duplicate Content', value: 25 },
          { name: 'Thin Content', value: 18 },
          { name: 'Missing Meta Descriptions', value: 15 },
          { name: 'Missing H1 Tags', value: 10 },
          { name: 'Poor Internal Linking', value: 4 }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.status.critical, CHART_COLORS.status.high, CHART_COLORS.status.medium, CHART_COLORS.status.medium]}
        height={250}
      />
    )
  },

  // Cannibalization - Network diagram
  'cannibalization': {
    type: 'custom',
    component: () => (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Keyword Cannibalization Map</h4>
        <div className="relative h-64 bg-gray-50 rounded-lg p-4">
          <div className="absolute top-4 left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            Home
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            Services
          </div>
          <div className="absolute bottom-4 left-1/4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            Models
          </div>
          <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            About
          </div>
          
          {/* Conflict lines */}
          <svg className="absolute inset-0 w-full h-full">
            <line x1="20%" y1="20%" x2="80%" y2="20%" stroke="red" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="20%" y1="20%" x2="30%" y2="80%" stroke="red" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="80%" y1="20%" x2="70%" y2="80%" stroke="red" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>
        <div className="text-sm text-gray-600">
          Red connections show keyword conflicts between pages
        </div>
      </div>
    )
  },

  // Keyword Opportunities - Scatter plot
  'keyword-opportunities': {
    type: 'scatter',
    component: () => (
      <ChartFactory
        type="scatter"
        title="Keyword Opportunities by Position & Volume"
        data={[
          { x: 19, y: 1200, z: 'model agency LA', difficulty: 'easy' },
          { x: 23, y: 800, z: 'fashion agency', difficulty: 'medium' },
          { x: 31, y: 600, z: 'talent management', difficulty: 'easy' },
          { x: 45, y: 400, z: 'LA casting', difficulty: 'hard' },
          { x: 67, y: 200, z: 'modeling jobs', difficulty: 'medium' }
        ]}
        colors={[CHART_COLORS.status.good, CHART_COLORS.status.medium, CHART_COLORS.status.good, CHART_COLORS.status.critical, CHART_COLORS.status.medium]}
        height={300}
      />
    )
  },

  // Keyword Opportunities Detailed - Interactive table with advanced features
  'keyword-opportunities-detailed': {
    type: 'custom',
    component: () => (
      <KeywordOpportunitiesTable />
    )
  },

  // Local SEO - Map and checklist
  'local-seo': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">LA Competitor Map</h4>
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center relative">
            <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <span className="text-gray-500 text-sm">Los Angeles Area</span>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Local SEO Checklist</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">✗</span>
              <span className="text-sm">Google Business Profile</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">✗</span>
              <span className="text-sm">Local Schema Markup</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">✗</span>
              <span className="text-sm">NAP Consistency</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">✗</span>
              <span className="text-sm">Local Citations</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">✗</span>
              <span className="text-sm">Customer Reviews</span>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Backlink Velocity - Line graph
  'backlink-velocity': {
    type: 'line',
    component: () => (
      <ChartFactory
        type="line"
        title="Backlink Growth Trajectory"
        data={[
          { month: 'Jan', current: 2, required: 2 },
          { month: 'Feb', current: 4, required: 8 },
          { month: 'Mar', current: 8, required: 16 },
          { month: 'Apr', current: 12, required: 28 },
          { month: 'May', current: 16, required: 45 },
          { month: 'Jun', current: 18, required: 65 }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.status.good]}
        height={250}
      />
    )
  },

  // Structured Data - Before/after mockup
  'structured-data': {
    type: 'custom',
    component: () => (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Rich Results Implementation</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-red-600 mb-2">Before: Plain Results</h5>
            <div className="space-y-2">
              <div className="text-blue-600 text-sm">PYD Agency - Model Management</div>
              <div className="text-gray-600 text-xs">Basic search result with no rich features...</div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <h5 className="font-semibold text-green-600 mb-2">After: Rich Results</h5>
            <div className="space-y-2">
              <div className="text-blue-600 text-sm">⭐⭐⭐⭐⭐ PYD Agency</div>
              <div className="text-gray-600 text-xs">📍 Los Angeles • 📞 (555) 123-4567</div>
              <div className="text-gray-600 text-xs">FAQ • Reviews • Local Pack</div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Quick Wins - Heat map matrix
  'quick-wins': {
    type: 'custom',
    component: () => (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Impact vs Effort Matrix</h4>
        <div className="relative h-64 border-2 border-gray-300">
          {/* Quadrant backgrounds */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-100"></div>
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-yellow-100"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-100"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-100"></div>
          
          {/* Axes labels */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold">Effort →</div>
          <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-semibold">Impact ↑</div>
          
          {/* Quick win items */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full" title="Submit Sitemap"></div>
          <div className="absolute top-8 right-8 w-3 h-3 bg-green-500 rounded-full" title="Fix Canonicals"></div>
          <div className="absolute top-12 left-8 w-3 h-3 bg-yellow-500 rounded-full" title="Meta Descriptions"></div>
        </div>
      </div>
    )
  },

  // Priority Matrix - 2x2 grid
  'priority-matrix': {
    type: 'matrix',
    component: () => (
      <MatrixChart
        title="Strategic Priority Matrix"
        xAxisLabel="Implementation Effort"
        yAxisLabel="Business Impact"
        quadrants={[
          { name: 'Quick Wins', color: CHART_COLORS.status.good, items: ['Sitemap', 'Canonicals', 'Meta Tags'] },
          { name: 'Major Projects', color: CHART_COLORS.status.high, items: ['Link Building', 'Content Strategy'] },
          { name: 'Fill-ins', color: CHART_COLORS.status.medium, items: ['Social Media', 'Minor Fixes'] },
          { name: 'Avoid', color: CHART_COLORS.status.critical, items: ['Complex Migrations', 'Experimental Features'] }
        ]}
      />
    )
  },

  // Investment - Pie and stacked bar charts  
  'investment': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">Month 1 Investment</h4>
          <ChartFactory
            type="pie"
            data={[
              { name: 'Technical Fixes', value: 4000 },
              { name: 'Content Creation', value: 2500 },
              { name: 'Link Building', value: 2000 },
              { name: 'Tools & Analytics', value: 500 }
            ]}
            colors={[CHART_COLORS.status.critical, CHART_COLORS.status.medium, CHART_COLORS.status.high, CHART_COLORS.status.good]}
            height={200}
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">6-Month Investment Plan</h4>
          <ChartFactory
            type="stacked-bar"
            data={[
              { month: 'M1', technical: 4000, content: 2500, links: 2000 },
              { month: 'M2', technical: 2000, content: 3000, links: 3000 },
              { month: 'M3', technical: 1000, content: 3500, links: 3500 },
              { month: 'M4', technical: 1000, content: 4000, links: 4000 },
              { month: 'M5', technical: 500, content: 4500, links: 4500 },
              { month: 'M6', technical: 500, content: 5000, links: 5000 }
            ]}
            colors={[CHART_COLORS.status.critical, CHART_COLORS.status.medium, CHART_COLORS.status.high]}
            height={200}
          />
        </div>
      </div>
    )
  },

  // ROI Timeline - Area chart with milestones
  'roi-timeline': {
    type: 'area',
    component: () => (
      <ChartFactory
        type="area"
        title="Revenue vs Investment Timeline"
        data={[
          { month: 'Month 1', investment: 9000, revenue: 500 },
          { month: 'Month 2', investment: 15000, revenue: 2000 },
          { month: 'Month 3', investment: 21000, revenue: 8000 },
          { month: 'Month 4', investment: 27000, revenue: 18000 },
          { month: 'Month 5', investment: 33000, revenue: 32000 },
          { month: 'Month 6', investment: 39000, revenue: 50000 }
        ]}
        colors={[CHART_COLORS.status.critical, CHART_COLORS.status.good]}
        height={300}
      />
    )
  },

  // Success KPIs - Dashboard with gauges
  'success-kpis': {
    type: 'custom',
    component: () => (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h5 className="font-semibold mb-2">Organic Traffic</h5>
          <GaugeChart value={51} maxValue={2000} title="Monthly Visits" color={CHART_COLORS.status.critical} />
        </div>
        <div>
          <h5 className="font-semibold mb-2">Domain Authority</h5>
          <GaugeChart value={0.4} maxValue={50} title="DR Score" color={CHART_COLORS.status.critical} />
        </div>
        <div>
          <h5 className="font-semibold mb-2">Page Rankings</h5>
          <GaugeChart value={10} maxValue={88} title="Pages Ranking" color={CHART_COLORS.status.critical} />
        </div>
        <div>
          <h5 className="font-semibold mb-2">Monthly Revenue</h5>
          <GaugeChart value={500} maxValue={50000} title="Revenue ($)" color={CHART_COLORS.status.critical} />
        </div>
      </div>
    )
  },

  // CTA Sitemap - Action card with before/after
  'cta-sitemap': {
    type: 'custom',
    component: () => (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full text-2xl font-bold mb-4">
            !
          </div>
          <h4 className="text-xl font-bold text-red-600">CRITICAL ACTION REQUIRED</h4>
          <p className="text-lg">Submit your sitemap to Google Search Console NOW</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-red-50 border-2 border-red-200 rounded-lg">
            <div className="text-2xl font-bold text-red-600">BEFORE</div>
            <div className="text-sm text-red-600">53% of pages invisible</div>
            <div className="h-4 bg-red-200 rounded mt-2">
              <div className="h-4 bg-red-500 rounded" style={{width: '47%'}}></div>
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">AFTER</div>
            <div className="text-sm text-green-600">100% discoverable</div>
            <div className="h-4 bg-green-200 rounded mt-2">
              <div className="h-4 bg-green-500 rounded" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-lg">
            ⏱️ Takes 5 minutes • Impact starts in 24-48 hours
          </div>
        </div>
      </div>
    )
  },

  // Next Steps - Timeline with milestones
  'next-steps': {
    type: 'timeline',
    component: () => (
      <TimelineChart
        title="Critical Actions Timeline"
        items={[
          { date: 'TODAY', task: 'Submit sitemap to Google', priority: 'critical' },
          { date: 'DAY 2', task: 'Remove /404 from sitemap', priority: 'critical' },
          { date: 'WEEK 1', task: 'Fix canonical tags (37 pages)', priority: 'high' },
          { date: 'WEEK 1', task: 'Investigate traffic drop', priority: 'high' },
          { date: 'WEEK 2', task: 'Begin speed optimization', priority: 'medium' },
          { date: 'WEEK 3', task: 'Start link building campaign', priority: 'medium' }
        ]}
      />
    )
  },

  // Contact - Clean contact layout
  'contact': {
    type: 'custom',
    component: () => (
      <div className="space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 text-white rounded-full text-3xl font-bold mb-4">
          💬
        </div>
        
        <div>
          <h4 className="text-2xl font-bold mb-2">Ready to Get Started?</h4>
          <p className="text-lg text-gray-600">Let's restore your search visibility and capture that $594,000 opportunity</p>
        </div>
        
        <div className="inline-block p-6 bg-white border-2 border-gray-200 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs">QR Code</span>
            </div>
            <div className="text-left">
              <div className="font-bold">Contact Information</div>
              <div className="text-sm text-gray-600">Email: contact@pydagency.com</div>
              <div className="text-sm text-gray-600">Phone: (555) 123-4567</div>
            </div>
          </div>
        </div>
        
        <div className="inline-block px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg cursor-pointer hover:bg-green-700">
          🚀 Start SEO 
        </div>
      </div>
    )
  }
}

// Main component to render charts for slides
interface SlideChartProps {
  slideId: string
  className?: string
  slideData?: any
}

export default function SlideChart({ slideId, className = '', slideData }: SlideChartProps) {
  const chartConfig = SLIDE_CHART_DATA[slideId as keyof typeof SLIDE_CHART_DATA]
  
  if (!chartConfig) {
    return null
  }

  // For the keyword opportunities table, pass the slide data
  const ChartComponent = chartConfig.component
  const componentProps = slideId === 'keyword-opportunities-detailed' ? { slideData } : {}

  return (
    <div className={`rounded-xl border bg-gray-500/10 border-[rgb(130_130_130_/_16%)]  p-4 ${className}`}>
      <ChartComponent {...componentProps} />
    </div>
  )
}