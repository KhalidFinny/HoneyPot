import { AlertTriangle, AlertOctagon, Sparkles } from 'lucide-react'


import { SmartNotesProps } from "../../types"

export default function SmartNotes({ transactions = [], totalIncome = 0, totalExpense = 0, t }: SmartNotesProps) {
  
  const generateNotes = () => {
    const notes = [];
    const expenses = transactions.filter(t => t.type === 'expense');

    if (totalExpense > totalIncome && totalIncome > 0) {
      notes.push({ state: 'bad', icon: AlertOctagon, text: t?.bad_notes_overspent || "We've spent a little more than we gathered, let's keep an eye out together." });
    }

    const adventures = expenses.filter(e => e.category === 'Transport' || e.category === 'Shopping').reduce((sum, e) => sum + e.amount, 0);

    if (adventures > (totalExpense * 0.20) && totalExpense > 0) {
      notes.push({ state: 'warn', icon: AlertTriangle, text: t?.warn_notes_adventures || "Memories are taking up a bit of our pot — just making sure you are mindful." });
    }

    if (notes.length === 0) {
      notes.push({ state: 'safe', icon: Sparkles, text: t?.safe_notes_all_good || "The honey pots are full and everything is wonderfully safe with us." });
    }

    return notes;
  }

  const notesList = generateNotes();

  const getStyle = (state: string) => {
    if (state === 'bad') return 'text-rdd';
    if (state === 'warn') return 'text-yd';
    return 'text-grd';
  }

  return (
    <div className="w-full max-w-sm mt-4 bg-[#FCF5E3]/80 border border-[#EDDAB4] p-4 rounded-[24px] shadow-[0_4px_16px_rgba(245,215,165,0.12)] flex flex-col gap-2">
      <h3 className="text-ink font-sans font-bold text-sm mb-1">{t?.whispers || 'Alerts & Guide'}</h3>
      {notesList.map((note, idx) => (
        <div key={idx} className="flex gap-2 items-start py-1.5 border-b border-rule/20 last:border-0">
          <note.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getStyle(note.state)}`} />
          <p className={`text-sm ${getStyle(note.state)} font-semibold leading-relaxed`}>{note.text}</p>
        </div>
      ))}
    </div>
  )
}
