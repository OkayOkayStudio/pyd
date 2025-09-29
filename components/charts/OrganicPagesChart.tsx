'use client'

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '@/types/organicSearch';
import { CHART_CONFIG, formatDate } from '@/lib/data/chartConfig';

interface OrganicPagesChartProps {
  data: ChartDataPoint[];
  height?: number;
}

export default function OrganicPagesChart({ data, height = 300 }: OrganicPagesChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const value = payload[0]?.value || 0;
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CHART_CONFIG.colors.pages }}
            />
            <span className="text-sm text-gray-600">Organic Pages</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {value} pages
          </span>
        </div>
      </div>
    );
  };

  // Calculate change from first to last data point
  const firstValue = data[0]?.pages || 0;
  const lastValue = data[data.length - 1]?.pages || 0;
  const change = lastValue - firstValue;
  const changePercentage = firstValue > 0 ? Math.round(((change / firstValue) * 100)) : 0;

  // Find min and max values for better Y-axis scaling
  const values = data.map(d => d.pages);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const padding = Math.max(1, Math.round((maxValue - minValue) * 0.1));
  const yAxisMin = Math.max(0, minValue - padding);
  const yAxisMax = maxValue + padding;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Organic Pages</h3>
          <p className="text-sm text-gray-500 mt-1">
            Number of pages receiving organic traffic
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {lastValue}
          </div>
          <div className={`text-sm font-medium flex items-center gap-1 ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? '↗' : '↘'}
            {Math.abs(change)} ({changePercentage >= 0 ? '+' : ''}{changePercentage}%)
          </div>
        </div>
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="pagesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_CONFIG.colors.pages} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={CHART_CONFIG.colors.pages} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={formatDate}
            />
            <YAxis 
              domain={[yAxisMin, yAxisMax]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="pages"
              stroke={CHART_CONFIG.colors.pages}
              strokeWidth={3}
              dot={{ fill: CHART_CONFIG.colors.pages, strokeWidth: 0, r: 5 }}
              activeDot={{ 
                r: 7, 
                fill: CHART_CONFIG.colors.pages,
                stroke: 'white',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {Math.min(...values)}
            </div>
            <div className="text-xs text-gray-500">Minimum</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}
            </div>
            <div className="text-xs text-gray-500">Average</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {Math.max(...values)}
            </div>
            <div className="text-xs text-gray-500">Maximum</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-4">
        <div className={`${
          change >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        } border rounded-lg p-4`}>
          <div className="flex items-start gap-3">
            <div className={`text-lg ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '📈' : '📉'}
            </div>
            <div>
              <h5 className={`font-medium mb-1 ${
                change >= 0 ? 'text-green-900' : 'text-red-900'
              }`}>
                Page Performance Trend
              </h5>
              <p className={`text-sm ${
                change >= 0 ? 'text-green-800' : 'text-red-800'
              }`}>
                {change >= 0 
                  ? `Your organic visibility is growing with ${change} more pages receiving traffic. This indicates improved content discovery and indexing.`
                  : `You've lost organic visibility with ${Math.abs(change)} fewer pages receiving traffic. Consider content optimization and technical SEO improvements.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}