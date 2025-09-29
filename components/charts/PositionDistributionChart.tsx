'use client'

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartDataPoint } from '@/types/organicSearch';
import { CHART_CONFIG, formatDate } from '@/lib/data/chartConfig';

interface PositionDistributionChartProps {
  data: ChartDataPoint[];
  height?: number;
}

interface PositionCategory {
  key: keyof Pick<ChartDataPoint, 'top3' | 'top10' | 'top20' | 'top50' | 'beyond50'>;
  label: string;
  color: string;
  description: string;
}

export default function PositionDistributionChart({ 
  data, 
  height = 350 
}: PositionDistributionChartProps) {
  const categories: PositionCategory[] = [
    {
      key: 'top3',
      label: '1-3',
      color: CHART_CONFIG.colors.top3,
      description: 'Top positions'
    },
    {
      key: 'top10',
      label: '4-10',
      color: CHART_CONFIG.colors.top10,
      description: 'First page'
    },
    {
      key: 'top20',
      label: '11-20',
      color: CHART_CONFIG.colors.top20,
      description: 'Second page'
    },
    {
      key: 'top50',
      label: '21-50',
      color: CHART_CONFIG.colors.top50,
      description: 'Pages 3-5'
    },
    {
      key: 'beyond50',
      label: '51+',
      color: CHART_CONFIG.colors.beyond50,
      description: 'Beyond page 5'
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[250px]">
        <p className="font-medium text-gray-900 mb-3">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => {
            const category = categories.find(cat => cat.key === entry.dataKey);
            if (!category) return null;
            
            const percentage = total > 0 ? Math.round((entry.value / total) * 100) : 0;
            
            return (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">
                    Positions {category.label}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {entry.value} keywords
                  </div>
                  <div className="text-xs text-gray-500">
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Total Keywords</span>
            <span className="text-sm font-bold text-gray-900">{total}</span>
          </div>
        </div>
      </div>
    );
  };

  // Calculate current distribution for summary card
  const currentData = data[data.length - 1];
  const currentTotal = currentData ? 
    currentData.top3 + currentData.top10 + currentData.top20 + currentData.top50 + currentData.beyond50 : 0;

  const getCurrentPercentage = (value: number) => {
    return currentTotal > 0 ? Math.round((value / currentTotal) * 100) : 0;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Organic Positions Distribution</h3>
          <p className="text-sm text-gray-500 mt-1">
            Keyword ranking positions over time
          </p>
        </div>
      </div>

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            stackOffset="expand"
          >
            <defs>
              {categories.map(category => (
                <linearGradient key={category.key} id={`gradient-${category.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={category.color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={category.color} stopOpacity={0.6}/>
                </linearGradient>
              ))}
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
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => `${Math.round(value * 100)}%`}
            />
            
            <Tooltip content={<CustomTooltip />} />

            {categories.reverse().map((category) => (
              <Area
                key={category.key}
                type="monotone"
                dataKey={category.key}
                stackId="1"
                stroke={category.color}
                fill={`url(#gradient-${category.key})`}
                strokeWidth={1}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Current Distribution Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Current Distribution</h4>
        <div className="grid grid-cols-5 gap-4">
          {categories.reverse().map((category) => {
            const value = currentData?.[category.key] || 0;
            const percentage = getCurrentPercentage(value);
            
            return (
              <div key={category.key} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <div className="text-lg font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-500 mb-1">
                  Positions {category.label}
                </div>
                <div 
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: category.color + '20',
                    color: category.color
                  }}
                >
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-orange-600 text-lg">💡</div>
            <div>
              <h5 className="font-medium text-orange-900 mb-1">Key Insights</h5>
              <p className="text-sm text-orange-800">
                {currentData?.top3 && getCurrentPercentage(currentData.top3) >= 20 
                  ? `Strong performance with ${getCurrentPercentage(currentData.top3)}% of keywords in top 3 positions.`
                  : currentData?.top10 && getCurrentPercentage(currentData.top10) >= 40
                  ? `Good first-page visibility with ${getCurrentPercentage(currentData.top10)}% of keywords in positions 4-10.`
                  : 'Focus on improving keyword positions to increase visibility and traffic.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}