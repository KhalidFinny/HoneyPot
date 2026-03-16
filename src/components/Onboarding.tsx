import { useState } from 'react'
import { db } from '../data/db'
import { translations, currencies } from '../logic/settings'
import { ChevronDown, Sparkles } from 'lucide-react'

export default function Onboarding() {
  const [step, setStep] = useState<'cover' | 'info'>('cover')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [lang, setLang] = useState<'en' | 'id'>('id') // Defaulting to id based on previous user hints
  const [curr, setCurr] = useState('IDR') // Defaulting to IDR

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) {
      setAmount('');
      return;
    }
    setAmount(Number(val).toLocaleString());
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    
    await db.table('settings').put({ key: 'language', value: lang })
    await db.table('settings').put({ key: 'currency', value: curr })
    await db.table('settings').put({ key: 'username', value: name.trim() })

    if (amount) {
      const num = parseFloat(amount.replace(/,/g, ''));
      const activeCurr = currencies[curr as keyof typeof currencies] || currencies.USD;
      // Convert amount back to baseline USD equivalent before saving raw to DB
      const baselineAmount = num / activeCurr.rate;

      await db.table('expenses').add({
        title: lang === 'id' ? 'Saldo Awal' : 'Starting Balance',
        amount: baselineAmount,
        category: 'Income',
        date: new Date().toLocaleDateString(),
        type: 'income',
        storyNote: 'Local account opened.'
      })
    }
    window.location.reload(); // Reload to refresh App.tsx state with new values
  }

  if (step === 'cover') {
    return (
      <div className="fixed inset-0 bg-[#F5EFE6] flex flex-col items-center justify-center p-6 z-50 animate-fade-in">
        <div className="flex flex-col items-center text-center max-w-xs">
          <img src="/honeypot/logo2.svg" alt="HoneyPot" className="w-32 h-32 object-contain mb-6 animate-bounce-slow" />
          <h1 className="text-4xl font-serif font-bold text-ink mb-2">HoneyPot</h1>
          <p className="text-ink3 text-sm font-medium leading-relaxed mb-8">
            Your gentle dashboard to mindful collections and sweet balance structures.
          </p>
          <button 
            onClick={() => setStep('info')}
            className="w-full bg-ink hover:bg-ink2 text-white font-semibold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 font-sans"
          >
            Start Your Tale <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-[#F5EFE6] flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#FCF8F2] border border-[#EBE3D5] rounded-3xl shadow-[0_8px_32px_rgba(220,205,185,0.25)] p-6 w-full max-w-sm flex flex-col items-center">
        <img src="/honeypot/logo2.svg" alt="HoneyPot" className="w-14 h-14 object-contain mb-4" />
        <h2 className="text-xl font-serif font-bold text-ink mb-1">
          {lang === 'id' ? 'Buka Lembaran Baru' : 'Begin Your Setup'}
        </h2>
        <p className="text-ink3 text-xs font-semibold tracking-wide uppercase mb-5">
          {lang === 'id' ? 'Sesuaikan Preferensi Anda' : 'Customize Your Experience'}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">Language</label>
              <div className="relative">
                <select 
                  value={lang}
                  onChange={(e) => setLang(e.target.value as 'en' | 'id')}
                  className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-lg px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer [&>option]:bg-white"
                >
                  <option value="en">English</option>
                  <option value="id">Indonesian</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink3 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">Currency</label>
              <div className="relative">
                <select 
                  value={curr}
                  onChange={(e) => setCurr(e.target.value)}
                  className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-lg px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer [&>option]:bg-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="IDR">IDR (Rp)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PHP">PHP (₱)</option>
                  <option value="CNY">CNY (¥)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink3 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mt-1">
            <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">
              {lang === 'id' ? 'Apa Panggilan Anda?' : 'Your Name?'}
            </label>
            <input 
              type="text" 
              placeholder={lang === 'id' ? "Contoh: Jessica" : "E.g., Jessica"} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-[#DCD2C3] focus:outline-none focus:border-ink py-1 text-base font-sans font-medium text-ink"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">
              {lang === 'id' ? 'Saldo Awal Saat Ini' : 'Starting Balance'}
            </label>
            <input 
              type="text" 
              placeholder="0" 
              value={amount}
              onChange={handleAmountChange}
              className="w-full bg-transparent border-b border-[#DCD2C3] focus:outline-none focus:border-ink py-1 text-xl font-sans font-extrabold text-ink"
            />
          </div>

          <button 
            type="submit"
            className="mt-4 bg-ink hover:bg-ink2 text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"
          >
            {lang === 'id' ? 'Mulai Menabung' : 'Start My Journey'}
          </button>
        </form>
      </div>
    </div>
  )
}
