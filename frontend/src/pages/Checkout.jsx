import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../services/api';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) return setError('Please enter a shipping address.');
    setLoading(true); setError('');
    try {
      await API.post('/orders', {
        shippingAddress: address,
        items: cart.map(i => ({ productId: i.id, quantity: i.qty }))
      });
      clearCart();
      navigate('/orders', { state: { success: true } });
    } catch (err) {
      setError(err.response?.data?.error || 'Order failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Checkout</h2>
      <div style={styles.layout}>
        <div style={styles.formBox}>
          <h3 style={styles.sub}>Shipping Details</h3>
          {error && <div style={styles.error}>{error}</div>}
          <form onSubmit={handleOrder}>
            <label style={styles.label}>Full Shipping Address</label>
            <textarea style={styles.textarea} rows={4} placeholder="House No, Street, City, State, PIN"
              value={address} onChange={e => setAddress(e.target.value)} required />
            <button style={styles.btn} type="submit" disabled={loading}>
              {loading ? 'Placing Order...' : '✓ Place Order'}
            </button>
          </form>
        </div>
        <div style={styles.summary}>
          <h3 style={styles.sub}>Order Summary</h3>
          {cart.map(i => (
            <div key={i.id} style={styles.row}>
              <span>{i.name} × {i.qty}</span>
              <span>₹{(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr style={{ margin:'16px 0', borderColor:'#eee' }} />
          <div style={{ ...styles.row, fontWeight:'bold', fontSize:'1.1rem' }}>
            <span>Total</span>
            <span style={{ color:'#e94560' }}>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding:'32px', maxWidth:'900px', margin:'0 auto' },
  title: { fontSize:'1.8rem', color:'#1a1a2e', marginBottom:'24px' },
  layout: { display:'grid', gridTemplateColumns:'1fr 320px', gap:'28px' },
  formBox: { background:'#fff', borderRadius:'12px', padding:'28px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)' },
  sub: { fontSize:'1.1rem', color:'#1a1a2e', margin:'0 0 16px' },
  label: { display:'block', marginBottom:'8px', fontWeight:'500', color:'#444' },
  textarea: { width:'100%', padding:'12px', borderRadius:'8px', border:'1.5px solid #ddd', fontSize:'0.95rem', resize:'vertical', boxSizing:'border-box', marginBottom:'16px', outline:'none' },
  btn: { width:'100%', padding:'13px', background:'#e94560', color:'#fff', border:'none', borderRadius:'10px', fontSize:'1rem', fontWeight:'600', cursor:'pointer' },
  error: { background:'#ffeaea', color:'#c0392b', padding:'10px', borderRadius:'8px', marginBottom:'16px', fontSize:'0.9rem' },
  summary: { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)', alignSelf:'start' },
  row: { display:'flex', justifyContent:'space-between', marginBottom:'8px', color:'#555', fontSize:'0.9rem' },
};

export default Checkout;
