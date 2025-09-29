'use client'

import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

// Dynamically import chart components to avoid SSR issues
const BarChart = dynamic(() => import('./BarChart'), { ssr: false })
const LineChart = dynamic(() => import('./LineChart'), { ssr: false })
const AreaChart = dynamic(() => import('./AreaChart'), { ssr: false })
const PieChart = dynamic(() => import('./PieChart'), { ssr: false })
const ScatterChart = dynamic(() => import('./ScatterChart'), { ssr: false })
const WaterfallChart = dynamic(() => import('./WaterfallChart'), { ssr: false })
const FunnelChart = dynamic(() => import('./FunnelChart'), { ssr: false })
const GaugeChart = dynamic(() => import('./GaugeChart'), { ssr: false })
const PyramidChart = dynamic(() => import('./PyramidChart'), { ssr: false })
const TreeDiagram = dynamic(() => import('./TreeDiagram'), { ssr: false })
const HeatMap = dynamic(() => import('./HeatMap'), { ssr: false })
const MatrixChart = dynamic(() => import('./MatrixChart'), { ssr: false })
const TimelineChart = dynamic(() => import('./TimelineChart'), { ssr: false })
const GanttChart = dynamic(() => import('./GanttChart'), { ssr: false })
const BubbleChart = dynamic(() => import('./BubbleChart'), { ssr: false })
const DashboardGauges = dynamic(() => import('./DashboardGauges'), { ssr: false })

export interface ChartConfig {
  type: 'bar' | 'line' | 'area' | 'pie' | 'scatter' | 'waterfall' | 'funnel' | 'gauge' | 
        'pyramid' | 'tree' | 'heatmap' | 'matrix' | 'timeline' | 'gantt' | 'bubble' | 'dashboard'
  data: any[]
  width?: number
  height?: number
  colors?: string[]
  title?: string
  subtitle?: string
  xAxis?: string
  yAxis?: string
  config?: Record<string, any>
}

interface ChartRendererProps {
  chart: ChartConfig
  className?: string
}

export default function ChartRenderer({ chart, className = '' }: ChartRendererProps): ReactElement {
  const baseProps = {
    data: chart.data,
    width: chart.width || 400,
    height: chart.height || 300,
    colors: chart.colors || ['#FF4444', '#FFB700', '#00C853', '#3B82F6', '#9C27B0'],
    title: chart.title,
    subtitle: chart.subtitle,
    config: chart.config || {}
  }

  const renderChart = () => {
    switch (chart.type) {
      case 'bar':
        return <BarChart {...baseProps} xAxis={chart.xAxis} yAxis={chart.yAxis} />
      
      case 'line':
        return <LineChart {...baseProps} xAxis={chart.xAxis} yAxis={chart.yAxis} />
      
      case 'area':
        return <AreaChart {...baseProps} xAxis={chart.xAxis} yAxis={chart.yAxis} />
      
      case 'pie':
        return <PieChart {...baseProps} />
      
      case 'scatter':
        return <ScatterChart {...baseProps} xAxis={chart.xAxis} yAxis={chart.yAxis} />
      
      case 'waterfall':
        return <WaterfallChart {...baseProps} />
      
      case 'funnel':
        return <FunnelChart {...baseProps} />
      
      case 'gauge':
        return <GaugeChart {...baseProps} />
      
      case 'pyramid':
        return <PyramidChart {...baseProps} />
      
      case 'tree':
        return <TreeDiagram {...baseProps} />
      
      case 'heatmap':
        return <HeatMap {...baseProps} />
      
      case 'matrix':
        return <MatrixChart {...baseProps} />
      
      case 'timeline':
        return <TimelineChart {...baseProps} />
      
      case 'gantt':
        return <GanttChart {...baseProps} />
      
      case 'bubble':
        return <BubbleChart {...baseProps} xAxis={chart.xAxis} yAxis={chart.yAxis} />
      
      case 'dashboard':
        return <DashboardGauges {...baseProps} />
      
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Chart type "{chart.type}" not supported</p>
          </div>
        )
    }
  }

  return (
    <div className={`chart-container ${className}`}>
      {chart.title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{chart.title}</h3>
          {chart.subtitle && (
            <p className="text-sm text-gray-600 mt-1">{chart.subtitle}</p>
          )}
        </div>
      )}
      {renderChart()}
    </div>
  )
}