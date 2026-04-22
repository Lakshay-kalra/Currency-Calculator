'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightLeft, Check, ChevronDown, Copy, Activity, Search, RefreshCw, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AED', name: 'Emirati Dirham', flag: '🇦🇪' },
  { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'ILS', name: 'Israeli New Shekel', flag: '🇮🇱' },
  { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'VND', name: 'Vietnamese Dong', flag: '🇻🇳' },
  { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },
  { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
  { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
  { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷' },
  { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴' },
  { code: 'PEN', name: 'Peruvian Sol', flag: '🇵🇪' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' }
];

const PREFERRED_MINI_RATES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'AED', 'SGD'];

function CustomSelect({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase()) || 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedItem = CURRENCIES.find(c => c.code === value) || CURRENCIES[0];

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(''); }}
        className="w-full glass-input px-4 py-4 flex items-center justify-between text-left focus:ring-2 focus:ring-amber-500/50"
      >
        <span className="flex items-center gap-3">
          <span className="text-2xl">{selectedItem.flag}</span>
          <span className="font-semibold text-zinc-100">{selectedItem.code}</span>
          <span className="text-zinc-500 hidden sm:inline truncate max-w-[120px]">{selectedItem.name}</span>
        </span>
        <ChevronDown size={18} className="text-zinc-400" />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="p-2 border-b border-white/5 bg-black/20">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search currency..."
                className="w-full bg-zinc-800/50 text-white text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:bg-zinc-800 transition-colors"
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto no-scrollbar py-1">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-zinc-500 text-center">No currencies found</div>
            ) : (
              filtered.map(c => (
                <button
                  key={c.code}
                  className="w-full text-left px-4 py-3 hover:bg-amber-500/10 flex items-center gap-3 transition-colors text-sm"
                  onClick={() => { onChange(c.code); setOpen(false); }}
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="font-medium text-zinc-200">{c.code}</span>
                  <span className="text-zinc-500">{c.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CurrencyCalculator() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [amount, setAmount] = useState('100');
  
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);

  const [history, setHistory] = useState<Array<{ id?: string, from: string, to: string, amount: number, result: number, createdAt: string }>>([]);
  const [miniRates, setMiniRates] = useState<Record<string, number>>({});
  const [miniRatesLoading, setMiniRatesLoading] = useState(true);

  // Fetch Conversion
  useEffect(() => {
    const fetchConvert = async () => {
      if (!amount || isNaN(Number(amount))) {
        setResult(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/convert?from=${from}&to=${to}&amount=${amount}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to convert');
        
        setResult(data.result);
        setRate(data.rate);
        setLastUpdated(data.timestamp);
        
        // Trigger animation
        setAnimateResult(true);
        setTimeout(() => setAnimateResult(false), 300);

        fetchHistory(); // refresh history
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchConvert, 500); // debounce typing
    return () => clearTimeout(timer);
  }, [from, to, amount]);

  // Fetch Mini Rates
  useEffect(() => {
    const fetchMiniRates = async () => {
      setMiniRatesLoading(true);
      try {
        const res = await fetch(`/api/rates?base=INR`);
        const data = await res.json();
        if (res.ok) {
          setMiniRates(data.rates);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setMiniRatesLoading(false);
      }
    };
    fetchMiniRates();
  }, []);

  // Fetch History explicitly
  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.history) {
        setHistory(data.history);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchHistory();
    // Refresh rates automatically every 1 minute if idle
    const interval = setInterval(fetchHistory, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.toFixed(2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Converter */}
      <div className="lg:col-span-2 glass-panel p-6 sm:p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <Activity size={16} className="text-amber-500 animate-pulse" />
          <span className="text-xs font-medium text-amber-500 uppercase tracking-widest">Live Rates Active</span>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full glass-input text-4xl sm:text-5xl font-black py-4 px-4 text-zinc-100 placeholder:text-zinc-700"
              placeholder="0.00"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative">
            <div className="w-full">
              <CustomSelect label="From" value={from} onChange={setFrom} />
            </div>
            
            <button
              onClick={handleSwap}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-amber-500 hover:bg-amber-400 text-black rounded-full flex items-center justify-center shadow-lg hover:rotate-180 hover:scale-110 transition-all duration-300"
            >
              <ArrowRightLeft size={20} strokeWidth={2.5} />
            </button>

            <div className="w-full mt-4 sm:mt-0">
              <CustomSelect label="To" value={to} onChange={setTo} />
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 relative min-h-[140px]">
            {error ? (
              <div className="flex items-center gap-3 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                <AlertTriangle size={20} />
                <p className="font-medium">{error}</p>
              </div>
            ) : loading && result === null ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-12 w-64 bg-white/10 rounded-lg"></div>
                <div className="h-4 w-32 bg-white/5 rounded"></div>
              </div>
            ) : (
              <div className={cn("transition-transform duration-300", animateResult ? "scale-[1.02]" : "scale-100")}>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-zinc-400 font-medium mb-1 flex items-center gap-2">
                       {amount || '0'} {from} equals
                    </p>
                    <div className="text-4xl sm:text-6xl font-black text-amber-500 tracking-tight break-all">
                      {result ? (
                        <span>{result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                      ) : (
                        <span>0.00</span>
                      )}
                      <span className="text-2xl sm:text-3xl text-zinc-500 ml-3">{to}</span>
                    </div>
                  </div>
                  {result && (
                    <button
                      onClick={handleCopy}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-300 transition-colors hidden sm:block"
                      title="Copy result"
                    >
                      {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                    </button>
                  )}
                </div>
                
                {rate && (
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                    <span className="bg-white/5 px-3 py-1.5 rounded-lg text-zinc-300 font-medium border border-white/5">
                      1 {from} = {rate.toFixed(6)} {to}
                    </span>
                    {lastUpdated && (
                      <span className="flex items-center gap-1.5 text-zinc-500">
                        <Clock size={14} />
                        Updated {new Date(lastUpdated * 1000).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Top 10 Exchange Rates Mini Table */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <RefreshCw size={18} className="text-amber-500" />
            Live Market Rates <span className="text-sm font-normal text-zinc-500 ml-auto">vs INR</span>
          </h3>
          <div className="space-y-3">
            {miniRatesLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2 animate-pulse">
                  <div className="h-4 w-12 bg-white/10 rounded"></div>
                  <div className="h-4 w-20 bg-white/5 rounded"></div>
                </div>
              ))
            ) : (
              PREFERRED_MINI_RATES.filter(c => c !== 'INR').slice(0, 7).map(currency => (
                <div key={currency} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 -mx-2 rounded transition-colors group">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{CURRENCIES.find(c => c.code === currency)?.flag || '🌍'}</span>
                    <span className="font-semibold text-zinc-300">1 {currency}</span>
                  </div>
                  <span className="font-mono text-amber-500/90 group-hover:text-amber-400 transition-colors">
                    {miniRates[currency] ? `${(1 / miniRates[currency]).toFixed(2)} INR` : '...'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Conversions History */}
        <div className="glass-panel p-6 max-h-[400px] overflow-y-auto no-scrollbar">
          <h3 className="text-lg font-bold text-zinc-100 mb-4 sticky top-0 bg-zinc-900/90 backdrop-blur pb-2 z-10 flex items-center gap-2">
            <Activity size={18} className="text-amber-500" />
            Recent Conversions
          </h3>
          {history.length > 0 ? (
            <div className="space-y-3">
              {history.map((record, i) => (
                <div key={record.id || i} className="bg-black/20 border border-white/5 p-3 rounded-xl hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-sm text-zinc-200 font-medium">
                      {record.amount} {record.from} <ArrowRightLeft size={10} className="inline mx-1 text-zinc-500" /> {record.to}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="text-amber-500 font-black font-mono">
                    {record.result.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-500 text-sm">
              No recent conversions yet.<br/>Your history will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
