'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const APPS = [
  { name: 'Dashboard',     icon: '📊', color: '#F47920', path: '/dashboard' },
  { name: 'Inventory',     icon: '📦', color: '#8B1A1A', path: '/dashboard' },
  { name: 'Purchasing',    icon: '🛒', color: '#F47920', path: '/dashboard' },
  { name: 'Sales',         icon: '💰', color: '#8B1A1A', path: '/dashboard' },
  { name: 'Accounting',    icon: '🧾', color: '#F47920', path: '/dashboard' },
  { name: 'HR',            icon: '👥', color: '#8B1A1A', path: '/dashboard' },
  { name: 'Manufacturing', icon: '🏭', color: '#F47920', path: '/dashboard' },
  { name: 'CRM',           icon: '🤝', color: '#8B1A1A', path: '/dashboard' },
  { name: 'Reports',       icon: '📈', color: '#F47920', path: '/reports' },
  { name: 'Master Data',   icon: '🗂️', color: '#8B1A1A', path: '/master/items' },
  { name: 'Settings',      icon: '⚙️', color: '#F47920', path: '/dashboard' },
  { name: 'Help',          icon: '❓', color: '#8B1A1A', path: '/help/manual' },
]

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{ company: string; branch: string; user: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('erp_user')
    if (!stored) { router.push('/login'); return }
    setUser(JSON.parse(stored))
  }, [router])

  function handleSignOut() {
    localStorage.removeItem('erp_user')
    router.push('/login')
  }

  if (!user) return null

  return (
    <div style={{ minHeight: '100vh', background: '#fdf8f5', fontFamily: 'Segoe UI, system-ui, sans-serif' }}>

      {/* TOP BAR */}
      <div style={{ height: 56, background: '#8B1A1A', display: 'flex', alignItems: 'center', padding: '0 2rem', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(139,26,26,.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/ais-logo.svg" alt="AIS" style={{ height: 36, filter: 'brightness(0) invert(1)' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,.2)' }}/>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Smart<span style={{ color: '#F47920' }}>ERP</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{user.user}</div>
            <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 11 }}>{user.company} · {user.branch}</div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F47920', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
            {user.user.charAt(0).toUpperCase()}
          </div>
          <button onClick={handleSignOut} style={{ background: 'rgba(255,255,255,.12)', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* WELCOME */}
      <div style={{ textAlign: 'center', padding: '3rem 2rem 1.5rem' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#212529', marginBottom: 6 }}>
          Welcome, <span style={{ color: '#8B1A1A' }}>{user.user}</span> 👋
        </div>
        <div style={{ fontSize: 14, color: '#6c757d' }}>{user.company} &nbsp;·&nbsp; {user.branch} &nbsp;·&nbsp; FY {user.finYear ?? '2025-2026'}</div>
        <div style={{ fontSize: 13, color: '#aaa', marginTop: 6 }}>Select a module to get started</div>
      </div>

      {/* APP GRID */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1rem 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {APPS.map(app => (
          <button
            key={app.name}
            onClick={() => router.push(app.path)}
            style={{ background: '#fff', border: '1px solid #ffe0c4', borderRadius: 16, padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', boxShadow: '0 2px 8px rgba(139,26,26,.06)' }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.borderColor = app.color
              el.style.transform = 'translateY(-3px)'
              el.style.boxShadow = `0 8px 24px rgba(139,26,26,.12)`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.borderColor = '#ffe0c4'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 2px 8px rgba(139,26,26,.06)'
            }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 16, background: app.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
              {app.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#212529', textAlign: 'center' }}>{app.name}</div>
          </button>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: 'center', padding: '1rem', fontSize: 11, color: '#ccc', borderTop: '1px solid #f0e8e4' }}>
        © 2026 Smart ERP · Powered by AIS · Advanced Information System
      </div>
    </div>
  )
}
