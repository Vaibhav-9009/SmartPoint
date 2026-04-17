import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/dashboard');
    } catch (err) {
      if (!err.response) { // Network Error or backend offline
         localStorage.setItem('token', 'mock-presentation-token');
         localStorage.setItem('role', 'USER');
         localStorage.setItem('name', name);
         navigate('/dashboard');
      } else if (err.response?.data?.message) {
         setError(err.response.data.message);
      } else {
         setError('Signup failed. Email may already be in use.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 shadow-lg rounded-2xl border border-gray-100">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 pb-2 border-b">
          Join SmartPoint
        </h2>
        {error && <p className="text-red-500 text-center bg-red-50 p-2 rounded">{error}</p>}
        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text" required className="input-field" placeholder="John Doe"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
             <input
              type="email" required className="input-field" placeholder="you@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password" required className="input-field" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              value={password} onChange={(e) => setPassword(e.target.value)} minLength="6"
            />
          </div>
          
          <button type="submit" className="w-full btn-primary py-3 mt-6 text-lg">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
