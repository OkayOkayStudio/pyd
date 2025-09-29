'use client'

import React from 'react'
import { Polygon } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'

interface FunnelData {
  stage: string
  count: number
  percentage?: number
  color?: string
}

interface FunnelChartProps {
  data: FunnelData[]
  width?: number
  height?: number
  colors?: string[]
  title?: string
  subtitle?: string
  config?: any
}

export default function FunnelChart({ 
  data, 
  width = 400, 
  height = 300, 
  colors = ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
  title,
  subtitle,
  config 
}: FunnelChartProps) {
  
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No funnel data available</div>
  }

  const margin = { top: 40, right: 40, bottom: 40, left: 40 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const maxValue = Math.max(...data.map(d => d.count))
  const stageHeight = innerHeight / data.length

  // Width scale based on values
  const widthScale = scaleLinear({
    domain: [0, maxValue],
    range: [50, innerWidth]
  })

  const segments = data.map((d, i) => {
    const segmentWidth = widthScale(d.count)
    const y = i * stageHeight
    const centerX = innerWidth / 2
    const halfWidth = segmentWidth / 2
    
    return {
      ...d,
      y,
      centerX,
      width: segmentWidth,
      color: d.color || colors[i % colors.length],
      // Trapezoid points (for funnel effect)
      points: [
        [centerX - halfWidth, y],
        [centerX + halfWidth, y],
        [centerX + halfWidth * 0.8, y + stageHeight - 5],
        [centerX - halfWidth * 0.8, y + stageHeight - 5]
      ]
    }
  })

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {segments.map((segment, i) => (
            <Group key={i}>
              {/* Funnel segment */}
              <Polygon
                points={segment.points as [number, number][]}
                fill={segment.color}
                stroke="white"
                strokeWidth={2}
              />
              
              {/* Stage label */}
              <text
                x={10}
                y={segment.y + stageHeight / 2}
                textAnchor="start"
                alignmentBaseline="middle"
                fontSize="12"
                fill="#666"
                fontWeight="500"
              >
                {segment.stage}
              </text>
              
              {/* Count label */}
              <text
                x={segment.centerX}
                y={segment.y + stageHeight / 2}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="14"
                fill="white"
                fontWeight="600"
              >
                {segment.count}
              </text>
              
              {/* Percentage label */}
              {segment.percentage && (
                <text
                  x={innerWidth - 10}
                  y={segment.y + stageHeight / 2}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fontSize="11"
                  fill="#666"
                >
                  {segment.percentage}%
                </text>
              )}
              
              {/* Drop-off indicator */}
              {i < segments.length - 1 && (
                <text
                  x={segment.centerX + segment.width / 2 + 20}
                  y={segment.y + stageHeight - 10}
                  textAnchor="start"
                  fontSize="10"
                  fill="#FF4444"
                >
                  -{segment.count - segments[i + 1].count}
                </text>
              )}
            </Group>
          ))}
        </Group>
      </svg>
      
      {/* Legend */}
      <div className="mt-4 text-xs text-gray-600 text-center">
        Funnel shows progressive drop-off from {segments[0].count} to {segments[segments.length - 1].count} 
        ({Math.round((segments[segments.length - 1].count / segments[0].count) * 100)}% retention)
      </div>
    </div>
  )
}