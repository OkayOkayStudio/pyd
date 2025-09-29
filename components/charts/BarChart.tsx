'use client'

import React from 'react'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface BarChartProps {
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

export default function BarChart({ 
  data, 
  width = 400, 
  height = 300, 
  colors = ['#3B82F6', '#60A5FA', '#93C5FD'],
  title,
  subtitle,
  xAxis = 'name',
  yAxis = 'value',
  config = {}
}: BarChartProps) {
  
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No bar chart data available</div>
  }

  const isHorizontal = config.orientation === 'horizontal'
  const isStacked = config.type === 'stacked'
  const isGrouped = config.type === 'grouped'

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-600 mb-4">{subtitle}</p>}
      
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={isHorizontal ? 'horizontal' : 'vertical'}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          
          {isHorizontal ? (
            <>
              <XAxis type="number" stroke="#666" fontSize={12} />
              <YAxis type="category" dataKey={xAxis} stroke="#666" fontSize={12} width={100} />
            </>
          ) : (
            <>
              <XAxis dataKey={xAxis} stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
            </>
          )}
          
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          
          {/* Handle different bar configurations */}
          {isStacked || isGrouped ? (
            // Multiple data keys for stacked/grouped
            Object.keys(data[0] || {})
              .filter(key => key !== xAxis && typeof data[0][key] === 'number')
              .map((key, index) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  stackId={isStacked ? "stack" : undefined}
                  fill={colors[index % colors.length]}
                />
              ))
          ) : (
            // Single bar
            <Bar dataKey={yAxis} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
      
      {/* Status indicators for critical charts */}
      {config.showStatus && (
        <div className="mt-2 flex justify-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1" />
            <span>Critical</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-1" />
            <span>Warning</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1" />
            <span>Good</span>
          </div>
        </div>
      )}
    </div>
  )
}