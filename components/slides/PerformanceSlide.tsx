'use client'

import { useEffect, useState } from 'react';
import PerformanceChart from '@/components/PerformanceChart';
import { ChartSkeleton } from '@/components/ui/chart-skeleton';

interface PerformanceSlideProps {
  isDarkMode?: boolean;
}

export default function PerformanceSlide({ isDarkMode = false }: PerformanceSlideProps) {
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    console.log('🔧 PerformanceSlide mounted in presentation context');
    
    // Delay chart rendering to allow slide animation to complete
    const timer = setTimeout(() => {
      console.log('🔧 Enabling chart rendering after animation delay');
      setChartReady(true);
    }, 500); // 500ms delay after slide animation (which is 400ms)
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="slide-container p-16 pt-32">
      <div className="slide-content max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="slide-header mb-12">
          <h1 className="slide-title text-5xl font-bold mb-6">
            Performance Metrics
          </h1>
          <h2 className="text-2xl text-opacity-70 mb-8">
            Live SEO Data from March - September 2025
          </h2>
          <div className="text-lg leading-relaxed max-w-4xl">
            <p className="mb-4">
              Real-time performance data shows your SEO journey from crisis to recovery. 
              Track key metrics including organic traffic growth, domain authority improvements, 
              and search visibility increases over the past 6 months.
            </p>
          </div>
        </div>

        {/* Interactive Chart */}
        <div className="chart-section mb-12">
 
          <div 
            className="chart-wrapper relative"
            style={{ 
              minHeight: '600px', 
              width: '100%', 
              overflow: 'visible', 
              zIndex: 1,
              display: 'block'
            }}
          >
            {chartReady ? (
              <PerformanceChart
                sheetName="www.pyd.agency_perf_2025-09-25_04-37-50"
                className="bg-white w-full"
              />
            ) : (
              <ChartSkeleton className="bg-white w-full" height="h-[500px]" />
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div className="insights-grid grid grid-cols-3 gap-8">
          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Traffic Recovery</h3>
            <p className="text-base leading-relaxed">
              Organic traffic increased from 1 to 47 monthly visits, 
              showing 4,700% growth after implementing SEO fixes.
            </p>
          </div>

          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Authority Building</h3>
            <p className="text-base leading-relaxed">
              Domain rating improved from 0 to 3.3, with referring domains 
              doubling from 1 to 2 over the monitoring period.
            </p>
          </div>

          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Visibility Growth</h3>
            <p className="text-base leading-relaxed">
              Search impressions peaked at 360, with ranking positions 
              improving across all tracked search intents.
            </p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="slide-footer mt-16 pt-8 border-t border-opacity-20">
          <div className="flex justify-between items-center text-sm opacity-70">
            <div>
              <strong>Data Source:</strong> Live Google Sheets integration via API
            </div>
            <div>
              <strong>Update Frequency:</strong> Real-time data refresh
            </div>
            <div>
              <strong>Time Period:</strong> March 31 - September 22, 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}