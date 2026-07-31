import React, { useState } from 'react';
import { ShoppingBag, Search, Star, Check, Plus, Minus, X, ShieldCheck } from 'lucide-react';
import { ACCESSORY_PRODUCTS } from '../data/mockData';
import { AccessoryProduct, CartItem } from '../types';

interface ShopViewProps {
  cart: CartItem[];
  addToCart: (product: AccessoryProduct) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  cart,
  addToCart,
  updateQuantity,
  removeFromCart,
  isCartOpen,
  setIsCartOpen
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const categories = ['All', 'Cases', 'Screen Protectors', 'Chargers & Cables', 'Audio', 'Power Banks', 'Mounts'];

  const filteredProducts = ACCESSORY_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.compatibleWith.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
          total: cartTotal,
          customerName,
          shippingAddress,
          phone
        })
      });
      setOrderSuccess(true);
    } catch (err) {
      setOrderSuccess(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block">
            Online Store
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Phone Accessories & Gadgets</h1>
          <p className="text-slate-600 text-sm">
            Top-quality cases, screen protectors, chargers, and audio gear tested for durability.
          </p>
        </div>

        {/* Search & Cart Trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-sky-600 text-white shadow-md shadow-sky-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 bg-slate-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-sky-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  {product.category}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                  </div>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">In Stock</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-sky-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
                <div className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100 inline-block">
                  Fits: {product.compatibleWith}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
              <span className="text-xl font-black text-slate-900">${product.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(product)}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200">
          <p className="text-slate-500 font-medium">No accessories found matching your search.</p>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-slate-900">Your Shopping Cart</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-lg hover:bg-slate-200 text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-slate-500 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.product.name}</h4>
                      <p className="text-sky-600 font-bold text-sm">${item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold text-slate-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-xs text-rose-600 font-semibold hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center text-lg font-black text-slate-900">
                  <span>Subtotal:</span>
                  <span className="text-sky-600">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            
            {orderSuccess ? (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h3>
                <p className="text-slate-600 text-sm">
                  Thank you for shopping with <strong className="text-slate-900">Techy Longview</strong>. Your accessories will be ready for pickup or shipped soon.
                </p>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    setCheckoutModalOpen(false);
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-black text-slate-900">Checkout Accessories</h3>
                  <button type="button" onClick={() => setCheckoutModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="360-555-0192"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Shipping Address / In-Store Pickup *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Street address or 'In-Store Pickup at Longview, WA'"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center font-bold text-slate-900">
                  <span>Total Due:</span>
                  <span className="text-sky-600 text-lg">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-md transition-all"
                >
                  Place Order Now
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
