'use client'

interface OpportunitiesSlideProps {
  isDarkMode?: boolean;
}

export default function OpportunitiesSlide({ isDarkMode = false }: OpportunitiesSlideProps) {
  return (
    <div className="slide-container p-16 pt-32">
      <div className="slide-content max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="slide-header mb-12">
          <h1 className="slide-title text-5xl font-bold mb-6">
            Opportunities
          </h1>
          <h2 className="text-2xl text-opacity-70 mb-8">
            Strategic Keyword Targeting for Commercial Growth
          </h2>
        </div>

        {/* Primary Keywords to Target */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-8">Primary Keywords to Target</h2>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Core Business Keywords */}
            <div className={`p-6 rounded-lg ${
              isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">Core Business Keywords (Priority 1)</h3>
              <div className="space-y-2 text-base">
                <p>1. "male modeling agency" - Core service identifier</p>
                <p>2. "men's fashion models" - Gender-specific, industry-focused</p>
                <p>3. "male model management" - Professional service term</p>
                <p>4. "luxury male models" - High-end positioning</p>
                <p>5. "male model agency Los Angeles" - Local + service</p>
              </div>
            </div>

            {/* Commercial Intent Keywords */}
            <div className={`p-6 rounded-lg ${
              isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">Commercial Intent Keywords (Priority 2)</h3>
              <div className="space-y-2 text-base">
                <p>1. "book male models" - Transactional intent</p>
                <p>2. "hire male fashion models" - Client-focused search</p>
                <p>3. "men's runway models" - Specific modeling type</p>
                <p>4. "editorial male models" - Publishing/magazine focused</p>
                <p>5. "commercial male models" - Advertising focused</p>
              </div>
            </div>
          </div>
        </div>

        {/* Long-Tail Keywords/Phrases */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-8">Long-Tail Keywords/Phrases</h2>
          
          <div className="grid grid-cols-2 gap-8">
            {/* High-End Positioning Long-Tails */}
            <div className={`p-6 rounded-lg ${
              isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">High-End Positioning Long-Tails</h3>
              <div className="space-y-2 text-base">
                <p>1. "luxury brand male model agency Los Angeles"</p>
                <p>2. "high fashion male models for campaigns"</p>
                <p>3. "professional male models for designer brands"</p>
                <p>4. "elite male modeling agency California"</p>
                <p>5. "book male models for fashion week"</p>
              </div>
            </div>

            {/* Service-Specific Long-Tails */}
            <div className={`p-6 rounded-lg ${
              isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">Service-Specific Long-Tails</h3>
              <div className="space-y-2 text-base">
                <p>1. "male fitness models for athletic brands"</p>
                <p>2. "men's fashion show casting agency"</p>
                <p>3. "male catalog models for e-commerce"</p>
                <p>4. "diverse male models for inclusive campaigns"</p>
                <p>5. "new male model development agency"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick SEO Wins */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Quick SEO Wins</h2>
          <div className={`p-8 rounded-lg ${
            isDarkMode ? 'bg-blue-900/20 border border-blue-400/30' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className="text-lg mb-4">
              Given the 45 existing keywords showing mostly informational intent around individual names, 
              update those talent/model pages to include:
            </p>
            <div className="grid grid-cols-2 gap-4 text-base">
              <div className="space-y-1">
                <p>• "Male model"</p>
                <p>• "Fashion model"</p>
              </div>
              <div className="space-y-1">
                <p>• "Represented by PYD Agency"</p>
                <p>• "Available for fashion campaigns"</p>
              </div>
            </div>
            <p className="text-base mt-4">• "Book for runway/editorial"</p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="slide-footer mt-16 pt-8 border-t border-opacity-20">
          <div className="flex justify-between items-center text-sm opacity-70">
            <div>
              <strong>Strategy Focus:</strong> Commercial Intent Optimization
            </div>
            <div>
              <strong>Implementation:</strong> Priority-based keyword targeting
            </div>
            <div>
              <strong>Timeline:</strong> Quick wins within 30 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}