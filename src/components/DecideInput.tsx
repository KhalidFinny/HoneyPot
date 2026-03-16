import { useState } from 'react'
import { Sparkles, CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react'

import { DecideInputProps } from '../types'

export default function DecideInput({ balance, transactions = [], curr, t }: DecideInputProps) {
  const [amount, setAmount] = useState('')

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) {
      setAmount('');
      return;
    }
    setAmount(Number(val).toLocaleString());
  }

  const expenses = transactions.filter(t => t.type === 'expense');
  const avg = expenses.reduce((sum, t) => sum + t.amount, 0) || 1;
  const runway = balance > 0 ? balance / avg : 0;

  const symbol = curr?.symbol || '$';
  const rate = curr?.rate || 1;

  const checkSafety = () => {
    if (!amount) return null;
    const num = parseFloat(amount.replace(/,/g, ''));
    const newBal = balance - (num / rate); // Safety check using local amount converted back to baseline
    if (newBal < 0) return { state: 'bad', icon: AlertOctagon, text: t?.decide_bad || 'The honey pot says hold off on this one.' };
    if (runway < 3) return { state: 'warn', icon: AlertTriangle, text: t?.decide_warn || 'Provisions are thinning, tread carefully.' };
    return { state: 'safe', icon: CheckCircle, text: t?.decide_safe || 'You may proceed with this expense.' };
  }

  const result = checkSafety();

  const getStyle = (st: string) => {
    if (st === 'bad') return 'bg-rdl/10 border-rd text-rdd';
    if (st === 'warn') return 'bg-yl/10 border-y text-yd';
    return 'bg-grl/10 border-gr text-grd';
  }

  return (
    <div className="w-full max-w-sm flex flex-col items-start mt-4 bg-[#F5EFE6] border border-[#DCD2C3] p-4 rounded-[24px] shadow-[0_2px_12px_rgba(220,205,185,0.15)]">
      <p className="text-ink font-sans font-bold text-sm mb-3">{t?.ask_honey_pot || 'Decide spending…'}</p>
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 min-w-0 flex items-baseline border-b border-rule/50 focus-within:border-ink transition">
          <span className="text-ink font-sans font-black text-lg mr-1">{symbol}</span>
          <input 
            type="text"
            placeholder="0"
            value={amount}
            onChange={handleAmountChange}
            className="flex-1 bg-transparent py-1.5 focus:outline-none font-sans font-extrabold text-2xl text-ink"
          />
        </div>
        <button className="p-3 rounded-2xl bg-ink text-white hover:bg-ink2 transition shadow-sm">
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {result && (
        <div className={`mt-3 p-3 rounded-xl flex items-center gap-2 border ${getStyle(result.state)} animate-fade-in w-full`}>
          <result.icon className="w-3.5 h-3.5 flex-shrink-0" />
          <p className="text-xs font-semibold">{result.text}</p>
        </div>
      )}
    </div>
  )
}
