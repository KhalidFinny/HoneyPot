import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../data/db'
import { useState, useEffect } from 'react'

import { BudgetMeterProps } from '../types'

export default function BudgetMeter({ currentExpenses, curr, t }: BudgetMeterProps) {
  const [budget, setBudget] = useState(0) 
  const budgetSetting = useLiveQuery(() => db.table('settings').get('budget_limit'))

  useEffect(() => {
    if (budgetSetting?.value) setBudget(parseFloat(budgetSetting.value))
  }, [budgetSetting])

  const handleSetBudget = async (val: number) => {
    setBudget(val)
    await db.table('settings').put({ key: 'budget_limit', value: val.toString() })
  }

  const pct = budget > 0 ? (currentExpenses / budget) * 100 : 0;

  const getFillColor = () => {
    if (pct > 90) return 'bg-[#FF9EBB]'; // Slightly darker pastel for danger
    if (pct > 70) return 'bg-[#FFD1DC]'; // Soft Pink
    return 'bg-[#BEE3E5]'; // Soft Blue
  }

  const getHint = () => {
    if (pct > 100) return t?.budget_overspent || "We've overspent a bit, but we'll balance it out together.";
    if (pct > 90) return t?.budget_almost || "Almost at our limit — let's slow down a bit for now.";
    if (pct > 70) return t?.budget_warning || "Treasury is thinning a little, let's take a safe breather.";
    return t?.safe_budget || "Everything is perfectly safe and sound.";
  }

  const symbol = curr?.symbol || '$';
  const rate = curr?.rate || 1;

  return (
    <div className="w-full max-w-sm flex flex-col items-start mt-4 bg-[#F5EFE6] border border-[#DCD2C3] p-4 rounded-[24px] shadow-[0_2px_12px_rgba(220,205,185,0.15)]">
      <p className="text-ink font-sans font-bold text-sm mb-3">{t?.set_limit || 'Monthly Budget Limit…'}</p>
      <div className="flex items-baseline w-full border-b border-rule/50 focus-within:border-ink transition mb-4">
        <span className="text-ink font-sans font-black text-lg mr-1">{symbol}</span>
        <input 
          type="number"
          value={budget || ''}
          onChange={(e) => handleSetBudget(parseFloat(e.target.value) || 0)}
          className="flex-1 bg-transparent py-1 focus:outline-none font-sans font-extrabold text-2xl text-ink [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      <div className="w-full h-1.5 bg-rule/10 rounded-full overflow-hidden">
        <div className={`h-full ${getFillColor()} transition-all duration-300`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>

      <div className="flex justify-between items-center w-full mt-2.5">
        <span className="text-ink font-sans font-extrabold text-xs">{t?.spent || 'Spent'}: {symbol}{Math.round(currentExpenses * rate).toLocaleString()}</span>
        <span className="text-ink3 text-xs font-medium text-right max-w-[60%]">{getHint()}</span>
      </div>
    </div>
  )
}
