import { NextResponse } from 'next/server';
import { getGoogleSheetsData } from '@/lib/googleSheets';

export interface OrganicKeyword {
  keyword: string;
  position: number;
  url: string;
  searchVolume: number;
  keywordDifficulty: number;
  cpc: number;
  trafficPotential: number;
  positionHistory?: number[];
}

export async function GET() {
  try {
    console.log('🔧 Fetching organic keywords data from Google Sheets...');
    
    // Fetch data from the organic-keywords sheet
    const sheetData = await getGoogleSheetsData('organic-keywords!A:Z');
    
    if (!sheetData.values || sheetData.values.length === 0) {
      console.error('❌ No data found in organic-keywords sheet');
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    console.log(`🔧 Raw data rows: ${sheetData.values.length}`);
    
    // Assume first row is headers
    const headers = sheetData.values[0];
    console.log('🔧 Headers found:', headers);
    
    const dataRows = sheetData.values.slice(1);
    console.log(`🔧 Data rows: ${dataRows.length}`);

    // Transform the data into keyword objects
    const keywords: OrganicKeyword[] = dataRows
      .filter(row => row.length > 0 && row[1]) // Filter out empty rows (check keyword column)
      .map((row, index) => {
        try {
          // Map the row data based on actual sheet structure
          // Based on headers: #, Keyword, Country, Location, Entities, SERP features, Volume, KD, CPC, etc.
          const keyword: OrganicKeyword = {
            keyword: row[1] || '', // Column B: Keyword
            position: parseFloat(row[13]) || 0, // Column N: Current position
            url: row[18] || '', // Column S: Current URL
            searchVolume: parseInt(row[6]) || 0, // Column G: Volume
            keywordDifficulty: parseFloat(row[7]) || 0, // Column H: KD
            cpc: parseFloat(row[8]) || 0, // Column I: CPC
            trafficPotential: parseInt(row[10]) || 0, // Column K: Current organic traffic
          };
          return keyword;
        } catch (error) {
          console.error(`🔧 Error processing row ${index}:`, error, 'Row data:', row);
          return null;
        }
      })
      .filter(Boolean) as OrganicKeyword[];

    console.log(`🔧 Successfully processed ${keywords.length} keywords`);
    console.log('🔧 Sample keyword:', keywords[0]);

    const response = {
      success: true,
      data: keywords,
      count: keywords.length,
      headers: headers,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Error in organic keywords API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch organic keywords data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}