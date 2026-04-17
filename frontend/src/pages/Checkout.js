import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    const newOrder = {
       id: "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
       date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
       total: cartTotal,
       items: cart.map(i => ({ name: i.name, qty: i.qty, price: i.price, imageUrl: i.imageUrl })),
       status: "Processing"
    };
    const pastOrders = JSON.parse(localStorage.getItem('smartpoint_orders') || '[]');
    localStorage.setItem('smartpoint_orders', JSON.stringify([newOrder, ...pastOrders]));

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg border border-gray-100">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8 text-lg">Thank you for shopping at SmartPoint. Your presentation-ready order has been securely processed!</p>
          <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-transform hover:-translate-y-1">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto min-h-[70vh]">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Secure Checkout</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
           <h3 className="text-2xl font-bold text-gray-800 mb-4">Your cart is completely empty.</h3>
           <p className="text-gray-500 mb-8">Browse our premium marketplace and discover top-tier products!</p>
           <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow transition-colors">Start Shopping</Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                 <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                 <div className="flex-grow text-center sm:text-left">
                   <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                   <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{item.categoryName}</span>
                   <div className="text-2xl font-extrabold text-gray-900 mt-2">₹{item.price.toLocaleString("en-IN")}</div>
                 </div>
                 <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"><Minus size={18}/></button>
                    <span className="font-bold text-lg w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"><Plus size={18}/></button>
                 </div>
                 <button onClick={() => removeFromCart(item.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition" title="Remove Item">
                    <Trash2 size={24} />
                 </button>
              </div>
            ))}
          </div>
          
          {/* Order Summary Checkout Card */}
          <div className="w-full lg:w-96 flex-shrink-0">
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-indigo-50 sticky top-24">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 font-medium">Subtotal ({cart.reduce((a,c) => a+c.qty, 0)} items)</span>
                  <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600 font-medium">Estimated Delivery</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-6 mb-8 flex justify-between items-center">
                  <span className="text-lg font-extrabold text-gray-900">Total</span>
                  <span className="text-3xl font-extrabold text-blue-600">₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6 shadow-sm">
                   <p className="font-bold text-green-800 flex items-center gap-2">✓ Cash on Delivery</p>
                   <p className="text-sm text-green-700 mt-1 font-medium">Pay securely at your doorstep exactly when your order arrives!</p>
                </div>
                <button onClick={handlePlaceOrder} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg text-lg transition-transform hover:-translate-y-0.5">
                  Place Order (COD)
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
