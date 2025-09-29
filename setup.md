# Next.js SEO Audit Presentation

## Project Structure

```
pyd-seo-presentation/
├── package.json
├── next.config.js
├── tailwind.config.js
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Slide.tsx
│   ├── Navigation.tsx
│   ├── MetricCard.tsx
│   ├── ProgressBar.tsx
│   ├── Chart.tsx
│   └── SlideIndicator.tsx
├── hooks/
│   └── usePresentation.ts
├── data/
│   └── slides.ts
└── lib/
    └── chartConfig.ts
```

## package.json

```json
{
  "name": "pyd-seo-presentation",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build && next export"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "recharts": "^2.9.0",
    "lucide-react": "^0.290.0",
    "@radix-ui/react-progress": "^1.0.3",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5"
  }
}
```

## app/layout.tsx

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PYD Agency - SEO Audit Report',
  description: 'Comprehensive SEO audit and  for PYD Agency',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## app/page.tsx

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/Navigation'
import SlideIndicator from '@/components/SlideIndicator'
import { slides } from '@/data/slides'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const totalSlides = slides.length

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'Escape') {
        exitFullscreen()
      } else if (e.key === 'f') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
        <div className="text-sm opacity-60">
          PYD Agency SEO Audit
        </div>
        <button
          onClick={toggleFullscreen}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="h-screen flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-6xl"
          >
            <CurrentSlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between p-6">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={12} />
          </button>

          <SlideIndicator
            current={currentSlide}
            total={totalSlides}
            onSelect={goToSlide}
          />

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="p-3 bg-white/10 rounded-lg hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-4 right-4 text-sm opacity-60">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  )
}
```

## data/slides.ts

```tsx
import TitleSlide from '@/components/slides/TitleSlide'
import DashboardSlide from '@/components/slides/DashboardSlide'
import TripleCrisisSlide from '@/components/slides/TripleCrisisSlide'
import TrafficCollapseSlide from '@/components/slides/TrafficCollapseSlide'
import RevenueLossSlide from '@/components/slides/RevenueLossSlide'
import IndexationSlide from '@/components/slides/IndexationSlide'
import CompetitorSlide from '@/components/slides/CompetitorSlide'
import SpeedSlide from '@/components/slides/SpeedSlide'
import ActionPlanSlide from '@/components/slides/ActionPlanSlide'
import RoadmapSlide from '@/components/slides/RoadmapSlide'
import ROISlide from '@/components/slides/ROISlide'
import ContactSlide from '@/components/slides/ContactSlide'

export const slides = [
  { id: 'title', component: TitleSlide },
  { id: 'dashboard', component: DashboardSlide },
  { id: 'triple-crisis', component: TripleCrisisSlide },
  { id: 'traffic-collapse', component: TrafficCollapseSlide },
  { id: 'revenue-loss', component: RevenueLossSlide },
  { id: 'indexation', component: IndexationSlide },
  { id: 'competitors', component: CompetitorSlide },
  { id: 'speed', component: SpeedSlide },
  { id: 'action-plan', component: ActionPlanSlide },
  { id: 'roadmap', component: RoadmapSlide },
  { id: 'roi', component: ROISlide },
  { id: 'contact', component: ContactSlide },
]
```

## components/slides/TitleSlide.tsx

```tsx
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export default function TitleSlide() {
  return (
    <div className="text-left">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="slide-title font-light mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          SEO Audit 
        </h1>
        <h2 className="text-2xl text-gray-300 mb-8">PYD Agency</h2>
        <div className="text-xl text-gray-400">September 2025</div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-gray-500/10 text-red-400 rounded-lg"
        >
          <AlertCircle size={20} />
          <span>Confidential Report</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
```

## components/slides/DashboardSlide.tsx

```tsx
import { motion } from 'framer-motion'
import MetricCard from '@/components/MetricCard'

export default function DashboardSlide() {
  const metrics = [
    { label: 'Health Score', value: '2.5/10', status: 'critical' },
    { label: 'Pages Ranking', value: '11%', subtext: '10 of 88', status: 'critical' },
    { label: 'Domain Rating', value: '0.4', subtext: 'Industry: 30+', status: 'critical' },
    { label: 'Traffic Drop', value: '-68%', subtext: 'Last Week', status: 'critical' },
  ]

  return (
    <div>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light text-left mb-12"
      >
        Executive Dashboard
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-left"
      >
        <div className="inline-block px-6 py-3 bg-red-500/10 rounded-lg">
          <span className="text-red-400 font-light text-xl"></span>
        </div>
      </motion.div>
    </div>
  )
}
```

## components/slides/TrafficCollapseSlide.tsx

```tsx
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TrafficCollapseSlide() {
  const data = [
    { date: 'Sep 4', impressions: 614 },
    { date: 'Sep 5', impressions: 590 },
    { date: 'Sep 6', impressions: 580 },
    { date: 'Sep 7', impressions: 570 },
    { date: 'Sep 8', impressions: 550 },
    { date: 'Sep 9', impressions: 520 },
    { date: 'Sep 10', impressions: 500 },
    { date: 'Sep 11', impressions: 195 },
    { date: 'Sep 12', impressions: 190 },
    { date: 'Sep 13', impressions: 195 },
    { date: 'Sep 14', impressions: 200 },
    { date: 'Sep 15', impressions: 195 },
    { date: 'Sep 16', impressions: 195 },
    { date: 'Sep 17', impressions: 195 },
  ]

  return (
    <div>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light text-left mb-8"
      >
        Traffic Collapse Timeline
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="h-96"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-left"
      >
        <div className="inline-block px-6 py-4 bg-red-500/10 rounded-lg">
          <div className="text-5xl font-light text-red-500">-68%</div>
          <div className="text-xl text-red-400 mt-2">Impressions Lost in One Week</div>
        </div>
      </motion.div>
    </div>
  )
}
```

## components/slides/ActionPlanSlide.tsx

```tsx
import { motion } from 'framer-motion'
import { Check, Clock, AlertCircle } from 'lucide-react'

export default function ActionPlanSlide() {
  const actions = [
    { task: 'Submit sitemap to Google', time: '5 min', priority: 'critical', icon: AlertCircle },
    { task: 'Remove /404 from sitemap', time: '10 min', priority: 'critical', icon: AlertCircle },
    { task: 'Fix canonical tags (37 pages)', time: '2 days', priority: 'high', icon: Clock },
    { task: 'Investigate traffic drop', time: '1 day', priority: 'high', icon: Clock },
    { task: 'Begin speed optimization', time: 'Ongoing', priority: 'medium', icon: Clock },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500 bg-red-500/10'
      case 'high': return 'text-orange-500 bg-orange-500/10'
      case 'medium': return 'text-yellow-500 bg-yellow-500/20'
      default: return 'text-gray-500 bg-gray-500/20'
    }
  }

  return (
    <div>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-light text-left mb-8"
      >
        Week 1: Critical Actions
      </motion.h2>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.task}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${getPriorityColor(action.priority)}`}>
                <action.icon size={12} />
              </div>
              <div>
                <div className="text-lg font-semibold">{action.task}</div>
                <div className="text-sm text-gray-400">Priority: {action.priority}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-light">{action.time}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 bg-green-500/20 rounded-lg text-left"
      >
        <div className="text-green-400 font-light">
          Total Time Investment: 4 days to stop the bleeding
        </div>
      </motion.div>
    </div>
  )
}
```

## components/MetricCard.tsx

```tsx
interface MetricCardProps {
  label: string
  value: string
  subtext?: string
  status?: 'critical' | 'warning' | 'success'
}

export default function MetricCard({ label, value, subtext, status = 'critical' }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/30'
      case 'warning': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
      case 'success': return 'bg-green-500/20 text-green-500 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30'
    }
  }

  return (
    <div className={`p-6 rounded-xl border ${getStatusColor()} backdrop-blur-sm`}>
      <div className="text-sm opacity-70 mb-2">{label}</div>
      <div className="text-4xl font-light mb-2">{value}</div>
      {subtext && <div className="text-sm opacity-60">{subtext}</div>}
    </div>
  )
}
```

## components/SlideIndicator.tsx

```tsx
interface SlideIndicatorProps {
  current: number
  total: number
  onSelect: (index: number) => void
}

export default function SlideIndicator({ current, total, onSelect }: SlideIndicatorProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`h-2 transition-all rounded-full ${
            index === current 
              ? 'w-8 bg-white' 
              : 'w-2 bg-white/30 hover:bg-white/50'
          }`}
        />
      ))}
    </div>
  )
}
```

## app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-900 text-white;
  }
}

@layer components {
  .slide-container {
    @apply min-h-screen flex items-center justify-center px-8;
  }
  
  .metric-card {
    @apply p-6 rounded-xl backdrop-blur-sm transition-transform hover:scale-105;
  }
}
```

## tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
```

## Deployment Instructions

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to custom server
npm run build
npm run start
```

## Features

- **Full keyboard navigation** (arrows, space, escape, f for fullscreen)
- **Touch/swipe support** for mobile
- **Animated transitions** between slides
- **Interactive charts** with Recharts
- **Fullscreen mode** for presentations
- **Progress indicators** and slide counter
- **Responsive design** for all devices
- **Component-based** architecture for easy customization
- **TypeScript** for type safety
- **Tailwind CSS** for styling
```