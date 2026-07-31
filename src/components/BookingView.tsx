import React, { useState } from 'react';
import { Wrench, Calendar, Clock, User, Phone, Mail, Smartphone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { STORE_DETAILS } from '../data/mockData';
import { Booking } from '../types';

interface BookingViewProps {
  onBookingSuccess: (booking: Booking) => void;
  goToTracker: (code: string) => void;
}

export const BookingView: React.FC<BookingViewProps> = ({ onBookingSuccess, goToTracker }) => {
  const [deviceType, setDeviceType] = useState<'Phone' | 'Tablet' | 'Computer' | 'Console' | 'Other'>('Phone');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('Screen Repair');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 11:00 AM');
  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const brands = {
    Phone: ['Apple', 'Samsung', 'Google', 'Motorola', 'OnePlus', 'Other'],
    Tablet: ['Apple iPad', 'Samsung Galaxy Tab', 'Microsoft Surface', 'Amazon Fire', 'Other'],
    Computer: ['Apple MacBook', 'Dell', 'HP', 'Lenovo', 'ASUS / Acer', 'Custom PC'],
    Console: ['Sony PlayStation', 'Microsoft Xbox', 'Nintendo Switch', 'Other'],
    Other: ['Smartwatch', 'Headphones', 'Other Device']
  };

  const issuesMap = {
    Phone: ['Cracked Screen / Glass', 'Battery Draining Fast', 'Charging Port Broken', 'Water Damage', 'Camera Issue', 'Speaker / Mic Problem', 'Other'],
    Tablet: ['Broken Screen', 'Battery Replacement', 'Charging Port Repair', 'Power Button / Volume Issue', 'Other'],
    Computer: ['Screen Replacement', 'Battery / Power Issue', 'Keyboard / Trackpad Fix', 'SSD / Storage Upgrade', 'Virus / OS Issue', 'Other'],
    Console: ['HDMI Port Repair', 'Disc Drive Issue', 'Power Supply / Overheating', 'Controller Sync Issue', 'Other'],
    Other: ['General Diagnostic', 'Battery Replacement', 'Hardware Fix', 'Other']
  };

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !customerName.trim() || !phone.trim()) {
      setErrorMessage('Please fill in all required fields (Model, Your Name, and Phone Number).');
      return;
    }
    setErrorMessage('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceType,
          brand,
          model,
          issue,
          customerName,
          phone,
          email,
          date,
          timeSlot
        })
      });
      const data = await res.json();
      if (data.trackingCode) {
        setConfirmedBooking(data);
        onBookingSuccess(data);
      } else {
        setErrorMessage('Failed to create booking. Please try calling us at 360-270-8896.');
      }
    } catch (err) {
      // Fallback mock booking if server fails
      const mockCode = `TECH-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallback: Booking = {
        id: `b-${Date.now()}`,
        trackingCode: mockCode,
        deviceType,
        brand,
        model,
        issue,
        customerName,
        phone,
        email,
        date,
        timeSlot,
        status: 'Received',
        createdAt: new Date().toISOString()
      };
      setConfirmedBooking(fallback);
      onBookingSuccess(fallback);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {confirmedBooking ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-sky-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block">
              Appointment Confirmed
            </span>
            <h2 className="text-3xl font-black text-slate-900">We're Ready for You!</h2>
            <p className="text-slate-600 max-w-md mx-auto">
              Your repair appointment has been successfully scheduled at <strong className="text-slate-900">Techy Longview</strong> ({STORE_DETAILS.address}).
            </p>
          </div>

          <div className="bg-sky-50/70 p-6 rounded-2xl border border-sky-200 max-w-lg mx-auto text-left space-y-3">
            <div className="flex justify-between items-center border-b border-sky-200 pb-3">
              <span className="text-sm text-slate-600 font-medium">Tracking Code:</span>
              <span className="text-lg font-black text-sky-700 bg-white px-3 py-1 rounded-lg border border-sky-300 shadow-xs">
                {confirmedBooking.trackingCode}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-700 pt-1">
              <div><strong className="text-slate-900">Device:</strong> {confirmedBooking.brand} {confirmedBooking.model}</div>
              <div><strong className="text-slate-900">Issue:</strong> {confirmedBooking.issue}</div>
              <div><strong className="text-slate-900">Date:</strong> {confirmedBooking.date}</div>
              <div><strong className="text-slate-900">Time:</strong> {confirmedBooking.timeSlot}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => goToTracker(confirmedBooking.trackingCode)}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              Track Repair Status <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setConfirmedBooking(null);
                setCustomerName('');
                setModel('');
              }}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
            >
              Book Another Repair
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200 bg-white/10 px-3 py-1 rounded-full inline-block">
              WE CAN FIX THAT
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">Book Your Repair Appointment</h1>
            <p className="text-sky-100 text-sm">
              Skip the wait. Schedule your drop-off at Techy Longview ({STORE_DETAILS.address}) or call {STORE_DETAILS.phone}.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
            
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. Device Type */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">1. Select Device Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {(['Phone', 'Tablet', 'Computer', 'Console', 'Other'] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => {
                      setDeviceType(type);
                      setBrand(brands[type][0]);
                    }}
                    className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
                      deviceType === type
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Brand & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  {brands[deviceType].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900">Device Model (e.g. iPhone 15, MacBook Air)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 14 Pro"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* 3. Issue Type */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-900">Primary Repair Needed / Issue</label>
              <select
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              >
                {(issuesMap[deviceType] || issuesMap.Phone).map((iss) => (
                  <option key={iss} value={iss}>{iss}</option>
                ))}
              </select>
            </div>

            {/* 4. Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-600" /> Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-600" /> Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 5. Customer Info */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="360-555-0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {submitting ? 'Confirming Appointment...' : 'Confirm Repair Appointment'}
              </button>
              <p className="text-center text-xs text-slate-500 mt-3">
                No prepayment required. Pay securely in-store in Longview, WA upon repair completion.
              </p>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
