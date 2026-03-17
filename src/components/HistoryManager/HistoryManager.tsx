import { useState } from 'react'
import { db } from '../../data/db'
import { Trash2, Edit2, Check, X } from 'lucide-react'
import { HistoryManagerProps } from '../../types'

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



export default function HistoryManager({ expenses = [], curr, t }: HistoryManagerProps) {

  const [editingId, setEditingId] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const symbol = curr?.symbol || 'Rp';
  const rate = curr?.rate || 1;

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDateLabel = (dStr: string) => {
    const d = parseSafeDate(dStr);
    if (isNaN(d.getTime())) return dStr;
    
    if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) {
      return t?.today || 'Today';
    }
    if (d.getDate() === yesterday.getDate() && d.getMonth() === yesterday.getMonth() && d.getFullYear() === yesterday.getFullYear()) {
      return t?.yesterday || 'Yesterday';
    }
    return d.toLocaleDateString(curr?.symbol === 'Rp' ? 'id-ID' : 'en-US', { day: 'numeric', month: 'short' });
  };



  const handleDelete = async (id: any) => {
    await db.table('expenses').delete(id);
  }

  const handleStartEdit = (exp: any) => {
    setEditingId(exp.id);
    setEditTitle(exp.title);
    setEditAmount(exp.amount.toString());
  }

  const handleSaveEdit = async (id: any) => {
    if (!editTitle.trim() || !editAmount) return;
    await db.table('expenses').update(id, {
      title: editTitle.trim(),
      amount: parseFloat(editAmount)
    });
    setEditingId(null);
  }

  const filteredExpenses = expenses.filter(exp => {
    const d = parseSafeDate(exp.date);
    return !isNaN(d.getTime()) && d.getMonth() === selectedMonth;
  });

  const grouped: { [key: string]: any[] } = {};
  filteredExpenses.forEach(exp => {
    const label = formatDateLabel(exp.date);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(exp);
  });

  return (
    <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[60vh] px-1 pb-4">
      {/* Month Tabs */}
      <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-none">
        {months.map((m, idx) => (
          <button 
            key={m} 
            onClick={() => setSelectedMonth(idx)} 
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 ${selectedMonth === idx ? "bg-ink text-bg" : "bg-bg2 border border-border2 text-ink2"}`}
          >
            {m.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Grouped History List */}
      <div className="flex flex-col gap-3">
        {Object.entries(grouped).map(([dateLabel, items]) => (
          <div key={dateLabel} className="flex flex-col gap-1.5 w-full">
            <span className="text-ink3 text-[10px] font-bold tracking-wider uppercase ml-1 mb-0.5">{dateLabel}</span>
            {items.map((exp) => {
              const isEditing = editingId === exp.id;
              const isIncome = exp.type === 'income';

              return (
                <div key={exp.id} className="p-3 bg-bg2 hover:bg-border2/20 border border-border2 rounded-2xl flex justify-between items-center text-sm shadow-sm transition group w-full">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <input 
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-transparent border-b border-rule focus:outline-none focus:border-ink py-0.5 text-sm text-ink mb-1"
                          autoFocus
                        />
                      ) : (
                        <p className="font-bold text-ink truncate max-w-[140px] text-sm">{exp.title}</p>
                      )}
                      <p className="text-ink3 text-xs font-medium capitalize mt-0.5">{t[exp.category.toLowerCase()] || exp.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end min-w-0 flex-1">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 border-b border-rule focus-within:border-ink">
                        <span className="text-xs text-ink font-bold">{symbol}</span>
                        <input 
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="w-16 bg-transparent focus:outline-none py-0.5 text-sm font-sans font-bold text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    ) : (
                      <p className={`font-sans font-extrabold text-sm ${isIncome ? 'text-grd' : 'text-ink'} truncate text-right max-w-[120px]`}>
                        {isIncome ? '+' : '-'}{symbol}{(exp.amount * rate).toLocaleString(undefined, { minimumFractionDigits: curr?.decimals ?? 2, maximumFractionDigits: curr?.decimals ?? 2 })}
                      </p>
                    )}


                    <div className="flex items-center gap-1">
                      {isEditing ? (
                        <>
                          <button onClick={() => handleSaveEdit(exp.id)} className="p-1 rounded-lg bg-grd/10 text-grd hover:bg-grd hover:text-white transition"><Check className="w-3.5 h-3.5" /></button>
                          <button onClick={() => setEditingId(null)} className="p-1 rounded-lg bg-ink/10 text-ink2 hover:bg-ink hover:text-white transition"><X className="w-3.5 h-3.5" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleStartEdit(exp)} className="p-1.5 rounded-xl bg-rule/10 text-ink2 hover:bg-ink hover:text-white transition"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(exp.id)} className="p-1.5 rounded-xl bg-rd/10 text-rd hover:bg-rd hover:text-white transition"><Trash2 className="w-3.5 h-3.5" /></button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

