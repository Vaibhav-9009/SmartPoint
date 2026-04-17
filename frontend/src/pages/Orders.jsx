import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../services/api';

const statusColors = { PENDING:'#f39c12', CONFIRMED:'#3498db', SHIPPED:'#9b59b6', DELIVERED:'#27ae60', CANCELLED:'#e74c3c' };

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    API.get('/orders/my').then(r => setOrders(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign:'center', padding:'40px' }}>Loading orders...</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Orders</h2>
      {location.state?.success && (
        <div style={styles.success}>🎉 Order placed successfully! We'll confirm it shortly.</div>
      )}
      {orders.length === 0
        ? <p style={{ textAlign:'center', color:'#888', padding:'40px' }}>No orders yet.</p>
        : orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.header}>
              <div>
                <span style={styles.orderId}>Order #{order.id}</span>
                <span style={styles.date}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
              </div>
              <span style={{ ...styles.status, background: statusColors[order.status] + '22', color: statusColors[order.status] }}>
                {order.status}
              </span>
            </div>
            <div style={styles.items}>
              {order.items.map((item, i) => (
                <div key={i} style={styles.item}>
                  <span>{item.productName}</span>
                  <span style={{ color:'#888' }}>× {item.quantity}</span>
                  <span style={{ fontWeight:'600' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={styles.footer}>
              <span style={{ color:'#666', fontSize:'0.9rem' }}>📍 {order.shippingAddress}</span>
              <span style={styles.total}>Total: ₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))
      }
    </div>
  );
};

const styles = {
  page: { padding:'32px', maxWidth:'800px', margin:'0 auto' },
  title: { fontSize:'1.8rem', color:'#1a1a2e', marginBottom:'24px' },
  success: { background:'#eafaf1', color:'#27ae60', padding:'14px 18px', borderRadius:'10px', marginBottom:'24px', fontWeight:'500' },
  card: { background:'#fff', borderRadius:'12px', padding:'20px', marginBottom:'20px', boxShadow:'0 2px 10px rgba(0,0,0,0.08)' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' },
  orderId: { fontWeight:'bold', color:'#1a1a2e', fontSize:'1.05rem', marginRight:'12px' },
  date: { color:'#888', fontSize:'0.85rem' },
  status: { padding:'5px 12px', borderRadius:'20px', fontWeight:'600', fontSize:'0.85rem' },
  items: { borderTop:'1px solid #f0f0f0', paddingTop:'12px', display:'flex', flexDirection:'column', gap:'8px' },
  item: { display:'flex', justifyContent:'space-between', fontSize:'0.9rem', color:'#555', gap:'10px' },
  footer: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'14px', paddingTop:'12px', borderTop:'1px solid #f0f0f0' },
  total: { fontWeight:'bold', color:'#e94560', fontSize:'1.05rem' },
};

export default Orders;
