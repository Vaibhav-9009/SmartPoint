import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Laptop, Shirt, Gamepad2, Armchair, Coffee, Footprints, BookOpen, Trophy, Car, ShoppingBasket, LayoutGrid, Package, CreditCard, MessageSquare, User, Clock, CheckCircle, MapPin, Filter, Heart, Mail, Trash2 } from 'lucide-react';
import { CartProvider, CartContext } from './context/CartContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Careers from './pages/Careers';
import Policies from './pages/Policies';
import api from './api/axiosConfig';
import mockProducts from './data/mockProducts.json';

const categoryIcons = {
  "All Categories": <LayoutGrid className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Technology": <Laptop className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Fashion": <Shirt className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Entertainment": <Gamepad2 className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Furniture": <Armchair className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Appliances": <Coffee className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Footwears": <Footprints className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Books": <BookOpen className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Sports": <Trophy className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Automotive": <Car className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />,
  "Groceries": <ShoppingBasket className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />
};

const getRating = (id) => {
    const ratings = [4.8, 3.2, 4.5, 4.1, 5.0, 3.9, 4.7];
    return ratings[id % ratings.length];
};

const Banners = ({ onSelectCategory }) => (
  <div className="max-w-[1500px] mx-auto mb-6 px-4 overflow-hidden relative">
    <style>{`
      @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      @keyframes float-medium { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
      @keyframes float-fast { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .marquee-track:hover { animation-play-state: paused; }
    `}</style>
    
    <div className="flex gap-6 w-max marquee-track py-4" style={{ animation: 'marquee 35s linear infinite' }}>
      {[1, 2].map(iter => (
        <React.Fragment key={iter}>
          {/* Banner 1 */}
          <div onClick={() => onSelectCategory("Footwears")} className="h-64 w-[450px] flex-shrink-0 rounded-2xl relative overflow-hidden bg-gradient-to-r from-orange-400 to-red-500 shadow-lg flex items-center p-8 text-white cursor-pointer group" style={{ animation: 'float-slow 4s ease-in-out infinite' }}>
             <div className="z-10 w-2/3 transform group-hover:scale-105 transition-transform duration-500">
               <h2 className="text-3xl font-extrabold tracking-tight">MIN. 80% OFF</h2>
               <span className="text-xl mt-2 block font-bold uppercase drop-shadow-md">Sporty Kicks Here</span>
             </div>
             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" alt="Shoes" className="absolute -right-8 w-[250px] transform -rotate-12 object-contain opacity-95 drop-shadow-2xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700" />
          </div>

          {/* Banner 2 */}
          <div onClick={() => onSelectCategory("Technology")} className="h-64 w-[450px] flex-shrink-0 rounded-2xl relative overflow-hidden bg-[#0A1128] shadow-lg flex items-center p-8 text-white cursor-pointer group" style={{ animation: 'float-medium 5s ease-in-out infinite' }}>
             <div className="z-10 w-2/3 transform group-hover:scale-105 transition-transform duration-500">
               <div className="bg-blue-600 text-xs font-bold px-2 py-1 rounded inline-block mb-3 shadow-md">SmartPoint Unique</div>
               <h2 className="text-2xl font-extrabold leading-tight">Laptop Pro 5G<br/>From ₹84,999*</h2>
               <span className="text-sm mt-2 block text-gray-400">Sale on 21st April, 12 PM</span>
             </div>
             <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80" alt="Tech" className="absolute -right-12 w-[350px] object-cover mix-blend-screen opacity-80 group-hover:scale-110 group-hover:-translate-x-4 transition-all duration-700" />
          </div>

          {/* Banner 3 */}
          <div onClick={() => onSelectCategory("Appliances")} className="h-64 w-[450px] flex-shrink-0 rounded-2xl relative overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-900 shadow-lg flex justify-center flex-col p-8 text-white cursor-pointer group" style={{ animation: 'float-fast 4.5s ease-in-out infinite' }}>
             <div className="z-10 transform group-hover:scale-105 transition-transform duration-500">
               <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded inline-block mb-3 shadow-md">Top Offers</div>
               <h2 className="text-3xl font-extrabold tracking-tight">Appliance Sale</h2>
               <span className="text-xl mt-2 block font-medium">Upgrade Your Home Today</span>
             </div>
             <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80" alt="Appliance" className="absolute -right-8 bottom-0 top-0 w-1/2 object-cover opacity-60 mix-blend-overlay group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" />
          </div>

          {/* Banner 4 */}
          <div onClick={() => onSelectCategory("Entertainment")} className="h-64 w-[450px] flex-shrink-0 rounded-2xl relative overflow-hidden bg-gradient-to-r from-purple-800 to-pink-600 shadow-lg flex items-center p-8 text-white cursor-pointer group" style={{ animation: 'float-slow 5.5s ease-in-out infinite' }}>
              <div className="z-10 w-2/3 transform group-hover:scale-105 transition-transform duration-500">
                 <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded inline-block mb-3 shadow-md">New Launch</div>
                 <h2 className="text-3xl font-extrabold tracking-tight">Gaming Era</h2>
                 <span className="text-xl mt-2 block font-medium">Unleash The Beast</span>
              </div>
              <img src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80" alt="Gaming" className="absolute -right-8 w-[280px] object-cover opacity-80 mix-blend-overlay group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700" />
          </div>

          {/* Banner 5 */}
          <div onClick={() => onSelectCategory("Technology")} className="h-64 w-[450px] flex-shrink-0 rounded-2xl relative overflow-hidden bg-gradient-to-tr from-gray-900 to-slate-800 shadow-lg flex items-center p-8 text-white cursor-pointer group" style={{ animation: 'float-medium 4.2s ease-in-out infinite' }}>
              <div className="z-10 w-2/3 transform group-hover:scale-105 transition-transform duration-500">
                 <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded inline-block mb-3 shadow-md">Trending Now</div>
                 <h2 className="text-3xl font-extrabold tracking-tight">Focus Gear</h2>
                 <span className="text-xl mt-2 block font-medium">Hear Every Detail</span>
              </div>
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" alt="Headphones" className="absolute -right-12 w-[300px] object-cover mix-blend-screen opacity-90 group-hover:scale-110 group-hover:-translate-x-4 transition-all duration-700" />
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const Home = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceFilter, setPriceFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('smartpoint_wishlist') || '[]'));

  const toggleWishlist = (p) => {
     let newArr;
     if (wishlist.find(x => x.id === p.id)) {
        newArr = wishlist.filter(x => x.id !== p.id);
     } else {
        newArr = [...wishlist, p];
     }
     setWishlist(newArr);
     localStorage.setItem('smartpoint_wishlist', JSON.stringify(newArr));
  };

  const handleBuyNow = (p) => {
      addToCart(p);
      navigate('/checkout');
  };

  useEffect(() => {
    api.get('/products')
      .then(res => {
          if(res.data && res.data.length > 0) {
              setProducts([...res.data, ...mockProducts.filter(mp => !res.data.find(rp => rp.name === mp.name))]);
          }
      })
      .catch(err => console.log("Backend not active. Using mock data."));
  }, []);

  const categories = ["All Categories", "Technology", "Fashion", "Entertainment", "Furniture", "Appliances", "Footwears", "Books", "Sports", "Automotive", "Groceries"];

  let filteredProducts = selectedCategory === "All Categories" 
    ? products 
    : products.filter(p => (p.categoryName || 'General') === selectedCategory);

  const query = new URLSearchParams(location.search).get('q') || '';
  if (query) {
     filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || (p.categoryName || '').toLowerCase().includes(query.toLowerCase()));
  }

  if (priceFilter === 'under1000') filteredProducts = filteredProducts.filter(p => p.price < 1000);
  if (priceFilter === '1000to5000') filteredProducts = filteredProducts.filter(p => p.price >= 1000 && p.price <= 5000);
  if (priceFilter === '5000to20000') filteredProducts = filteredProducts.filter(p => p.price >= 5000 && p.price <= 20000);
  if (priceFilter === 'over20000') filteredProducts = filteredProducts.filter(p => p.price > 20000);

  if (ratingFilter === '4') filteredProducts = filteredProducts.filter(p => getRating(p.id) >= 4.0);
  if (ratingFilter === '3') filteredProducts = filteredProducts.filter(p => getRating(p.id) >= 3.0);

  return (
    <div className="w-full bg-[#f1f2f4] min-h-screen pb-12">
      {/* Top Horizontal Category Bar mimicking Flipkart */}
      <div className="bg-white shadow-sm mb-4 py-4 sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between overflow-x-auto px-4 hide-scrollbar gap-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setPriceFilter(null); setRatingFilter(null); }} className="flex flex-col items-center flex-shrink-0 group outline-none">
              <div className={`p-4 rounded-full mb-1 transition-all ${selectedCategory === cat ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                {categoryIcons[cat] || <LayoutGrid className="w-9 h-9 text-blue-600 mb-2 transition-transform group-hover:scale-110" />}
              </div>
              <span className={`text-sm font-bold tracking-wide ${selectedCategory === cat ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'}`}>{cat === "All Categories" ? "For You" : cat}</span>
            </button>
          ))}
        </div>
      </div>

      <Banners onSelectCategory={(cat) => { setSelectedCategory(cat); setPriceFilter(null); setRatingFilter(null); window.scrollTo({top: document.getElementById('product-grid')?.offsetTop || 300, behavior: 'smooth'}); }} />

      {/* Main Product Grid container */}
      <div id="product-grid" className="max-w-[1500px] mx-auto px-4 flex flex-col md:flex-row gap-6">
        
        {/* Dynamic Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24 self-start">
           <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                 <Filter className="text-gray-500" size={20} />
                 <h2 className="font-bold text-lg text-gray-800">Filters</h2>
              </div>
              {(priceFilter || ratingFilter) && (
                 <button onClick={() => {setPriceFilter(null); setRatingFilter(null)}} className="text-xs text-blue-600 font-bold hover:underline">CLEAR</button>
              )}
           </div>
           
           <div className="mb-6">
              <h3 className="uppercase text-xs font-bold text-gray-400 tracking-wider mb-3">Price Range</h3>
              <div className="space-y-2 flex flex-col">
                 <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-600">
                    <input type="radio" onChange={() => setPriceFilter(priceFilter === 'under1000' ? null : 'under1000')} checked={priceFilter === 'under1000'} className="rounded-full w-4 h-4 text-blue-600 focus:ring-blue-500"/> Under ₹1,000</label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-600">
                    <input type="radio" onChange={() => setPriceFilter(priceFilter === '1000to5000' ? null : '1000to5000')} checked={priceFilter === '1000to5000'} className="rounded-full w-4 h-4 text-blue-600"/> ₹1,000 - ₹5,000</label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-600">
                    <input type="radio" onChange={() => setPriceFilter(priceFilter === '5000to20000' ? null : '5000to20000')} checked={priceFilter === '5000to20000'} className="rounded-full w-4 h-4 text-blue-600"/> ₹5,000 - ₹20,000</label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-600">
                    <input type="radio" onChange={() => setPriceFilter(priceFilter === 'over20000' ? null : 'over20000')} checked={priceFilter === 'over20000'} className="rounded-full w-4 h-4 text-blue-600"/> Over ₹20,000</label>
              </div>
           </div>

           <div className="mb-6">
              <h3 className="uppercase text-xs font-bold text-gray-400 tracking-wider mb-3">Customer Ratings</h3>
              <div className="space-y-2 flex flex-col">
                 <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-600">
                    <input type="radio" onChange={() => setRatingFilter(ratingFilter === '4' ? null : '4')} checked={ratingFilter === '4'} className="rounded-full border-gray-300 w-4 h-4"/> 4★ & above</label>
                 <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-blue-600">
                    <input type="radio" onChange={() => setRatingFilter(ratingFilter === '3' ? null : '3')} checked={ratingFilter === '3'} className="rounded-full border-gray-300 w-4 h-4"/> 3★ & above</label>
              </div>
           </div>
        </div>

        <div className="flex-grow bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Suggested For You</h1>
            <div className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">Showing {filteredProducts.length} Items</div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
               <p className="text-gray-500 text-lg font-medium border border-gray-100 p-8 rounded-xl bg-gray-50 inline-block shadow-sm">No products exactly match your current filters.</p>
               <br/><button onClick={() => {setPriceFilter(null); setRatingFilter(null)}} className="mt-4 px-6 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(p => (
                <div key={p.id} className="bg-white border rounded hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group cursor-pointer relative">
                  <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }} className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-sm backdrop-blur-md border ${wishlist.find(x => x.id === p.id) ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white/80 border-gray-100 text-gray-400 hover:text-red-500'} transition-all hover:scale-110`}>
                      <Heart size={18} className={wishlist.find(x => x.id === p.id) ? "fill-red-500" : ""} />
                  </button>
                  <div className="relative w-full h-52 bg-white flex items-center justify-center p-4">
                    <img src={p.imageUrl || "https://picsum.photos/400/300"} alt={p.name} className="h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out mix-blend-multiply" />
                  </div>
                  
                  <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
                    <h3 className="text-md text-gray-800 font-medium mb-1 line-clamp-2 leading-snug">{p.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                       <span className={`text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center ${getRating(p.id) >= 4.0 ? 'bg-green-600' : 'bg-yellow-500'}`}>{getRating(p.id)} ★</span>
                       <span className="text-xs text-gray-500 font-medium">({Math.floor((p.id * 13)%1000) + 12})</span>
                    </div>

                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <span className="text-xl font-bold text-gray-900">₹{p.price.toLocaleString("en-IN")}</span>
                      <span className="text-sm font-medium text-green-600 tracking-tight">Best Price</span>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                      <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-blue-700 font-bold py-2.5 px-2 text-sm rounded-xl transition-colors duration-200">
                        Add to Cart
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleBuyNow(p); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 text-sm rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const OrdersTab = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
     setOrders(JSON.parse(localStorage.getItem('smartpoint_orders') || '[]'));
  }, []);

  const handleCancel = (orderId) => {
     const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o);
     setOrders(updatedOrders);
     localStorage.setItem('smartpoint_orders', JSON.stringify(updatedOrders));
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Orders & History</h2>
      {orders.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
             <Package size={40} className="mx-auto text-gray-400 mb-3" />
             <p className="text-gray-500 font-bold">You haven't placed any orders yet.</p>
          </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className={`border rounded-xl p-6 transition ${order.status === 'Cancelled' ? 'bg-red-50/30 border-red-100' : 'border-gray-200 hover:shadow-md'}`}>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                 <div>
                   <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Order Placed</span>
                   <p className="font-extrabold text-gray-900 text-sm">{order.date}</p>
                 </div>
                 <div className="text-right">
                   <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total</span>
                   <p className="font-extrabold text-blue-600 text-sm">₹{order.total.toLocaleString("en-IN")}</p>
                 </div>
                 <div className="hidden sm:block text-right">
                   <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Order ID</span>
                   <p className="font-extrabold text-gray-900 text-sm uppercase">{order.id}</p>
                 </div>
              </div>
              
              <div className="space-y-4 mb-6">
                 {order.items && order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-50 shadow-sm">
                       <img src={item.imageUrl || "https://picsum.photos/40"} alt={item.name} className="w-12 h-12 rounded object-cover" />
                       <div className="flex-grow">
                          <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                          <span className="text-xs text-gray-500 font-medium">Qty: {item.qty}</span>
                       </div>
                       <div className="font-extrabold text-gray-900 text-sm">₹{(item.price * item.qty).toLocaleString("en-IN")}</div>
                    </div>
                 ))}
              </div>

             <div className="mt-8 mb-8 relative hidden sm:block px-4">
                 <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full"></div>
                 <div className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 rounded-full transition-all duration-1000" style={{ width: order.status === 'Cancelled' ? '0%' : '15%' }}></div>
                 
                 <div className="flex justify-between relative z-10">
                     <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${order.status === 'Cancelled' ? 'bg-red-500 text-white shadow-md' : 'bg-blue-600 text-white border-4 border-white shadow-md'}`}>✓</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-800">Placed</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 opacity-60">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gray-200 text-gray-600 border-4 border-white">2</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 text-center">Shipped</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 opacity-60">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gray-200 text-gray-600 border-4 border-white">3</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 text-center">Transit</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 opacity-60">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-gray-200 text-gray-600 border-4 border-white">4</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 text-center">Delivered</span>
                     </div>
                 </div>
             </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                 <p className={`flex items-center gap-2 text-sm font-bold ${order.status === 'Cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                   {order.status === 'Cancelled' ? <Package size={16}/> : <CheckCircle size={16}/>} 
                   Status: {order.status}
                 </p>
                 {order.status !== 'Cancelled' && (
                    <button onClick={() => handleCancel(order.id)} className="ml-auto bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-lg transition-colors text-xs shadow-sm">
                       Cancel Order
                    </button>
                 )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const WishlistTab = () => {
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('smartpoint_wishlist') || '[]'));
  const { addToCart } = useContext(CartContext);

  const removeFromWishlist = (id) => {
     const newArr = wishlist.filter(x => x.id !== id);
     setWishlist(newArr);
     localStorage.setItem('smartpoint_wishlist', JSON.stringify(newArr));
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
          <div className="text-center py-10 bg-pink-50 rounded-xl border border-dashed border-pink-200">
             <Heart size={40} className="mx-auto text-pink-300 mb-3" />
             <p className="text-pink-600 font-bold">Your wishlist is currently empty.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map(p => (
                 <div key={p.id} className="border border-gray-100 shadow-sm hover:shadow-md rounded-xl p-4 flex flex-col items-center text-center relative group transition-all">
                    <button onClick={() => removeFromWishlist(p.id)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-2 shadow-sm border border-gray-50 z-10">
                       <Trash2 size={16} />
                    </button>
                    <img src={p.imageUrl} alt={p.name} className="w-32 h-32 object-contain mix-blend-multiply mb-4 group-hover:scale-105 transition-transform" />
                    <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 leading-snug">{p.name}</h3>
                    <p className="text-blue-600 font-extrabold mb-4">₹{p.price.toLocaleString("en-IN")}</p>
                    <button onClick={() => { addToCart(p); removeFromWishlist(p.id); }} className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow-sm transition-colors text-sm">
                       Move to Cart
                    </button>
                 </div>
              ))}
          </div>
      )}
    </div>
  );
};

const AddressTab = () => {
  const [addresses, setAddresses] = useState(() => {
     const saved = localStorage.getItem('smartpoint_addresses');
     if (saved) return JSON.parse(saved);
     return [
       { id: 1, name: "Home Address", details: "Vaibhav Dwivedi\n12A Tech Park Avenue, Phase 1\nBangalore, Karnataka 560001\nPh: +91 9876543210", isDefault: true }
     ];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newDetails, setNewDetails] = useState('');

  useEffect(() => {
      if(!localStorage.getItem('smartpoint_addresses')) {
          localStorage.setItem('smartpoint_addresses', JSON.stringify(addresses));
      }
  }, []);

  const triggerUpdate = (updated) => {
     setAddresses(updated);
     localStorage.setItem('smartpoint_addresses', JSON.stringify(updated));
     window.dispatchEvent(new Event('addressUpdated'));
  }

  const handleAdd = () => {
     if(newDetails.trim().length > 5) {
         const updated = [...addresses.map(a => ({...a, isDefault: false})), { id: Date.now(), name: "Secondary Address", details: newDetails, isDefault: true }];
         triggerUpdate(updated);
         setIsAdding(false);
         setNewDetails('');
     }
  };

  const setDefault = (id) => {
     const updated = addresses.map(a => ({ ...a, isDefault: a.id === id }));
     triggerUpdate(updated);
  };

  const handleDelete = (id) => {
     const updated = addresses.filter(a => a.id !== id);
     if (updated.length > 0 && !updated.find(a => a.isDefault)) {
         updated[0].isDefault = true;
     }
     triggerUpdate(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Saved Addresses</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {addresses.map((addr) => (
             <div key={addr.id} className={`border-2 rounded-xl p-6 relative transition-colors ${addr.isDefault ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                {addr.isDefault && <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase shadow-sm">Selected</div>}
                <h3 className="font-bold text-gray-900 text-lg mb-2">{addr.name}</h3>
                <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{addr.details}</p>
                <div className="flex gap-4 items-center">
                   {!addr.isDefault && <button onClick={() => setDefault(addr.id)} className="text-sm font-bold text-blue-600 hover:underline">Select as Default</button>}
                   <button onClick={() => handleDelete(addr.id)} className="text-sm font-bold text-red-500 hover:underline">Delete</button>
                </div>
             </div>
         ))}
         
         {!isAdding ? (
             <button onClick={() => setIsAdding(true)} className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition min-h-[200px]">
                <MapPin className="w-8 h-8 mb-2" />
                <span className="font-bold">Add New Address</span>
             </button>
         ) : (
             <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 min-h-[200px]">
                 <textarea value={newDetails} onChange={e => setNewDetails(e.target.value)} placeholder="Type in your full address details here..." className="w-full p-3 rounded-lg border border-gray-300 mb-4 h-24 whitespace-pre-wrap outline-none focus:border-blue-500"></textarea>
                 <div className="flex gap-3 w-full">
                    <button onClick={() => setIsAdding(false)} className="flex-1 py-2 font-bold text-gray-700 hover:bg-gray-200 rounded-lg transition">Cancel</button>
                    <button onClick={handleAdd} className="flex-1 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">Save Address</button>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};

const PaymentsTab = () => (
  <div>
    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Payment Options</h2>
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center max-w-xl mx-auto mt-10 shadow-sm transition hover:shadow-md">
       <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-yellow-300">
          <CreditCard size={32} />
       </div>
       <h3 className="text-2xl font-extrabold text-yellow-900 mb-2">Cash on Delivery Strictly Enforced!</h3>
       <p className="text-yellow-800 text-lg leading-relaxed font-medium">
         Digital payments and saved cards have been temporarily paused for your account security. All transactions will natively process securely as strictly <b>Cash on Delivery (COD)</b>. You will pay directly when your package successfully arrives at your doorstep!
       </p>
    </div>
  </div>
);

const QueriesTab = () => {
   const [tickets, setTickets] = useState([
       { id: 1, title: "Where is my product tracking ID?", status: "Closed", date: "04 April 2026" }
   ]);
   const [isWriting, setIsWriting] = useState(false);
   const [queryTitle, setQueryTitle] = useState('');

   const handleTicket = () => {
       if(queryTitle.trim().length > 3) {
           setTickets([...tickets, { id: Date.now(), title: queryTitle, status: "Open / Pending Support", date: "Today" }]);
           setQueryTitle('');
           setIsWriting(false);
       }
   };

   return (
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Customer Support</h2>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8 flex justify-between items-center sm:flex-row flex-col gap-6 shadow-sm">
           <div>
             <h3 className="font-extrabold text-gray-900 text-xl mb-1">Need absolute immediate assistance?</h3>
             <p className="text-gray-600 font-medium">Our 24/7 technical team is ready to fully resolve absolutely any issue.</p>
           </div>
           {!isWriting ? (
               <button onClick={() => setIsWriting(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 whitespace-nowrap outline-none text-lg">
                 Open New Ticket
               </button>
           ) : (
               <div className="flex w-full sm:w-auto gap-2">
                  <input type="text" value={queryTitle} onChange={e => setQueryTitle(e.target.value)} placeholder="Type your issue here..." className="flex-1 p-3 rounded-xl border border-gray-300 outline-none" />
                  <button onClick={handleTicket} className="bg-blue-600 text-white font-bold px-6 rounded-xl shadow-md">Submit</button>
                  <button onClick={() => setIsWriting(false)} className="text-gray-600 font-bold px-4">Cancel</button>
               </div>
           )}
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs mb-2">Your Ticket History</h3>
          {[...tickets].reverse().map(t => (
              <div key={t.id} className="border border-gray-200 rounded-xl p-6 flex justify-between items-center group cursor-pointer hover:border-blue-300 hover:shadow-md transition">
                 <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full text-white ${t.status.includes('Open') ? 'bg-yellow-500' : 'bg-green-500'}`}>
                       <MessageSquare size={20} />
                    </div>
                    <div>
                       <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">{t.title}</h4>
                       <p className="text-sm font-bold text-gray-500 mt-1 flex items-center gap-2"><Clock size={14}/> Ticket {t.status} on {t.date}</p>
                    </div>
                 </div>
              </div>
          ))}
        </div>
      </div>
   );
};

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.hash === '#address' ? 'address' : 'orders');

  useEffect(() => {
     if (location.hash === '#address') {
         setActiveTab('address');
     }
  }, [location.hash]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-[75vh]">
       <div className="flex flex-col md:flex-row gap-8">
           {/* Sidebar Navigation */}
           <div className="w-full md:w-72 flex-shrink-0">
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                   <div className="p-6 border-b border-gray-50 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white text-blue-600 flex items-center justify-center font-extrabold text-2xl shadow-inner">V</div>
                      <div>
                         <h2 className="font-bold text-lg break-all leading-tight">Vaibhav Dwivedi</h2>
                         <span className="bg-yellow-400 text-black text-[11px] tracking-wider font-extrabold px-2.5 py-1 rounded-full uppercase mt-1 inline-block">Premium</span>
                      </div>
                   </div>
                   <nav className="flex flex-col p-3 gap-1">
                       <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-4 px-4 py-4 rounded-xl text-left font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700 scale-[1.02]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}> <Package size={22}/> Orders & History</button>
                       <button onClick={() => setActiveTab('address')} className={`flex items-center gap-4 px-4 py-4 rounded-xl text-left font-bold transition-all ${activeTab === 'address' ? 'bg-blue-50 text-blue-700 scale-[1.02]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}> <MapPin size={22}/> Saved Addresses</button>
                       <button onClick={() => setActiveTab('wishlist')} className={`flex items-center gap-4 px-4 py-4 rounded-xl text-left font-bold transition-all ${activeTab === 'wishlist' ? 'bg-pink-50 text-pink-600 scale-[1.02]' : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'}`}> <Heart size={22}/> My Wishlist</button>
                       <button onClick={() => setActiveTab('payments')} className={`flex items-center gap-4 px-4 py-4 rounded-xl text-left font-bold transition-all ${activeTab === 'payments' ? 'bg-blue-50 text-blue-700 scale-[1.02]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}> <CreditCard size={22}/> Payment Settings</button>
                       <button onClick={() => setActiveTab('queries')} className={`flex items-center gap-4 px-4 py-4 rounded-xl text-left font-bold transition-all ${activeTab === 'queries' ? 'bg-blue-50 text-blue-700 scale-[1.02]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}> <MessageSquare size={22}/> Support Queries</button>
                   </nav>
               </div>
           </div>

           {/* Main Content Area */}
           <div className="flex-grow w-full overflow-hidden">
               <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 min-h-[500px] transition-all">
                   {activeTab === 'orders' && <OrdersTab />}
                   {activeTab === 'wishlist' && <WishlistTab />}
                   {activeTab === 'address' && <AddressTab />}
                   {activeTab === 'payments' && <PaymentsTab />}
                   {activeTab === 'queries' && <QueriesTab />}
               </div>
           </div>
       </div>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="font-sans min-h-screen flex flex-col bg-[#f1f2f4]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/policies" element={<Policies />} />
            </Routes>
          </main>
          <footer className="bg-gradient-to-b from-[#0A1128] to-black border-t border-gray-800 pt-16 pb-8 mt-12 text-gray-300">
              <div className="max-w-[1500px] mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
                      <div className="space-y-4">
                          <h3 className="text-2xl font-extrabold text-white tracking-tight">Smart<span className="text-blue-500">Point</span></h3>
                          <p className="text-sm text-gray-400 leading-relaxed hover:text-gray-200 transition-colors cursor-default">The ultimate premium E-commerce platform bridging the gap between authentic quality and futuristic interactive design.</p>
                          <div className="flex gap-4 pt-2">
                             <a href="mailto:vaibhavdwivedi0321@gmail.com" className="flex gap-2 items-center text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors shadow-md">
                                <Mail size={16}/> Connect With Us
                             </a>
                          </div>
                      </div>
                      
                      <div>
                          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest flex items-center gap-2">Connect <div className="w-8 h-1 bg-blue-600 rounded"></div></h4>
                          <ul className="space-y-2 text-sm text-gray-400 font-medium">
                              <li><a href="mailto:vaibhavdwivedi0321@gmail.com" className="hover:text-blue-400 hover:ml-2 transition-all flex items-center gap-2"><Mail size={14}/> Contact Us</a></li>
                              <li><Link to="/careers" target="_blank" className="hover:text-blue-400 hover:ml-2 transition-all">Careers</Link></li>
                              <li><a href="#" className="hover:text-blue-400 hover:ml-2 transition-all">Press & Media</a></li>
                          </ul>
                      </div>

                      <div>
                          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest flex items-center gap-2">Policies <div className="w-8 h-1 bg-blue-600 rounded"></div></h4>
                          <ul className="space-y-2 text-sm text-gray-400 font-medium">
                              <li><Link to="/policies" target="_blank" className="hover:text-blue-400 hover:ml-2 transition-all">Terms of Use</Link></li>
                              <li><Link to="/policies" target="_blank" className="hover:text-blue-400 hover:ml-2 transition-all">Privacy Security</Link></li>
                              <li><Link to="/policies" target="_blank" className="hover:text-blue-400 hover:ml-2 transition-all">Return Policy</Link></li>
                          </ul>
                      </div>

                      <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors group relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-3xl opacity-10 rounded-full group-hover:opacity-30 transition-opacity"></div>
                         <h4 className="text-white font-bold mb-2 relative z-10">Subscribe to our Newsletter</h4>
                         <p className="text-xs text-gray-400 mb-4 relative z-10">Get the latest UI updates and exclusive premium access explicitly for developers.</p>
                         <div className="flex gap-2 relative z-10">
                            <input type="email" placeholder="Enter email..." className="bg-gray-900 border border-gray-600 text-white text-sm rounded-lg p-3 w-full outline-none focus:border-blue-500 transition-colors" />
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-lg font-bold transition-all group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transform hover:scale-105">→</button>
                         </div>
                      </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-6">
                      <div className="flex items-center gap-3 text-sm font-medium bg-gray-900 px-8 py-4 rounded-full border border-gray-700 hover:border-gray-500 transition-all cursor-default shadow-xl relative overflow-hidden group">
                          <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="relative z-10 text-gray-300">Engineered with</span>
                          <Heart className="text-red-500 animate-[pulse_1.5s_ease-in-out_infinite] fill-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)] relative z-10" size={18} />
                          <span className="relative z-10 text-gray-300">by</span>
                          <span className="text-white font-extrabold tracking-wide relative z-10 underline decoration-blue-500 decoration-2 underline-offset-4 blur-[0.2px] group-hover:blur-none transition-all group-hover:text-blue-400">Vaibhav Dwivedi</span>
                      </div>

                      <div className="flex gap-6 text-yellow-500 font-extrabold text-xs uppercase tracking-widest bg-yellow-500/5 px-6 py-3 rounded-xl border border-yellow-500/20">
                          <span className="flex items-center gap-2 hover:text-yellow-400 transition-colors cursor-default"><CheckCircle size={16}/> 100% Genuine Platform</span>
                          <span className="flex items-center gap-2 hover:text-yellow-400 transition-colors cursor-default"><CreditCard size={16}/> Secure Gateway</span>
                      </div>

                      <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">© 2026 SmartPoint.</p>
                  </div>
              </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
