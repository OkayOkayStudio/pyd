export interface MetricConfig {
  key: string;
  label: string;
  color: string;
  yAxisId: 'left' | 'right';
  formatValue?: (value: number) => string;
}

export interface ChartDataPoint {
  date: string;
  dateRange: string;
  [key: string]: number | string;
}

export const METRIC_CONFIGS: MetricConfig[] = [
  {
    key: 'referringDomains',
    label: 'Referring domains',
    color: '#3b82f6', // blue
    yAxisId: 'left',
  },
  {
    key: 'avgDomainRating',
    label: 'Avg. Domain Rating',
    color: '#8b5cf6', // purple
    yAxisId: 'left',
  },
  {
    key: 'avgUrlRating',
    label: 'Avg. URL Rating',
    color: '#10b981', // green
    yAxisId: 'left',
  },
  {
    key: 'avgOrganicTraffic',
    label: 'Avg. organic traffic',
    color: '#f97316', // orange
    yAxisId: 'right',
  },
  {
    key: 'avgOrganicTrafficValue',
    label: 'Avg. organic traffic value',
    color: '#fb923c', // light orange
    yAxisId: 'right',
    formatValue: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    key: 'organicPages',
    label: 'Organic pages',
    color: '#eab308', // yellow
    yAxisId: 'left',
  },
  {
    key: 'avgImpressions',
    label: 'Avg. Impressions',
    color: '#dc2626', // red
    yAxisId: 'right',
  },
  {
    key: 'avgPaidTraffic',
    label: 'Avg. paid traffic',
    color: '#0891b2', // teal
    yAxisId: 'right',
  },
  {
    key: 'avgPaidTrafficCost',
    label: 'Avg. paid traffic cost',
    color: '#059669', // light green
    yAxisId: 'right',
    formatValue: (value: number) => `$${value.toLocaleString()}`,
  },
  {
    key: 'crawledPages',
    label: 'Crawled pages',
    color: '#1e40af', // dark blue
    yAxisId: 'left',
  },
];

// Column indices based on the Google Sheets structure
const COLUMN_MAPPING = {
  date: 0,
  referringDomains: 1,
  avgDomainRating: 2,
  avgUrlRating: 3,
  avgOrganicTraffic: 4,
  avgOrganicTrafficValue: 5,
  organicPages: 6,
  avgImpressions: 7,
  avgPaidTraffic: 8,
  avgPaidTrafficCost: 9,
  crawledPages: 10,
};

export function transformSheetsDataToChart(sheetData: string[][]): ChartDataPoint[] {
  if (!sheetData || sheetData.length < 4) return [];

  // Skip header rows (first 3 rows are headers)
  const dataRows = sheetData.slice(3);
  
  return dataRows
    .map((row, index) => {
      if (!row[0] || row[0].trim() === '') return null;

      const dataPoint: ChartDataPoint = {
        date: row[COLUMN_MAPPING.date] || '',
        dateRange: formatDateRange(row[COLUMN_MAPPING.date] || '', index),
      };

      // Add all metric values
      Object.entries(COLUMN_MAPPING).forEach(([key, columnIndex]) => {
        if (key !== 'date') {
          const value = parseFloat(row[columnIndex] || '0');
          dataPoint[key] = isNaN(value) ? 0 : value;
        }
      });

      return dataPoint;
    })
    .filter((point): point is ChartDataPoint => point !== null);
}

function formatDateRange(dateStr: string, index: number): string {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString('en-GB', { month: 'short' });
    const day = date.getDate();
    
    // Calculate end date (assuming weekly data)
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 6);
    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleDateString('en-GB', { month: 'short' });
    
    if (month === endMonth) {
      return `${day}-${endDay} ${month}`;
    } else {
      return `${day} ${month} - ${endDay} ${endMonth}`;
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
}

export function formatValue(value: number, formatType?: 'currency' | 'number'): string {
  if (formatType === 'currency') {
    return `$${value.toLocaleString()}`;
  }
  return value.toLocaleString();
}

export function getVisibleMetrics(
  visibilityState: Record<string, boolean>
): MetricConfig[] {
  return METRIC_CONFIGS.filter(config => visibilityState[config.key] !== false);
}

export function getYAxisDomain(
  data: ChartDataPoint[],
  visibleMetrics: MetricConfig[],
  yAxisId: 'left' | 'right'
): [number, number] {
  const metricsForAxis = visibleMetrics.filter(m => m.yAxisId === yAxisId);
  
  if (metricsForAxis.length === 0) {
    return [0, 100];
  }
  
  let min = Infinity;
  let max = -Infinity;
  
  data.forEach(point => {
    metricsForAxis.forEach(metric => {
      const value = point[metric.key] as number;
      if (typeof value === 'number' && !isNaN(value)) {
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    });
  });
  
  if (min === Infinity || max === -Infinity) {
    return [0, 100];
  }
  
  // Add 10% padding to the range
  const padding = (max - min) * 0.1;
  return [
    Math.max(0, min - padding),
    max + padding
  ];
}