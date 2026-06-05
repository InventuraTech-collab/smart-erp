'use client'
import { useState } from 'react'
import ERPLayout from '@/components/ERPLayout'

const ITEMS = [
  { code:'ITM-0001', name:'Cement OPC 50kg', arabic:'اسمنت عادي', size:'50KG', division:'GENERAL', vat:'5%', unit:'BAG', cost:'18.500', margin:'12.0', rate:'20.720', stock:'450', status:'Active' },
  { code:'ITM-0002', name:'Steel Rebar 12mm', arabic:'حديد تسليح', size:'12MM', division:'HARDWARE', vat:'5%', unit:'KG', cost:'3.200', margin:'8.0', rate:'3.456', stock:'1240', status:'Active' },
  { code:'ITM-0003', name:'Paint Primer White 4L', arabic:'طلاء أساس', size:'4L', division:'PAINT', vat:'5%', unit:'TIN', cost:'22.000', margin:'15.0', rate:'25.300', stock:'120', status:'Active' },
  { code:'ITM-0004', name:'PVC Pipe 3 inch 6m', arabic:'أنبوب بلاستيكي', size:'3"', division:'PLUMBING', vat:'5%', unit:'PCS', cost:'14.750', margin:'10.0', rate:'16.225', stock:'85', status:'Low' },
]

type Item = typeof ITEMS[0]

export default function ItemMasterPage() {
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [form, setForm] = useState({ barcode:'', code:'', nameEn:'', nameAr:'', size:'', division:'GENERAL', supplier:'', supplierName:'', listedDate: new Date().toISOString().split('T')[0], vat:'VAT 5%', unit:'PCS', purCost:'0.00000', margin:'0.000', rtRate:'0.000', rtRateVat:'0.000', minRate:'0.000', expStatus:false, weighingItem:false, repackingCost:false, consigItem:false, belowCostSale:false, generalItem:true })

  function openNew() { setEditItem(null); setView('form') }
  function openEdit(item: Item) { setEditItem(item); setView('form') }
  function f(k: string, v: string | boolean) { setForm(p => ({ ...p, [k]: v })) }

  if (view === 'list') return (
    <ERPLayout>
      <div className="ph">
        <div><div className="pt">Item Master</div><div className="ps">Manage all inventory items</div></div>
        <div className="btn-row">
          <button className="btn btn-purple" onClick={openNew}>＋ New Item</button>
          <button className="btn btn-outline">⬇ Export</button>
        </div>
      </div>

      {/* Search bar */}
      <div className="sec" style={{ marginBottom: '1rem' }}>
        <div className="sec-body" style={{ padding: '12px 16px' }}>
          <div className="fg g4" style={{ alignItems: 'flex-end' }}>
            <div className="field"><label>Search</label><input type="text" placeholder="Name, code or barcode…" /></div>
            <div className="field"><label>Division</label>
              <select><option value="">All</option><option>GENERAL</option><option>HARDWARE</option><option>PAINT</option><option>PLUMBING</option><option>ELECTRICAL</option></select>
            </div>
            <div className="field"><label>Status</label>
              <select><option value="">All</option><option>Active</option><option>Low</option><option>Inactive</option></select>
            </div>
            <button className="btn btn-teal">🔍 Search</button>
          </div>
        </div>
      </div>

      <div className="tc">
        <div className="tc-h"><div className="tc-t">Items ({ITEMS.length})</div></div>
        <table className="lt">
          <thead>
            <tr><th>Code</th><th>Name (English)</th><th>Name (Arabic)</th><th>Division</th><th>Unit</th><th>Purchase Cost</th><th>Margin %</th><th>RT Rate</th><th>Stock</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {ITEMS.map(item => (
              <tr key={item.code}>
                <td className="td-link" onClick={() => openEdit(item)}>{item.code}</td>
                <td>{item.name}</td>
                <td style={{ direction:'rtl', fontFamily:'Arial' }}>{item.arabic}</td>
                <td>{item.division}</td>
                <td>{item.unit}</td>
                <td>{item.cost}</td>
                <td>{item.margin}%</td>
                <td>{item.rate}</td>
                <td style={{ color: item.stock < '100' ? '#a32d2d' : '#1a7a4a', fontWeight:600 }}>{item.stock}</td>
                <td><span className={`badge ${item.status === 'Active' ? 'bg' : 'ba'}`}>{item.status}</span></td>
                <td>
                  <div className="btn-row">
                    <button className="btn btn-outline btn-sm" onClick={() => openEdit(item)}>✏ Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ERPLayout>
  )

  // FORM VIEW
  return (
    <ERPLayout>
      <div className="ph">
        <div>
          <div className="pt">{editItem ? `Edit: ${editItem.name}` : 'New Item'}</div>
          <div className="ps">Item Master › {editItem ? 'Edit' : 'Create'}</div>
        </div>
        <div className="btn-row">
          <button className="btn btn-teal" onClick={() => { alert('Item saved!'); setView('list') }}>✔ Save</button>
          <button className="btn btn-outline" onClick={() => setView('list')}>← Back to List</button>
          <button className="btn btn-outline">🖨 Print Barcode</button>
        </div>
      </div>

      {/* Section 1: Item Details */}
      <div className="sec">
        <div className="sec-hdr">📦 Item Details</div>
        <div className="sec-body">
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field s2"><label>Barcode</label><input type="text" placeholder="Scan or enter barcode" value={form.barcode} onChange={e => f('barcode', e.target.value)} /></div>
            <div className="field"><label>Code</label><input type="text" placeholder="Item code" value={form.code} onChange={e => f('code', e.target.value)} /></div>
            <div className="field"><label>Supplier</label>
              <select value={form.supplier} onChange={e => f('supplier', e.target.value)}>
                <option value="">— Select —</option>
                <option>Gulf Chemicals LLC</option><option>Al Noor Steel</option><option>Mapei Arabia</option><option>Dubai Building Supplies</option>
              </select>
            </div>
          </div>
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field s2"><label>Name (English)</label><input type="text" className="hl" placeholder="Item name in English" value={form.nameEn} onChange={e => f('nameEn', e.target.value)} /></div>
            <div className="field s2"><label>Supplier Name</label><input type="text" placeholder="Supplier display name" value={form.supplierName} onChange={e => f('supplierName', e.target.value)} /></div>
          </div>
          <div className="fg g4" style={{ marginBottom:12 }}>
            <div className="field s2"><label>Name (Arabic)</label><input type="text" className="hl" placeholder="اسم الصنف بالعربي" value={form.nameAr} onChange={e => f('nameAr', e.target.value)} style={{ direction:'rtl' }} /></div>
            <div className="field"><label>Listed Date</label><input type="date" value={form.listedDate} onChange={e => f('listedDate', e.target.value)} /></div>
            <div className="field"><label>Current Stock</label><input type="number" value="0.000" readOnly /></div>
          </div>
          <div className="fg g4">
            <div className="field"><label>Size</label>
              <select value={form.size} onChange={e => f('size', e.target.value)}>
                <option value="">— Select —</option><option>Small</option><option>Medium</option><option>Large</option><option>XL</option><option>Custom</option>
              </select>
            </div>
            <div className="field"><label>Division</label>
              <select value={form.division} onChange={e => f('division', e.target.value)}>
                <option>GENERAL</option><option>ELECTRICAL</option><option>PLUMBING</option><option>HARDWARE</option><option>PAINT</option>
              </select>
            </div>
            <div className="field"><label>Last Purchase Date</label><input type="date" /></div>
            <div className="field"><label>VAT</label>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
                <select style={{ flex:1, height:36, border:'1.5px solid var(--border)', borderRadius:7, padding:'0 10px', fontFamily:'inherit', outline:'none' }}>
                  <option>VAT 5%</option><option>VAT 0%</option><option>Exempt</option>
                </select>
                <div className="vat-badge"><div className="vat-dot" />Enabled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Base Unit Pricing */}
      <div className="sec">
        <div className="sec-hdr">💰 Base Unit Pricing</div>
        <div className="sec-body">
          <div style={{ overflowX:'auto' }}>
            <table className="dt">
              <thead>
                <tr>
                  <th>Base Unit</th><th>Pur Cost</th><th>Margin %</th><th>RT Rate</th><th>RT Rate+VAT</th><th>Min Rate</th><th>Diff</th><th>Barcode</th><th>Avg Cost</th><th>GRN Flag</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><select style={{ width:80 }}><option>PCS</option><option>BOX</option><option>KG</option><option>LITR</option><option>MTR</option></select></td>
                  <td><input type="number" defaultValue="0.00000" step="0.00001" /></td>
                  <td><input type="number" defaultValue="0.000" /></td>
                  <td><input type="number" defaultValue="0.000" /></td>
                  <td><input type="number" defaultValue="0.000" /></td>
                  <td><input type="number" defaultValue="0.000" style={{ background:'#fff8e1' }} /></td>
                  <td><input type="number" defaultValue="0.000" /></td>
                  <td><input type="text" placeholder="Barcode" /></td>
                  <td><input type="number" defaultValue="0.00" readOnly style={{ background:'var(--opl)' }} /></td>
                  <td style={{ textAlign:'center' }}><input type="checkbox" defaultChecked style={{ accentColor:'var(--og)', width:16, height:16 }} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="divider" />
          <div style={{ fontSize:12, fontWeight:700, color:'var(--opd)', marginBottom:6, textTransform:'uppercase', letterSpacing:.5 }}>Attributes</div>
          <div className="cb-row">
            {['Exp. Status','Weighing Item','Repacking Cost','Consig. Item','Below Cost Sale','Acc. Status','General Item'].map(a => (
              <label key={a} className="cb-item"><input type="checkbox" defaultChecked={a==='General Item'} /> {a}</label>
            ))}
          </div>
          <div className="divider" />
          <div className="btn-row">
            <button className="btn btn-red btn-sm">🧮 Cost Calculator</button>
            <button className="btn btn-outline btn-sm">+ Add Row</button>
          </div>
        </div>
      </div>

      {/* Section 3: Alternative Unit */}
      <div className="sec">
        <div className="sec-hdr teal">🔄 Alternative Unit</div>
        <div className="sec-body">
          <div style={{ overflowX:'auto' }}>
            <table className="dt">
              <thead>
                <tr><th>Alt Unit</th><th>Base Qty</th><th>Pur Cost</th><th>Margin %</th><th>RT Rate</th><th>RT Rate+VAT</th><th>Min Rate</th><th>Diff</th><th>Barcode</th><th>Avg Cost</th><th>GRN Flag</th></tr>
              </thead>
              <tbody>
                {[0, 1].map(i => (
                  <tr key={i}>
                    <td><select style={{ width:80 }}><option value="">—</option><option>BOX</option><option>CRATE</option><option>BAG</option><option>PALLET</option></select></td>
                    <td><input type="number" defaultValue="0" /></td>
                    <td><input type="number" defaultValue="0.00000" step="0.00001" /></td>
                    <td><input type="number" defaultValue="0.000" /></td>
                    <td><input type="number" defaultValue="0.000" /></td>
                    <td><input type="number" defaultValue="0.000" /></td>
                    <td><input type="number" defaultValue="0.000" style={{ background:'#fff8e1' }} /></td>
                    <td><input type="number" defaultValue="0.000" /></td>
                    <td><input type="text" placeholder="Barcode" /></td>
                    <td><input type="number" defaultValue="0.00" readOnly style={{ background:'var(--opl)' }} /></td>
                    <td style={{ textAlign:'center' }}><input type="checkbox" style={{ accentColor:'var(--og)', width:16, height:16 }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-outline btn-sm" style={{ marginTop:10 }}>+ Add Alt Unit</button>
        </div>
      </div>

      {/* Section 4: Unit Fraction */}
      <div className="sec">
        <div className="sec-hdr">📐 Unit Fraction Detail</div>
        <div className="sec-body">
          <div style={{ overflowX:'auto' }}>
            <table className="dt">
              <thead>
                <tr><th>#</th><th>Unit</th><th>Fraction</th><th>Pur Cost</th><th>Margin %</th><th>Avg Cost</th><th>Cost Change</th><th>Min Rate+VAT</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td><td><input type="text" defaultValue="PCS" /></td><td><input type="number" defaultValue="1.000" /></td>
                  <td><input type="number" defaultValue="0.00000" step="0.00001" /></td><td><input type="number" defaultValue="0.000" /></td>
                  <td><input type="number" defaultValue="0.00" readOnly style={{ background:'var(--opl)' }} /></td>
                  <td><input type="number" defaultValue="0.00" /></td><td><input type="number" defaultValue="0.000" /></td>
                </tr>
                <tr>
                  <td>2</td><td><input type="text" placeholder="Unit" /></td><td><input type="number" defaultValue="0.000" /></td>
                  <td><input type="number" defaultValue="0.00000" step="0.00001" /></td><td><input type="number" defaultValue="0.000" /></td>
                  <td><input type="number" defaultValue="0.00" readOnly style={{ background:'var(--opl)' }} /></td>
                  <td><input type="number" defaultValue="0.00" /></td><td><input type="number" defaultValue="0.000" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="btn-row" style={{ marginTop:4, justifyContent:'space-between' }}>
        <div className="btn-row">
          <button className="btn btn-teal" onClick={() => { alert('Saved!'); setView('list') }}>✔ Save Item</button>
          <button className="btn btn-purple" onClick={openNew}>＋ New Item</button>
          <button className="btn btn-outline" onClick={() => setView('list')}>☰ Item List</button>
          <button className="btn btn-outline">🖨 Print Barcode</button>
        </div>
        <span className="badge bp">Draft</span>
      </div>
    </ERPLayout>
  )
}
