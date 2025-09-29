'use client'

import * as React from "react"
import { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DetailsTableProps {
  className?: string;
}

export default function DetailsTable({ className }: DetailsTableProps) {
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<ColumnDef<any>[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    console.log('🔧 DetailsTable: Fetching data...')
    
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/details')
        console.log('🔧 API Response status:', response.status)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('🔧 API Result:', result)
        
        if (result.success && result.data) {
          setData(result.data)
          setHeaders(result.headers || [])
          
          // Generate columns dynamically based on the first row of data
          if (result.data.length > 0 && result.headers) {
            const dynamicColumns: ColumnDef<any>[] = result.headers
              .filter((header: string) => header && header.trim()) // Filter out empty headers
              .map((header: string, index: number) => {
                const cleanHeader = header.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                
                return {
                  accessorKey: cleanHeader,
                  header: ({ column }) => {
                    return (
                      <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="h-auto p-0 font-semibold"
                      >
                        {header}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    )
                  },
                  cell: ({ row }) => {
                    const value = row.getValue(cleanHeader)
                    
                    // Handle different data types for better display
                    if (typeof value === 'number') {
                      return <div className="text-right font-medium">{value.toLocaleString()}</div>
                    }
                    
                    // Handle URLs
                    if (typeof value === 'string' && value.startsWith('http')) {
                      return (
                        <div className="max-w-[300px] truncate text-sm">
                          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {value}
                          </a>
                        </div>
                      )
                    }
                    
                    // Handle long text
                    if (typeof value === 'string' && value.length > 50) {
                      return (
                        <div className="max-w-[300px] truncate text-sm" title={value}>
                          {value}
                        </div>
                      )
                    }
                    
                    return <div className="font-medium">{(typeof value === 'string' || typeof value === 'number') ? value : '-'}</div>
                  },
                } as ColumnDef<any>
              })
            
            setColumns(dynamicColumns)
          }
          
          console.log(`🔧 Loaded ${result.data.length} detail records`)
        } else {
          throw new Error('Invalid data format from API')
        }
      } catch (err) {
        console.error('🔧 Error fetching details:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <div className="text-gray-500 mb-2">Loading details...</div>
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center text-red-600">
          <div className="mb-2">Error loading details</div>
          <div className="text-sm text-gray-500">{error}</div>
        </div>
      </div>
    )
  }

  const searchableColumns = columns.slice(0, 3) // Use first 3 columns for search
  const firstSearchableColumn = (searchableColumns[0] as any)?.accessorKey

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Input
          placeholder={`Filter ${headers[0] || 'data'}...`}
          value={(table.getColumn(firstSearchableColumn as string)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(firstSearchableColumn as string)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {data.length} records total
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const header = headers.find(h => 
                    h.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() === column.id
                  ) || column.id
                  
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {header}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}