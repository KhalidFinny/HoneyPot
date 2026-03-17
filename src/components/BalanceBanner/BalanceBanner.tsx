interface BalanceBannerProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  curr?: { symbol: string; rate: number; decimals?: number };
  t?: any;
}

import { Edit2 } from 'lucide-react';

export default function BalanceBanner({ balance, totalIncome, totalExpense, curr, t, onEditStartingBalance }: BalanceBannerProps & { onEditStartingBalance?: () => void }) {
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
        <span className={`text-[38px] font-sans font-extrabold tracking-tight ${balance >= 0 ? 'text-ink' : 'text-pkd'} break-all`}>
          {displayBalance.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        </span>
        {onEditStartingBalance && (
          <button 
            onClick={onEditStartingBalance}
            className="ml-2 p-1.5 rounded-xl bg-ink/10 text-ink hover:bg-ink hover:text-white transition cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      
      {/* Split Row Dashboard Style */}
      <div className="flex w-full gap-3 mt-5">
        <div className="flex-1 flex flex-col items-start bg-[#FFFCE6] border border-[#FADF9E] p-4 rounded-2xl shadow-sm">
          <span className="text-amber-800 text-[10px] font-bold tracking-wider uppercase">{t?.gathered || 'INCOME'}</span>
          <span className="font-sans font-black text-lg text-amber-900 mt-1">{symbol}{displayIncome.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
        </div>
        <div className="flex-1 flex flex-col items-start bg-[#FFEFEF] border border-[#FADBD9] p-4 rounded-2xl shadow-sm">
          <span className="text-red-800 text-[10px] font-bold tracking-wider uppercase">{t?.scattered || 'EXPENSES'}</span>
          <span className="font-sans font-black text-lg text-red-900 mt-1">{symbol}{displayExpense.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>
        </div>
      </div>
    </div>
  )
}
