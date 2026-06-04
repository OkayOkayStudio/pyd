import { Skeleton } from "./skeleton"
import { Card, CardContent, CardHeader } from "./card"

interface ChartSkeletonProps {
  className?: string
  height?: string
}

export function ChartSkeleton({
  className = "",
  height = "h-[400px]"
}: ChartSkeletonProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend skeleton */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded" />
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>

        {/* Chart area skeleton */}
        <div className={`w-full ${height} flex items-end justify-between px-12 pb-12 gap-2`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${Math.random() * 60 + 40}%` }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
