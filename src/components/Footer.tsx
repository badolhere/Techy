import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { STORE_DETAILS } from '../data/mockData';
import { TechyLogo } from './TechyLogo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  storeDetails?: typeof STORE_DETAILS;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, storeDetails = STORE_DETAILS }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="bg-white/95 p-3 rounded-2xl shadow-md inline-block">
              <TechyLogo size="sm" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted local destination for professional mobile, tablet, and computer repairs, high-quality accessories, and fast turnarounds in Longview, WA.
            </p>
            <div className="pt-2 text-xs font-bold tracking-wider text-sky-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 inline-block">
              {storeDetails.categories}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-sky-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('booking')} className="hover:text-sky-400 transition-colors">Book a Repair Appointment</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-sky-400 transition-colors">Check Repair Status</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shop')} className="hover:text-sky-400 transition-colors">Accessories Online Shop</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-diagnose')} className="hover:text-sky-400 transition-colors">AI Repair Cost Estimator</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-sky-400 transition-colors">Location & Hours</button>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">Store Hours</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex justify-between pb-2 border-b border-slate-800">
                <span>Monday - Friday:</span>
                <span className="text-white font-medium">{storeDetails.hours?.weekdays || '10:00 AM - 7:00 PM'}</span>
              </li>
              <li className="flex justify-between pb-2 border-b border-slate-800">
                <span>Saturday:</span>
                <span className="text-white font-medium">{storeDetails.hours?.saturday || '10:00 AM - 6:00 PM'}</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Sunday:</span>
                <span className="text-white font-medium">{storeDetails.hours?.sunday || '11:00 AM - 5:00 PM'}</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">Visit Us in Longview</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-1 shrink-0" />
                <span>{storeDetails.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${storeDetails.phone}`} className="text-white font-bold hover:text-sky-400 transition-colors">
                  {storeDetails.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${storeDetails.email}`} className="hover:text-sky-400 transition-colors">
                  {storeDetails.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {storeDetails.name} ({storeDetails.tagline}). All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Built with professional quality for Longview, WA community.
          </div>
        </div>

      </div>
    </footer>
  );
};
