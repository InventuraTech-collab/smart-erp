'use client'
import ERPLayout from '@/components/ERPLayout'
import Link from 'next/link'

const STATS = [
  { label:'Total Items', val:'1,248', ch:'↑ 12 added this month', cls:'up', top:'' },
  { label:'Stock Value', val:'AED 4.2M', ch:'↑ 3.4% vs last month', cls:'up', top:'green' },
  { label:'Low Stock Items', val:'34', ch:'⚠ Needs reorder', cls:'warn', top:'amber' },
  { label:'Pending POs', val:'18', ch:'Awaiting receipt', cls:'dn', top:'red' },
]
const TXN = [
  { no:'GRN-00842', date:'04 Jun 2026', item:'Cement OPC 50kg', type:'Goods Receipt', qty:'500 Bags', wh:'Dubai Main', status:'Posted', sc:'bg' },
  { no:'PO-02341', date:'03 Jun 2026', item:'Steel Rebar 12mm', type:'Purchase Order', qty:'2,000 Kg', wh:'Abu Dhabi', status:'Partial', sc:'ba' },
  { no:'STR-00198', date:'03 Jun 2026', item:'Paint Primer White', type:'Transfer', qty:'120 Ltrs', wh:'Sharjah', status:'Completed', sc:'bg' },
  { no:'ADJ-00055', date:'02 Jun 2026', item:'PVC Pipe 3 inch', type:'Adjustment', qty:'-15 Pcs', wh:'Dubai Main', status:'Variance', sc:'br' },
  { no:'GRN-00841', date:'01 Jun 2026', item:'Sand Fine Grade', type:'Goods Receipt', qty:'10 Tons', wh:'Dubai Main', status:'Draft', sc:'bp' },
]
const LOW = [
  { code:'ITM-0045', name:'Waterproofing Compound', stock:'8 Pcs', reorder:'50 Pcs', supplier:'Gulf Chemicals', urgent:true },
  { code:'ITM-0112', name:'Binding Wire 18G', stock:'12 Rolls', reorder:'100 Rolls', supplier:'Al Noor Steel', urgent:true },
  { code:'ITM-0078', name:'Tile Adhesive Grey', stock:'25 Bags', reorder:'80 Bags', supplier:'Mapei Arabia', urgent:false },
]

export default function Dashboard() {
  return (
    <ERPLayout>
      <div className="ph">
        <div>
          <div className="pt">Inventory Dashboard</div>
          <div className="ps">Overview of stock, transactions and alerts</div>
        </div>
        <Link href="/master/items" className="btn btn-purple">＋ New Item</Link>
      </div>

      <div className="stats-grid">
        {STATS.map(s => (
          <div key={s.label} className={`stat-card${s.top ? ' ' + s.top : ''}`}>
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-val">{s.val}</div>
            <div className={`stat-ch${s.cls ? ' ' + s.cls : ''}`}>{s.ch}</div>
          </div>
        ))}
      </div>

      <div className="tc">
        <div className="tc-h">
          <div className="tc-t">Recent Transactions</div>
          <button className="view-all-btn">View All</button>
        </div>
        <table className="lt">
          <thead><tr><th>Txn No.</th><th>Date</th><th>Item</th><th>Type</th><th>Qty</th><th>Warehouse</th><th>Status</th></tr></thead>
          <tbody>
            {TXN.map(r => (
              <tr key={r.no}>
                <td className="td-link">{r.no}</td>
                <td>{r.date}</td><td>{r.item}</td><td>{r.type}</td><td>{r.qty}</td><td>{r.wh}</td>
                <td><span className={`badge ${r.sc}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tc">
        <div className="tc-h"><div className="tc-t">⚠ Low Stock Alerts</div></div>
        <table className="lt">
          <thead><tr><th>Code</th><th>Item</th><th>Current Stock</th><th>Reorder Level</th><th>Supplier</th><th>Action</th></tr></thead>
          <tbody>
            {LOW.map(r => (
              <tr key={r.code}>
                <td>{r.code}</td><td>{r.name}</td>
                <td style={{ color: r.urgent ? '#a32d2d' : '#a36000', fontWeight: 700 }}>{r.stock}</td>
                <td>{r.reorder}</td><td>{r.supplier}</td>
                <td><button className="btn btn-outline btn-sm">Raise PO</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ERPLayout>
  )
}
