'use client'
import { useState } from 'react'
import ERPLayout from '@/components/ERPLayout'

const GRNS = [
  { no:'GRN-00842', date:'04 Jun 2026', po:'PO-02341', supplier:'Al Noor Steel', items:3, total:'AED 6,400', status:'Posted', sc:'bg' },
  { no:'GRN-00841', date:'01 Jun 2026', po:'PO-02339', supplier:'Mapei Arabia', items:2, total:'AED 2,200', status:'Draft', sc:'bp' },
  { no:'GRN-00840', date:'30 May 2026', po:'PO-02338', supplier:'Gulf Chemicals', items:5, total:'AED 9,800', status:'Posted', sc:'bg' },
]

export default function GRNPage() {
  const [view, setView] = useState<'list'|'form'>('list')

  if (view === 'list') return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">Goods Receipt Notes</div><div className="ps">Record items received from suppliers</div></div>
        <button className="btn btn-purple" onClick={() => setView('form')}>+ New GRN</button>
      </div>
      <div className="tc">
        <div className="tc-h"><div className="tc-t">All GRNs</div></div>
        <table className="lt">
          <thead><tr><th>GRN No.</th><th>Date</th><th>PO Ref</th><th>Supplier</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {GRNS.map(g => (
              <tr key={g.no}>
                <td className="td-link">{g.no}</td><td>{g.date}</td><td>{g.po}</td>
                <td>{g.supplier}</td><td>{g.items}</td><td>{g.total}</td>
                <td><span className={`badge ${g.sc}`}>{g.status}</span></td>
                <td><button className="btn btn-outline btn-sm" onClick={() => setView('form')}>Edit</button></td>
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
        <div><div className="pt">New Goods Receipt</div><div className="ps">Transactions › GRN</div></div>
        <div className="btn-row">
          <button className="btn btn-teal" onClick={() => { alert('GRN Saved!'); setView('list') }}>Save</button>
          <button className="btn btn-purple">Post</button>
          <button className="btn btn-outline" onClick={() => setView('list')}>Back</button>
        </div>
      </div>
      <div className="sec">
        <div className="sec-hdr">GRN Header</div>
        <div className="sec-body">
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field"><label>GRN No.</label><input type="text" defaultValue="GRN-00843" readOnly /></div>
            <div className="field"><label>GRN Date</label><input type="date" defaultValue={new Date().toISOString().split('T')[0]} /></div>
            <div className="field"><label>PO Reference</label>
              <select><option value="">Select PO</option><option>PO-02341</option><option>PO-02339</option></select>
            </div>
            <div className="field"><label>Supplier</label><input type="text" placeholder="Auto-filled from PO" /></div>
          </div>
          <div className="fg g4">
            <div className="field"><label>Invoice No.</label><input type="text" placeholder="Supplier invoice no." /></div>
            <div className="field"><label>Invoice Date</label><input type="date" /></div>
            <div className="field"><label>Warehouse</label>
              <select><option>Dubai Main</option><option>Abu Dhabi</option><option>Sharjah</option></select>
            </div>
            <div className="field"><label>Remarks</label><input type="text" placeholder="Remarks" /></div>
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="sec-hdr teal">Received Items</div>
        <div className="sec-body">
          <div style={{ overflowX:'auto' }}>
            <table className="dt">
              <thead>
                <tr><th>#</th><th>Item Code</th><th>Item Name</th><th>Unit</th><th>PO Qty</th><th>Received Qty</th><th>Unit Cost</th><th>Total</th></tr>
              </thead>
              <tbody>
                {[1,2,3].map(i => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td><input type="text" placeholder="ITM-XXXX" style={{ width:90 }} /></td>
                    <td><input type="text" placeholder="Item name" /></td>
                    <td><select style={{ width:70 }}><option>PCS</option><option>KG</option><option>BAG</option></select></td>
                    <td><input type="number" defaultValue="0" style={{ width:70, background:'var(--opl)' }} readOnly /></td>
                    <td><input type="number" defaultValue="0" style={{ width:80 }} /></td>
                    <td><input type="number" defaultValue="0.000" style={{ width:90 }} /></td>
                    <td><input type="number" defaultValue="0.00" style={{ width:90, background:'var(--opl)' }} readOnly /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-row" style={{ marginTop:10, justifyContent:'space-between' }}>
            <button className="btn btn-outline btn-sm">+ Add Line</button>
            <div style={{ fontSize:14, fontWeight:700 }}>Total: <span style={{ color:'var(--op)', fontSize:18 }}>AED 0.00</span></div>
          </div>
        </div>
      </div>
    </ERPLayout>
  )
}
