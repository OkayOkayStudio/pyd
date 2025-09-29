import { OrganicSearchData, ChartDataPoint } from '@/types/organicSearch';

export class CSVReaderParser {
  static parseValue(value: string | number): number {
    if (typeof value === 'number') return value;
    if (!value || value === '-' || value === 'N/A') return 0;
    
    // Remove $ sign and commas
    const cleanValue = String(value).replace(/[$,]/g, '');
    const num = parseFloat(cleanValue);
    
    return isNaN(num) ? 0 : num;
  }

  static parseDate(dateString: string | Date): Date {
    if (dateString instanceof Date) return dateString;
    
    // Handle various date formats: "Jun 30, 2024", "2024-06-30", etc.
    const cleanDateString = String(dateString).trim();
    
    // Try different date parsing approaches
    let date = new Date(cleanDateString);
    
    if (isNaN(date.getTime())) {
      // Try parsing with different format assumptions
      const parts = cleanDateString.split(/[\s,]+/);
      if (parts.length >= 3) {
        // Format: "Jun 30, 2024"
        date = new Date(`${parts[0]} ${parts[1]} ${parts[2]}`);
      }
    }
    
    return isNaN(date.getTime()) ? new Date() : date;
  }

  static parseCSVData(csvData: any[]): OrganicSearchData[] {
    if (!csvData || csvData.length === 0) {
      throw new Error('No CSV data provided');
    }

    const parsedData: OrganicSearchData[] = [];

    // Skip header row, process data rows
    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      if (!row || Object.keys(row).length === 0) continue;

      try {
        // Handle both object format (with headers) and array format
        const getValue = (key: string, index?: number) => {
          if (Array.isArray(row)) {
            return index !== undefined ? row[index] : '';
          }
          return row[key] || row[key.toLowerCase()] || '';
        };

        const organicData: OrganicSearchData = {
          date: this.parseDate(getValue('Date', 0) || getValue('date', 0)),
          traffic: this.parseValue(getValue('Avg organic traffic', 1) || getValue('avg organic traffic', 1)),
          trafficValue: this.parseValue(getValue('Avg traffic value', 2) || getValue('avg traffic value', 2)),
          impressions: this.parseValue(getValue('Avg impressions', 3) || getValue('avg impressions', 3)),
          positions: {
            top3: this.parseValue(getValue('1-3', 4)),
            top10: this.parseValue(getValue('4-10', 5)),
            top20: this.parseValue(getValue('11-20', 6)),
            top50: this.parseValue(getValue('21-50', 7)),
            beyond50: this.parseValue(getValue('51+', 8)),
          },
          pages: this.parseValue(getValue('Organic pages', 9) || getValue('organic pages', 9)),
          serpFeatures: {
            featuredSnippet: this.parseValue(getValue('Featured snippet', 10) || getValue('featured snippet', 10)),
            localPack: this.parseValue(getValue('Local pack', 11) || getValue('local pack', 11)),
            imageCarousel: this.parseValue(getValue('Image carousel', 12) || getValue('image carousel', 12)),
            sitelinks: this.parseValue(getValue('Sitelinks', 13) || getValue('sitelinks', 13)),
            knowledgePanel: this.parseValue(getValue('Knowledge panel', 14) || getValue('knowledge panel', 14)),
            videoCarousel: this.parseValue(getValue('Video carousel', 15) || getValue('video carousel', 15)),
            topStories: this.parseValue(getValue('Top stories', 16) || getValue('top stories', 16)),
            relatedQuestions: this.parseValue(getValue('Related questions', 17) || getValue('related questions', 17)),
          },
          brandVsNonBrand: {
            brandTraffic: this.parseValue(getValue('Brand traffic', 18) || getValue('brand traffic', 18)),
            nonBrandTraffic: this.parseValue(getValue('Non-brand traffic', 19) || getValue('non-brand traffic', 19)),
          },
          searchIntent: {
            informational: this.parseValue(getValue('Informational', 20) || getValue('informational', 20)),
            navigational: this.parseValue(getValue('Navigational', 21) || getValue('navigational', 21)),
            commercial: this.parseValue(getValue('Commercial', 22) || getValue('commercial', 22)),
            transactional: this.parseValue(getValue('Transactional', 23) || getValue('transactional', 23)),
          },
        };

        parsedData.push(organicData);
      } catch (error) {
        console.warn('Error parsing row:', row, error);
      }
    }

    return parsedData.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  static transformToChartData(data: OrganicSearchData[]): ChartDataPoint[] {
    return data.map(item => ({
      date: item.date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      traffic: item.traffic,
      trafficValue: item.trafficValue,
      impressions: item.impressions,
      top3: item.positions.top3,
      top10: item.positions.top10,
      top20: item.positions.top20,
      top50: item.positions.top50,
      beyond50: item.positions.beyond50,
      pages: item.pages,
    }));
  }
}

// Sample data generator remains the same for fallback
export const generateSampleData = (): OrganicSearchData[] => {
  const sampleData: OrganicSearchData[] = [];
  const startDate = new Date('2024-06-30');
  
  for (let i = 0; i < 15; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (i * 7)); // Weekly intervals
    
    const baseTraffic = 150 + Math.sin(i * 0.5) * 30;
    const trend = i * 2; // Slight upward trend
    
    sampleData.push({
      date,
      traffic: Math.round(baseTraffic + trend + (i * 2)), // Make it predictable for debugging
      trafficValue: Math.round((baseTraffic + trend) * 3.2),
      impressions: Math.round((baseTraffic + trend) * 15),
      positions: {
        top3: Math.round(8 + (i * 0.5)),
        top10: Math.round(15 + (i * 0.8)),
        top20: Math.round(25 + (i * 1.2)),
        top50: Math.round(35 + (i * 1.5)),
        beyond50: Math.round(45 + (i * 2)),
      },
      pages: Math.round(12 + i * 0.3),
      serpFeatures: {
        featuredSnippet: Math.round(i * 0.2),
        localPack: Math.round(i * 0.1),
        imageCarousel: Math.round(i * 0.3),
        sitelinks: Math.round(i * 0.4),
        knowledgePanel: Math.round(i * 0.1),
        videoCarousel: Math.round(i * 0.2),
        topStories: Math.round(i * 0.1),
        relatedQuestions: Math.round(i * 0.5),
      },
      brandVsNonBrand: {
        brandTraffic: Math.round(baseTraffic * 0.3),
        nonBrandTraffic: Math.round(baseTraffic * 0.7),
      },
      searchIntent: {
        informational: Math.round(baseTraffic * 0.4),
        navigational: Math.round(baseTraffic * 0.2),
        commercial: Math.round(baseTraffic * 0.3),
        transactional: Math.round(baseTraffic * 0.1),
      },
    });
  }
  
  return sampleData;
};