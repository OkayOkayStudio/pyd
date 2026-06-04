import { Skeleton } from "./skeleton"

interface TableSkeletonProps {
  rows?: number
  columns?: number
  className?: string
}

export function TableSkeleton({
  rows = 5,
  columns = 6,
  className = ""
}: TableSkeletonProps) {
  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* Search and filters skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-md border overflow-hidden">
        <div className="bg-muted/50">
          <div className="flex border-b">
            {Array.from({ length: columns }).map((_, i) => (
              <div key={i} className="flex-1 p-4">
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex border-b last:border-b-0">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1 p-4">
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  )
}
