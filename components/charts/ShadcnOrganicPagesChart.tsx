'use client'

import React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartDataPoint } from '@/types/organicSearch';

const chartConfig = {
  pages: {
    label: "Organic Pages",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface ShadcnOrganicPagesChartProps {
  data: ChartDataPoint[];
  height?: number;
}

export default function ShadcnOrganicPagesChart({ 
  data, 
  height = 300 
}: ShadcnOrganicPagesChartProps) {
  // Calculate change from first to last data point
  const firstValue = data[0]?.pages || 0;
  const lastValue = data[data.length - 1]?.pages || 0;
  const change = lastValue - firstValue;
  const changePercentage = firstValue > 0 ? Math.round(((change / firstValue) * 100)) : (change > 0 ? 100 : 0);

  // Find min and max values for better Y-axis scaling
  const values = data.map(d => d.pages);
  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 10;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Organic Pages</CardTitle>
          <CardDescription>
            Number of pages receiving organic traffic
          </CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {lastValue}
          </div>
          <div className={`text-sm font-medium flex items-center gap-1 ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? '↗' : '↘'}
            {Math.abs(change)} ({changePercentage >= 0 ? '+' : ''}{changePercentage || 0}%)
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis
              domain={[minValue - 1, maxValue + 1]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="pages"
                  labelFormatter={(value) => value}
                  formatter={(value) => [
                    `${value} pages`,
                    chartConfig.pages.label,
                  ]}
                />
              }
            />
            <Line
              dataKey="pages"
              type="natural"
              stroke={chartConfig.pages.color}
              strokeWidth={3}
              dot={{
                fill: chartConfig.pages.color,
                strokeWidth: 0,
                r: 4
              }}
              activeDot={{
                r: 6,
                fill: chartConfig.pages.color,
                stroke: "white",
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ChartContainer>

        {/* Performance Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold">
                {values.length > 0 ? Math.min(...values) : 0}
              </div>
              <div className="text-xs text-muted-foreground">Minimum</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">
                {values.length > 0 ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0}
              </div>
              <div className="text-xs text-muted-foreground">Average</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">
                {values.length > 0 ? Math.max(...values) : 0}
              </div>
              <div className="text-xs text-muted-foreground">Maximum</div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-4">
          <div className={`${
            change >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          } border rounded-lg p-4`}>
            <div className="flex items-start gap-3">
              <div className={`text-lg ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '📈' : '📉'}
              </div>
              <div>
                <h5 className={`font-medium mb-1 ${
                  change >= 0 ? 'text-green-900' : 'text-red-900'
                }`}>
                  Page Performance Trend
                </h5>
                <p className={`text-sm ${
                  change >= 0 ? 'text-green-800' : 'text-red-800'
                }`}>
                  {change >= 0 
                    ? `Your organic visibility is growing with ${change} more pages receiving traffic. This indicates improved content discovery and indexing.`
                    : `You've lost organic visibility with ${Math.abs(change)} fewer pages receiving traffic. Consider content optimization and technical SEO improvements.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}