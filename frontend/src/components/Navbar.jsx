import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🛒 ShopEase</Link>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        {user ? (
          <>
            <Link to="/cart" style={styles.link}>Cart {itemCount > 0 && <span style={styles.badge}>{itemCount}</span>}</Link>
            <Link to="/orders" style={styles.link}>My Orders</Link>
            {user.role === 'ADMIN' && <Link to="/admin" style={styles.link}>Admin</Link>}
            <span style={styles.username}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btnLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 32px', background:'#1a1a2e', color:'#fff', position:'sticky', top:0, zIndex:100, boxShadow:'0 2px 10px rgba(0,0,0,0.3)' },
  brand: { color:'#e94560', fontWeight:'bold', fontSize:'1.4rem', textDecoration:'none' },
  links: { display:'flex', alignItems:'center', gap:'20px' },
  link: { color:'#eee', textDecoration:'none', fontSize:'0.95rem' },
  badge: { background:'#e94560', color:'#fff', borderRadius:'50%', padding:'1px 6px', fontSize:'0.75rem', marginLeft:'4px' },
  username: { color:'#aaa', fontSize:'0.9rem' },
  btn: { background:'#e94560', color:'#fff', border:'none', padding:'7px 16px', borderRadius:'6px', cursor:'pointer', fontSize:'0.9rem' },
  btnLink: { background:'#e94560', color:'#fff', padding:'7px 16px', borderRadius:'6px', textDecoration:'none', fontSize:'0.9rem' },
};

export default Navbar;
