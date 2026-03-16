import { RunwayDisplayProps } from "../types"

export default function RunwayDisplay({ balance, t }: RunwayDisplayProps) {
  // Calculate Days Left in current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysLeft = daysInMonth - today.getDate();

  // Daily Allowance = Current Balance / Days Left
  const dailyAllowance = daysLeft > 0 && balance > 0 ? balance / daysLeft : balance > 0 ? balance : 0;

  const getAllowanceState = (amount: number) => {
    if (amount >= 200000) return { title: t?.comfy_allowance || 'Comfortable Daily Budget', sub: t?.comfy_allowance_sub || 'Spend wisely, you have a safe margin.' };
    if (amount >= 50000) return { title: t?.mod_allowance || 'Moderate Daily Budget', sub: t?.mod_allowance_sub || 'Mindful spending recommended.' };
    if (amount > 0) return { title: t?.tight_allowance || 'Tight Daily Budget', sub: t?.tight_allowance_sub || 'Keep it descriptive, every penny counts.' };
    return { title: t?.empty_allowance || 'The pot is empty', sub: t?.empty_allowance_sub || 'No remaining funds for the month.' };
  }

  const { title, sub } = getAllowanceState(dailyAllowance);

  return (
    <div className="w-full max-w-sm flex flex-col items-start mt-4 bg-[#F5EFE6] border border-[#DCD2C3] p-4 rounded-[24px] shadow-[0_2px_12px_rgba(220,205,185,0.15)]">
      <p className="text-ink font-sans font-bold text-sm mb-2">
        {t?.days_left_title || 'Days Left in Month'}
      </p>
      <div className="flex items-baseline leading-none">
        <span className="font-sans font-black text-[42px] tracking-tight text-ink">
          {daysLeft}
        </span>
        <span className="text-ink3 text-xs font-bold uppercase ml-1">
          {t?.days || 'days'}
        </span>
      </div>
      
      <p className="text-ink text-xs font-bold mt-2">
        {t?.daily_allowance || 'Daily Allowance'}: <span className="text-pkd">Rp {dailyAllowance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
      </p>

      <h4 className="font-sans font-black text-ink text-sm mt-1.5">{title}</h4>
      <p className="text-ink3 text-xs mt-0.5 leading-relaxed">{sub}</p>
    </div>
  )
}
