import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Smart ERP — Inventory Management',
  description: 'Smart ERP for Building Materials',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
