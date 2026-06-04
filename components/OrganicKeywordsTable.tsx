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
import { TableSkeleton } from "@/components/ui/table-skeleton"

export interface OrganicKeyword {
  keyword: string;
  position: number;
  url: string;
  searchVolume: number;
  keywordDifficulty: number;
  cpc: number;
  trafficPotential: number;
}

interface OrganicKeywordsTableProps {
  className?: string;
}

export const columns: ColumnDef<OrganicKeyword>[] = [
  {
    accessorKey: "keyword",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Keyword
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("keyword")}</div>
    ),
  },
  {
    accessorKey: "position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const position = parseFloat(row.getValue("position"))
      return (
        <div className={`text-center font-medium ${
          position <= 3 ? 'text-green-600' : 
          position <= 10 ? 'text-yellow-600' : 
          'text-red-600'
        }`}>
          {position > 0 ? position : '-'}
        </div>
      )
    },
  },
  {
    accessorKey: "searchVolume",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Search Volume
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const volume = parseInt(row.getValue("searchVolume"))
      return (
        <div className="text-right font-medium">
          {volume > 0 ? volume.toLocaleString() : '-'}
        </div>
      )
    },
  },
  {
    accessorKey: "keywordDifficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          KD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const kd = parseFloat(row.getValue("keywordDifficulty"))
      return (
        <div className={`text-center font-medium ${
          kd <= 30 ? 'text-green-600' : 
          kd <= 60 ? 'text-yellow-600' : 
          'text-red-600'
        }`}>
          {kd > 0 ? kd : '-'}
        </div>
      )
    },
  },
  {
    accessorKey: "cpc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          CPC
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const cpc = parseFloat(row.getValue("cpc"))
      return (
        <div className="text-right font-medium">
          {cpc > 0 ? `$${cpc.toFixed(2)}` : '-'}
        </div>
      )
    },
  },
  {
    accessorKey: "trafficPotential",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold"
        >
          Traffic Potential
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const traffic = parseInt(row.getValue("trafficPotential"))
      return (
        <div className="text-right font-medium">
          {traffic > 0 ? traffic.toLocaleString() : '-'}
        </div>
      )
    },
  },
  {
    accessorKey: "url",
    header: "Landing Page",
    cell: ({ row }) => {
      const url = row.getValue("url") as string
      return (
        <div className="max-w-[300px] truncate text-sm text-muted-foreground">
          {url || '-'}
        </div>
      )
    },
  },
]

export default function OrganicKeywordsTable({ className }: OrganicKeywordsTableProps) {
  const [data, setData] = useState<OrganicKeyword[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    console.log('🔧 OrganicKeywordsTable: Fetching data...')
    
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/organic-keywords')
        console.log('🔧 API Response status:', response.status)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('🔧 API Result:', result)
        
        if (result.success && result.data) {
          setData(result.data)
          console.log(`🔧 Loaded ${result.data.length} keywords`)
        } else {
          throw new Error('Invalid data format from API')
        }
      } catch (err) {
        console.error('🔧 Error fetching keywords:', err)
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
    return <TableSkeleton rows={10} columns={7} className={className} />
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center text-red-600">
          <div className="mb-2">Error loading keywords</div>
          <div className="text-sm text-gray-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter keywords..."
          value={(table.getColumn("keyword")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("keyword")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">
            {data.length} keywords total
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
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
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
                  No keywords found.
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