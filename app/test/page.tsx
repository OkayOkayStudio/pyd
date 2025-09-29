'use client'

import SheetsDataExample from '@/components/SheetsDataExample';
import PerformanceChart from '@/components/PerformanceChart';
import SEOMetricsSlide from '@/components/SEOMetricsSlide';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Google Sheets Integration Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <SheetsDataExample />
        </div>

        <PerformanceChart className="mb-8" />
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Full Slide Example</h2>
          <div className="bg-white rounded-lg overflow-hidden">
            <SEOMetricsSlide />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">API Endpoints Available:</h2>
          <div className="space-y-2 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <code className="text-blue-600">/api/sheets</code> - Get all sheets data
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <code className="text-blue-600">/api/sheets?sheet=SheetName</code> - Get specific sheet data
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <code className="text-blue-600">/api/sheets?range=A1:C10</code> - Get specific range data
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <code className="text-blue-600">/api/sheets?format=csv</code> - Get data in CSV format
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}