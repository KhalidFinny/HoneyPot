import { useRunwayDisplay } from './RunwayDisplay.hooks'
import { RunwayDisplayProps } from "../../types"

export default function RunwayDisplay({ balance, t }: RunwayDisplayProps) {
  const { daysLeft, dailyAllowance, title, sub } = useRunwayDisplay({ balance, t })


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
