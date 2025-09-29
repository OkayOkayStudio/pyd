'use client'

import React from 'react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Chart configuration interface
interface ChartConfig {
  type: string
  data?: any[]
  title?: string
  width?: number
  height?: number
  colors?: string[]
  options?: Record<string, any>
}

// Color schemes
export const CHART_COLORS = {
  status: {
    critical: '#DC2626', // red-600
    high: '#F59E0B',     // amber-500
    medium: '#10B981',   // emerald-500
    good: '#059669'      // emerald-600
  },
  progress: {
    current: '#DC2626',  // red-600
    target: '#059669',   // emerald-600
    competitor: '#6B7280' // gray-500
  },
  priority: {
    critical: '#DC2626', // red-600
    high: '#F59E0B',     // amber-500
    medium: '#3B82F6',   // blue-500
    low: '#6B7280'       // gray-500
  }
}

// Simple bar chart component
export function SimpleBarChart({ data, title, height = 300, colors = [CHART_COLORS.status.critical] }: ChartConfig) {
  if (!data) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="value" fill={colors[0]} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Horizontal bar chart
export function HorizontalBarChart({ data, title, height = 300, colors = [CHART_COLORS.status.critical] }: ChartConfig) {
  if (!data) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="horizontal" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="value" fill={colors[0]} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Stacked bar chart
export function StackedBarChart({ data, title, height = 300, colors = Object.values(CHART_COLORS.status) }: ChartConfig) {
  if (!data || !data[0]) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  const dataKeys = Object.keys(data[0]).filter(key => key !== 'name')

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar 
              key={key} 
              dataKey={key} 
              stackId="stack" 
              fill={colors[index % colors.length]} 
              radius={index === dataKeys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Pie chart
export function SimplePieChart({ data, title, height = 300, colors = Object.values(CHART_COLORS.status) }: ChartConfig) {
  if (!data) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// Line chart
export function SimpleLineChart({ data, title, height = 300, colors = [CHART_COLORS.status.critical] }: ChartConfig) {
  if (!data) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={colors[0]} 
            strokeWidth={3}
            dot={{ fill: colors[0], strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: colors[0], strokeWidth: 2, fill: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Area chart
export function SimpleAreaChart({ data, title, height = 300, colors = [CHART_COLORS.status.critical, CHART_COLORS.status.good] }: ChartConfig) {
  if (!data || !data[0]) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  const dataKeys = Object.keys(data[0]).filter(key => key !== 'name')

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          {dataKeys.map((key, index) => (
            <Area 
              key={key}
              type="monotone" 
              dataKey={key} 
              stackId="area"
              stroke={colors[index % colors.length]} 
              fill={colors[index % colors.length]}
              fillOpacity={0.6}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

// Scatter plot
export function SimpleScatterChart({ data, title, height = 300, colors = [CHART_COLORS.status.critical] }: ChartConfig) {
  if (!data) return <div className="h-64 flex items-center justify-center text-gray-500">No data available</div>

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} />
          <YAxis dataKey="y" tick={{ fontSize: 12 }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            cursor={{ strokeDasharray: '3 3' }}
          />
          <Scatter dataKey="value" fill={colors[0]} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

// Chart factory component
export default function ChartFactory({ type, ...props }: ChartConfig) {
  switch (type) {
    case 'bar':
      return <SimpleBarChart {...props} />
    case 'horizontal-bar':
      return <HorizontalBarChart {...props} />
    case 'stacked-bar':
      return <StackedBarChart {...props} />
    case 'pie':
      return <SimplePieChart {...props} />
    case 'line':
      return <SimpleLineChart {...props} />
    case 'area':
      return <SimpleAreaChart {...props} />
    case 'scatter':
      return <SimpleScatterChart {...props} />
    default:
      return <div className="h-64 flex items-center justify-center text-gray-500">Chart type not supported: {type}</div>
  }
}