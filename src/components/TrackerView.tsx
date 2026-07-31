import React, { useState, useEffect } from 'react';
import { Search, Wrench, CheckCircle2, Clock, Smartphone, AlertCircle, ShieldCheck } from 'lucide-react';
import { STORE_DETAILS } from '../data/mockData';
import { Booking } from '../types';

interface TrackerViewProps {
  initialCode?: string;
}

export const TrackerView: React.FC<TrackerViewProps> = ({ initialCode = '' }) => {
  const [code, setCode] = useState(initialCode);
  const [ticket, setTicket] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (searchCode: string) => {
    const cleanCode = searchCode.trim();
    if (!cleanCode) return;
    setLoading(true);
    setError('');
    setTicket(null);

    try {
      const res = await fetch(`/api/repair-status/${encodeURIComponent(cleanCode)}`);
      if (res.ok) {
        const data = await res.json();
        setTicket(data);
      } else {
        setError('Repair tracking code not found. Please verify your code or contact Techy Longview at 360-270-8896.');
      }
    } catch (err) {
      setError('Unable to fetch repair status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      handleSearch(initialCode);
    }
  }, [initialCode]);

  const stages: Array<'Received' | 'Diagnosing' | 'Repairing' | 'Testing' | 'Ready'> = [
    'Received',
    'Diagnosing',
    'Repairing',
    'Testing',
    'Ready'
  ];

  const getStageIndex = (status: string) => {
    return stages.indexOf(status as any);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block">
          Live Repair Status
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Track Your Repair</h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Enter your repair tracking code (e.g., <span className="font-bold text-slate-900">TECH-9041</span> or <span className="font-bold text-slate-900">TECH-8234</span>) to check live progress.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-lg flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Enter tracking code (e.g. TECH-9041)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(code)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-sky-500"
          />
        </div>
        <button
          onClick={() => handleSearch(code)}
          disabled={loading}
          className="px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Check Status'}
        </button>
      </div>

      {/* Quick Demo Codes Hint */}
      <div className="text-center text-xs text-slate-500 space-x-2">
        <span>Try sample demo codes:</span>
        <button onClick={() => { setCode('TECH-9041'); handleSearch('TECH-9041'); }} className="text-sky-600 font-bold underline hover:text-sky-700">TECH-9041</button>
        <span>•</span>
        <button onClick={() => { setCode('TECH-8234'); handleSearch('TECH-8234'); }} className="text-sky-600 font-bold underline hover:text-sky-700">TECH-8234</button>
      </div>

      {error && (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {ticket && (
        <div className="bg-white rounded-3xl border border-sky-200 shadow-xl p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                Tracking Code: {ticket.trackingCode}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">{ticket.brand} {ticket.model}</h2>
              <p className="text-sm text-slate-500">Customer: <strong className="text-slate-700">{ticket.customerName}</strong></p>
            </div>
            <div className="bg-sky-50 px-4 py-2 rounded-xl border border-sky-200 text-right">
              <span className="text-xs text-slate-500 block">Issue Reported</span>
              <span className="text-sm font-bold text-sky-700">{ticket.issue}</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Repair Progress Timeline</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {stages.map((stage, idx) => {
                const currentIndex = getStageIndex(ticket.status);
                const isCompleted = idx <= currentIndex;
                const isCurrent = idx === currentIndex;

                return (
                  <div 
                    key={stage}
                    className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${
                      isCurrent
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200'
                        : isCompleted
                        ? 'bg-sky-50 text-sky-900 border-sky-200'
                        : 'bg-slate-50 text-slate-400 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 ${
                      isCurrent ? 'bg-white text-sky-700' : isCompleted ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-xs font-bold">{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Appointment Date & Time</span>
              <span className="font-bold text-slate-900">{ticket.date} ({ticket.timeSlot})</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Location</span>
              <span className="font-bold text-slate-900">{STORE_DETAILS.address} ({STORE_DETAILS.phone})</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
