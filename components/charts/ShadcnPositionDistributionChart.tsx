'use client'

import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
  top3: {
    label: "Top 3",
    color: "hsl(var(--chart-1))",
  },
  top10: {
    label: "4-10",
    color: "hsl(var(--chart-2))",
  },
  top20: {
    label: "11-20", 
    color: "hsl(var(--chart-3))",
  },
  top50: {
    label: "21-50",
    color: "hsl(var(--chart-4))",
  },
  beyond50: {
    label: "51+",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

interface ShadcnPositionDistributionChartProps {
  data: ChartDataPoint[];
  height?: number;
}

export default function ShadcnPositionDistributionChart({ 
  data, 
  height = 350 
}: ShadcnPositionDistributionChartProps) {
  const currentData = data[data.length - 1];
  const currentTotal = currentData ? 
    currentData.top3 + currentData.top10 + currentData.top20 + currentData.top50 + currentData.beyond50 : 0;

  const getCurrentPercentage = (value: number) => {
    return currentTotal > 0 ? Math.round((value / currentTotal) * 100) : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Position Distribution</CardTitle>
        <CardDescription>
          Keyword ranking positions over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
            stackOffset="expand"
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
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${Math.round(value * 100)}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px]"
                  labelFormatter={(value) => value}
                  formatter={(value, name) => [
                    `${Math.round(Number(value) * 100)}%`,
                    chartConfig[name as keyof typeof chartConfig]?.label || name,
                  ]}
                />
              }
            />
            <Area
              dataKey="beyond50"
              type="natural"
              fill={chartConfig.beyond50.color}
              fillOpacity={0.4}
              stroke={chartConfig.beyond50.color}
              stackId="a"
            />
            <Area
              dataKey="top50"
              type="natural"
              fill={chartConfig.top50.color}
              fillOpacity={0.4}
              stroke={chartConfig.top50.color}
              stackId="a"
            />
            <Area
              dataKey="top20"
              type="natural"
              fill={chartConfig.top20.color}
              fillOpacity={0.4}
              stroke={chartConfig.top20.color}
              stackId="a"
            />
            <Area
              dataKey="top10"
              type="natural"
              fill={chartConfig.top10.color}
              fillOpacity={0.4}
              stroke={chartConfig.top10.color}
              stackId="a"
            />
            <Area
              dataKey="top3"
              type="natural"
              fill={chartConfig.top3.color}
              fillOpacity={0.4}
              stroke={chartConfig.top3.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>

        {/* Current Distribution Summary */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-4">Current Distribution</h4>
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(chartConfig).map(([key, config]) => {
              const value = currentData?.[key as keyof ChartDataPoint] as number || 0;
              const percentage = getCurrentPercentage(value);
              
              return (
                <div key={key} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                  </div>
                  <div className="text-lg font-bold">{value}</div>
                  <div className="text-xs text-muted-foreground mb-1">
                    {config.label}
                  </div>
                  <div 
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: config.color + '20',
                      color: config.color
                    }}
                  >
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="mt-6 pt-4 border-t">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-orange-600 text-lg">💡</div>
              <div>
                <h5 className="font-medium text-orange-900 mb-1">Key Insights</h5>
                <p className="text-sm text-orange-800">
                  {currentData?.top3 && getCurrentPercentage(currentData.top3) >= 20 
                    ? `Strong performance with ${getCurrentPercentage(currentData.top3)}% of keywords in top 3 positions.`
                    : currentData?.top10 && getCurrentPercentage(currentData.top10) >= 40
                    ? `Good first-page visibility with ${getCurrentPercentage(currentData.top10)}% of keywords in positions 4-10.`
                    : 'Focus on improving keyword positions to increase visibility and traffic.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}