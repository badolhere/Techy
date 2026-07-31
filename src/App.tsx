import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BookingView } from './components/BookingView';
import { TrackerView } from './components/TrackerView';
import { ShopView } from './components/ShopView';
import { AiDiagnosticView } from './components/AiDiagnosticView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { AuthModal } from './components/AuthModal';
import { MyRepairsModal } from './components/MyRepairsModal';
import { STORE_DETAILS, ACCESSORY_PRODUCTS, REPAIR_SERVICES, FAQS } from './data/mockData';
import { AccessoryProduct, CartItem, Booking } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [trackerCode, setTrackerCode] = useState<string>('');

  // Editable Store & App State
  const [storeDetails, setStoreDetails] = useState(STORE_DETAILS);
  const [products, setProducts] = useState<AccessoryProduct[]>(ACCESSORY_PRODUCTS);
  const [services, setServices] = useState(REPAIR_SERVICES);
  const [faqs, setFaqs] = useState(FAQS);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "b-1",
      trackingCode: "TECH-9041",
      deviceType: "Phone",
      brand: "Apple",
      model: "iPhone 13",
      issue: "Cracked Screen & Battery Replacement",
      customerName: "Sarah Jenkins",
      phone: "360-555-0192",
      email: "sarah@example.com",
      date: "2026-07-31",
      timeSlot: "10:00 AM - 11:00 AM",
      status: "Repairing",
      createdAt: new Date().toISOString()
    },
    {
      id: "b-2",
      trackingCode: "TECH-8234",
      deviceType: "Computer",
      brand: "Dell",
      model: "Inspiron 15",
      issue: "Not charging / Loose port",
      customerName: "Michael Chang",
      phone: "360-555-8832",
      email: "michael@example.com",
      date: "2026-07-30",
      timeSlot: "02:00 PM - 03:00 PM",
      status: "Testing",
      createdAt: new Date().toISOString()
    }
  ]);
  const [orders, setOrders] = useState<any[]>([]);

  // Optional Auth & My Repairs State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMyRepairsOpen, setIsMyRepairsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: AccessoryProduct) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.product.id === product.id);
      if (existing) {
        return prevCart.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleBookingSuccess = (booking: Booking) => {
    setBookings([booking, ...bookings]);
  };

  const goToTrackerWithCode = (code: string) => {
    setTrackerCode(code);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
        openMyRepairs={() => setIsMyRepairsOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            addToCart={addToCart}
            products={products}
            services={services}
            storeDetails={storeDetails}
            faqs={faqs}
          />
        )}

        {activeTab === 'booking' && (
          <BookingView
            onBookingSuccess={handleBookingSuccess}
            goToTracker={goToTrackerWithCode}
          />
        )}

        {activeTab === 'tracker' && (
          <TrackerView initialCode={trackerCode} />
        )}

        {activeTab === 'shop' && (
          <ShopView
            cart={cart}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            products={products}
            onOrderPlaced={(order) => setOrders([order, ...orders])}
          />
        )}

        {activeTab === 'ai-diagnose' && (
          <AiDiagnosticView
            goToBooking={() => {
              setActiveTab('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView storeDetails={storeDetails} />
        )}

        {activeTab === 'admin' && (
          <AdminView
            storeDetails={storeDetails}
            updateStoreDetails={setStoreDetails}
            products={products}
            setProducts={setProducts}
            services={services}
            setServices={setServices}
            bookings={bookings}
            setBookings={setBookings}
            orders={orders}
            faqs={faqs}
            setFaqs={setFaqs}
          />
        )}
      </main>

      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        storeDetails={storeDetails}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsMyRepairsOpen(true);
        }}
        onAdminLogin={() => {
          setCurrentUser({ name: 'Store Administrator', email: 'admin@techylongview.com' });
          setActiveTab('admin');
        }}
      />

      <MyRepairsModal
        isOpen={isMyRepairsOpen}
        onClose={() => setIsMyRepairsOpen(false)}
        currentUser={currentUser}
        bookings={bookings}
        orders={orders}
      />

    </div>
  );
}
