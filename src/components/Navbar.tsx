import React, { useState } from 'react';
import { Smartphone, Wrench, ShoppingBag, Clock, Search, Phone, Menu, X, ShieldCheck, Sparkles, MapPin, User, LogIn, Calendar } from 'lucide-react';
import { TechyLogo } from './TechyLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openAuthModal: () => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
  openMyRepairs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  openCart, 
  openAuthModal, 
  currentUser,
  onLogout,
  openMyRepairs
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Book Repair' },
    { id: 'tracker', label: 'Repair Status' },
    { id: 'shop', label: 'Accessories' },
    { id: 'ai-diagnose', label: 'AI Estimator', icon: Sparkles },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Top Bar with Store Info & Optional Login / My Repairs */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-200" />
              Longview, WA 98632
            </span>
            <span className="hidden md:inline text-sky-300">•</span>
            <span className="flex items-center gap-1.5 tracking-wider font-bold">
              COMPUTERS • TABLETS • PHONES
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:3602708896" className="flex items-center gap-1.5 font-bold hover:text-sky-200 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              360-270-8896
            </a>
            <span className="text-sky-300">•</span>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={openMyRepairs}
                  className="flex items-center gap-1.5 text-xs font-extrabold bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg transition-colors border border-white/30"
                >
                  <Calendar className="w-3.5 h-3.5" /> My Repairs & Orders
                </button>
                <div className="flex items-center gap-1.5">
                  <span className="text-sky-100 font-semibold hidden sm:inline">Hi, {currentUser.name}</span>
                  <button onClick={onLogout} className="text-xs underline text-sky-200 hover:text-white">Sign Out</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={openAuthModal}
                className="flex items-center gap-1 text-sky-100 hover:text-white font-semibold transition-colors bg-sky-700/60 px-2.5 py-0.5 rounded-lg border border-sky-500/40"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In / Sign Up (Optional)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <TechyLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-xs border border-sky-200'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-sky-500" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Cart & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-100/70 text-sky-700 transition-colors flex items-center gap-2 font-medium text-sm"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {currentUser && (
            <button
              onClick={() => {
                openMyRepairs();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-bold bg-sky-50 text-sky-700 flex items-center gap-3 border border-sky-200"
            >
              <Calendar className="w-5 h-5 text-sky-600" /> My Repairs & Orders
            </button>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center gap-3 ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 text-sky-600" />}
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a 
              href="tel:3602708896"
              className="w-full py-3 bg-sky-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-200"
            >
              <Phone className="w-4 h-4" /> Call Now: 360-270-8896
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
