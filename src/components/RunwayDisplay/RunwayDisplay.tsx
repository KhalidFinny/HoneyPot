import { useRunwayDisplay } from './RunwayDisplay.hooks'
import { RunwayDisplayProps } from "../../types"

export default function RunwayDisplay({ balance, t, payday, curr }: RunwayDisplayProps) {
  const { daysLeft, dailyAllowance, title, sub } = useRunwayDisplay({ balance, t, payday })


  return (
    <div className="w-full max-w-sm flex items-center gap-4 mt-4 bg-bg2 border border-border2 p-4 rounded-[24px] shadow-[0_2px_12px_rgba(220,205,185,0.15)] overflow-hidden">
      {/* 🔴 Left side: Big Days */}
      <div className="flex flex-col items-center justify-center p-2 bg-wh rounded-2xl border border-border2 aspect-square min-w-[72px] shadow-sm">
        <span className="font-sans font-black text-[32px] tracking-tight text-ink leading-none">
          {daysLeft}
        </span>
        <span className="text-ink3 text-[10px] font-bold uppercase tracking-wider mt-0.5">
          {t?.days || 'days'}
        </span>
      </div>

      {/* 🟡 Right side: Details */}
      <div className="flex-1 flex flex-col min-w-0">
        <p className="text-ink font-sans font-bold text-xs truncate">
          {payday ? (t?.days_to_payday || 'Days to Payday') : (t?.days_left_title || 'Days Left in Month')}
        </p>
        <p className="text-ink text-xs font-semibold mt-0.5">
          {t?.daily_allowance || 'For today'}: <span className="text-pkd">{curr?.symbol || 'Rp'} {(dailyAllowance * (curr?.rate || 1)).toLocaleString(undefined, { maximumFractionDigits: curr?.decimals ?? 0 })}</span>
        </p>
        <h4 className="font-sans font-black text-ink text-sm mt-1 truncate">{title}</h4>
        <p className="text-ink2 text-xs mt-0.5 leading-relaxed break-words">{sub}</p>
      </div>
    </div>


  )
}
