'use client'

import React, { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { KeywordData, ComparisonMetrics } from '@/lib/types'

// Fallback data - this will be replaced by actual slide data when available
const fallbackKeywordData: KeywordData[] = [
  {
    keyword: 'model agency la',
    position: 19,
    volume: 40,
    difficulty: 21,
    difficultyLevel: 'Low-Medium',
    opportunity: 'Move to top 10 = 5-10x traffic',
    action: 'Optimize homepage title and create dedicated LA page',
    potentialTraffic: 20
  },
  {
    keyword: 'model agency los angeles',
    position: 29,
    positionChange: 6,
    volume: 100,
    difficulty: 36,
    difficultyLevel: 'Medium',
    opportunity: 'Momentum building - push to top 10',
    action: 'Build more local backlinks, enhance content',
    potentialTraffic: 40
  },
  {
    keyword: 'los angeles model agencies',
    position: 31,
    volume: 70,
    difficulty: 35,
    difficultyLevel: 'Medium',
    opportunity: 'Small push gets to page 2',
    action: 'Internal linking from talent pages',
    potentialTraffic: 25
  },
  {
    keyword: 'model agencies los angeles',
    position: 41,
    volume: 250,
    difficulty: 36,
    difficultyLevel: 'Medium',
    opportunity: 'Highest traffic potential keyword',
    action: 'Create comprehensive agency comparison content',
    potentialTraffic: 75
  },
  {
    keyword: 'modeling agencies la',
    position: 46,
    positionChange: 9,
    volume: 100,
    difficulty: 30,
    difficultyLevel: 'Medium',
    opportunity: 'Strong momentum - improved 9 positions',
    action: 'Add more modeling-specific content',
    potentialTraffic: 30
  },
  {
    keyword: 'pyd',
    position: 50,
    volume: 900,
    difficulty: 8,
    difficultyLevel: 'Easy',
    opportunity: 'Own your brand name - huge volume',
    action: 'Build brand authority signals and backlinks',
    potentialTraffic: 450
  },
  {
    keyword: 'agency los angeles',
    position: 52,
    volume: 150,
    difficulty: 26,
    difficultyLevel: 'Low-Medium',
    cpc: 194,
    opportunity: 'High commercial intent ($1.94 CPC)',
    action: 'Create service-specific landing pages',
    potentialTraffic: 45
  },
  {
    keyword: 'los angeles agency',
    position: 52,
    positionChange: 12,
    volume: 70,
    difficulty: 26,
    difficultyLevel: 'Low-Medium',
    opportunity: 'Improved 12 positions - maintain momentum',
    action: 'Continue current optimization strategy',
    potentialTraffic: 20
  },
  {
    keyword: 'ryan chun',
    position: 8,
    volume: 150,
    difficulty: 0,
    difficultyLevel: 'Easy',
    opportunity: 'Push to top 5 for immediate traffic',
    action: 'Enhance talent profile with more content',
    potentialTraffic: 30
  },
  {
    keyword: 'talent agencies in los angeles',
    position: 95,
    volume: 100,
    difficulty: 27,
    difficultyLevel: 'Low-Medium',
    opportunity: 'Different angle for agency searches',
    action: 'Create talent agency specific content',
    potentialTraffic: 30
  }
]

const fallbackComparisonMetrics: ComparisonMetrics = {
  totalKeywordsTracked: 32,
  keywordsImproved: 5,
  keywordsDeclined: 1,
  newKeywords: 8,
  averagePositionChange: 7.2,
  topPositionGain: {
    keyword: 'eli crane height',
    change: 23,
    currentPosition: 1
  }
}

const fallbackMissingOpportunities: string[] = [
  'fashion model agency',
  'commercial model agency',
  'male model agency',
  'female model agency',
  'hire models los angeles',
  'book models la'
]

type SortField = 'keyword' | 'position' | 'volume' | 'difficulty' | 'potentialTraffic'
type SortDirection = 'asc' | 'desc'

interface KeywordOpportunitiesTableProps {
  slideData?: any;
}

export default function KeywordOpportunitiesTable({ slideData }: KeywordOpportunitiesTableProps) {
  const [sortField, setSortField] = useState<SortField>('position')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')

  // Use data from slide or fallback to sample data
  const keywordData: KeywordData[] = slideData?.markdown?.keywordData || fallbackKeywordData
  const comparisonMetrics: ComparisonMetrics = slideData?.markdown?.comparisonMetrics || fallbackComparisonMetrics
  const missingOpportunities: string[] = slideData?.markdown?.missingOpportunities || fallbackMissingOpportunities

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 20) return 'bg-green-100 text-green-800 border-green-200'
    if (difficulty <= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const getPositionRowColor = (position: number) => {
    if (position <= 10) return 'bg-green-50'
    if (position <= 30) return 'bg-yellow-50' // Quick wins
    return 'bg-white'
  }

  const sortedAndFilteredData = useMemo(() => {
    let filtered = keywordData
    
    if (difficultyFilter !== 'all') {
      filtered = keywordData.filter(item => {
        if (difficultyFilter === 'easy') return item.difficulty <= 20
        if (difficultyFilter === 'medium') return item.difficulty > 20 && item.difficulty <= 40
        if (difficultyFilter === 'hard') return item.difficulty > 40
        return true
      })
    }

    return filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })
  }, [sortField, sortDirection, difficultyFilter])

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const totalOpportunity = keywordData.reduce((sum, item) => sum + item.potentialTraffic, 0)

  const exportToCSV = () => {
    const headers = ['Keyword', 'Position', 'Change', 'Volume', 'Difficulty', 'Opportunity', 'Action', 'Potential Traffic']
    const csvContent = [
      headers.join(','),
      ...keywordData.map(row => [
        `"${row.keyword}"`,
        row.position,
        row.positionChange || 0,
        row.volume,
        row.difficulty,
        `"${row.opportunity}"`,
        `"${row.action}"`,
        row.potentialTraffic
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'keyword-opportunities.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{comparisonMetrics.totalKeywordsTracked}</div>
          <div className="text-sm text-blue-600">Keywords Tracked</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{comparisonMetrics.keywordsImproved}</div>
          <div className="text-sm text-green-600">Improved Positions</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">+{totalOpportunity}</div>
          <div className="text-sm text-purple-600">Monthly Traffic Opportunity</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">+{comparisonMetrics.topPositionGain.change}</div>
          <div className="text-sm text-yellow-600">Top Position Gain</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <label className="text-sm font-medium mr-2">Filter by difficulty:</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Levels</option>
              <option value="easy">Easy (0-20)</option>
              <option value="medium">Medium (21-40)</option>
              <option value="hard">Hard (40+)</option>
            </select>
          </div>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('keyword')}
                >
                  <div className="flex items-center gap-2">
                    Keyword
                    {sortField === 'keyword' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('position')}
                >
                  <div className="flex items-center gap-2">
                    Position
                    {sortField === 'position' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Change</th>
                <th
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('volume')}
                >
                  <div className="flex items-center gap-2">
                    Volume
                    {sortField === 'volume' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('difficulty')}
                >
                  <div className="flex items-center gap-2">
                    Difficulty
                    {sortField === 'difficulty' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Opportunity</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                <th
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('potentialTraffic')}
                >
                  <div className="flex items-center gap-2">
                    Traffic
                    {sortField === 'potentialTraffic' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedAndFilteredData.map((row, index) => (
                <tr
                  key={index}
                  className={`${getPositionRowColor(row.position)} hover:bg-gray-50 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-sm text-gray-900">{row.keyword}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">#{row.position}</span>
                      {row.position <= 30 && row.position > 10 && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Quick Win
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {row.positionChange ? (
                      <div className={`flex items-center gap-1 text-sm font-medium ${
                        row.positionChange > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {row.positionChange > 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        {Math.abs(row.positionChange)}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Minus size={16} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm">{row.volume.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(row.difficulty)}`}>
                      {row.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div
                      className="text-sm text-gray-600 truncate"
                      title={row.opportunity}
                    >
                      {row.opportunity}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div
                      className="text-sm text-gray-600 truncate"
                      title={row.action}
                    >
                      {row.action}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{row.potentialTraffic}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((row.potentialTraffic / Math.max(...keywordData.map(k => k.potentialTraffic))) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Missing Opportunities */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Missing Opportunities</h4>
        <div className="flex flex-wrap gap-2">
          {missingOpportunities.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-600 border border-gray-200 rounded-full"
            >
              {keyword}
              <span className="ml-2 text-xs text-gray-400">not ranking</span>
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          These are high-value keywords where you currently have no presence. Consider creating targeted content.
        </p>
      </div>
    </div>
  )
}