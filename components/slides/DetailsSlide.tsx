'use client'

import { useEffect, useState } from 'react';
import DetailsTable from '@/components/DetailsTable';
import { TableSkeleton } from '@/components/ui/table-skeleton';

interface DetailsSlideProps {
  isDarkMode?: boolean;
}

export default function DetailsSlide({ isDarkMode = false }: DetailsSlideProps) {
  const [tableReady, setTableReady] = useState(false);

  useEffect(() => {
    console.log('🔧 DetailsSlide mounted in presentation context');
    
    // Delay table rendering to allow slide animation to complete
    const timer = setTimeout(() => {
      console.log('🔧 Enabling table rendering after animation delay');
      setTableReady(true);
    }, 500); // 500ms delay after slide animation (which is 400ms)
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="slide-container p-16 pt-32">
      <div className="slide-content max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="slide-header mb-12">
          <h1 className="slide-title text-5xl font-bold mb-6">
            Details
          </h1>
          <h2 className="text-2xl text-opacity-70 mb-8">
            Comprehensive Data Analysis & Insights
          </h2>
          <div className="text-lg leading-relaxed max-w-4xl">
            <p className="mb-4">
              Interactive data table with real-time information from Google Sheets. 
              Sort by any column, filter data, and toggle column visibility for focused analysis. 
              All data refreshes automatically to provide the most current insights.
            </p>
          </div>
        </div>

        {/* Details Table */}
        <div className="table-section mb-12">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Interactive Data Table</h3>
            <p className="text-base text-opacity-70">
              Click column headers to sort, use the search box to filter records, 
              and manage column visibility with the dropdown menu. Navigate through pages using the controls below.
            </p>
          </div>
          
          <div 
            className="table-wrapper relative"
            style={{ 
              minHeight: '600px', 
              width: '100%', 
              overflow: 'visible', 
              zIndex: 1,
              display: 'block'
            }}
          >
            {tableReady ? (
              <DetailsTable className="bg-white shadow-lg rounded-lg p-6" />
            ) : (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <TableSkeleton rows={8} columns={5} />
              </div>
            )}
          </div>
        </div>

        {/* Key Features */}
        <div className="insights-grid grid grid-cols-3 gap-8">
          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Real-Time Data</h3>
            <p className="text-base leading-relaxed">
              Data automatically syncs from Google Sheets, ensuring you always 
              have the most current information for analysis and reporting.
            </p>
          </div>

          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Interactive Sorting</h3>
            <p className="text-base leading-relaxed">
              Click any column header to sort data ascending or descending. 
              Multi-column sorting available for complex data analysis.
            </p>
          </div>

          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Flexible Filtering</h3>
            <p className="text-base leading-relaxed">
              Search and filter capabilities with column visibility controls 
              allow for focused analysis on specific data points.
            </p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="slide-footer mt-16 pt-8 border-t border-opacity-20">
          <div className="flex justify-between items-center text-sm opacity-70">
            <div>
              <strong>Data Source:</strong> Live Google Sheets "Details" tab
            </div>
            <div>
              <strong>Update Frequency:</strong> Real-time data refresh
            </div>
            <div>
              <strong>Features:</strong> Sorting, Filtering, Column Management, Pagination
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}