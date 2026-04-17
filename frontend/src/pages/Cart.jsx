import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQty, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div style={styles.empty}>
      <span style={{ fontSize:'4rem' }}>🛒</span>
      <h2>Your cart is empty</h2>
      <button style={styles.shopBtn} onClick={() => navigate('/products')}>Start Shopping</button>
    </div>
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Shopping Cart ({cart.length} items)</h2>
      <div style={styles.layout}>
        <div style={styles.items}>
          {cart.map(item => (
            <div key={item.id} style={styles.card}>
              <img src={item.imageUrl || `https://via.placeholder.com/90x90?text=${encodeURIComponent(item.name)}`}
                alt={item.name} style={styles.img} />
              <div style={styles.details}>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.price}>₹{item.price.toFixed(2)} each</p>
                <div style={styles.qtyRow}>
                  <button style={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                  <span style={styles.qty}>{item.qty}</span>
                  <button style={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>
              <div style={styles.right}>
                <p style={styles.subtotal}>₹{(item.price * item.qty).toFixed(2)}</p>
                <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑 Remove</button>
              </div>
            </div>
          ))}
          <button style={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
        </div>
        <div style={styles.summary}>
          <h3 style={styles.summTitle}>Order Summary</h3>
          {cart.map(i => (
            <div key={i.id} style={styles.summRow}>
              <span>{i.name} × {i.qty}</span>
              <span>₹{(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr style={{ margin:'16px 0', borderColor:'#eee' }} />
          <div style={{ ...styles.summRow, fontWeight:'bold', fontSize:'1.1rem' }}>
            <span>Total</span><span style={{ color:'#e94560' }}>₹{total.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutBtn}
            onClick={() => user ? navigate('/checkout') : navigate('/login')}>
            {user ? 'Proceed to Checkout' : 'Login to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding:'32px', maxWidth:'1100px', margin:'0 auto' },
  title: { fontSize:'1.8rem', color:'#1a1a2e', marginBottom:'24px' },
  layout: { display:'grid', gridTemplateColumns:'1fr 340px', gap:'28px', alignItems:'start' },
  items: { display:'flex', flexDirection:'column', gap:'16px' },
  card: { display:'flex', gap:'16px', background:'#fff', borderRadius:'12px', padding:'16px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)', alignItems:'center' },
  img: { width:'90px', height:'90px', objectFit:'cover', borderRadius:'8px' },
  details: { flex:1 },
  name: { margin:'0 0 6px', color:'#1a1a2e', fontSize:'1rem' },
  price: { color:'#888', margin:'0 0 8px', fontSize:'0.9rem' },
  qtyRow: { display:'flex', alignItems:'center', gap:'10px' },
  qtyBtn: { background:'#1a1a2e', color:'#fff', border:'none', width:'28px', height:'28px', borderRadius:'50%', cursor:'pointer', fontSize:'1rem' },
  qty: { fontWeight:'bold', minWidth:'20px', textAlign:'center' },
  right: { textAlign:'right' },
  subtotal: { fontWeight:'bold', fontSize:'1.1rem', color:'#1a1a2e', margin:'0 0 8px' },
  removeBtn: { background:'none', border:'1px solid #e74c3c', color:'#e74c3c', padding:'5px 10px', borderRadius:'6px', cursor:'pointer', fontSize:'0.8rem' },
  clearBtn: { background:'none', border:'1px solid #ccc', color:'#888', padding:'8px 16px', borderRadius:'8px', cursor:'pointer', alignSelf:'flex-start' },
  summary: { background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)', position:'sticky', top:'80px' },
  summTitle: { fontSize:'1.2rem', color:'#1a1a2e', margin:'0 0 16px' },
  summRow: { display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'0.9rem', color:'#555' },
  checkoutBtn: { width:'100%', padding:'13px', background:'#e94560', color:'#fff', border:'none', borderRadius:'10px', fontSize:'1rem', fontWeight:'600', cursor:'pointer', marginTop:'16px' },
  empty: { textAlign:'center', padding:'80px 20px', display:'flex', flexDirection:'column', alignItems:'center', gap:'16px' },
  shopBtn: { background:'#e94560', color:'#fff', border:'none', padding:'12px 28px', borderRadius:'8px', cursor:'pointer', fontSize:'1rem', fontWeight:'600' },
};

export default Cart;
