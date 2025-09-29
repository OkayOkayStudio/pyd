'use client'

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { ChartDataPoint } from '@/types/organicSearch';
import { CHART_CONFIG, formatValue, formatDate } from '@/lib/data/chartConfig';

interface OrganicTrafficChartProps {
  data: ChartDataPoint[];
  height?: number;
}

interface LegendItem {
  key: keyof Pick<ChartDataPoint, 'traffic' | 'trafficValue' | 'impressions'>;
  label: string;
  color: string;
  type: 'area' | 'line';
  visible: boolean;
}

export default function OrganicTrafficChart({ data, height = 400 }: OrganicTrafficChartProps) {
  const [legendItems, setLegendItems] = useState<LegendItem[]>([
    {
      key: 'traffic',
      label: 'Organic Traffic',
      color: CHART_CONFIG.colors.traffic,
      type: 'area',
      visible: true,
    },
    {
      key: 'trafficValue',
      label: 'Traffic Value',
      color: CHART_CONFIG.colors.trafficValue,
      type: 'line',
      visible: true,
    },
    {
      key: 'impressions',
      label: 'Impressions',
      color: CHART_CONFIG.colors.impressions,
      type: 'line',
      visible: true,
    },
  ]);

  const toggleLegendItem = (key: string) => {
    setLegendItems(items =>
      items.map(item =>
        item.key === key ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          const legendItem = legendItems.find(item => item.key === entry.dataKey);
          if (!legendItem?.visible) return null;
          
          const formatType = entry.dataKey === 'trafficValue' ? 'currency' : 
                           entry.dataKey === 'traffic' ? 'traffic' : 'number';
          
          return (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{legendItem.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {formatValue(entry.value, formatType)}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const CustomLegend = () => (
    <div className="flex flex-wrap gap-6 mb-4">
      {legendItems.map((item) => (
        <button
          key={item.key}
          onClick={() => toggleLegendItem(item.key)}
          className={`flex items-center gap-2 text-sm transition-opacity ${
            item.visible ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <div className="flex items-center gap-2">
            {item.type === 'area' ? (
              <div className="flex">
                <div 
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            ) : (
              <div 
                className="w-4 h-0.5"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="font-medium text-gray-700">{item.label}</span>
          </div>
          <input
            type="checkbox"
            checked={item.visible}
            onChange={() => toggleLegendItem(item.key)}
            className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
          />
        </button>
      ))}
    </div>
  );

  // Filter data for visible metrics
  const visibleMetrics = legendItems.filter(item => item.visible);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Organic Traffic</h3>
          <p className="text-sm text-gray-500 mt-1">
            Weekly performance over the last 3 months
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white">
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white">
            <option>Weekly</option>
            <option>Daily</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      <CustomLegend />

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_CONFIG.colors.traffic} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={CHART_CONFIG.colors.traffic} stopOpacity={0.1}/>
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
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => formatValue(value, 'traffic')}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) => formatValue(value, 'currency')}
            />
            
            <Tooltip content={<CustomTooltip />} />

            {visibleMetrics.map((item) => {
              if (item.key === 'traffic' && item.type === 'area') {
                return (
                  <Area
                    key={item.key}
                    yAxisId="left"
                    type="monotone"
                    dataKey={item.key}
                    stroke={item.color}
                    fill="url(#trafficGradient)"
                    strokeWidth={2}
                    dot={{ fill: item.color, strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: item.color }}
                  />
                );
              } else {
                const yAxisId = item.key === 'trafficValue' ? 'right' : 'left';
                return (
                  <Line
                    key={item.key}
                    yAxisId={yAxisId}
                    type="monotone"
                    dataKey={item.key}
                    stroke={item.color}
                    strokeWidth={2}
                    dot={{ fill: item.color, strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: item.color }}
                  />
                );
              }
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {formatValue(data[data.length - 1]?.traffic || 0, 'traffic')}
          </div>
          <div className="text-sm text-gray-500">Current Traffic</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">
            {formatValue(data[data.length - 1]?.trafficValue || 0, 'currency')}
          </div>
          <div className="text-sm text-gray-500">Traffic Value</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {formatValue(data[data.length - 1]?.impressions || 0)}
          </div>
          <div className="text-sm text-gray-500">Impressions</div>
        </div>
      </div>
    </div>
  );
}