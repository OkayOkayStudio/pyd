'use client'

import React from 'react'
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface AreaChartProps {
  data: any[]
  width?: number
  height?: number
  colors?: string[]
  title?: string
  subtitle?: string
  xAxis?: string
  yAxis?: string
  config?: any
}

export default function AreaChart({ 
  data, 
  width = 400, 
  height = 300, 
  colors = ['#FF4444', '#00C853'],
  title,
  subtitle,
  xAxis = 'month',
  yAxis = 'value',
  config = {}
}: AreaChartProps) {
  
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No area chart data available</div>
  }

  // Find break-even point if showing ROI data
  const breakEvenPoint = config.showBreakEven && data.findIndex(d => d.cumulative >= 0)

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey={xAxis} stroke="#666" fontSize={12} />
          <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
          
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: any, name: string) => [
              `$${value.toLocaleString()}`, 
              name === 'investment' ? 'Investment' : name === 'revenue' ? 'Revenue' : name
            ]}
          />
          
          {/* Investment area (red) */}
          {data[0]?.investment !== undefined && (
            <Area 
              type="monotone" 
              dataKey="investment" 
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          )}
          
          {/* Revenue area (green) */}
          {data[0]?.revenue !== undefined && (
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke={colors[1]}
              fill={colors[1]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          )}
          
          {/* Single data series */}
          {data[0]?.investment === undefined && data[0]?.revenue === undefined && (
            <Area 
              type="monotone" 
              dataKey={yAxis} 
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          )}
          
          {/* Break-even line */}
          {config.showBreakEven && breakEvenPoint >= 0 && (
            <ReferenceLine 
              x={data[breakEvenPoint][xAxis]} 
              stroke="#333" 
              strokeDasharray="5 5"
              label={{ value: "Break-even", position: "top" }}
            />
          )}
          
          {/* Zero line */}
          <ReferenceLine y={0} stroke="#ccc" strokeWidth={1} />
        </RechartsAreaChart>
      </ResponsiveContainer>
      
      {/* Key metrics display */}
      {config.showMetrics && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-red-600">Total Investment</div>
            <div>${data.reduce((sum, d) => sum + (d.investment || 0), 0).toLocaleString()}</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">Total Revenue</div>
            <div>${data.reduce((sum, d) => sum + (d.revenue || 0), 0).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}