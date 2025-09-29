'use client'

interface RecommendationsSlideProps {
  isDarkMode?: boolean;
}

export default function RecommendationsSlide({ isDarkMode = false }: RecommendationsSlideProps) {
  return (
    <div className="slide-container p-16 pt-32">
      <div className="slide-content max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="slide-header mb-12">
          <h1 className="slide-title text-5xl font-bold mb-6">
            Recommendations
          </h1>
          <h2 className="text-2xl text-opacity-70 mb-8">
            Strategic Implementation Plan for Commercial Growth
          </h2>
        </div>

        {/* Model Profile Pages */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Model Profile Pages - Optimize for:</h2>
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <div className="grid grid-cols-2 gap-6 text-base">
              <div className="space-y-2">
                <p>• "[Model Name] male model portfolio"</p>
                <p>• "[Model Name] fashion campaigns"</p>
                <p>• "[Model Name] runway experience"</p>
              </div>
              <div className="space-y-2">
                <p>• "[Model Name] editorial shoots"</p>
                <p>• "Book [Model Name] for fashion shows"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Pages to Create */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Service Pages to Create</h2>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Model Booking Services */}
            <div className={`p-6 rounded-lg ${
              isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">1. Model Booking Services</h3>
              <div className="space-y-2 text-base">
                <p>• "Book male models for runway shows"</p>
                <p>• "Male models for editorial shoots"</p>
                <p>• "Commercial modeling services"</p>
                <p>• "Fashion campaign casting"</p>
              </div>
            </div>

            {/* Model Development */}
            <div className={`p-6 rounded-lg ${
              isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">2. Model Development</h3>
              <div className="space-y-2 text-base">
                <p>• "Male model career development"</p>
                <p>• "New face model management"</p>
                <p>• "Model portfolio development"</p>
                <p>• "Fashion industry mentorship"</p>
              </div>
            </div>

            {/* Industry-Specific Pages */}
            <div className={`p-6 rounded-lg ${
              isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="text-xl font-semibold mb-4">3. Industry-Specific Pages</h3>
              <div className="space-y-2 text-base">
                <p>• "Fashion week model booking"</p>
                <p>• "Editorial photography models"</p>
                <p>• "E-commerce model services"</p>
                <p>• "Luxury brand ambassadors"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Prestige Keywords */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Location & Prestige Keywords</h2>
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <div className="grid grid-cols-2 gap-6 text-base">
              <div className="space-y-2">
                <p>• "Beverly Hills male modeling agency"</p>
                <p>• "West Hollywood model management"</p>
                <p>• "California men's fashion models"</p>
              </div>
              <div className="space-y-2">
                <p>• "International male model agency"</p>
                <p>• "Wilhelmina alternative Los Angeles" (comparison positioning)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content & Brand Integration */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Blog Content Topics */}
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-2xl font-semibold mb-4">Blog Content Topics</h3>
            <div className="space-y-2 text-base">
              <p>1. "How to become a professional male model in 2025"</p>
              <p>2. "What to expect from a high-end modeling agency"</p>
              <p>3. "Male modeling requirements and standards"</p>
              <p>4. "Fashion week preparation for male models"</p>
              <p>5. "The rise of diversity in men's fashion"</p>
            </div>
          </div>

          {/* "Pursue Your Dreams" Brand Integration */}
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-2xl font-semibold mb-4">"Pursue Your Dreams" Brand Integration</h3>
            <div className="space-y-2 text-base">
              <p>• "Pursue your dreams modeling"</p>
              <p>• "PYD Agency male models"</p>
              <p>• "PYD model development program"</p>
              <p>• "Christian Rios modeling agency"</p>
            </div>
          </div>
        </div>

        {/* Competitor Comparison & Schema */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Competitor Comparison Keywords */}
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-2xl font-semibold mb-4">Competitor Comparison Keywords</h3>
            <div className="space-y-2 text-base">
              <p>• "PYD Agency vs Wilhelmina models"</p>
              <p>• "Best male modeling agencies Los Angeles"</p>
              <p>• "Top men's fashion agencies California"</p>
              <p>• "Boutique vs major modeling agencies"</p>
            </div>
          </div>

          {/* Schema Updates */}
          <div className={`p-6 rounded-lg ${
            isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
          }`}>
            <h3 className="text-2xl font-semibold mb-4">Schema Updates</h3>
            <div className="space-y-2 text-base">
              <p>• Change Organization type to "Modeling Agency"</p>
              <p>• Add Person schema for each model</p>
              <p>• Include Model-specific properties (height, measurements, experience)</p>
              <p>• Add LocalBusiness schema with "Los Angeles" emphasis</p>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="slide-footer mt-16 pt-8 border-t border-opacity-20">
          <div className="flex justify-between items-center text-sm opacity-70">
            <div>
              <strong>Implementation Priority:</strong> Service pages first, then model optimization
            </div>
            <div>
              <strong>Timeline:</strong> 60-90 day rollout plan
            </div>
            <div>
              <strong>Success Metrics:</strong> Commercial keyword rankings and booking inquiries
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}