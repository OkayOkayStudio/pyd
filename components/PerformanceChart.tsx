'use client'

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSheet } from '@/hooks/useGoogleSheets';
import {
  METRIC_CONFIGS,
  transformSheetsDataToChart,
  getVisibleMetrics,
  getYAxisDomain,
  formatValue,
  type ChartDataPoint,
  type MetricConfig,
} from '@/lib/chartUtils';

interface PerformanceChartProps {
  sheetName?: string;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 min-w-[200px]">
      <p className="font-medium text-gray-900 mb-2">{label}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const config = METRIC_CONFIGS.find(c => c.key === entry.dataKey);
          const formattedValue = config?.formatValue 
            ? config.formatValue(entry.value)
            : formatValue(entry.value);
          
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{config?.label}:</span>
              <span className="font-medium text-gray-900">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ChartLegendProps {
  metrics: MetricConfig[];
  visibilityState: Record<string, boolean>;
  onToggleMetric: (key: string) => void;
}

const ChartLegend: React.FC<ChartLegendProps> = ({ 
  metrics, 
  visibilityState, 
  onToggleMetric 
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
      {metrics.map((metric) => (
        <div key={metric.key} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={metric.key}
            checked={visibilityState[metric.key] !== false}
            onChange={() => onToggleMetric(metric.key)}
            className="w-4 h-4 rounded border-gray-300"
          />
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: metric.color }}
          />
          <label 
            htmlFor={metric.key}
            className="text-sm text-gray-700 cursor-pointer select-none"
          >
            {metric.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default function PerformanceChart({ 
  sheetName = 'www.pyd.agency_perf_2025-09-25_04-37-50',
  className = '' 
}: PerformanceChartProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [visibilityState, setVisibilityState] = useState<Record<string, boolean>>({});
  
  const { data, loading, error } = useSheet(sheetName);
  
  // Debug logging
  console.log('🔧 PerformanceChart Debug:', { 
    sheetName, 
    loading, 
    error, 
    dataExists: !!data,
    dataValues: data?.values?.length || 0 
  });

  const chartData = useMemo(() => {
    if (!data?.values) return [];
    return transformSheetsDataToChart(data.values);
  }, [data]);

  const visibleMetrics = useMemo(() => {
    return getVisibleMetrics(visibilityState);
  }, [visibilityState]);

  const leftYAxisDomain = useMemo(() => {
    return getYAxisDomain(chartData, visibleMetrics, 'left');
  }, [chartData, visibleMetrics]);

  const rightYAxisDomain = useMemo(() => {
    return getYAxisDomain(chartData, visibleMetrics, 'right');
  }, [chartData, visibleMetrics]);

  const handleToggleMetric = (key: string) => {
    setVisibilityState(prev => ({
      ...prev,
      [key]: prev[key] !== false ? false : true
    }));
  };

  // Always show debug info first
  const debugInfo = (
    <div className="mb-4 p-3 bg-yellow-100 rounded text-sm">
      <strong>🔧 Debug Info:</strong> Loading: {loading ? 'Yes' : 'No'}, 
      Error: {error || 'None'}, 
      Data: {data ? 'Available' : 'Missing'}, 
      Chart Data: {chartData.length} points
    </div>
  );

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Performance
            <ChevronDown className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-gray-500">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Performance
            <ChevronDown className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {debugInfo}
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-red-500">Error loading chart data: {error}</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!chartData.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Performance
            <ChevronDown className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-gray-500">No data available</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Performance
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </CardTitle>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent>
          <ChartLegend
            metrics={METRIC_CONFIGS}
            visibilityState={visibilityState}
            onToggleMetric={handleToggleMetric}
          />
          
          <div className="w-full h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 80,
                  left: 80,
                  bottom: 60,
                }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#f1f5f9" 
                  vertical={false}
                />
                
                <XAxis
                  dataKey="dateRange"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  domain={leftYAxisDomain}
                />
                
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  domain={rightYAxisDomain}
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                {visibleMetrics.map((metric) => (
                  <Line
                    key={metric.key}
                    yAxisId={metric.yAxisId}
                    type="monotone"
                    dataKey={metric.key}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ 
                      r: 4, 
                      fill: metric.color,
                      stroke: '#fff',
                      strokeWidth: 2 
                    }}
                    connectNulls={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      )}
    </Card>
  );
}