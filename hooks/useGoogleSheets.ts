import { useState, useEffect } from 'react';

export interface SheetData {
  values: string[][];
  range: string;
}

export interface SheetsResponse {
  success: boolean;
  data: SheetData | { [key: string]: SheetData };
  timestamp: string;
  error?: string;
  message?: string;
}

export function useGoogleSheets(
  sheet?: string,
  range?: string,
  autoFetch: boolean = true
) {
  const [data, setData] = useState<SheetData | { [key: string]: SheetData } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (sheet) params.append('sheet', sheet);
      if (range) params.append('range', range);

      const response = await fetch(`/api/sheets?${params.toString()}`);
      const result: SheetsResponse = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [sheet, range, autoFetch]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// Hook for getting a specific sheet's data
export function useSheet(sheetName: string, autoFetch: boolean = true) {
  const result = useGoogleSheets(sheetName, undefined, autoFetch);
  
  return {
    ...result,
    data: result.data as SheetData | null,
  };
}

// Hook for getting all sheets data
export function useAllSheets(autoFetch: boolean = true) {
  const result = useGoogleSheets(undefined, undefined, autoFetch);
  
  return {
    ...result,
    data: result.data as { [key: string]: SheetData } | null,
  };
}