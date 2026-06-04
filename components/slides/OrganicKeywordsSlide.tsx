'use client'

import { useEffect, useState } from 'react';
import OrganicKeywordsTable from '@/components/OrganicKeywordsTable';
import { TableSkeleton } from '@/components/ui/table-skeleton';

interface OrganicKeywordsSlideProps {
  isDarkMode?: boolean;
}

export default function OrganicKeywordsSlide({ isDarkMode = false }: OrganicKeywordsSlideProps) {
  const [tableReady, setTableReady] = useState(false);

  useEffect(() => {
    console.log('🔧 OrganicKeywordsSlide mounted in presentation context');
    
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
            Organic Keywords
          </h1>
          <h2 className="text-2xl text-opacity-70 mb-8">
            45 Keywords Ranking - 3,760 Monthly Searches - 47 Visits Generated
          </h2>
          
          {/* Overview */}
          <div className="text-lg leading-relaxed max-w-6xl mb-8">
            <h3 className="text-2xl font-semibold mb-4">Overview</h3>
            <p className="mb-6">
              PYD Agency is currently ranking for 45 organic keywords with a combined monthly search volume of 3,760 searches. 
              The domain has successfully established visibility across talent-focused search queries, generating 47 monthly organic visits from search engines.
            </p>
          </div>

          {/* Key Strengths */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Key Strengths</h3>
            <div className="grid grid-cols-2 gap-6 text-base leading-relaxed">
              <div className="space-y-3">
                <p><span className="text-green-600 font-semibold">✅ 100% New Keyword Growth:</span> All 42 tracked keywords are newly ranking positions, indicating strong momentum in organic visibility</p>
                <p><span className="text-green-600 font-semibold">✅ Dominant Top Positions:</span> 3 keywords rank in positions 1-3, capturing high-value search traffic</p>
              </div>
              <div className="space-y-3">
                <p><span className="text-green-600 font-semibold">✅ Low Competition Targeting:</span> 82% of keywords (37/45) have low difficulty scores (KD &lt; 30), positioning the site well for continued growth</p>
                <p><span className="text-green-600 font-semibold">✅ SERP Feature Visibility:</span> Keywords trigger rich results including Sitelinks (35), Video previews (33), and People Also Ask boxes (24)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Keywords Table */}
        <div className="table-section mb-12">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Keyword Performance Overview</h3>
            <p className="text-base text-opacity-70">
              Interactive table with sorting and filtering capabilities. Click column headers to sort, 
              use the search box to filter keywords, and toggle column visibility as needed.
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
              <OrganicKeywordsTable className="bg-white shadow-lg rounded-lg p-6" />
            ) : (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <TableSkeleton rows={8} columns={7} />
              </div>
            )}
          </div>
        </div>

        {/* Traffic Distribution & Analysis */}
        <div className="insights-grid grid grid-cols-3 gap-8 mb-12">
          {/* Traffic Distribution */}
          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Traffic Distribution</h3>
            <div className="text-sm space-y-2">
              <p><strong>Position 1-3:</strong> 3 keywords (39 visits/month)</p>
              <p><strong>Position 4-10:</strong> 8 keywords (8 visits/month)</p>
              <p><strong>Position 11-20:</strong> 1 keyword</p>
              <p><strong>Position 21-50:</strong> 9 keywords</p>
              <p><strong>Beyond 50:</strong> 24 keywords</p>
            </div>
          </div>

          {/* Top Traffic Drivers */}
          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Top Traffic Drivers</h3>
            <div className="text-sm space-y-2">
              <p>"eli crane height" - Position #1, 29 visits/month</p>
              <p>"brent assayag" - Position #3, 6 visits/month</p>
              <p>"ryan chun" - Position #8, 6 visits/month</p>
              <p>"nate niehaus" - Position #2, 4 visits/month</p>
              <p>"alex prange" - Position #4, 1 visit/month</p>
            </div>
          </div>

          {/* Search Intent Alignment */}
          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Search Intent Alignment</h3>
            <p className="text-sm mb-3">
              The keyword portfolio is heavily weighted toward informational searches (100%), which aligns with users seeking talent information.
            </p>
            <p className="text-sm"><strong>Opportunities:</strong> Develop commercial-intent content for talent booking/representation</p>
          </div>
        </div>

        {/* Opportunities & Recommendations */}
        <div className="insights-grid grid grid-cols-2 gap-8">
          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Quick Wins</h3>
            <div className="text-base space-y-3">
              <p><strong>11 keywords in positions 4-10:</strong> Minor optimizations could push these into top 3 positions, potentially doubling organic traffic</p>
              <p><strong>Low-hanging fruit:</strong> Target the 9 keywords in positions 21-50 with focused content updates</p>
            </div>
          </div>

          <div className={`insight-card p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-xl font-semibold mb-3">Growth Potential</h3>
            <p className="text-base leading-relaxed">
              With 3,760 monthly searches across tracked keywords but only 47 current visits, there's significant untapped potential. 
              Improving average position from 3.8 to top 3 could increase organic traffic by <strong>200-300%</strong>.
            </p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="slide-footer mt-16 pt-8 border-t border-opacity-20">
          <div className="flex justify-between items-center text-sm opacity-70">
            <div>
              <strong>Data Source:</strong> Ahrefs via Google Sheets integration
            </div>
            <div>
              <strong>Metrics:</strong> Position, Volume, KD, CPC, Traffic Potential
            </div>
            <div>
              <strong>Update Frequency:</strong> Real-time data refresh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}