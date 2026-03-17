import { Trash2, Edit2 } from 'lucide-react'
import { db } from '../../data/db'
import { HistoryListProps } from '../../types'
import Skeleton from '../UI/Skeleton'

interface ExtendedHistoryListProps extends HistoryListProps {
  isLoading?: boolean;
}

const parseSafeDate = (dStr: string) => {
  const date = new Date(dStr);
  if (!isNaN(date.getTime())) return date;
  const parts = dStr.split("/");
  if (parts.length === 3) {
    const [m, d, y] = parts.map(Number);
    if (m <= 12 && d <= 31) return new Date(y, m - 1, d);
  }
  return date;
};


export default function HistoryList({ expenses = [], curr, t, onOpenAll, isLoading, onEdit }: ExtendedHistoryListProps) {



  const handleDelete = async (id: any) => {
    await db.table('expenses').delete(id)
  }

  const symbol = curr?.symbol || '$';
  const rate = curr?.rate || 1;


  if (isLoading) {
    return (
      <div className="w-full max-w-sm mt-3 px-1">
        <h3 className="text-sm font-sans font-bold text-ink mb-3 tracking-wide">{t?.tales || 'History'}</h3>
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="p-3 bg-bg2 border border-border2 rounded-2xl flex justify-between items-center w-full shadow-[0_2px_12px_rgba(220,205,185,0.15)]">
              <div className="flex items-center gap-3 flex-1">
                <Skeleton variant="circle" className="w-10 h-10" />
                <div className="flex-1">
                  <Skeleton variant="text" className="w-24 h-4 mb-1" />
                  <Skeleton variant="text" className="w-16 h-3" />
                </div>
              </div>
              <Skeleton variant="rect" className="w-16 h-5" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const recentExpenses = expenses?.slice(0, 5) || [];
  
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDateLabel = (dStr: string) => {
    const d = parseSafeDate(dStr);
    if (isNaN(d.getTime())) return dStr;
    
    // Check Today
    if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
      return t?.today || 'Today';
    }
    // Check Yesterday
    if (d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth() && d.getFullYear() === yesterday.getFullYear()) {
      return t?.yesterday || 'Yesterday';
    }

    return d.toLocaleDateString(curr?.symbol === 'Rp' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' });
  };

  const grouped: { [key: string]: any[] } = {};
  recentExpenses.forEach(exp => {
    const label = formatDateLabel(exp.date);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(exp);
  });


  return (
    <div className="w-full max-w-sm mt-3 px-1">
      <h3 className="text-sm font-sans font-bold text-ink mb-3 tracking-wide">{t?.tales || 'History'}</h3>
      <div className="flex flex-col gap-3">
        {Object.entries(grouped).map(([dateLabel, items]) => (
          <div key={dateLabel} className="flex flex-col gap-1.5 w-full">
            <span className="text-ink3 text-[10px] font-bold tracking-wider uppercase ml-1 mb-0.5">{dateLabel}</span>
            {items.map((exp, idx) => {
              const isIncome = exp.type === 'income';
              return (
                 <div key={exp.id} onClick={() => onEdit && onEdit(exp)} className="p-3 bg-bg2 border border-border2 rounded-2xl flex justify-between items-center text-sm shadow-[0_2px_12px_rgba(220,205,185,0.15)] transition group w-full cursor-pointer active:scale-[0.98]">
                   <div className="flex items-center gap-3 flex-1 min-w-0">
                     <div>
                       <p className="font-bold text-ink truncate max-w-[160px] text-sm">{exp.title}</p>
                       <p className="text-ink3 text-xs font-medium capitalize mt-0.5">{t[exp.category.toLowerCase()] || exp.category}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <p className={`font-sans font-extrabold text-sm ${isIncome ? 'text-grd' : 'text-ink'}`}>
                       {isIncome ? '+' : '-'}{symbol}{(exp.amount * rate).toLocaleString(undefined, { minimumFractionDigits: curr?.decimals ?? 2, maximumFractionDigits: curr?.decimals ?? 2 })}
                     </p>

                     <button 
                       onClick={(e) => { e.stopPropagation(); handleDelete(exp.id); }}
                       className="p-2.5 rounded-xl bg-rd/10 text-rd hover:bg-rd hover:text-white transition-opacity aspect-square flex items-center justify-center active:scale-95"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                 </div>
              )
            })}
          </div>
        ))}
      </div>

      
      <button 
        onClick={onOpenAll}
        className="mt-3 w-full py-2 bg-bg2 border border-border2 text-ink2 rounded-xl font-bold text-xs hover:bg-border2/20 transition shadow-sm"
      >
        View All 
      </button>
    </div>
  )
}
