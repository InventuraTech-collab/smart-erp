'use client'
import ERPLayout from '@/components/ERPLayout'
import Link from 'next/link' 
import { useEffect, useRef } from 'react'
const fmt = (n: number) => `OMR ${n.toLocaleString('en-OM', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`
const STATS = [
  { label:'Total Items',      val:'1,248', ch:'↑ 12 added this month', cls:'up',   top:''      },
  { label:'Stock Value',      val:'OMR 4.2M', ch:'↑ 3.4% vs last month', cls:'up', top:'green' },
  { label:'Low Stock Items',  val:'34',    ch:'△ Needs reorder',      cls:'warn',  top:'amber' },
  { label:'Pending POs',      val:'18',    ch:'Awaiting receipt',     cls:'dn',    top:'red'   },
]

const TXN = [
  { no:'GRN-00842', date:'04 Jun 2026', item:'Cement OPC 50kg',    type:'Goods Receipt',   qty:'500 Bags',  wh:'Dubai Main',  status:'Posted',    sc:'bg' },
  { no:'PO-02341',  date:'03 Jun 2026', item:'Steel Rebar 12mm',   type:'Purchase Order',  qty:'2,000 Kg',  wh:'Abu Dhabi',   status:'Partial',   sc:'ba' },
  { no:'STR-00198', date:'03 Jun 2026', item:'Paint Primer White',  type:'Transfer',        qty:'120 Ltrs',  wh:'Sharjah',     status:'Completed', sc:'bg' },
  { no:'ADJ-00055', date:'02 Jun 2026', item:'PVC Pipe 3 inch',    type:'Adjustment',      qty:'-15 Pcs',   wh:'Dubai Main',  status:'Variance',  sc:'br' },
  { no:'GRN-00841', date:'01 Jun 2026', item:'Sand Fine Grade',    type:'Goods Receipt',   qty:'10 Tons',   wh:'Dubai Main',  status:'Draft',     sc:'bp' },
]

const LOW = [
  { code:'ITM-0045', name:'Waterproofing Compound', stock:'8 Pcs',    reorder:'50 Pcs',   supplier:'Gulf Chemicals',  urgent:true  },
  { code:'ITM-0112', name:'Binding Wire 18G',        stock:'12 Rolls', reorder:'100 Rolls',supplier:'Al Noor Steel',   urgent:true  },
  { code:'ITM-0078', name:'Tile Adhesive Grey',      stock:'25 Bags',  reorder:'80 Bags',  supplier:'Mapei Arabia',    urgent:false },
  { code:'ITM-0201', name:'GI Pipe 2 inch',          stock:'3 Pcs',    reorder:'20 Pcs',   supplier:'Dubai Pipes LLC', urgent:true  },
]

const ITEMS = [
  { code:'ITM-0001', name:'Cement OPC 50kg',        category:'Construction', unit:'Bags',  stock:1240, value:'OMR 62,000', status:'In Stock'  },
  { code:'ITM-0002', name:'Steel Rebar 12mm',        category:'Steel',        unit:'Kg',    stock:8500, value:'OMR 42,500', status:'In Stock'  },
  { code:'ITM-0003', name:'Paint Primer White',      category:'Paints',       unit:'Ltrs',  stock:320,  value:'OMR 9,600',  status:'In Stock'  },
  { code:'ITM-0004', name:'PVC Pipe 3 inch',         category:'Plumbing',     unit:'Pcs',   stock:45,   value:'OMR 2,250',  status:'Low Stock' },
  { code:'ITM-0005', name:'Waterproofing Compound',  category:'Construction', unit:'Pcs',   stock:8,    value:'OMR 1,200',  status:'Critical'  },
  { code:'ITM-0006', name:'Tile Adhesive Grey 20kg', category:'Tiles',        unit:'Bags',  stock:25,   value:'OMR 1,875',  status:'Low Stock' },
  { code:'ITM-0007', name:'GI Pipe 2 inch',          category:'Plumbing',     unit:'Pcs',   stock:3,    value:'OMR 450',    status:'Critical'  },
  { code:'ITM-0008', name:'Sand Fine Grade',         category:'Aggregates',   unit:'Tons',  stock:180,  value:'OMR 9,000',  status:'In Stock'  },
]

// Chart colors
const ORANGE = '#F47920'
const RED    = '#8B1A1A'
const LIGHT  = '#ffe0c4'

export default function DashboardPage() {
  const barRef  = useRef<HTMLCanvasElement>(null)
  const lineRef = useRef<HTMLCanvasElement>(null)
  const pieRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // BAR CHART - Top Items by Quantity
    const bar = barRef.current
    if (bar) {
      const ctx = bar.getContext('2d')!
      const data = [1240, 850, 320, 180, 45, 25, 12, 8]
      const labels = ['Cement','Steel','Paint','Sand','PVC Pipe','Tile Adh','Wire','WP Comp']
      const max = Math.max(...data)
      const W = bar.width, H = bar.height
      const pad = { top:20, right:20, bottom:50, left:60 }
      const chartW = W - pad.left - pad.right
      const chartH = H - pad.top - pad.bottom
      ctx.clearRect(0, 0, W, H)
      // grid lines
      ctx.strokeStyle = '#f0e8e4'; ctx.lineWidth = 1
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + chartH - (i / 4) * chartH
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke()
        ctx.fillStyle = '#999'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'right'
        ctx.fillText(String(Math.round(max * i / 4)), pad.left - 6, y + 3)
      }
      // bars
      const bw = chartW / data.length * 0.6
      const gap = chartW / data.length
      data.forEach((v, i) => {
        const x = pad.left + i * gap + gap * 0.2
        const bh = (v / max) * chartH
        const y = pad.top + chartH - bh
        const grad = ctx.createLinearGradient(0, y, 0, y + bh)
        grad.addColorStop(0, ORANGE); grad.addColorStop(1, RED)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.roundRect(x, y, bw, bh, [4, 4, 0, 0])
        ctx.fill()
        ctx.fillStyle = '#555'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'center'
        ctx.fillText(labels[i], x + bw / 2, H - pad.bottom + 16)
      })
    }

    // LINE CHART - Stock Value by Month
    const line = lineRef.current
    if (line) {
      const ctx = line.getContext('2d')!
      const data = [2.8, 3.1, 2.9, 3.5, 3.8, 3.6, 4.0, 3.9, 4.2, 4.1, 4.3, 4.2]
      const months = ['Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']
      const W = line.width, H = line.height
      const pad = { top:20, right:20, bottom:40, left:50 }
      const chartW = W - pad.left - pad.right
      const chartH = H - pad.top - pad.bottom
      const min = 2.5, max = 4.5
      ctx.clearRect(0, 0, W, H)
      // grid
      ctx.strokeStyle = '#f0e8e4'; ctx.lineWidth = 1
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + chartH - (i / 4) * chartH
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke()
        ctx.fillStyle = '#999'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'right'
        ctx.fillText(`${(min + (max - min) * i / 4).toFixed(1)}M`, pad.left - 6, y + 3)
      }
      // area fill
      const pts = data.map((v, i) => ({
        x: pad.left + i * (chartW / (data.length - 1)),
        y: pad.top + chartH - ((v - min) / (max - min)) * chartH
      }))
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pad.top + chartH)
      pts.forEach(p => ctx.lineTo(p.x, p.y))
      ctx.lineTo(pts[pts.length-1].x, pad.top + chartH)
      ctx.closePath()
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH)
      grad.addColorStop(0, 'rgba(244,121,32,.25)'); grad.addColorStop(1, 'rgba(244,121,32,.02)')
      ctx.fillStyle = grad; ctx.fill()
      // line
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
      pts.forEach(p => ctx.lineTo(p.x, p.y))
      ctx.strokeStyle = ORANGE; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke()
      // dots
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'; ctx.fill()
        ctx.strokeStyle = ORANGE; ctx.lineWidth = 2; ctx.stroke()
      })
      // labels
      months.forEach((m, i) => {
        ctx.fillStyle = '#999'; ctx.font = '10px Segoe UI'; ctx.textAlign = 'center'
        ctx.fillText(m, pts[i].x, H - pad.bottom + 16)
      })
    }

    // PIE CHART - Transaction Types
    const pie = pieRef.current
    if (pie) {
      const ctx = pie.getContext('2d')!
      const data = [
        { label: 'Goods Receipt', value: 42, color: ORANGE },
        { label: 'Purchase Order', value: 28, color: RED },
        { label: 'Transfer', value: 15, color: '#e8a020' },
        { label: 'Adjustment', value: 10, color: '#c45e10' },
        { label: 'Other', value: 5, color: '#d4650a' },
      ]
      const W = pie.width, H = pie.height
      const cx = W * 0.42, cy = H / 2, r = Math.min(cx, cy) - 20, ir = r * 0.55
      ctx.clearRect(0, 0, W, H)
      let angle = -Math.PI / 2
      const total = data.reduce((s, d) => s + d.value, 0)
      data.forEach(d => {
        const slice = (d.value / total) * Math.PI * 2
        ctx.beginPath(); ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, r, angle, angle + slice)
        ctx.closePath(); ctx.fillStyle = d.color; ctx.fill()
        ctx.beginPath(); ctx.arc(cx, cy, ir, 0, Math.PI * 2)
        ctx.fillStyle = '#fff'; ctx.fill()
        angle += slice
      })
      // center text
      ctx.fillStyle = RED; ctx.font = 'bold 18px Segoe UI'; ctx.textAlign = 'center'
      ctx.fillText('545', cx, cy + 2)
      ctx.fillStyle = '#999'; ctx.font = '10px Segoe UI'
      ctx.fillText('Total TXNs', cx, cy + 16)
      // legend
      const lx = W * 0.72, ly = cy - data.length * 14
      data.forEach((d, i) => {
        const y = ly + i * 28
        ctx.fillStyle = d.color
        ctx.beginPath(); ctx.roundRect(lx, y, 12, 12, 3); ctx.fill()
        ctx.fillStyle = '#444'; ctx.font = '11px Segoe UI'; ctx.textAlign = 'left'
        ctx.fillText(d.label, lx + 18, y + 10)
        ctx.fillStyle = '#888'; ctx.font = '10px Segoe UI'
        ctx.fillText(`${d.value}%`, lx + 18, y + 22)
      })
    }
  }, [])

  return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">Inventory Dashboard</div><div className="ps">Overview of stock, transactions and alerts</div></div>
        <Link href="/master/items/new"><button className="btn btn-purple">+ New Item</button></Link>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">
        {STATS.map(s => (
          <div key={s.label} className={`stat-card ${s.top}`}>
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-val">{s.val}</div>
            <div className={`stat-ch ${s.cls}`}>{s.ch}</div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:14 }}>

        {/* BAR */}
        <div className="sec">
          <div className="sec-hdr purple">📊 Top Items by Quantity</div>
          <div className="sec-body" style={{ padding:'12px 8px' }}>
            <canvas ref={barRef} width={320} height={200} style={{ width:'100%', height:'auto' }}/>
          </div>
        </div>

        {/* LINE */}
        <div className="sec">
          <div className="sec-hdr" style={{ background: ORANGE }}>📈 Stock Value by Month (OMR M)</div>
          <div className="sec-body" style={{ padding:'12px 8px' }}>
            <canvas ref={lineRef} width={320} height={200} style={{ width:'100%', height:'auto' }}/>
          </div>
        </div>

        {/* PIE */}
        <div className="sec">
          <div className="sec-hdr teal">🥧 Transaction Types</div>
          <div className="sec-body" style={{ padding:'12px 8px' }}>
            <canvas ref={pieRef} width={320} height={200} style={{ width:'100%', height:'auto' }}/>
          </div>
        </div>
      </div>

      {/* ITEM LIST */}
      <div className="tc" style={{ marginBottom:14 }}>
        <div className="tc-h">
          <div className="tc-t">📦 Product / Item List</div>
          <div style={{ display:'flex', gap:8 }}>
            <input placeholder="Search items…" style={{ height:30, border:'1px solid #ffe0c4', borderRadius:6, padding:'0 10px', fontSize:12, outline:'none', width:180 }}/>
            <Link href="/master/items"><button className="view-all-btn">View All Items</button></Link>
            <Link href="/master/items/new"><button className="btn btn-purple btn-sm">+ Add Item</button></Link>
          </div>
        </div>
        <table className="lt" style={{ fontSize:12 }}>
          <thead>
            <tr>
              <th>Code</th><th>Item Name</th><th>Category</th><th>Unit</th>
              <th style={{ textAlign:'right' }}>Stock</th>
              <th style={{ textAlign:'right' }}>Value</th>
              <th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map(it => (
              <tr key={it.code}>
                <td style={{ color:'#F47920', fontWeight:600 }}>{it.code}</td>
                <td style={{ fontWeight:500 }}>{it.name}</td>
                <td>{it.category}</td>
                <td>{it.unit}</td>
                <td style={{ textAlign:'right', fontWeight:600 }}>{it.stock.toLocaleString()}</td>
                <td style={{ textAlign:'right' }}>{it.value}</td>
                <td>
                  <span className={`badge ${it.status === 'In Stock' ? 'bg' : it.status === 'Critical' ? 'br' : 'ba'}`}>
                    {it.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOTTOM ROW */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        {/* RECENT TXN */}
        <div className="tc">
          <div className="tc-h">
            <div className="tc-t">Recent Transactions</div>
            <button className="view-all-btn">View All</button>
          </div>
          <table className="lt" style={{ fontSize:12 }}>
            <thead><tr><th>TXN No.</th><th>Date</th><th>Item</th><th>Type</th><th>Qty</th><th>Status</th></tr></thead>
            <tbody>
              {TXN.map(t => (
                <tr key={t.no}>
                  <td className="td-link">{t.no}</td>
                  <td>{t.date}</td>
                  <td>{t.item}</td>
                  <td>{t.type}</td>
                  <td>{t.qty}</td>
                  <td><span className={`badge ${t.sc}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LOW STOCK */}
        <div className="tc">
          <div className="tc-h">
            <div className="tc-t">⚠ Low Stock Alerts</div>
            <button className="view-all-btn">Raise All POs</button>
          </div>
          <table className="lt" style={{ fontSize:12 }}>
            <thead><tr><th>Code</th><th>Item</th><th>Stock</th><th>Reorder</th><th>Supplier</th><th>Action</th></tr></thead>
            <tbody>
              {LOW.map(l => (
                <tr key={l.code}>
                  <td style={{ color:'#F47920', fontWeight:600 }}>{l.code}</td>
                  <td>{l.name}</td>
                  <td><span style={{ color: l.urgent ? '#a32d2d' : '#a36000', fontWeight:600 }}>{l.stock}</span></td>
                  <td>{l.reorder}</td>
                  <td>{l.supplier}</td>
                  <td><button className="btn btn-purple btn-sm">Raise PO</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ERPLayout>
  )
}
