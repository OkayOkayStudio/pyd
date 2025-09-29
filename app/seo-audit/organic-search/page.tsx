'use client'

import React, { useState, useEffect } from 'react';
import { Download, Calendar, TrendingUp, BarChart3, Users, Settings } from 'lucide-react';
import OrganicTrafficChart from '@/components/charts/OrganicTrafficChart';
import PositionDistributionChart from '@/components/charts/PositionDistributionChart';
import OrganicPagesChart from '@/components/charts/OrganicPagesChart';
import { CSVParser, generateSampleData } from '@/lib/data/csvParser';
import { OrganicSearchData, ChartDataPoint } from '@/types/organicSearch';
import { TIME_RANGES, formatValue } from '@/lib/data/chartConfig';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function OrganicSearchDashboard() {
  const [data, setData] = useState<OrganicSearchData[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('metrics');
  const [timeRange, setTimeRange] = useState('3m');

  const tabs: TabItem[] = [
    { id: 'metrics', label: 'Metrics', icon: <BarChart3 size={16} /> },
    { id: 'competitors', label: 'Competitors', icon: <Users size={16} /> },
    { id: 'locations', label: 'Locations', icon: <Settings size={16} /> },
    { id: 'years', label: 'Years', icon: <Calendar size={16} /> },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to load real CSV data, fall back to sample data
        let organicData: OrganicSearchData[];
        
        try {
          organicData = await CSVParser.loadFromPublicFolder('www.pyd.agency_perf_20250925_014153.csv');
          console.log('Successfully loaded CSV data:', organicData.slice(0, 3)); // Debug: show first 3 rows
        } catch (csvError) {
          console.warn('Could not load CSV file, using sample data:', csvError);
          organicData = generateSampleData();
          console.log('Using generated sample data:', organicData.slice(0, 3)); // Debug: show first 3 rows
        }

        setData(organicData);
        const transformedData = CSVParser.transformToChartData(organicData);
        console.log('Transformed chart data:', transformedData.slice(0, 3)); // Debug: show first 3 transformed rows
        setChartData(transformedData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleExport = () => {
    const csvContent = [
      ['Date', 'Traffic', 'Traffic Value', 'Impressions', 'Organic Pages'],
      ...chartData.map(row => [
        row.date,
        row.traffic,
        row.trafficValue,
        row.impressions,
        row.pages
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organic-search-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentData = chartData[chartData.length - 1];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="text-2xl">🔍</div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Organic Search Performance
                </h1>
                <p className="text-sm text-gray-500">PYD Agency - SEO Audit Report</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {TIME_RANGES.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Traffic</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue(currentData?.traffic || 0, 'traffic')}
                </p>
              </div>
              <div className="text-orange-500 text-2xl">
                <TrendingUp />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              ↗ {Math.round(((currentData?.traffic || 0) / (chartData[0]?.traffic || 1) - 1) * 100)}% from start
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Traffic Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue(currentData?.trafficValue || 0, 'currency')}
                </p>
              </div>
              <div className="text-orange-400 text-2xl">💰</div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              Monthly estimated value
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Impressions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatValue(currentData?.impressions || 0)}
                </p>
              </div>
              <div className="text-red-600 text-2xl">👁️</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Search visibility
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ranking Pages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentData?.pages || 0}
                </p>
              </div>
              <div className="text-blue-500 text-2xl">📄</div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Pages with organic traffic
            </p>
          </div>
        </div>

        {/* Main Charts */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            {/* Organic Traffic Chart */}
            <OrganicTrafficChart data={chartData} height={400} />

            {/* Position Distribution Chart */}
            <PositionDistributionChart data={chartData} height={350} />

            {/* Organic Pages Chart */}
            <OrganicPagesChart data={chartData} height={300} />
          </div>
        )}

        {/* Other tabs content placeholder */}
        {activeTab !== 'metrics' && (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label} Tab
            </h3>
            <p className="text-gray-600">
              This section is under development. Additional features coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}