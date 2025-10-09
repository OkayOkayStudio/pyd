import { google } from 'googleapis';
import path from 'path';

const SPREADSHEET_ID = '1fKCVSP-CkP7I0nXg7w6LiiQ-AbsLQ5_JgaNx0xpskqU';
const SERVICE_ACCOUNT_KEY_PATH = path.join(process.cwd(), 'service-account-key.json');

export interface SheetData {
  values: string[][];
  range: string;
}

export async function getGoogleSheetsData(range: string = 'A:Z'): Promise<SheetData> {
  try {
    // Load service account credentials from environment variables or file
    let auth;
    
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      // Use environment variables for production (Vercel)
      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
    } else {
      // Fallback to file for local development
      auth = new google.auth.GoogleAuth({
        keyFile: SERVICE_ACCOUNT_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
    }

    // Create sheets API client
    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch data from the spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
    });

    const values = response.data.values || [];
    
    return {
      values,
      range: range,
    };
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    console.error('Spreadsheet ID:', SPREADSHEET_ID);
    console.error('Range requested:', range);
    console.error('Service account key path:', SERVICE_ACCOUNT_KEY_PATH);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw new Error(`Failed to fetch spreadsheet data: ${error.message}`);
    }
    throw new Error('Failed to fetch spreadsheet data: Unknown error');
  }
}

export async function getAllSheets(): Promise<{ [key: string]: SheetData }> {
  try {
    // Load service account credentials from environment variables or file
    let auth;
    
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      // Use environment variables for production (Vercel)
      auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
    } else {
      // Fallback to file for local development
      auth = new google.auth.GoogleAuth({
        keyFile: SERVICE_ACCOUNT_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
      });
    }

    const sheets = google.sheets({ version: 'v4', auth });

    // Get spreadsheet metadata to find all sheets
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetNames = spreadsheet.data.sheets?.map(sheet => sheet.properties?.title) || [];
    const allSheetsData: { [key: string]: SheetData } = {};

    // Fetch data from each sheet
    for (const sheetName of sheetNames) {
      if (sheetName) {
        try {
          const sheetData = await getGoogleSheetsData(`${sheetName}!A:Z`);
          allSheetsData[sheetName] = sheetData;
        } catch (error) {
          console.error(`Error fetching data from sheet ${sheetName}:`, error);
        }
      }
    }

    return allSheetsData;
  } catch (error) {
    console.error('Error fetching all sheets data:', error);
    console.error('Spreadsheet ID:', SPREADSHEET_ID);
    console.error('Service account key path:', SERVICE_ACCOUNT_KEY_PATH);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw new Error(`Failed to fetch all sheets data: ${error.message}`);
    }
    throw new Error('Failed to fetch all sheets data: Unknown error');
  }
}

// Helper function to convert sheet data to CSV format
export function convertToCSV(sheetData: SheetData): string {
  return sheetData.values
    .map(row => row.map(cell => `"${cell?.toString().replace(/"/g, '""') || ''}"`).join(','))
    .join('\n');
}

// Helper function to get specific columns from sheet data
export function getColumns(sheetData: SheetData, columnIndices: number[]): string[][] {
  return sheetData.values.map(row => 
    columnIndices.map(index => row[index] || '')
  );
}