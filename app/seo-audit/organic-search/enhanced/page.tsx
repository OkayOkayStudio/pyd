'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Download, Calendar, TrendingUp, BarChart3, Users, Settings, Upload } from 'lucide-react';
import Papa from 'papaparse';
import ShadcnOrganicTrafficChart from '@/components/charts/ShadcnOrganicTrafficChart';
import ShadcnPositionDistributionChart from '@/components/charts/ShadcnPositionDistributionChart';
import ShadcnOrganicPagesChart from '@/components/charts/ShadcnOrganicPagesChart';
import { CSVReaderParser, generateSampleData } from '@/lib/data/csvReaderParser';
import { OrganicSearchData, ChartDataPoint } from '@/types/organicSearch';
import { TIME_RANGES, formatValue } from '@/lib/data/chartConfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function EnhancedOrganicSearchDashboard() {
  const [data, setData] = useState<OrganicSearchData[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('metrics');
  const [timeRange, setTimeRange] = useState('3m');
  const [csvUploaded, setCsvUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs: TabItem[] = [
    { id: 'metrics', label: 'Metrics', icon: <BarChart3 size={16} /> },
    { id: 'competitors', label: 'Competitors', icon: <Users size={16} /> },
    { id: 'locations', label: 'Locations', icon: <Settings size={16} /> },
    { id: 'years', label: 'Years', icon: <Calendar size={16} /> },
  ];

  // Load sample data on component mount
  useEffect(() => {
    if (!csvUploaded) {
      const sampleData = generateSampleData();
      setData(sampleData);
      const transformedData = CSVReaderParser.transformToChartData(sampleData);
      setChartData(transformedData);
    }
  }, [csvUploaded]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setCsvUploaded(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          console.log('Papa Parse result:', result.data.slice(0, 3)); // Debug log
          
          const organicData = CSVReaderParser.parseCSVData(result.data);
          console.log('Parsed organic data:', organicData.slice(0, 3)); // Debug log
          
          setData(organicData);
          const transformedData = CSVReaderParser.transformToChartData(organicData);
          console.log('Transformed chart data:', transformedData.slice(0, 3)); // Debug log
          
          setChartData(transformedData);
        } catch (err) {
          console.error('Error parsing CSV data:', err);
          setError('Failed to parse CSV data. Please check the file format.');
          setCsvUploaded(false);
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        console.error('Papa Parse error:', error);
        setError('Failed to read CSV file. Please check the file format.');
        setCsvUploaded(false);
        setLoading(false);
      }
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

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
          <p className="text-gray-600">Processing CSV data...</p>
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
                  Enhanced Organic Search Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  {csvUploaded ? 'Using uploaded CSV data' : 'Using sample data - upload CSV to see your data'}
                </p>
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

      {/* CSV Upload Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload Your CSV Data
            </CardTitle>
            <CardDescription>
              Upload your organic search performance CSV file to see your actual data. 
              Expected format: Date, Avg organic traffic, Avg traffic value, Avg impressions, etc.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <div 
              onClick={handleUploadClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer"
            >
              <div className="text-4xl mb-4">📊</div>
              <div className="text-lg font-medium text-gray-900 mb-2">
                Drop your CSV file here or click to browse
              </div>
              <div className="text-sm text-gray-500">
                Supports .csv files with organic search performance data
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        {activeTab === 'metrics' && (
          <div className="space-y-8">
            {/* Organic Traffic Chart */}
            <ShadcnOrganicTrafficChart data={chartData} height={400} />

            {/* Position Distribution Chart */}
            <ShadcnPositionDistributionChart data={chartData} height={350} />

            {/* Organic Pages Chart */}
            <ShadcnOrganicPagesChart data={chartData} height={300} />
          </div>
        )}

        {/* Other tabs content placeholder */}
        {activeTab !== 'metrics' && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🚧</div>
              <h3 className="text-lg font-semibold mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label} Tab
              </h3>
              <p className="text-gray-600">
                This section is under development. Additional features coming soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}