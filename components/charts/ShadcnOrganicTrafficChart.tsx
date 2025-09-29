'use client'

import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, Line, ComposedChart, XAxis, YAxis } from "recharts"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartDataPoint } from '@/types/organicSearch';
import { formatValue } from '@/lib/data/chartConfig';

const chartConfig = {
  traffic: {
    label: "Organic Traffic",
    color: "hsl(var(--chart-1))",
  },
  trafficValue: {
    label: "Traffic Value",  
    color: "hsl(var(--chart-2))",
  },
  impressions: {
    label: "Impressions",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

interface ShadcnOrganicTrafficChartProps {
  data: ChartDataPoint[];
  height?: number;
}

export default function ShadcnOrganicTrafficChart({ 
  data, 
  height = 400 
}: ShadcnOrganicTrafficChartProps) {
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("traffic")

  const currentData = data[data.length - 1];

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Organic Traffic Performance</CardTitle>
          <CardDescription>
            Weekly performance metrics over the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["traffic", "trafficValue", "impressions"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {chart === "trafficValue" ? 
                    formatValue(currentData?.[chart] || 0, "currency") :
                    formatValue(currentData?.[chart] || 0, chart === "traffic" ? "traffic" : "number")
                  }
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ComposedChart
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
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatValue(value, "traffic")}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatValue(value, "currency")}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return value
                  }}
                  formatter={(value, name) => [
                    name === "trafficValue" ? 
                      formatValue(Number(value), "currency") :
                      name === "traffic" ? 
                        formatValue(Number(value), "traffic") :
                        formatValue(Number(value), "number"),
                    chartConfig[name as keyof typeof chartConfig]?.label || name,
                  ]}
                />
              }
            />
            {activeChart === "traffic" && (
              <Area
                yAxisId="left"
                dataKey="traffic"
                type="natural"
                fill={chartConfig.traffic.color}
                fillOpacity={0.4}
                stroke={chartConfig.traffic.color}
                stackId="a"
              />
            )}
            {activeChart === "trafficValue" && (
              <Line
                yAxisId="right"
                dataKey="trafficValue"
                type="natural"
                stroke={chartConfig.trafficValue.color}
                strokeWidth={2}
                dot={false}
              />
            )}
            {activeChart === "impressions" && (
              <Line
                yAxisId="left"
                dataKey="impressions"
                type="natural"
                stroke={chartConfig.impressions.color}
                strokeWidth={2}
                dot={false}
              />
            )}
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}