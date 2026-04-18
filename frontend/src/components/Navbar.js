import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, MapPin, Search } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  const [activeAddress, setActiveAddress] = useState({ name: 'Vaibhav', loc: 'Bangalore 560001' });

  useEffect(() => {
     const checkAuth = () => {
        setToken(localStorage.getItem('token'));
        setRole(localStorage.getItem('role'));
     };
     window.addEventListener('authChange', checkAuth);
     return () => window.removeEventListener('authChange', checkAuth);
  }, []);

  useEffect(() => {
     const parseAddress = () => {
        const saved = JSON.parse(localStorage.getItem('smartpoint_addresses') || '[]');
        const defaultAddr = saved.find(a => a.isDefault) || saved[0];
        if (defaultAddr) {
            const lines = defaultAddr.details.split('\n');
            const name = (lines[0] || 'User').split(' ')[0];
            let loc = lines.length > 2 ? lines[2].substring(0, 15) + "..." : "Local Area";
            for (let l of lines) {
               if (l.match(/[0-9]{5,6}/)) {
                   loc = l.split(',')[0].trim() + " " + l.match(/[0-9]{5,6}/)[0];
                   break;
               }
            }
            setActiveAddress({ name, loc });
        } else {
            setActiveAddress({ name: 'Select', loc: 'Delivery Area' });
        }
     };
     parseAddress();
     window.addEventListener('addressUpdated', parseAddress);
     return () => window.removeEventListener('addressUpdated', parseAddress);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-stretch">
            <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                 <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden mix-blend-multiply">
                     <img src="/logo.png" alt="SmartPoint Logo" onError={(e) => e.target.style.display = 'none'} className="w-[120%] h-[120%] object-cover group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                 </div>
                 <span className="text-3xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">Smart<span className="text-blue-600">Point</span></span>
              </Link>
            </div>
            </div>
            
            <Link to="/dashboard#address" className="hidden md:flex ml-4 items-center px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors focus:outline-none w-48 border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md bg-white">
               <MapPin className="text-blue-600 w-6 h-6 mr-3 group-hover:animate-bounce flex-shrink-0" />
               <div className="flex flex-col justify-center overflow-hidden">
                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider leading-tight whitespace-nowrap overflow-hidden text-ellipsis">Deliver to {activeAddress.name}</span>
                  <span className="text-sm text-gray-900 font-extrabold leading-none mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{activeAddress.loc}</span>
               </div>
            </Link>

            <div className="hidden lg:flex items-center ml-8 flex-grow max-w-sm">
                <div className="relative w-full group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                      <Search size={16} />
                   </div>
                   <input type="text" placeholder="Search premium products..." className="w-full bg-gray-100 border border-transparent rounded-full py-2.5 pl-10 pr-6 text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-gray-800 transition-all font-medium shadow-inner" onChange={(e) => {
                       navigate(`/?q=${encodeURIComponent(e.target.value)}`);
                   }} />
                </div>
            </div>

            <div className="hidden sm:ml-auto sm:flex sm:space-x-8 items-center pl-6 border-l border-gray-100">
              <Link to="/" className="text-gray-900 hover:text-blue-600 font-bold transition-colors">Home</Link>
              {token && <Link to="/dashboard" className="text-gray-900 hover:text-blue-600 font-bold transition-colors">Dashboard</Link>}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="relative text-gray-700 hover:text-blue-600 transition group p-1 mr-2" title="My Account">
                <User className="w-7 h-7 transform group-hover:scale-110 transition-transform" />
            </Link>
            <Link to="/checkout" className="relative text-gray-700 hover:text-blue-600 transition group p-1 mr-4">
               <ShoppingCart className="w-7 h-7 transform group-hover:scale-110 transition-transform" />
               {!!cartCount && cartCount > 0 && (
                 <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-extrabold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm">
                   {cartCount}
                 </span>
               )}
            </Link>
            {!token ? (
              <>
                <Link to="/login" className="text-gray-900 hover:text-primary">Login</Link>
                <Link to="/register" className="btn-primary">Sign up</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-gray-900 hover:text-red-600 transition-colors">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
