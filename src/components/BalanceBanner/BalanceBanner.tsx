interface BalanceBannerProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  curr?: { symbol: string; rate: number; decimals?: number };
  t?: any;
}

import { useState } from 'react';
import { Edit2, X } from 'lucide-react';

export default function BalanceBanner({ balance, totalIncome, totalExpense, curr, t, onEditStartingBalance }: BalanceBannerProps & { onEditStartingBalance?: () => void }) {
  const [activeModal, setActiveModal] = useState<{ title: string; value: number } | null>(null);

  const symbol = curr?.symbol || '$';
  const decimals = curr?.decimals ?? 2;
  const rate = curr?.rate || 1;

  const displayBalance = balance * rate;
  const displayIncome = totalIncome * rate;
  const displayExpense = totalExpense * rate;

  return (
    <div className="w-full max-w-sm flex flex-col items-start mb-6 px-1">
      <span className="text-ink3 text-xs font-bold tracking-wide uppercase">
        {t?.total_treasure || 'TOTAL BALANCE'}
      </span>
      <div className="flex items-center mt-1 leading-tight flex-wrap w-full overflow-hidden">
        <span className="text-ink3 text-xl font-bold mr-1">{symbol}</span>
        <span 
          className={`text-[32px] font-sans font-extrabold tracking-tight ${balance >= 0 ? 'text-ink' : 'text-pkd'} truncate cursor-pointer flex-1`}
          onClick={() => setActiveModal({ title: t?.total_treasure || 'Total Balance', value: displayBalance })}
        >
          {displayBalance.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        </span>
        {onEditStartingBalance && (
          <button 
            onClick={onEditStartingBalance}
            className="ml-2 p-1.5 rounded-xl bg-ink/10 text-ink hover:bg-ink hover:text-white transition cursor-pointer flex-shrink-0"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Split Row Dashboard Style */}
      <div className="flex w-full gap-3 mt-5">
        <div 
          className="flex-1 flex flex-col items-start bg-yl border border-y p-4 rounded-2xl shadow-sm cursor-pointer overflow-hidden min-w-0"
          onClick={() => setActiveModal({ title: t?.gathered || 'Income', value: displayIncome })}
        >
          <span className="text-yd text-[10px] font-bold tracking-wider uppercase">{t?.gathered || 'INCOME'}</span>
          <span className="font-sans font-black text-lg text-yd mt-1 truncate w-full">
            {symbol}{displayIncome.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
          </span>
        </div>
        <div 
          className="flex-1 flex flex-col items-start bg-rdl border border-rd p-4 rounded-2xl shadow-sm cursor-pointer overflow-hidden min-w-0"
          onClick={() => setActiveModal({ title: t?.scattered || 'Expenses', value: displayExpense })}
        >
          <span className="text-rdd text-[10px] font-bold tracking-wider uppercase">{t?.scattered || 'EXPENSES'}</span>
          <span className="font-sans font-black text-lg text-rdd mt-1 truncate w-full">
            {symbol}{displayExpense.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
          </span>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setActiveModal(null)}>
          <div className="bg-bg border border-border2 p-6 rounded-3xl w-full max-w-xs flex flex-col items-center animate-scale-up" onClick={e => e.stopPropagation()}>
            <span className="text-ink3 text-[10px] font-bold tracking-wider uppercase">{activeModal.title}</span>
            <span className="text-2xl font-sans font-black text-ink mt-2 mb-4 break-all text-center">
              {symbol}{activeModal.value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
            </span>
            <button onClick={() => setActiveModal(null)} className="p-2.5 w-full rounded-xl bg-ink text-bg font-semibold text-sm hover:bg-ink2 whitespace-nowrap active:scale-95 transition">Close</button>
          </div>
        </div>
      )}


    </div>
  )
}
