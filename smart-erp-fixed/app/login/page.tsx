'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COMPANIES = ['Building Materials LLC', 'Gulf Trading Co.', 'Al Noor Industries']
const BRANCHES: Record<string, string[]> = {
  'Building Materials LLC': ['Main Branch — Dubai', 'Abu Dhabi Branch', 'Sharjah Branch'],
  'Gulf Trading Co.': ['Head Office — Dubai', 'Jebel Ali Branch'],
  'Al Noor Industries': ['Factory — Sharjah', 'Dubai Office'],
}
const MODULES = ['Inventory','Purchasing','Sales','Accounting','HR','Reports','Manufacturing','CRM']

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ company:'', branch:'', user:'', password:'', finYear:'2025-2026' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!form.company || !form.user || !form.password) { setError('Please fill in Company, Username, and Password.'); return }
    setError(''); setLoading(true)
    setTimeout(() => {
      localStorage.setItem('erp_user', JSON.stringify({ company: form.company, branch: form.branch || 'Main Branch — Dubai', user: form.user, finYear: form.finYear }))
      router.push('/dashboard')
    }, 700)
  }

  const F = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
    <div className="field" style={{ marginBottom: 12 }}>
      <label>{label}</label>
      {children}
      {hint && <span className="fhint">{hint}</span>}
    </div>
  )

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:'Segoe UI,system-ui,sans-serif' }}>
      {/* LEFT */}
      <div style={{ width:'50%', background:'var(--op)', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2.5rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%', background:'rgba(255,255,255,.06)' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-60, width:260, height:260, borderRadius:'50%', background:'rgba(0,160,157,.15)' }}/>
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'2.5rem' }}>
            <div style={{ width:46, height:46, background:'var(--og)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:700, color:'#fff' }}>E</div>
            <div style={{ fontSize:26, fontWeight:700, color:'#fff', letterSpacing:-.5 }}>Smart<span style={{ color:'var(--og)' }}>ERP</span></div>
          </div>
          <h1 style={{ fontSize:30, fontWeight:700, color:'#fff', lineHeight:1.25, marginBottom:'1rem', letterSpacing:-.5 }}>Inventory &<br/>Business Management</h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.72)', lineHeight:1.65, maxWidth:320, marginBottom:'2rem' }}>A complete ERP suite for managing inventory, purchasing, sales and finance — built for UAE &amp; India markets.</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:'2rem' }}>
            {MODULES.map(m => (
              <div key={m} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.12)', color:'rgba(255,255,255,.88)', borderRadius:99, padding:'5px 12px', fontSize:12, fontWeight:500, border:'.5px solid rgba(255,255,255,.18)' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--og)' }}/>{m}
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:28 }}>
            {[['1,200+','Active Items'],['3','Branches'],['AED 4.2M','Stock Value']].map(([v,l]) => (
              <div key={l}><div style={{ fontSize:22, fontWeight:700, color:'var(--og)' }}>{v}</div><div style={{ fontSize:11, color:'rgba(255,255,255,.6)', marginTop:2 }}>{l}</div></div>
            ))}
          </div>
        </div>
        <div style={{ position:'relative', zIndex:2, fontSize:11, color:'rgba(255,255,255,.4)' }}>© 2026 Smart ERP · All rights reserved</div>
      </div>

      {/* RIGHT */}
      <div style={{ width:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem 3rem' }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          <h2 style={{ fontSize:26, fontWeight:700, color:'var(--text)', marginBottom:4, letterSpacing:-.4 }}>Welcome back</h2>
          <p style={{ fontSize:13, color:'var(--muted)', marginBottom:'1.75rem' }}>Sign in to your Smart ERP account</p>
          {error && <div style={{ background:'#fdf2f2', border:'1px solid #f5c6c6', color:'#a32d2d', borderRadius:7, padding:'8px 12px', fontSize:12, marginBottom:14 }}>⚠ {error}</div>}
          <form onSubmit={handleLogin}>
            <F label="Company" hint="All registered companies">
              <select value={form.company} onChange={e => setForm({ ...form, company:e.target.value, branch:'' })}>
                <option value="">— Select company —</option>
                {COMPANIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </F>
            <F label="Branch" hint="Branches within selected company">
              <select value={form.branch} onChange={e => setForm({ ...form, branch:e.target.value })}>
                <option value="">— Select branch —</option>
                {(BRANCHES[form.company]||[]).map(b => <option key={b}>{b}</option>)}
              </select>
            </F>
            <F label="Username">
              <input type="text" placeholder="Enter username" value={form.user} onChange={e => setForm({ ...form, user:e.target.value })}/>
            </F>
            <F label="Password">
              <input type="password" placeholder="Enter password" value={form.password} onChange={e => setForm({ ...form, password:e.target.value })}/>
            </F>
            <F label="Financial Year" hint="Defaults to current year">
              <select value={form.finYear} onChange={e => setForm({ ...form, finYear:e.target.value })}>
                <option>2025-2026</option><option>2024-2025</option><option>2023-2024</option>
              </select>
            </F>
            <F label="Server" hint="Auto-assigned based on financial year">
              <div style={{ height:36, border:'1.5px solid var(--oplm)', borderRadius:7, background:'var(--opl)', color:'var(--opd)', fontSize:13, padding:'0 10px', display:'flex', alignItems:'center', fontWeight:500 }}>
                SRV-{form.finYear} / Dubai
              </div>
            </F>
            <button type="submit" className="btn btn-purple" style={{ width:'100%', height:42, justifyContent:'center', fontSize:14, marginTop:4 }} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
          <a href="#" style={{ display:'block', textAlign:'center', fontSize:12.5, color:'var(--og)', marginTop:12 }}>Forgot password?</a>
        </div>
      </div>
    </div>
  )
}
