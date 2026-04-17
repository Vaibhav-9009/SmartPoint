import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`).then(r => setProduct(r.data)).catch(() => navigate('/products'));
  }, [id]);

  if (!product) return <p style={{ textAlign:'center', padding:'40px' }}>Loading...</p>;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    navigate('/cart');
  };

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <div style={styles.container}>
        <img src={product.imageUrl || `https://via.placeholder.com/420x320?text=${encodeURIComponent(product.name)}`}
          alt={product.name} style={styles.img} />
        <div style={styles.info}>
          <span style={styles.category}>{product.categoryName || 'General'}</span>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.desc}>{product.description}</p>
          <p style={styles.price}>₹{product.price.toFixed(2)}</p>
          <p style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c', fontWeight:'600' }}>
            {product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
          </p>
          {product.stock > 0 && (
            <div style={styles.qtyRow}>
              <label style={{ fontWeight:'500' }}>Quantity:</label>
              <div style={styles.qtyControl}>
                <button style={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span style={styles.qtyVal}>{qty}</span>
                <button style={styles.qtyBtn} onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
            </div>
          )}
          <button style={{ ...styles.addBtn, opacity: product.stock === 0 ? 0.5 : 1 }}
            disabled={product.stock === 0} onClick={handleAdd}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding:'32px', maxWidth:'900px', margin:'0 auto' },
  back: { background:'none', border:'none', color:'#e94560', cursor:'pointer', fontSize:'1rem', marginBottom:'20px', padding:0 },
  container: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', alignItems:'start' },
  img: { width:'100%', borderRadius:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' },
  info: { display:'flex', flexDirection:'column', gap:'12px' },
  category: { color:'#e94560', fontSize:'0.8rem', textTransform:'uppercase', fontWeight:'600' },
  name: { fontSize:'1.8rem', color:'#1a1a2e', margin:0 },
  desc: { color:'#555', lineHeight:1.6 },
  price: { fontSize:'2rem', fontWeight:'bold', color:'#1a1a2e', margin:0 },
  qtyRow: { display:'flex', alignItems:'center', gap:'16px' },
  qtyControl: { display:'flex', alignItems:'center', gap:'12px' },
  qtyBtn: { background:'#1a1a2e', color:'#fff', border:'none', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontSize:'1.2rem' },
  qtyVal: { fontWeight:'bold', fontSize:'1.1rem', minWidth:'24px', textAlign:'center' },
  addBtn: { padding:'14px', background:'#e94560', color:'#fff', border:'none', borderRadius:'10px', fontSize:'1rem', fontWeight:'600', cursor:'pointer' },
};

export default ProductDetail;
