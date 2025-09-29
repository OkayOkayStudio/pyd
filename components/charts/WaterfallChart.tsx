'use client'

import React from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { scaleLinear, scaleBand } from '@visx/scale'

interface WaterfallData {
  name: string
  value: number
  isPositive?: boolean
  cumulative?: number
}

interface WaterfallChartProps {
  data: WaterfallData[]
  width?: number
  height?: number
  colors?: string[]
  title?: string
  subtitle?: string
  config?: any
}

export default function WaterfallChart({ 
  data, 
  width = 400, 
  height = 300, 
  colors = ['#FF4444', '#00C853'],
  title,
  subtitle,
  config 
}: WaterfallChartProps) {
  const margin = { top: 20, right: 20, bottom: 60, left: 60 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // Calculate cumulative values for waterfall effect
  const processedData = data.reduce((acc: (WaterfallData & { start: number; end: number })[], curr, index) => {
    const prevCumulative = index === 0 ? 0 : acc[index - 1].cumulative || 0
    const cumulative = prevCumulative + curr.value
    
    acc.push({
      ...curr,
      cumulative,
      start: Math.min(prevCumulative, cumulative),
      end: Math.max(prevCumulative, cumulative)
    })
    
    return acc
  }, [])

  const maxValue = Math.max(...processedData.map(d => d.end))
  const minValue = Math.min(0, ...processedData.map(d => d.start))

  const xScale = scaleBand<string>({
    range: [0, innerWidth],
    domain: data.map(d => d.name),
    padding: 0.2
  })

  const yScale = scaleLinear<number>({
    range: [innerHeight, 0],
    domain: [minValue, maxValue]
  })

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          {processedData.map((d, i) => {
            const barWidth = xScale.bandwidth()
            const barHeight = Math.abs(yScale(d.start) - yScale(d.end))
            const barX = xScale(d.name) || 0
            const barY = yScale(d.end)
            const isPositive = d.value >= 0
            
            return (
              <Group key={i}>
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={isPositive ? colors[1] : colors[0]}
                  stroke="white"
                  strokeWidth={1}
                />
                
                {/* Value label */}
                <text
                  x={barX + barWidth / 2}
                  y={barY - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {d.value > 0 ? '+' : ''}${d.value.toLocaleString()}
                </text>
                
                {/* Category label */}
                <text
                  x={barX + barWidth / 2}
                  y={innerHeight + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#666"
                  transform={`rotate(-45 ${barX + barWidth / 2} ${innerHeight + 20})`}
                >
                  {d.name}
                </text>
              </Group>
            )
          })}
          
          {/* Zero line */}
          <line
            x1={0}
            y1={yScale(0)}
            x2={innerWidth}
            y2={yScale(0)}
            stroke="#ccc"
            strokeWidth={1}
            strokeDasharray="3,3"
          />
        </Group>
      </svg>
    </div>
  )
}