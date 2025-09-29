'use client'

import React from 'react'
import { CHART_COLORS } from './ChartFactory'

// Gauge/Speedometer Chart
interface GaugeChartProps {
  value: number
  min?: number
  max?: number
  maxValue?: number
  title?: string
  unit?: string
  color?: string
  zones?: { min: number; max: number; color: string; label: string }[]
}

export function GaugeChart({ value, min = 0, max = 100, maxValue, title, unit = '', color, zones }: GaugeChartProps) {
  const actualMax = maxValue || max
  const percentage = ((value - min) / (actualMax - min)) * 100
  const angle = (percentage / 100) * 180 - 90 // Convert to degrees (-90 to +90)

  const defaultZones = zones || [
    { min: 0, max: 30, color: CHART_COLORS.status.critical, label: 'Critical' },
    { min: 30, max: 70, color: CHART_COLORS.status.high, label: 'Warning' },
    { min: 70, max: 100, color: CHART_COLORS.status.good, label: 'Good' }
  ]

  return (
    <div className="flex flex-col items-center p-4">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="relative w-48 h-24">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Zone arcs */}
          {defaultZones.map((zone, index) => {
            const startAngle = ((zone.min - min) / (actualMax - min)) * 180
            const endAngle = ((zone.max - min) / (actualMax - min)) * 180
            const startX = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180)
            const startY = 80 + 80 * Math.sin((startAngle - 90) * Math.PI / 180)
            const endX = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180)
            const endY = 80 + 80 * Math.sin((endAngle - 90) * Math.PI / 180)
            
            return (
              <path
                key={index}
                d={`M ${startX} ${startY} A 80 80 0 0 1 ${endX} ${endY}`}
                fill="none"
                stroke={zone.color}
                strokeWidth="16"
                strokeLinecap="round"
              />
            )
          })}

          {/* Needle */}
          <line
            x1="100"
            y1="80"
            x2={100 + 60 * Math.cos(angle * Math.PI / 180)}
            y2={80 + 60 * Math.sin(angle * Math.PI / 180)}
            stroke="#1F2937"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Center dot */}
          <circle cx="100" cy="80" r="4" fill="#1F2937" />
        </svg>
      </div>
      <div className="text-center mt-2">
        <div className="text-2xl font-bold">{value}{unit}</div>
        <div className="text-sm text-gray-500">Range: {min} - {max}{unit}</div>
      </div>
    </div>
  )
}

// Funnel Chart
interface FunnelChartProps {
  data: { name: string; value: number; color?: string }[]
  title?: string
}

export function FunnelChart({ data, title }: FunnelChartProps) {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="w-full p-4">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="space-y-2">
        {data.map((item, index) => {
          const width = (item.value / maxValue) * 100
          const color = item.color || CHART_COLORS.status.critical
          
          return (
            <div key={index} className="flex items-center justify-center">
              <div 
                className="relative flex items-center justify-center text-white font-semibold py-3 px-4 transition-all duration-300 hover:opacity-80"
                style={{ 
                  width: `${width}%`,
                  backgroundColor: color,
                  clipPath: index === data.length - 1 
                    ? 'polygon(10% 0%, 90% 0%, 90% 100%, 10% 100%)' // Last item - rectangle
                    : 'polygon(5% 0%, 95% 0%, 85% 100%, 15% 100%)' // Trapezoid
                }}
              >
                <span className="text-sm">{item.name}: {item.value}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Waterfall Chart
interface WaterfallChartProps {
  data: { name: string; value: number; type: 'positive' | 'negative' | 'total' }[]
  title?: string
}

export function WaterfallChart({ data, title }: WaterfallChartProps) {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  let cumulative = 0
  const chartData = data.map((item, index) => {
    const start = item.type === 'total' ? 0 : cumulative
    if (item.type !== 'total') {
      cumulative += item.value
    }
    const end = item.type === 'total' ? cumulative : cumulative
    
    return {
      ...item,
      start,
      end,
      height: Math.abs(item.value),
      color: item.type === 'positive' 
        ? CHART_COLORS.status.good 
        : item.type === 'negative' 
        ? CHART_COLORS.status.critical 
        : CHART_COLORS.status.medium
    }
  })

  const maxValue = Math.max(...chartData.map(d => Math.max(Math.abs(d.start), Math.abs(d.end))))
  const minValue = Math.min(...chartData.map(d => Math.min(d.start, d.end)))
  const range = maxValue - minValue
  const baselineY = maxValue / range * 300

  return (
    <div className="w-full p-4">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="flex items-end justify-center space-x-4 h-80">
        {chartData.map((item, index) => {
          const height = (item.height / range) * 300
          const bottom = item.type === 'negative' ? baselineY - height : baselineY
          
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs font-semibold mb-1">${item.value.toLocaleString()}</div>
              <div
                className="relative flex items-end justify-center min-w-16 transition-all duration-300 hover:opacity-80"
                style={{ height: '300px' }}
              >
                <div
                  className="w-full flex items-center justify-center text-white text-xs font-medium"
                  style={{
                    height: `${height}px`,
                    backgroundColor: item.color,
                    position: 'absolute',
                    bottom: `${300 - baselineY - (item.type === 'negative' ? 0 : height)}px`,
                  }}
                >
                </div>
              </div>
              <div className="text-xs text-center mt-2 max-w-20 break-words">{item.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Matrix/Grid Chart (for priority matrix, risk assessment)
interface MatrixChartProps {
  data: { name: string; x: number; y: number; size?: number; color?: string }[]
  title?: string
  xLabel?: string
  yLabel?: string
  quadrants?: { label: string; color: string }[]
}

export function MatrixChart({ data, title, xLabel = 'X Axis', yLabel = 'Y Axis', quadrants }: MatrixChartProps) {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  const defaultQuadrants = quadrants || [
    { label: 'Low Impact, Low Effort', color: '#F3F4F6' },
    { label: 'High Impact, Low Effort', color: '#D1FAE5' },
    { label: 'Low Impact, High Effort', color: '#FEE2E2' },
    { label: 'High Impact, High Effort', color: '#FEF3C7' }
  ]

  return (
    <div className="w-full p-4">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="relative w-96 h-96 mx-auto border-2 border-gray-300">
        {/* Quadrant backgrounds */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {defaultQuadrants.map((quadrant, index) => (
            <div
              key={index}
              className="border border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium p-2"
              style={{ backgroundColor: quadrant.color }}
            >
              <span className="text-center">{quadrant.label}</span>
            </div>
          ))}
        </div>

        {/* Data points */}
        {data.map((point, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white transition-all duration-200 hover:scale-125 cursor-pointer"
            style={{
              left: `${(point.x / 100) * 100}%`,
              bottom: `${(point.y / 100) * 100}%`,
              backgroundColor: point.color || CHART_COLORS.status.critical,
              width: `${(point.size || 16)}px`,
              height: `${(point.size || 16)}px`,
              transform: 'translate(-50%, 50%)'
            }}
            title={point.name}
          >
          </div>
        ))}

        {/* Axis labels */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
          {xLabel}
        </div>
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-600">
          {yLabel}
        </div>
      </div>
    </div>
  )
}

// Pyramid Chart
interface PyramidChartProps {
  data: { name: string; value: number; color?: string }[]
  title?: string
}

export function PyramidChart({ data, title }: PyramidChartProps) {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  return (
    <div className="w-full p-4">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="flex flex-col items-center space-y-1">
        {data.map((item, index) => {
          const width = ((data.length - index) / data.length) * 100
          const color = item.color || CHART_COLORS.priority[index === 0 ? 'critical' : index === 1 ? 'high' : 'medium']
          
          return (
            <div
              key={index}
              className="flex items-center justify-center text-white font-semibold py-4 px-6 text-sm transition-all duration-300 hover:opacity-80"
              style={{
                width: `${width}%`,
                backgroundColor: color,
              }}
            >
              {item.name}: {item.value}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Timeline/Gantt Chart (simplified version)
interface TimelineChartProps {
  data: { name: string; start: number; duration: number; color?: string; priority?: 'high' | 'medium' | 'low' }[]
  title?: string
  totalDays?: number
}

export function TimelineChart({ data, title, totalDays = 30 }: TimelineChartProps) {
  if (!data || data.length === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  return (
    <div className="w-full p-4">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="space-y-3">
        {data.map((item, index) => {
          const startPercent = (item.start / totalDays) * 100
          const widthPercent = (item.duration / totalDays) * 100
          const color = item.color || CHART_COLORS.priority[item.priority || 'medium']
          
          return (
            <div key={index} className="flex items-center">
              <div className="w-32 text-sm font-medium text-right pr-4 flex-shrink-0">
                {item.name}
              </div>
              <div className="flex-1 relative h-8 bg-gray-100 rounded">
                <div
                  className="absolute h-full rounded flex items-center justify-center text-white text-xs font-medium transition-all duration-300 hover:opacity-80"
                  style={{
                    left: `${startPercent}%`,
                    width: `${widthPercent}%`,
                    backgroundColor: color,
                  }}
                >
                  {item.duration}d
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Timeline scale */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <span>Day 0</span>
        <span>Day {Math.floor(totalDays/4)}</span>
        <span>Day {Math.floor(totalDays/2)}</span>
        <span>Day {Math.floor(3*totalDays/4)}</span>
        <span>Day {totalDays}</span>
      </div>
    </div>
  )
}