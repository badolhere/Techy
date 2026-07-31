import React from 'react';
import { Smartphone, Laptop, Wrench, ShieldCheck, Clock, Award, ChevronRight, Star, Sparkles, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import { STORE_DETAILS, REPAIR_SERVICES, ACCESSORY_PRODUCTS, FAQS } from '../data/mockData';
import { AccessoryProduct } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  addToCart: (product: AccessoryProduct) => void;
  products?: AccessoryProduct[];
  services?: any[];
  storeDetails?: typeof STORE_DETAILS;
  faqs?: typeof FAQS;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, addToCart, faqs = FAQS }) => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-600 via-sky-700 to-blue-800 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-100 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-sky-300" /> Longview's Premier Repair & Accessory Shop
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              WE CAN <span className="text-sky-300 underline decoration-sky-400 decoration-wavy decoration-2">FIX THAT</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-sky-100 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Fast, reliable, and professional repairs for your smartphones, tablets, and computers right here in <strong className="text-white font-semibold">{STORE_DETAILS.address}</strong>. Plus premium accessories!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => setActiveTab('booking')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-sky-700 hover:bg-sky-50 font-bold rounded-xl shadow-xl shadow-sky-900/30 transition-all flex items-center justify-center gap-2 group text-base"
              >
                <Wrench className="w-5 h-5 text-sky-600 group-hover:rotate-45 transition-transform" />
                Book Repair Appointment
              </button>
              
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full sm:w-auto px-8 py-4 bg-sky-800/80 hover:bg-sky-800 text-white font-bold rounded-xl border border-sky-400/30 backdrop-blur-md transition-all flex items-center justify-center gap-2 text-base"
              >
                Browse Accessories
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/15 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-white">30 Min</div>
                <div className="text-xs text-sky-200">Avg Screen Fix</div>
              </div>
              <div className="text-center lg:text-left border-x border-white/15 px-2">
                <div className="text-2xl sm:text-3xl font-black text-white">90 Days</div>
                <div className="text-xs text-sky-200">Solid Warranty</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-black text-white">5 Star</div>
                <div className="text-xs text-sky-200">Local Service</div>
              </div>
            </div>

          </div>

          {/* Hero Right Card / Visual */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl relative space-y-6">
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                Open Today
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-sky-300" /> {STORE_DETAILS.name}
              </h3>

              <div className="space-y-4 text-sm text-sky-100">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="font-bold text-white mb-1">📍 Location & Contact</div>
                  <div>{STORE_DETAILS.address}</div>
                  <a href={`tel:${STORE_DETAILS.phone}`} className="text-sky-300 font-bold hover:underline block mt-1">
                    📞 {STORE_DETAILS.phone}
                  </a>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="font-bold text-white mb-1">🛠️ Specialty Repairs</div>
                  <div className="text-sky-200 font-semibold">{STORE_DETAILS.categories}</div>
                  <p className="text-xs text-sky-200/80 mt-1">iPhone, Samsung, iPad, MacBooks, PC & consoles repaired with professional care.</p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('ai-diagnose')}
                className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-slate-950 font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4" /> Try AI Instant Repair Estimator
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block">
            Professional Repair Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            What Can We Fix For You Today?
          </h2>
          <p className="text-slate-600 text-base">
            From cracked glass to dead batteries and water damage, our technicians restore your device to factory perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPAIR_SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-xs">
                  <Wrench className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Starting at</span>
                  <span className="text-lg font-extrabold text-sky-600">{service.startingPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Duration</span>
                  <span className="text-sm font-semibold text-slate-700">{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setActiveTab('booking')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-colors"
          >
            Schedule Your Repair Appointment Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-sky-50/70 border-y border-sky-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-white px-3 py-1 rounded-full border border-sky-200 inline-block">
              Why Techy Longview
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              The Reliable Choice for Tech Repairs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Same-Day Service</h3>
              <p className="text-slate-600 text-sm">Most phone screen and battery repairs are completed within 30 to 45 minutes.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">90-Day Warranty</h3>
              <p className="text-slate-600 text-sm">Every repair is backed by our rock-solid 90-day warranty on parts and labor.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Expert Technicians</h3>
              <p className="text-slate-600 text-sm">Certified repair pros with years of experience handling delicate electronics.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Free Diagnostics</h3>
              <p className="text-slate-600 text-sm">Bring your device in for a thorough checkup and transparent quote before we start.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accessories Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block">
              Online Shop
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Featured Phone Accessories
            </h2>
            <p className="text-slate-600 text-sm">
              Protect and power up your devices with top-tier cases, chargers, and audio gear.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1.5 text-sm"
          >
            View All Accessories <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACCESSORY_PRODUCTS.filter(p => p.featured).slice(0, 4).map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
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
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-sky-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{product.compatibleWith}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <span className="text-lg font-black text-slate-900">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-100 px-3 py-1 rounded-full border border-sky-200 inline-block">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-sky-600">Q.</span> {faq.question}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
