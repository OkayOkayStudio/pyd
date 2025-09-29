import { OrganicSearchData, ChartDataPoint } from '@/types/organicSearch';

export class CSVParser {
  static parseValue(value: string): number {
    if (!value || value === '-' || value === 'N/A') return 0;
    
    // Remove $ sign and commas
    const cleanValue = value.replace(/[$,]/g, '');
    const num = parseFloat(cleanValue);
    
    return isNaN(num) ? 0 : num;
  }

  static parseDate(dateString: string): Date {
    // Handle various date formats: "Jun 30, 2024", "2024-06-30", etc.
    const cleanDateString = dateString.trim().replace(/"/g, '');
    
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

  static parseCSVRow(row: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  static async parseCSVFile(csvContent: string): Promise<OrganicSearchData[]> {
    const lines = csvContent.split('\n').filter(line => line.trim());
    
    if (lines.length < 2) {
      throw new Error('Invalid CSV format: insufficient data');
    }

    const headers = this.parseCSVRow(lines[0]);
    const dataRows = lines.slice(1);

    const parsedData: OrganicSearchData[] = [];

    for (const row of dataRows) {
      if (!row.trim()) continue;
      
      const values = this.parseCSVRow(row);
      const rowData: any = {};

      headers.forEach((header, index) => {
        rowData[header] = values[index] || '';
      });

      try {
        const organicData: OrganicSearchData = {
          date: this.parseDate(rowData['Date'] || rowData['date']),
          traffic: this.parseValue(rowData['Avg organic traffic']),
          trafficValue: this.parseValue(rowData['Avg traffic value']),
          impressions: this.parseValue(rowData['Avg impressions']),
          positions: {
            top3: this.parseValue(rowData['1-3']),
            top10: this.parseValue(rowData['4-10']),
            top20: this.parseValue(rowData['11-20']),
            top50: this.parseValue(rowData['21-50']),
            beyond50: this.parseValue(rowData['51+']),
          },
          pages: this.parseValue(rowData['Organic pages']),
          serpFeatures: {
            featuredSnippet: this.parseValue(rowData['Featured snippet']),
            localPack: this.parseValue(rowData['Local pack']),
            imageCarousel: this.parseValue(rowData['Image carousel']),
            sitelinks: this.parseValue(rowData['Sitelinks']),
            knowledgePanel: this.parseValue(rowData['Knowledge panel']),
            videoCarousel: this.parseValue(rowData['Video carousel']),
            topStories: this.parseValue(rowData['Top stories']),
            relatedQuestions: this.parseValue(rowData['Related questions']),
          },
          brandVsNonBrand: {
            brandTraffic: this.parseValue(rowData['Brand traffic']),
            nonBrandTraffic: this.parseValue(rowData['Non-brand traffic']),
          },
          searchIntent: {
            informational: this.parseValue(rowData['Informational']),
            navigational: this.parseValue(rowData['Navigational']),
            commercial: this.parseValue(rowData['Commercial']),
            transactional: this.parseValue(rowData['Transactional']),
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

  static async loadFromPublicFolder(filename: string): Promise<OrganicSearchData[]> {
    try {
      const response = await fetch(`/data/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to load CSV file: ${response.statusText}`);
      }
      const csvContent = await response.text();
      return this.parseCSVFile(csvContent);
    } catch (error) {
      console.error('Error loading CSV file:', error);
      throw error;
    }
  }
}

// Sample data generator for development/fallback
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
        top3: Math.round(8 + Math.random() * 4),
        top10: Math.round(15 + Math.random() * 8),
        top20: Math.round(25 + Math.random() * 10),
        top50: Math.round(35 + Math.random() * 15),
        beyond50: Math.round(45 + Math.random() * 20),
      },
      pages: Math.round(12 + i * 0.3),
      serpFeatures: {
        featuredSnippet: Math.round(Math.random() * 3),
        localPack: Math.round(Math.random() * 2),
        imageCarousel: Math.round(Math.random() * 4),
        sitelinks: Math.round(Math.random() * 5),
        knowledgePanel: Math.round(Math.random() * 1),
        videoCarousel: Math.round(Math.random() * 2),
        topStories: Math.round(Math.random() * 1),
        relatedQuestions: Math.round(Math.random() * 6),
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