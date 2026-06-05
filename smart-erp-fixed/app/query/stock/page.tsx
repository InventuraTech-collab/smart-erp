'use client'
import ERPLayout from '@/components/ERPLayout'

const STOCK = [
  { code:'ITM-0001', name:'Cement OPC 50kg', unit:'BAG', wh:'Dubai Main', opening:200, in:500, out:250, closing:450, value:'8,325.00' },
  { code:'ITM-0002', name:'Steel Rebar 12mm', unit:'KG', wh:'Dubai Main', opening:800, in:1000, out:560, closing:1240, value:'3,968.00' },
  { code:'ITM-0003', name:'Paint Primer White 4L', unit:'TIN', wh:'Dubai Main', opening:80, in:100, out:60, closing:120, value:'2,640.00' },
  { code:'ITM-0004', name:'PVC Pipe 3 inch 6m', unit:'PCS', wh:'Sharjah', opening:120, in:50, out:85, closing:85, value:'1,253.75' },
  { code:'ITM-0045', name:'Waterproofing Compound', unit:'PCS', wh:'Dubai Main', opening:30, in:0, out:22, closing:8, value:'176.00' },
  { code:'ITM-0078', name:'Tile Adhesive Grey', unit:'BAG', wh:'Abu Dhabi', opening:60, in:40, out:75, closing:25, value:'550.00' },
]

export default function StockBalancePage() {
  const totalVal = STOCK.reduce((s, r) => s + parseFloat(r.value.replace(',','')), 0)
  return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">Stock Balance</div><div className="ps">Current stock position across warehouses</div></div>
        <div className="btn-row">
          <button className="btn btn-outline">⬇ Export</button>
          <button className="btn btn-purple">🖨 Print</button>
        </div>
      </div>

      <div className="sec" style={{ marginBottom:'1rem' }}>
        <div className="sec-body" style={{ padding:'12px 16px' }}>
          <div className="fg g4" style={{ alignItems:'flex-end' }}>
            <div className="field"><label>Warehouse</label>
              <select><option value="">All Warehouses</option><option>Dubai Main</option><option>Abu Dhabi</option><option>Sharjah</option></select>
            </div>
            <div className="field"><label>Division</label>
              <select><option value="">All</option><option>GENERAL</option><option>HARDWARE</option><option>PAINT</option><option>PLUMBING</option></select>
            </div>
            <div className="field"><label>Stock Filter</label>
              <select><option>All Items</option><option>Below Reorder</option><option>Zero Stock</option><option>Positive Stock</option></select>
            </div>
            <button className="btn btn-teal">🔍 Search</button>
          </div>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
        <div className="stat-card green">
          <div className="stat-lbl">Total Items</div>
          <div className="stat-val">{STOCK.length}</div>
          <div className="stat-ch up">↑ Active SKUs</div>
        </div>
        <div className="stat-card">
          <div className="stat-lbl">Total Stock Value</div>
          <div className="stat-val">AED {totalVal.toLocaleString('en',{minimumFractionDigits:2})}</div>
          <div className="stat-ch up">↑ As of today</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-lbl">Below Reorder</div>
          <div className="stat-val">3 Items</div>
          <div className="stat-ch warn">⚠ Action needed</div>
        </div>
      </div>

      <div className="tc">
        <div className="tc-h"><div className="tc-t">Stock Balance Report</div><button className="view-all-btn">Export CSV</button></div>
        <table className="lt">
          <thead>
            <tr><th>Code</th><th>Item Name</th><th>Unit</th><th>Warehouse</th><th>Opening</th><th>In</th><th>Out</th><th>Closing</th><th>Value (AED)</th></tr>
          </thead>
          <tbody>
            {STOCK.map(r => (
              <tr key={r.code + r.wh}>
                <td className="td-link">{r.code}</td>
                <td>{r.name}</td>
                <td>{r.unit}</td>
                <td>{r.wh}</td>
                <td style={{ textAlign:'right' }}>{r.opening}</td>
                <td style={{ textAlign:'right', color:'#1a7a4a', fontWeight:600 }}>+{r.in}</td>
                <td style={{ textAlign:'right', color:'#a32d2d', fontWeight:600 }}>-{r.out}</td>
                <td style={{ textAlign:'right', fontWeight:700, color: r.closing < 15 ? '#a32d2d' : 'var(--text)' }}>{r.closing}</td>
                <td style={{ textAlign:'right' }}>{r.value}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background:'var(--opl)' }}>
              <td colSpan={8} style={{ padding:'9px 16px', fontWeight:700, color:'var(--op)' }}>TOTAL</td>
              <td style={{ padding:'9px 16px', textAlign:'right', fontWeight:700, color:'var(--op)' }}>AED {totalVal.toLocaleString('en',{minimumFractionDigits:2})}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </ERPLayout>
  )
}
