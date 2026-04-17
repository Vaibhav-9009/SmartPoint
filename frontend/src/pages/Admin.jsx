import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tab, setTab] = useState('products');
  const [form, setForm] = useState({ name:'', description:'', price:'', stock:'', imageUrl:'', categoryId:'' });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get('/products').then(r => setProducts(r.data));
    API.get('/orders').then(r => setOrders(r.data));
    API.get('/categories').then(r => setCategories(r.data));
  }, []);

  const saveProduct = async () => {
    try {
      const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock), categoryId: form.categoryId || null };
      if (editId) { const r = await API.put(`/products/${editId}`, payload); setProducts(p => p.map(x => x.id === editId ? r.data : x)); }
      else { const r = await API.post('/products', payload); setProducts(p => [...p, r.data]); }
      setForm({ name:'', description:'', price:'', stock:'', imageUrl:'', categoryId:'' }); setEditId(null);
      setMsg('Product saved!'); setTimeout(() => setMsg(''), 3000);
    } catch (e) { setMsg('Error: ' + (e.response?.data?.error || e.message)); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await API.delete(`/products/${id}`);
    setProducts(p => p.filter(x => x.id !== id));
  };

  const updateOrderStatus = async (id, status) => {
    const r = await API.put(`/orders/${id}/status`, null, { params: { status } });
    setOrders(o => o.map(x => x.id === id ? r.data : x));
  };

  const startEdit = (p) => { setEditId(p.id); setForm({ name:p.name, description:p.description||'', price:p.price, stock:p.stock, imageUrl:p.imageUrl||'', categoryId:'' }); setTab('products'); };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Admin Dashboard</h2>
      <div style={styles.tabs}>
        {['products','orders'].map(t => (
          <button key={t} style={{ ...styles.tab, ...(tab === t ? styles.activeTab : {}) }} onClick={() => setTab(t)}>
            {t === 'products' ? `🛍 Products (${products.length})` : `📦 Orders (${orders.length})`}
          </button>
        ))}
      </div>

      {tab === 'products' && (
        <div>
          {/* Product Form */}
          <div style={styles.formBox}>
            <h3 style={styles.formTitle}>{editId ? 'Edit Product' : 'Add New Product'}</h3>
            {msg && <div style={{ ...styles.msg, background: msg.startsWith('Error') ? '#ffeaea' : '#eafaf1', color: msg.startsWith('Error') ? '#c0392b' : '#27ae60' }}>{msg}</div>}
            <div style={styles.formGrid}>
              {[['name','Product Name','text'],['price','Price','number'],['stock','Stock','number'],['imageUrl','Image URL','text']].map(([key, label, type]) => (
                <div key={key}>
                  <label style={styles.label}>{label}</label>
                  <input style={styles.input} type={type} placeholder={label}
                    value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                </div>
              ))}
            </div>
            <div>
              <label style={styles.label}>Category</label>
              <select style={styles.input} value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={styles.label}>Description</label>
              <textarea style={{ ...styles.input, resize:'vertical' }} rows={2} placeholder="Description"
                value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div style={{ display:'flex', gap:'10px' }}>
              <button style={styles.saveBtn} onClick={saveProduct}>{editId ? 'Update' : 'Add Product'}</button>
              {editId && <button style={styles.cancelBtn} onClick={() => { setEditId(null); setForm({ name:'', description:'', price:'', stock:'', imageUrl:'', categoryId:'' }); }}>Cancel</button>}
            </div>
          </div>

          {/* Products Table */}
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr style={styles.thead}>
                {['ID','Name','Price','Stock','Category','Actions'].map(h => <th key={h} style={styles.th}>{h}</th>)}
              </tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={styles.tr}>
                    <td style={styles.td}>{p.id}</td>
                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>₹{p.price}</td>
                    <td style={styles.td}><span style={{ color: p.stock > 0 ? '#27ae60' : '#e74c3c' }}>{p.stock}</span></td>
                    <td style={styles.td}>{p.categoryName || '—'}</td>
                    <td style={styles.td}>
                      <button style={styles.editBtn} onClick={() => startEdit(p)}>Edit</button>
                      <button style={styles.delBtn} onClick={() => deleteProduct(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead><tr style={styles.thead}>
              {['ID','Customer','Total','Status','Date','Update Status'].map(h => <th key={h} style={styles.th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={styles.tr}>
                  <td style={styles.td}>#{o.id}</td>
                  <td style={styles.td}>{o.customerName}</td>
                  <td style={styles.td}>₹{o.totalAmount?.toFixed(2)}</td>
                  <td style={styles.td}><span style={{ color: o.status === 'DELIVERED' ? '#27ae60' : o.status === 'CANCELLED' ? '#e74c3c' : '#f39c12', fontWeight:600 }}>{o.status}</span></td>
                  <td style={styles.td}>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    <select style={styles.statusSelect} value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value)}>
                      {['PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding:'32px', maxWidth:'1100px', margin:'0 auto' },
  title: { fontSize:'1.8rem', color:'#1a1a2e', marginBottom:'20px' },
  tabs: { display:'flex', gap:'12px', marginBottom:'24px' },
  tab: { padding:'10px 24px', borderRadius:'8px', border:'2px solid #ddd', background:'#fff', cursor:'pointer', fontWeight:'600', color:'#666' },
  activeTab: { background:'#1a1a2e', color:'#fff', borderColor:'#1a1a2e' },
  formBox: { background:'#fff', borderRadius:'12px', padding:'24px', marginBottom:'24px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)' },
  formTitle: { margin:'0 0 16px', color:'#1a1a2e' },
  formGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' },
  label: { display:'block', marginBottom:'6px', fontWeight:'500', color:'#444', fontSize:'0.9rem' },
  input: { width:'100%', padding:'9px 12px', borderRadius:'8px', border:'1.5px solid #ddd', fontSize:'0.9rem', boxSizing:'border-box', outline:'none', marginBottom:'8px' },
  msg: { padding:'10px', borderRadius:'8px', marginBottom:'14px', fontSize:'0.9rem' },
  saveBtn: { padding:'9px 24px', background:'#e94560', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600' },
  cancelBtn: { padding:'9px 24px', background:'#eee', color:'#555', border:'none', borderRadius:'8px', cursor:'pointer' },
  tableWrap: { background:'#fff', borderRadius:'12px', overflow:'auto', boxShadow:'0 2px 10px rgba(0,0,0,0.08)' },
  table: { width:'100%', borderCollapse:'collapse' },
  thead: { background:'#1a1a2e' },
  th: { padding:'12px 16px', color:'#fff', textAlign:'left', fontSize:'0.9rem', fontWeight:'600' },
  tr: { borderBottom:'1px solid #f0f0f0' },
  td: { padding:'12px 16px', fontSize:'0.9rem', color:'#444' },
  editBtn: { background:'#3498db', color:'#fff', border:'none', padding:'5px 12px', borderRadius:'6px', cursor:'pointer', marginRight:'6px', fontSize:'0.8rem' },
  delBtn: { background:'#e74c3c', color:'#fff', border:'none', padding:'5px 12px', borderRadius:'6px', cursor:'pointer', fontSize:'0.8rem' },
  statusSelect: { padding:'5px 10px', borderRadius:'6px', border:'1px solid #ddd', fontSize:'0.85rem', cursor:'pointer' },
};

export default Admin;
