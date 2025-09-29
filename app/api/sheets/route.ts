import { NextResponse } from 'next/server';
import { getGoogleSheetsData, getAllSheets, convertToCSV } from '@/lib/googleSheets';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range');
    const format = searchParams.get('format') || 'json'; // json or csv
    const sheet = searchParams.get('sheet');

    let data;

    if (sheet) {
      // Get specific sheet data
      data = await getGoogleSheetsData(`${sheet}!A:Z`);
    } else if (range) {
      // Get specific range data
      data = await getGoogleSheetsData(range);
    } else {
      // Get all sheets data
      data = await getAllSheets();
    }

    if (format === 'csv' && 'values' in data) {
      // Return CSV format
      const csvContent = convertToCSV(data);
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="spreadsheet-data.csv"'
        }
      });
    }

    // Return JSON format
    return NextResponse.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error Details:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    let errorMessage = 'Unknown error';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch spreadsheet data',
        message: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}