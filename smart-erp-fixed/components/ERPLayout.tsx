'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

const MENUS = [
  { label:'Master', items:[{icon:'📦',label:'Item Master',href:'/master/items'},{icon:'🏪',label:'Supplier Master',href:'/master/suppliers'},{icon:'👥',label:'Customer Master',href:'/master/customers'},{icon:'🏭',label:'Warehouse Master',href:'/master/warehouse'},{icon:'📏',label:'Unit of Measure',href:'/master/uom'},{icon:'🏷️',label:'Item Category',href:'/master/category'}]},
  { label:'Transactions', items:[{icon:'🛒',label:'Purchase Order',href:'/transactions/po'},{icon:'📄',label:'Purchase Invoice',href:'/transactions/invoice'},{icon:'🚚',label:'Goods Receipt',href:'/transactions/grn'},{icon:'📋',label:'Sales Order',href:'/transactions/sales'},{icon:'↔️',label:'Stock Transfer',href:'/transactions/transfer'},{icon:'⚖️',label:'Stock Adjustment',href:'/transactions/adjustment'}]},
  { label:'Query', items:[{icon:'📊',label:'Stock Balance',href:'/query/stock'},{icon:'🕓',label:'Stock Ledger',href:'/query/ledger'},{icon:'🔍',label:'Item Enquiry',href:'/query/item'},{icon:'📋',label:'PO Status',href:'/query/po'}]},
  { label:'Reports', items:[{icon:'📑',label:'Stock Summary',href:'/reports/stock'},{icon:'📈',label:'Purchase Report',href:'/reports/purchase'},{icon:'📉',label:'Sales Report',href:'/reports/sales'},{icon:'📆',label:'Ageing Report',href:'/reports/ageing'}]},
  { label:'Utility', items:[{icon:'⬆️',label:'Data Import',href:'/utility/import'},{icon:'⬇️',label:'Data Export',href:'/utility/export'},{icon:'💾',label:'Backup',href:'/utility/backup'},{icon:'⚙️',label:'System Settings',href:'/utility/settings'}]},
  { label:'Switch To', items:[{icon:'💰',label:'Accounting',href:'/switch/accounting'},{icon:'🛍️',label:'Purchase',href:'/switch/purchase'},{icon:'🧾',label:'Sales',href:'/switch/sales'},{icon:'👤',label:'HR / Payroll',href:'/switch/hr'}]},
  { label:'Help', items:[{icon:'📖',label:'User Manual',href:'/help/manual'},{icon:'❓',label:'FAQs',href:'/help/faq'},{icon:'ℹ️',label:'About Smart ERP',href:'/help/about'}]},
]
const SIDEBAR = [
  { section:'Inventory', items:[{icon:'🏠',label:'Dashboard',href:'/dashboard'},{icon:'📦',label:'Item Master',href:'/master/items'},{icon:'📊',label:'Stock Balance',href:'/query/stock'},{icon:'↔️',label:'Stock Transfer',href:'/transactions/transfer'}]},
  { section:'Purchasing', items:[{icon:'🛒',label:'Purchase Orders',href:'/transactions/po'},{icon:'🏪',label:'Suppliers',href:'/master/suppliers'},{icon:'🚚',label:'Goods Receipt',href:'/transactions/grn'}]},
  { section:'Reports', items:[{icon:'📑',label:'Stock Summary',href:'/reports/stock'},{icon:'📈',label:'Movement Report',href:'/reports/movement'},{icon:'📆',label:'Ageing Report',href:'/reports/ageing'}]},
]

export default function ERPLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter(); const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string|null>(null)
  const [user, setUser] = useState({ company:'Building Materials LLC', branch:'Main Branch — Dubai', user:'Admin', finYear:'2025-2026' })
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { const s = localStorage.getItem('erp_user'); if(s) setUser(JSON.parse(s)); else router.push('/login') },[router])
  useEffect(() => { const fn=(e:MouseEvent)=>{ if(ref.current&&!ref.current.contains(e.target as Node))setOpenMenu(null)}; document.addEventListener('mousedown',fn); return()=>document.removeEventListener('mousedown',fn) },[])
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',overflow:'hidden'}}>
      <div className="topbar" ref={ref}>
        <div className="logo-wrap"><div className="logo-mark">E</div><div className="logo-text">Smart<span>ERP</span></div></div>
        <nav className="nav-menu">
          {MENUS.map(m=>(
            <div key={m.label} className="nav-item">
              <button className={`nav-btn${openMenu===m.label?' active':''}`} onClick={()=>setOpenMenu(openMenu===m.label?null:m.label)}>{m.label} ▾</button>
              <div className={`dropdown${openMenu===m.label?' open':''}`}>
                {m.items.map(i=><Link key={i.href} href={i.href} className="dd-item" onClick={()=>setOpenMenu(null)}><span>{i.icon}</span>{i.label}</Link>)}
              </div>
            </div>
          ))}
        </nav>
        <div className="topbar-right">
          <div className="user-av">{user.user.substring(0,2).toUpperCase()}</div>
          <span className="uname">{user.user}</span>
          <button className="signout-btn" onClick={()=>{localStorage.removeItem('erp_user');router.push('/login')}}>Sign out</button>
        </div>
      </div>
      <div className="erp-body">
        <aside className="sidebar">
          {SIDEBAR.map(s=>(
            <div key={s.section}>
              <div className="sb-section">{s.section}</div>
              {s.items.map(i=><Link key={i.href} href={i.href} className={`sb-item${pathname===i.href?' active':''}`}><span>{i.icon}</span>{i.label}</Link>)}
            </div>
          ))}
        </aside>
        <div className="main-content">{children}</div>
      </div>
      <div className="statusbar">
        <div className="st-item">Company: <b>{user.company}</b></div>
        <div className="st-item">Branch: <b>{user.branch}</b></div>
        <div className="st-item">User: <b>{user.user}</b></div>
        <div className="st-item">FY: <b>{user.finYear}</b></div>
        <div className="st-item" style={{marginLeft:'auto'}}>Server: <b>SRV-{user.finYear}/Dubai</b></div>
      </div>
    </div>
  )
}
