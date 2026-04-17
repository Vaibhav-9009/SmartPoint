import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get('/products'), API.get('/categories')])
      .then(([p, c]) => { setProducts(p.data); setCategories(c.data); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCat === '' || p.categoryName === selectedCat)
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>All Products</h2>
      <div style={styles.filters}>
        <input style={styles.search} placeholder="🔍 Search products..."
          value={search} onChange={e => setSearch(e.target.value)} />
        <select style={styles.select} value={selectedCat} onChange={e => setSelectedCat(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>
      {loading ? <p style={{ textAlign:'center' }}>Loading...</p> : (
        filtered.length === 0
          ? <p style={{ textAlign:'center', color:'#888' }}>No products found.</p>
          : <div style={styles.grid}>{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </div>
  );
};

const styles = {
  page: { padding:'32px' },
  title: { color:'#1a1a2e', fontSize:'2rem', marginBottom:'24px', textAlign:'center' },
  filters: { display:'flex', gap:'16px', marginBottom:'28px', flexWrap:'wrap', justifyContent:'center' },
  search: { padding:'10px 16px', borderRadius:'8px', border:'1.5px solid #ddd', fontSize:'0.95rem', minWidth:'280px', outline:'none' },
  select: { padding:'10px 16px', borderRadius:'8px', border:'1.5px solid #ddd', fontSize:'0.95rem', minWidth:'180px', outline:'none' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'24px' },
};

export default Products;
