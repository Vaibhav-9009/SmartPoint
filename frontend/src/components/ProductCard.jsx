import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <div style={styles.imgWrapper} onClick={() => navigate(`/products/${product.id}`)}>
        <img
          src={product.imageUrl || `https://via.placeholder.com/280x180?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          style={styles.img}
        />
      </div>
      <div style={styles.body}>
        <p style={styles.category}>{product.categoryName || 'General'}</p>
        <h3 style={styles.name} onClick={() => navigate(`/products/${product.id}`)}>{product.name}</h3>
        <p style={styles.desc}>{product.description?.slice(0, 70)}...</p>
        <div style={styles.footer}>
          <span style={styles.price}>₹{product.price.toFixed(2)}</span>
          <span style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c', fontSize: '0.8rem' }}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </span>
        </div>
        <button
          style={{ ...styles.btn, opacity: product.stock === 0 ? 0.5 : 1 }}
          disabled={product.stock === 0}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: { background:'#fff', borderRadius:'12px', overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.1)', transition:'transform 0.2s', cursor:'pointer' },
  imgWrapper: { height:'180px', overflow:'hidden', background:'#f0f0f0' },
  img: { width:'100%', height:'100%', objectFit:'cover' },
  body: { padding:'14px' },
  category: { color:'#e94560', fontSize:'0.75rem', textTransform:'uppercase', margin:'0 0 4px' },
  name: { fontSize:'1rem', fontWeight:'600', margin:'0 0 6px', color:'#1a1a2e' },
  desc: { color:'#666', fontSize:'0.85rem', margin:'0 0 10px' },
  footer: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' },
  price: { fontWeight:'bold', color:'#1a1a2e', fontSize:'1.1rem' },
  btn: { width:'100%', padding:'9px', background:'#1a1a2e', color:'#fff', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600' },
};

export default ProductCard;
