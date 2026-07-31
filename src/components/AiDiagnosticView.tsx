import React, { useState } from 'react';
import { Sparkles, Wrench, Clock, DollarSign, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/mockData';
import { DiagnosticResult } from '../types';

interface AiDiagnosticViewProps {
  goToBooking: () => void;
}

export const AiDiagnosticView: React.FC<AiDiagnosticViewProps> = ({ goToBooking }) => {
  const [deviceType, setDeviceType] = useState('Phone');
  const [brand, setBrand] = useState('Apple');
  const [model, setModel] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState('');

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !issueDescription.trim()) {
      setError('Please provide your device model and a brief description of the issue.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceType, brand, model, issueDescription })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        diagnosis: "Based on your description, this appears to be a hardware component fault that requires professional inspection.",
        estimatedCost: "$89 - $139",
        estimatedTime: "1 Hour",
        recommendation: "Bring your device into Techy Longview in Longview, WA for free diagnostic testing."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 inline-block flex items-center gap-1.5 w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" /> AI Repair Assistant
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Instant AI Repair Cost & Issue Estimator</h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Describe what's wrong with your device and get an instant AI diagnosis, estimated cost range, and turnaround time from Techy Longview.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
          <form onSubmit={handleDiagnose} className="space-y-5">
            
            {error && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Device Type</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              >
                <option value="Phone">Phone</option>
                <option value="Tablet">Tablet</option>
                <option value="Computer">Computer / Laptop</option>
                <option value="Console">Game Console</option>
                <option value="Other">Other Device</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Apple / Samsung"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Model *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 14"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Describe the Issue in Detail *</label>
              <textarea
                required
                rows={4}
                placeholder="e.g. My screen cracked after a drop and now the touch is unresponsive and showing green lines."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" /> Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Get AI Estimate & Diagnosis
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <div className="bg-gradient-to-br from-sky-900 to-blue-950 text-white p-8 rounded-3xl shadow-2xl space-y-6 border border-sky-700 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> AI Repair Diagnostic Result
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">{brand} {model}</h3>
                <p className="text-sky-100 text-sm leading-relaxed bg-white/10 p-4 rounded-2xl border border-white/10">
                  {result.diagnosis}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-sky-300 font-medium">Estimated Cost</div>
                  <div className="text-2xl font-black text-white mt-1">{result.estimatedCost}</div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs text-sky-300 font-medium">Repair Time</div>
                  <div className="text-2xl font-black text-white mt-1">{result.estimatedTime}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-sky-300 font-bold uppercase tracking-wider">Technician Recommendation</div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {result.recommendation}
                </p>
              </div>

              <button
                onClick={goToBooking}
                className="w-full py-4 bg-white text-sky-900 hover:bg-sky-50 font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Book This Repair Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
              <div className="w-16 h-16 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ready for Your Estimate</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Fill out the form on the left with your device details and issue description to receive instant AI guidance.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
