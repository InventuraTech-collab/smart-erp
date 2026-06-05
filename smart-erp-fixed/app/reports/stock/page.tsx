'use client'
import ERPLayout from '@/components/ERPLayout'

export default function StockSummaryReportPage() {
  return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">Stock Summary Report</div><div className="ps">Reports › Stock Summary</div></div>
        <div className="btn-row">
          <button className="btn btn-outline">⬇ Export PDF</button>
          <button className="btn btn-purple">🖨 Print</button>
        </div>
      </div>

      <div className="sec" style={{ marginBottom:'1rem' }}>
        <div className="sec-hdr purple">🔍 Report Filters</div>
        <div className="sec-body">
          <div className="fg g4" style={{ alignItems:'flex-end' }}>
            <div className="field"><label>From Date</label><input type="date" defaultValue="2026-06-01" /></div>
            <div className="field"><label>To Date</label><input type="date" defaultValue="2026-06-04" /></div>
            <div className="field"><label>Warehouse</label><select><option>All</option><option>Dubai Main</option><option>Abu Dhabi</option><option>Sharjah</option></select></div>
            <div className="field"><label>Division</label><select><option>All</option><option>GENERAL</option><option>HARDWARE</option><option>PAINT</option></select></div>
          </div>
          <div style={{ marginTop:10 }}>
            <button className="btn btn-teal">Generate Report</button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {[
          { label:'Total Items', val:'1,248', top:'' },
          { label:'Total Value', val:'AED 4.2M', top:'green' },
          { label:'Below Reorder', val:'34', top:'amber' },
          { label:'Zero Stock', val:'12', top:'red' },
        ].map(s => (
          <div key={s.label} className={`stat-card${s.top?' '+s.top:''}`}>
            <div className="stat-lbl">{s.label}</div>
            <div className="stat-val">{s.val}</div>
          </div>
        ))}
      </div>

      <div className="tc">
        <div className="tc-h"><div className="tc-t">Stock Summary — June 2026</div></div>
        <table className="lt">
          <thead>
            <tr><th>Division</th><th>Items</th><th>Total Qty</th><th>Stock Value (AED)</th><th>% of Total</th></tr>
          </thead>
          <tbody>
            {[
              { div:'GENERAL', items:420, qty:'24,800', val:'1,580,000', pct:'37.6%' },
              { div:'HARDWARE', items:310, qty:'18,200', val:'980,000', pct:'23.3%' },
              { div:'PLUMBING', items:215, qty:'12,400', val:'720,000', pct:'17.1%' },
              { div:'PAINT', items:180, qty:'8,600', val:'640,000', pct:'15.2%' },
              { div:'ELECTRICAL', items:123, qty:'5,200', val:'280,000', pct:'6.7%' },
            ].map(r => (
              <tr key={r.div}>
                <td><span className="badge bp">{r.div}</span></td>
                <td>{r.items}</td>
                <td>{r.qty}</td>
                <td style={{ fontWeight:600 }}>{r.val}</td>
                <td>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ flex:1, height:6, background:'var(--opl)', borderRadius:3, overflow:'hidden' }}>
                      <div style={{ width:r.pct, height:'100%', background:'var(--op)', borderRadius:3 }} />
                    </div>
                    <span style={{ fontSize:12, color:'var(--muted)', minWidth:36 }}>{r.pct}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background:'var(--opl)' }}>
              <td style={{ padding:'9px 16px', fontWeight:700, color:'var(--op)' }}>TOTAL</td>
              <td style={{ padding:'9px 16px', fontWeight:700 }}>1,248</td>
              <td style={{ padding:'9px 16px', fontWeight:700 }}>69,200</td>
              <td style={{ padding:'9px 16px', fontWeight:700, color:'var(--op)' }}>4,200,000</td>
              <td style={{ padding:'9px 16px', fontWeight:700 }}>100%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </ERPLayout>
  )
}
