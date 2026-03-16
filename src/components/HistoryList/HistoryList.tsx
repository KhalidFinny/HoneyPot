import { Trash2 } from 'lucide-react'
import { db } from '../../data/db'
import { HistoryListProps } from '../../types'
import Skeleton from '../UI/Skeleton'

interface ExtendedHistoryListProps extends HistoryListProps {
  isLoading?: boolean;
}

export default function HistoryList({ expenses = [], curr, t, onOpenAll, isLoading }: ExtendedHistoryListProps) {

  const handleDelete = async (id: any) => {
    await db.table('expenses').delete(id)
  }

  const symbol = curr?.symbol || '$';

  if (isLoading) {
    return (
      <div className="w-full max-w-sm mt-3 px-1">
        <h3 className="text-sm font-sans font-bold text-ink mb-3 tracking-wide">{t?.tales || 'History'}</h3>
        <div className="flex flex-col gap-2.5">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="p-3 bg-[#F5EFE6] border border-[#DCD2C3] rounded-2xl flex justify-between items-center w-full shadow-[0_2px_12px_rgba(220,205,185,0.15)]">
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

  const getOrbStyle = (index: number) => {

    const list = [
      { bg: 'bg-rule/10 border-rule/30', text: 'text-ink' },
      { bg: 'bg-rule/10 border-rule/30', text: 'text-ink' }
    ];
    return list[index % list.length] || list[0];
  }

  return (
    <div className="w-full max-w-sm mt-3 px-1">
      <h3 className="text-sm font-sans font-bold text-ink mb-3 tracking-wide">{t?.tales || 'History'}</h3>
      <div className="flex flex-col gap-2.5">
        {expenses?.slice(0, 5).map((exp, idx) => {
          const style = getOrbStyle(idx);
          const isIncome = exp.type === 'income';
          return (
            <div key={exp.id} className="p-3 bg-[#F5EFE6] border border-[#DCD2C3] rounded-2xl flex justify-between items-center text-sm shadow-[0_2px_12px_rgba(220,205,185,0.15)] transition group w-full">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div>
                  <p className="font-bold text-ink truncate max-w-[160px] text-sm">{exp.title}</p>
                  <p className="text-ink3 text-xs font-medium capitalize mt-0.5">{t[exp.category.toLowerCase()] || exp.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className={`font-sans font-extrabold text-sm ${isIncome ? 'text-grd' : 'text-ink'}`}>
                  {isIncome ? '+' : '-'}{symbol}{exp.amount.toLocaleString(undefined, { minimumFractionDigits: curr?.decimals ?? 2, maximumFractionDigits: curr?.decimals ?? 2 })}
                </p>
                
                <button 
                  onClick={() => handleDelete(exp.id)}
                  className="p-1.5 rounded-xl bg-rd/10 text-rd opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rd hover:text-white aspect-square flex items-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      <button 
        onClick={onOpenAll}
        className="mt-3 w-full py-2 bg-[#F5EFE6] border border-[#DCD2C3] text-ink2 rounded-xl font-bold text-xs hover:bg-[#EDDAB4]/20 transition shadow-sm"
      >
        View All 
      </button>
    </div>
  )
}
