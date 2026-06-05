'use client'
import { useState } from 'react'
import ERPLayout from '@/components/ERPLayout'

const SUPPLIERS = [
  { code:'SUP-001', name:'Gulf Chemicals LLC', contact:'Ahmed Hassan', phone:'+971-4-345-6789', city:'Dubai', credit:'Net 30', balance:'AED 12,400', status:'Active' },
  { code:'SUP-002', name:'Al Noor Steel Trading', contact:'Mohammed Al Ali', phone:'+971-2-678-9012', city:'Abu Dhabi', credit:'Net 60', balance:'AED 28,900', status:'Active' },
  { code:'SUP-003', name:'Mapei Arabia FZCO', contact:'Priya Kumar', phone:'+971-6-234-5678', city:'Sharjah', credit:'Cash', balance:'AED 0', status:'Active' },
  { code:'SUP-004', name:'Dubai Building Supplies', contact:'Rajan Nair', phone:'+971-4-567-8901', city:'Dubai', credit:'Net 30', balance:'AED 5,200', status:'Inactive' },
]

export default function SupplierMasterPage() {
  const [view, setView] = useState<'list'|'form'>('list')

  if (view === 'list') return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">Supplier Master</div><div className="ps">Manage suppliers and vendors</div></div>
        <button className="btn btn-purple" onClick={() => setView('form')}>＋ New Supplier</button>
      </div>
      <div className="tc">
        <div className="tc-h"><div className="tc-t">Suppliers ({SUPPLIERS.length})</div></div>
        <table className="lt">
          <thead><tr><th>Code</th><th>Supplier Name</th><th>Contact</th><th>Phone</th><th>City</th><th>Credit Terms</th><th>Balance</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {SUPPLIERS.map(s => (
              <tr key={s.code}>
                <td className="td-link">{s.code}</td><td>{s.name}</td><td>{s.contact}</td><td>{s.phone}</td><td>{s.city}</td>
                <td>{s.credit}</td><td>{s.balance}</td>
                <td><span className={`badge ${s.status==='Active'?'bg':'br'}`}>{s.status}</span></td>
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
        <div><div className="pt">New Supplier</div><div className="ps">Supplier Master › Create</div></div>
        <div className="btn-row">
          <button className="btn btn-teal" onClick={() => { alert('Saved!'); setView('list') }}>✔ Save</button>
          <button className="btn btn-outline" onClick={() => setView('list')}>← Back</button>
        </div>
      </div>
      <div className="sec">
        <div className="sec-hdr">🏪 Supplier Details</div>
        <div className="sec-body">
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field"><label>Supplier Code</label><input type="text" placeholder="SUP-XXX" /></div>
            <div className="field s3"><label>Supplier Name</label><input type="text" placeholder="Full company name" /></div>
          </div>
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field s2"><label>Address</label><input type="text" placeholder="Street address" /></div>
            <div className="field"><label>City</label><input type="text" placeholder="City" /></div>
            <div className="field"><label>Country</label><select><option>UAE</option><option>India</option><option>Saudi Arabia</option><option>Oman</option></select></div>
          </div>
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field"><label>Contact Person</label><input type="text" placeholder="Name" /></div>
            <div className="field"><label>Phone</label><input type="tel" placeholder="+971-X-XXX-XXXX" /></div>
            <div className="field"><label>Email</label><input type="email" placeholder="email@company.com" /></div>
            <div className="field"><label>TRN / VAT No.</label><input type="text" placeholder="Tax registration no." /></div>
          </div>
          <div className="fg g4">
            <div className="field"><label>Credit Terms</label><select><option>Cash</option><option>Net 30</option><option>Net 60</option><option>Net 90</option><option>LC</option></select></div>
            <div className="field"><label>Credit Limit (AED)</label><input type="number" defaultValue="0.00" /></div>
            <div className="field"><label>Currency</label><select><option>AED</option><option>USD</option><option>INR</option><option>SAR</option></select></div>
            <div className="field"><label>Status</label><select><option>Active</option><option>Inactive</option></select></div>
          </div>
        </div>
      </div>
    </ERPLayout>
  )
}
