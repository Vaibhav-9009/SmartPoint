import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    API.get('/products').then(r => setFeatured(r.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to <span style={{ color:'#e94560' }}>ShopEase</span></h1>
        <p style={styles.heroSub}>Discover amazing products at unbeatable prices</p>
        <Link to="/products" style={styles.heroCta}>Shop Now →</Link>
      </div>

      {/* Features */}
      <div style={styles.features}>
        {[['🚚','Free Delivery','On orders above ₹499'],['🔒','Secure Payment','100% safe & secure'],['↩️','Easy Returns','7-day return policy'],['💬','24/7 Support','Always here for you']].map(([icon, title, sub]) => (
          <div key={title} style={styles.featureCard}>
            <span style={{ fontSize:'2rem' }}>{icon}</span>
            <strong>{title}</strong>
            <p style={{ color:'#666', fontSize:'0.85rem', margin:0 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      {featured.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          <div style={styles.grid}>
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div style={{ textAlign:'center', marginTop:'24px' }}>
            <Link to="/products" style={styles.viewAll}>View All Products →</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  hero: { background:'linear-gradient(135deg,#1a1a2e,#16213e)', color:'#fff', textAlign:'center', padding:'80px 20px' },
  heroTitle: { fontSize:'2.8rem', margin:'0 0 16px' },
  heroSub: { fontSize:'1.2rem', color:'#aaa', margin:'0 0 28px' },
  heroCta: { background:'#e94560', color:'#fff', padding:'14px 32px', borderRadius:'8px', textDecoration:'none', fontSize:'1.1rem', fontWeight:'600' },
  features: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'20px', padding:'40px 32px', background:'#f9f9f9' },
  featureCard: { background:'#fff', padding:'20px', borderRadius:'12px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.07)', display:'flex', flexDirection:'column', gap:'6px', alignItems:'center' },
  section: { padding:'40px 32px' },
  sectionTitle: { fontSize:'1.8rem', color:'#1a1a2e', marginBottom:'24px', textAlign:'center' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'24px' },
  viewAll: { color:'#e94560', fontWeight:'600', textDecoration:'none', fontSize:'1rem' },
};

export default Home;
