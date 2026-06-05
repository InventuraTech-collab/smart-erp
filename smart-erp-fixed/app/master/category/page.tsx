'use client'
import ERPLayout from '@/components/ERPLayout'
import Link from 'next/link'
export default function Page() {
  return (
    <ERPLayout>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'60vh', gap:16 }}>
        <div style={{ fontSize:48 }}>🚧</div>
        <div style={{ fontSize:22, fontWeight:700, color:'var(--text)' }}>Coming Soon</div>
        <div style={{ fontSize:14, color:'var(--muted)' }}>This page is under construction.</div>
        <Link href="/dashboard" className="btn btn-purple" style={{ marginTop:8 }}>← Back to Dashboard</Link>
      </div>
    </ERPLayout>
  )
}
