import { useState } from 'react'
import { db } from '../data/db'
import { Trash2, Edit2, Check, X } from 'lucide-react'
import { HistoryManagerProps } from '../types'

export default function HistoryManager({ expenses = [], curr, t }: HistoryManagerProps) {
  const [editingId, setEditingId] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const symbol = curr?.symbol || 'Rp';

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

  return (
    <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[60vh] px-1 pb-4">
      <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-none">{months.map((m, idx) => (<button key={m} onClick={() => setSelectedMonth(idx)} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${selectedMonth === idx ? "bg-ink text-white" : "bg-[#F5EFE6] border border-[#DCD2C3] text-ink2"}`}>{m.slice(0, 3)}</button>))}</div> {expenses.filter(exp => new Date(exp.date).getMonth() === selectedMonth).map((exp) => {
        const isEditing = editingId === exp.id;
        const isIncome = exp.type === 'income';

        return (
          <div key={exp.id} className="p-3 bg-[#F5EFE6] hover:bg-[#EDDAB4]/10 border border-[#DCD2C3] rounded-2xl flex justify-between items-center text-sm shadow-sm transition group">
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

            <div className="flex items-center gap-2">
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
                <p className={`font-sans font-extrabold text-sm ${isIncome ? 'text-grd' : 'text-ink'}`}>
                  {isIncome ? '+' : '-'}{symbol}{exp.amount.toLocaleString(undefined, { minimumFractionDigits: curr?.decimals ?? 2, maximumFractionDigits: curr?.decimals ?? 2 })}
                </p>
              )}

              <div className="flex items-center gap-1">
                {isEditing ? (
                  <>
                    <button onClick={() => handleSaveEdit(exp.id)} className="p-1 rounded-lg bg-grd/10 text-grd hover:bg-grd hover:text-white transition">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1 rounded-lg bg-ink/10 text-ink2 hover:bg-ink hover:text-white transition">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleStartEdit(exp)} className="p-1.5 rounded-xl bg-rule/10 text-ink2 opacity-0 group-hover:opacity-100 hover:bg-ink hover:text-white transition">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(exp.id)} className="p-1.5 rounded-xl bg-rd/10 text-rd opacity-0 group-hover:opacity-100 hover:bg-rd hover:text-white transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
