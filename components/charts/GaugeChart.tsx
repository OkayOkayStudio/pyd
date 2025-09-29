'use client'

import React from 'react'
// @ts-ignore - react-gauge-chart doesn't have types
import GaugeComponent from 'react-gauge-chart'

interface GaugeData {
  value: number
  max: number
  target?: number
  label?: string
  zones?: Array<{
    min: number
    max: number
    color: string
    label: string
  }>
}

interface GaugeChartProps {
  data?: GaugeData[]
  value?: number
  maxValue?: number
  target?: number
  color?: string
  width?: number
  height?: number
  colors?: string[]
  title?: string
  subtitle?: string
  config?: any
}

export default function GaugeChart({ 
  data,
  value,
  maxValue,
  target,
  color,
  width = 300, 
  height = 200, 
  colors = ['#00C853', '#FFB700', '#FF4444'],
  title,
  subtitle,
  config 
}: GaugeChartProps) {
  
  // Support both usage patterns: data array or individual props
  let gaugeData: GaugeData
  
  if (data && data.length > 0) {
    gaugeData = data[0]
  } else if (value !== undefined && maxValue !== undefined) {
    gaugeData = {
      value,
      max: maxValue,
      target,
      label: ''
    }
  } else {
    return <div className="text-gray-500">No gauge data available</div>
  }

  const percentage = gaugeData.value / gaugeData.max

  // Define color segments based on zones, single color, or default
  const segments = gaugeData.zones ? gaugeData.zones.length : 3
  const segmentColors = gaugeData.zones 
    ? gaugeData.zones.map(zone => zone.color)
    : color
    ? [color]
    : colors.slice(0, segments)

  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      
      <div style={{ width: width, height: height }}>
        <GaugeComponent
          id="speed-gauge"
          nrOfLevels={segments}
          percent={percentage}
          colors={segmentColors}
          arcWidth={0.3}
          arcPadding={0.02}
          cornerRadius={3}
          textColor="#666"
          needleColor="#333"
          needleBaseColor="#333"
          hideText={false}
          animate={true}
          animationDuration={1000}
        />
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold text-gray-800">
          {gaugeData.value}{gaugeData.label || 's'}
        </div>
        {gaugeData.target && (
          <div className="text-sm text-gray-600">
            Target: {gaugeData.target}{gaugeData.label || 's'}
          </div>
        )}
        
        {/* Zone indicators */}
        {gaugeData.zones && (
          <div className="flex justify-center mt-3 space-x-4 text-xs">
            {gaugeData.zones.map((zone, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded mr-1"
                  style={{ backgroundColor: zone.color }}
                />
                <span>{zone.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}