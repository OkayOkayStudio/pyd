import type { Metadata } from 'next'
import './globals.css'

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
      <body className="font-sans">{children}</body>
    </html>
  )
}
