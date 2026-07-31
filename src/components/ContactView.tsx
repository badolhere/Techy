import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { STORE_DETAILS } from '../data/mockData';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block">
          Visit Our Shop
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Contact & Location</h1>
        <p className="text-slate-600 text-base">
          Stop by our Longview repair shop or reach out to us by phone or email. We are here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Info Cards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-sky-200 font-black text-xl">
                T
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{STORE_DETAILS.name}</h3>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-600">{STORE_DETAILS.tagline}</div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-slate-100 text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 mt-1 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Address</strong>
                  <span>{STORE_DETAILS.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-sky-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Phone Number</strong>
                  <a href={`tel:${STORE_DETAILS.phone}`} className="text-sky-600 font-bold hover:underline">
                    {STORE_DETAILS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-sky-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900">Email Address</strong>
                  <a href={`mailto:${STORE_DETAILS.email}`} className="text-sky-600 font-bold hover:underline">
                    {STORE_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 p-5 rounded-2xl border border-sky-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Clock className="w-4 h-4 text-sky-600" /> Operating Hours
              </div>
              <ul className="space-y-1.5 text-sm text-slate-600">
                <li className="flex justify-between"><span>Monday - Friday:</span> <strong className="text-slate-900">{STORE_DETAILS.hours.weekdays}</strong></li>
                <li className="flex justify-between"><span>Saturday:</span> <strong className="text-slate-900">{STORE_DETAILS.hours.saturday}</strong></li>
                <li className="flex justify-between"><span>Sunday:</span> <strong className="text-slate-900">{STORE_DETAILS.hours.sunday}</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Message Sent!</h3>
                <p className="text-slate-600 text-sm">
                  Thank you for reaching out. Our team at Techy Longview will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-black text-slate-900">Send Us a Quick Message</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message or Inquiry *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ask about device repair availability, quotes, or accessory stock..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
