'use client'

import PerformanceChart from '@/components/PerformanceChart';

interface SEOMetricsSlideProps {
  title?: string;
  subtitle?: string;
  sheetName?: string;
  className?: string;
}

export default function SEOMetricsSlide({
  title = "Performance Metrics",
  subtitle = "SEO performance data from www.pyd.agency",
  sheetName = "www.pyd.agency_perf_2025-09-25_04-37-50",
  className = ""
}: SEOMetricsSlideProps) {
  return (
    <div className={`slide-container p-8 ${className}`}>
      <div className="slide-content max-w-7xl mx-auto">
        <div className="slide-header mb-8">
          <h1 className="slide-title text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-gray-600 mb-6">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="chart-container">
          <PerformanceChart sheetName={sheetName} />
        </div>
        
        <div className="slide-footer mt-8">
          <div className="grid grid-cols-3 gap-8 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Source</h3>
              <p>Google Sheets API - Live data from SEO tools</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Metrics Tracked</h3>
              <p>10 key SEO performance indicators</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Time Period</h3>
              <p>March 2025 - September 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}