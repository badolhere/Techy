import React, { useState } from 'react';
import { ShieldCheck, Lock, Settings, Package, Wrench, Calendar, ShoppingBag, Plus, Trash2, Edit3, Check, X, Save, DollarSign } from 'lucide-react';
import { AccessoryProduct, Booking } from '../types';

interface AdminViewProps {
  storeDetails: any;
  updateStoreDetails: (newDetails: any) => void;
  products: AccessoryProduct[];
  setProducts: React.Dispatch<React.SetStateAction<AccessoryProduct[]>>;
  services: any[];
  setServices: React.Dispatch<React.SetStateAction<any[]>>;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  orders: any[];
}

export const AdminView: React.FC<AdminViewProps> = ({
  storeDetails,
  updateStoreDetails,
  products,
  setProducts,
  services,
  setServices,
  bookings,
  setBookings,
  orders
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'store' | 'products' | 'services' | 'bookings' | 'orders'>('store');

  // Form states for adding new product/service
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Cases' | 'Screen Protectors' | 'Chargers & Cables' | 'Audio' | 'Power Banks' | 'Mounts'>('Cases');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdCompat, setNewProdCompat] = useState('Universal');

  const [newServTitle, setNewServTitle] = useState('');
  const [newServPrice, setNewServPrice] = useState('');
  const [newServDuration, setNewServDuration] = useState('30 mins');
  const [newServDesc, setNewServDesc] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === '0000') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect Admin PIN. Try default PIN: 1234');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;
    const newProduct: AccessoryProduct = {
      id: `acc-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      price: parseFloat(newProdPrice) || 19.99,
      rating: 5.0,
      reviewsCount: 1,
      image: newProdImage,
      description: newProdDesc || 'High quality phone accessory.',
      compatibleWith: newProdCompat,
      inStock: true,
      featured: true
    };
    setProducts([newProduct, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdDesc('');
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServTitle || !newServPrice) return;
    const newService = {
      id: `serv-${Date.now()}`,
      title: newServTitle,
      icon: 'Wrench',
      description: newServDesc || 'Professional repair service.',
      startingPrice: `$${newServPrice}`,
      duration: newServDuration
    };
    setServices([...services, newService]);
    setNewServTitle('');
    setNewServPrice('');
    setNewServDesc('');
  };

  const updateBookingStatus = (id: string, newStatus: any) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Admin Control Panel</h2>
            <p className="text-xs text-slate-500">
              Enter admin PIN to manage store details, prices, products, services, and repair bookings.
            </p>
            <div className="text-[11px] text-sky-600 font-bold bg-sky-50 py-1 px-3 rounded-lg border border-sky-100 inline-block">
              Demo PIN: 1234
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}
            <input
              type="password"
              required
              maxLength={6}
              placeholder="Enter PIN (1234)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold tracking-widest text-lg text-slate-900 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/30 transition-all text-sm"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Secure Admin Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Techy Longview Management</h1>
          <p className="text-xs text-slate-400">Update store info, change product prices instantly, add services & manage bookings.</p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
        >
          Lock Admin Panel
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'store', label: 'Store & Branding', icon: Settings },
          { id: 'products', label: 'Accessories Shop', icon: Package },
          { id: 'services', label: 'Repair Services & Prices', icon: Wrench },
          { id: 'bookings', label: `Repair Bookings (${bookings.length})`, icon: Calendar },
          { id: 'orders', label: `Shop Orders (${orders.length})`, icon: ShoppingBag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Store & Branding */}
      {activeTab === 'store' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">Edit Store Details & Branding</h3>
            <p className="text-xs text-slate-500">Changes update instantly across the entire website.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Business Name</label>
              <input
                type="text"
                value={storeDetails.name}
                onChange={(e) => updateStoreDetails({ ...storeDetails, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Tagline / Slogan</label>
              <input
                type="text"
                value={storeDetails.tagline}
                onChange={(e) => updateStoreDetails({ ...storeDetails, tagline: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Store Address</label>
              <input
                type="text"
                value={storeDetails.address}
                onChange={(e) => updateStoreDetails({ ...storeDetails, address: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Phone Number</label>
              <input
                type="text"
                value={storeDetails.phone}
                onChange={(e) => updateStoreDetails({ ...storeDetails, phone: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                value={storeDetails.email}
                onChange={(e) => updateStoreDetails({ ...storeDetails, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Categories / Header Subtitle</label>
              <input
                type="text"
                value={storeDetails.categories}
                onChange={(e) => updateStoreDetails({ ...storeDetails, categories: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <Check className="w-4 h-4" /> Changes apply instantly
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: Accessories Shop Products */}
      {activeTab === 'products' && (
        <div className="space-y-8">
          {/* Add Product Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-sky-600" /> Add New Accessory Item
            </h3>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Product Name"
                value={newProdName}
                onChange={(e) => setNewProdName(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
              <select
                value={newProdCategory}
                onChange={(e) => setNewProdCategory(e.target.value as any)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              >
                <option value="Cases">Cases</option>
                <option value="Screen Protectors">Screen Protectors</option>
                <option value="Chargers & Cables">Chargers & Cables</option>
                <option value="Audio">Audio</option>
                <option value="Power Banks">Power Banks</option>
                <option value="Mounts">Mounts</option>
              </select>
              <input
                type="number"
                step="0.01"
                required
                placeholder="Price ($)"
                value={newProdPrice}
                onChange={(e) => setNewProdPrice(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
              <input
                type="text"
                placeholder="Compatible with (e.g. iPhone 15)"
                value={newProdCompat}
                onChange={(e) => setNewProdCompat(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500 sm:col-span-2"
              />
              <input
                type="text"
                placeholder="Image URL (Unsplash or direct)"
                value={newProdImage}
                onChange={(e) => setNewProdImage(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500 sm:col-span-3"
              />
              <button
                type="submit"
                className="sm:col-span-3 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all text-sm"
              >
                Add Product to Shop
              </button>
            </form>
          </div>

          {/* Products List & Price Editor */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Manage Shop Products & Prices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                  <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{product.name}</h4>
                    <span className="text-xs text-sky-600 font-semibold">{product.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-xs text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={product.price}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setProducts(products.map(p => p.id === product.id ? { ...p, price: val } : p));
                        }}
                        className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 text-right"
                      />
                    </div>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Repair Services & Prices */}
      {activeTab === 'services' && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-sky-600" /> Add New Repair Service
            </h3>
            <form onSubmit={handleAddService} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                required
                placeholder="Service Title (e.g. OLED Display Fix)"
                value={newServTitle}
                onChange={(e) => setNewServTitle(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
              <input
                type="text"
                required
                placeholder="Starting Price (e.g. $79)"
                value={newServPrice}
                onChange={(e) => setNewServPrice(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
              <input
                type="text"
                placeholder="Duration (e.g. 45 mins)"
                value={newServDuration}
                onChange={(e) => setNewServDuration(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
              <button
                type="submit"
                className="sm:col-span-3 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all text-sm"
              >
                Add Service
              </button>
            </form>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Manage Repair Services & Starting Prices</h3>
            <div className="space-y-3">
              {services.map((service, idx) => (
                <div key={service.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{service.title}</h4>
                    <p className="text-xs text-slate-500">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-500">Price:</span>
                      <input
                        type="text"
                        value={service.startingPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          setServices(services.map((s, i) => i === idx ? { ...s, startingPrice: val } : s));
                        }}
                        className="w-24 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 text-center"
                      />
                    </div>
                    <button
                      onClick={() => setServices(services.filter((_, i) => i !== idx))}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Repair Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Repair Appointments & Status Manager</h3>
          
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No repair bookings found yet.</p>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-md">
                        {booking.trackingCode}
                      </span>
                      <span className="text-xs text-slate-500">{booking.date} ({booking.timeSlot})</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{booking.brand} {booking.model} — <span className="text-sky-600">{booking.issue}</span></h4>
                    <p className="text-xs text-slate-600">Customer: <strong className="text-slate-900">{booking.customerName}</strong> ({booking.phone})</p>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-sky-500"
                    >
                      <option value="Received">Received</option>
                      <option value="Diagnosing">Diagnosing</option>
                      <option value="Repairing">Repairing</option>
                      <option value="Testing">Testing</option>
                      <option value="Ready">Ready for Pickup</option>
                    </select>

                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                      title="Delete Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Shop Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Accessory Shop Orders</h3>
          
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No accessory orders placed yet.</p>
            ) : (
              orders.map((order, idx) => (
                <div key={order.id || idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <div>
                      <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">Order #{order.id}</span>
                      <span className="text-xs text-slate-500 ml-3">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <span className="text-base font-black text-slate-900">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-slate-700 space-y-1">
                    <div><strong className="text-slate-900">Customer:</strong> {order.customerName} ({order.phone})</div>
                    <div><strong className="text-slate-900">Address / Pickup:</strong> {order.shippingAddress}</div>
                  </div>
                  <div className="pt-2 text-xs text-slate-600">
                    <strong className="text-slate-900">Items:</strong> {order.items.map((i: any) => `${i.name} (x${i.quantity})`).join(', ')}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
