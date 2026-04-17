import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.sub}>Login to your ShopEase account</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" placeholder="you@email.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" placeholder="••••••••"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:'16px', color:'#666' }}>
          Don't have an account? <Link to="/register" style={{ color:'#e94560' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.sub}>Join ShopEase today</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {[['Name','text','Full name','name'],['Email','email','you@email.com','email'],['Password','password','Min 6 characters','password']].map(([label, type, placeholder, key]) => (
            <div key={key}>
              <label style={styles.label}>{label}</label>
              <input style={styles.input} type={type} placeholder={placeholder}
                value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required />
            </div>
          ))}
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:'16px', color:'#666' }}>
          Already have an account? <Link to="/login" style={{ color:'#e94560' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f5f5f5', padding:'20px' },
  card: { background:'#fff', padding:'40px', borderRadius:'16px', boxShadow:'0 4px 24px rgba(0,0,0,0.1)', width:'100%', maxWidth:'420px' },
  title: { margin:'0 0 6px', color:'#1a1a2e', fontSize:'1.8rem' },
  sub: { color:'#888', margin:'0 0 24px' },
  label: { display:'block', marginBottom:'6px', color:'#444', fontWeight:'500', fontSize:'0.9rem' },
  input: { width:'100%', padding:'11px 14px', borderRadius:'8px', border:'1.5px solid #ddd', fontSize:'0.95rem', marginBottom:'16px', boxSizing:'border-box', outline:'none' },
  btn: { width:'100%', padding:'12px', background:'#e94560', color:'#fff', border:'none', borderRadius:'8px', fontSize:'1rem', fontWeight:'600', cursor:'pointer' },
  error: { background:'#ffeaea', color:'#c0392b', padding:'10px 14px', borderRadius:'8px', marginBottom:'16px', fontSize:'0.9rem' },
};
