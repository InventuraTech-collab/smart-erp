'use client'
import { useState } from 'react'
import ERPLayout from '@/components/ERPLayout'

const POS = [
  { no:'PO-02341', date:'03 Jun 2026', supplier:'Al Noor Steel', items:4, total:'AED 8,200', status:'Partial', sc:'ba' },
  { no:'PO-02340', date:'02 Jun 2026', supplier:'Gulf Chemicals', items:2, total:'AED 3,400', status:'Received', sc:'bg' },
  { no:'PO-02339', date:'01 Jun 2026', supplier:'Mapei Arabia', items:6, total:'AED 12,600', status:'Open', sc:'bb' },
  { no:'PO-02338', date:'30 May 2026', supplier:'Dubai Building Supplies', items:3, total:'AED 5,100', status:'Cancelled', sc:'br' },
]

export default function PurchaseOrderPage() {
  const [view, setView] = useState<'list'|'form'>('list')

  if (view === 'list') return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">Purchase Orders</div><div className="ps">Manage purchase orders</div></div>
        <button className="btn btn-purple" onClick={() => setView('form')}>＋ New PO</button>
      </div>
      <div className="tc">
        <div className="tc-h"><div className="tc-t">All Purchase Orders</div><button className="view-all-btn">Export</button></div>
        <table className="lt">
          <thead><tr><th>PO No.</th><th>Date</th><th>Supplier</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {POS.map(p => (
              <tr key={p.no}>
                <td className="td-link">{p.no}</td><td>{p.date}</td><td>{p.supplier}</td><td>{p.items}</td><td>{p.total}</td>
                <td><span className={`badge ${p.sc}`}>{p.status}</span></td>
                <td><button className="btn btn-outline btn-sm" onClick={() => setView('form')}>✏ Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ERPLayout>
  )

  return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">New Purchase Order</div><div className="ps">Transactions › Purchase Order</div></div>
        <div className="btn-row">
          <button className="btn btn-teal" onClick={() => { alert('PO Saved!'); setView('list') }}>✔ Save</button>
          <button className="btn btn-purple" onClick={() => alert('PO Posted!')}>📤 Post</button>
          <button className="btn btn-outline" onClick={() => setView('list')}>← Back</button>
        </div>
      </div>

      <div className="sec">
        <div className="sec-hdr">🛒 Purchase Order Header</div>
        <div className="sec-body">
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field"><label>PO Number</label><input type="text" value="PO-02342" readOnly /></div>
            <div className="field"><label>PO Date</label><input type="date" defaultValue={new Date().toISOString().split('T')[0]} /></div>
            <div className="field"><label>Supplier</label>
              <select><option value="">— Select —</option><option>Al Noor Steel</option><option>Gulf Chemicals LLC</option><option>Mapei Arabia</option><option>Dubai Building Supplies</option></select>
            </div>
            <div className="field"><label>Warehouse</label>
              <select><option>Dubai Main</option><option>Abu Dhabi</option><option>Sharjah</option></select>
            </div>
          </div>
          <div className="fg g4">
            <div className="field"><label>Expected Delivery</label><input type="date" /></div>
            <div className="field"><label>Payment Terms</label>
              <select><option>Net 30</option><option>Net 60</option><option>Cash</option><option>LC</option></select>
            </div>
            <div className="field s2"><label>Remarks</label><input type="text" placeholder="Optional remarks" /></div>
          </div>
        </div>
      </div>

      <div className="sec">
        <div className="sec-hdr teal">📋 Order Lines</div>
        <div className="sec-body">
          <div style={{ overflowX:'auto' }}>
            <table className="dt">
              <thead>
                <tr><th>#</th><th>Item Code</th><th>Item Name</th><th>Unit</th><th>Qty Ordered</th><th>Unit Cost</th><th>Total</th><th>Remarks</th></tr>
              </thead>
              <tbody>
                {[1,2,3].map(i => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td><input type="text" placeholder="ITM-XXXX" style={{ width:90 }} /></td>
                    <td><input type="text" placeholder="Item name" /></td>
                    <td><select style={{ width:70 }}><option>PCS</option><option>KG</option><option>BOX</option><option>MTR</option></select></td>
                    <td><input type="number" defaultValue="0" style={{ width:80 }} /></td>
                    <td><input type="number" defaultValue="0.000" step="0.001" style={{ width:90 }} /></td>
                    <td><input type="number" defaultValue="0.00" readOnly style={{ background:'var(--opl)', width:90 }} /></td>
                    <td><input type="text" placeholder="Remarks" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-row" style={{ marginTop:10, justifyContent:'space-between' }}>
            <button className="btn btn-outline btn-sm">+ Add Line</button>
            <div style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>Total: <span style={{ color:'var(--op)', fontSize:18 }}>AED 0.00</span></div>
          </div>
        </div>
      </div>
    </ERPLayout>
  )
}
