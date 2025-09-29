'use client'

import { useAllSheets } from '@/hooks/useGoogleSheets';
import { useState } from 'react';

export default function SheetsDataExample() {
  const { data, loading, error, refetch } = useAllSheets(false);
  const [selectedSheet, setSelectedSheet] = useState<string>('');

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700">Loading Google Sheets data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-700">Error: {error}</p>
        <button 
          onClick={refetch}
          className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 mb-2">Click to load Google Sheets data:</p>
        <button 
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Load Sheets Data
        </button>
      </div>
    );
  }

  const sheetNames = Object.keys(data);
  const selectedSheetData = selectedSheet && data[selectedSheet];

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Google Sheets Data</h3>
        <button 
          onClick={refetch}
          className="mr-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Data
        </button>
        <span className="text-sm text-gray-600">
          Found {sheetNames.length} sheet{sheetNames.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Sheet:
        </label>
        <select
          value={selectedSheet}
          onChange={(e) => setSelectedSheet(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 bg-white"
        >
          <option value="">-- Select a sheet --</option>
          {sheetNames.map(name => (
            <option key={name} value={name}>
              {name} ({data[name].values.length} rows)
            </option>
          ))}
        </select>
      </div>

      {selectedSheetData && (
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-medium mb-3">Sheet: {selectedSheet}</h4>
          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {selectedSheetData.values.slice(0, 20).map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex === 0 ? 'bg-gray-100 font-medium' : ''}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-200 px-2 py-1">
                        {cell || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedSheetData.values.length > 20 && (
            <p className="text-sm text-gray-600 mt-2">
              Showing first 20 rows of {selectedSheetData.values.length} total rows
            </p>
          )}
        </div>
      )}
    </div>
  );
}