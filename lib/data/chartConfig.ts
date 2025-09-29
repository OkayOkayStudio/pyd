import { ChartConfig } from '@/types/organicSearch';

export const CHART_CONFIG: ChartConfig = {
  colors: {
    traffic: '#fb923c',           // orange-400
    trafficValue: '#fed7aa',      // orange-200
    impressions: '#dc2626',       // red-600
    top3: '#ea580c',             // orange-600
    top10: '#fb923c',            // orange-400
    top20: '#fbbf24',            // amber-400
    top50: '#d1d5db',            // gray-300
    beyond50: '#e5e7eb',         // gray-200
    pages: '#3b82f6',            // blue-500
  },
  gradients: {
    traffic: ['#fb923c', '#fed7aa'],
    trafficValue: ['#fed7aa', '#fef3c7'],
    impressions: ['#dc2626', '#fca5a5'],
  },
};

export const TIME_RANGES = [
  { label: 'Last 7 days', value: '7d', days: 7 },
  { label: 'Last 30 days', value: '30d', days: 30 },
  { label: 'Last 3 months', value: '3m', days: 90 },
  { label: 'Last 6 months', value: '6m', days: 180 },
  { label: 'Last year', value: '1y', days: 365 },
];

export const formatValue = (value: number, type: 'traffic' | 'currency' | 'number' = 'number'): string => {
  if (type === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
  
  if (type === 'traffic' && value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  
  return new Intl.NumberFormat('en-US').format(value);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};