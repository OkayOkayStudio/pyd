import { NextResponse } from 'next/server';
import { getGoogleSheetsData } from '@/lib/googleSheets';

export async function GET() {
  try {
    console.log('🔧 Fetching details data from Google Sheets...');
    
    // Fetch data from the Details sheet
    const sheetData = await getGoogleSheetsData('Details!A:Z');
    
    if (!sheetData.values || sheetData.values.length === 0) {
      console.error('❌ No data found in Details sheet');
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    console.log(`🔧 Raw data rows: ${sheetData.values.length}`);
    
    // Assume first row is headers
    const headers = sheetData.values[0];
    console.log('🔧 Headers found:', headers);
    
    const dataRows = sheetData.values.slice(1);
    console.log(`🔧 Data rows: ${dataRows.length}`);

    // Transform the data into objects based on headers
    const details = dataRows
      .filter(row => row.length > 0 && row[0]) // Filter out empty rows
      .map((row, index) => {
        try {
          // Create dynamic object based on headers
          const detail: any = {};
          headers.forEach((header, columnIndex) => {
            if (header && header.trim()) {
              // Clean header name to make it a valid object key
              const cleanHeader = header.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
              detail[cleanHeader] = row[columnIndex] || '';
            }
          });
          
          // Add index for unique identification
          detail._index = index;
          
          return detail;
        } catch (error) {
          console.error(`🔧 Error processing row ${index}:`, error, 'Row data:', row);
          return null;
        }
      })
      .filter(Boolean);

    console.log(`🔧 Successfully processed ${details.length} detail records`);
    console.log('🔧 Sample detail record:', details[0]);

    const response = {
      success: true,
      data: details,
      count: details.length,
      headers: headers,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Error in details API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch details data',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}