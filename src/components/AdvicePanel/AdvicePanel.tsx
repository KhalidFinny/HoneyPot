import { Compass } from 'lucide-react'

interface AdvicePanelProps {
  advice: string;
}

export default function AdvicePanel({ advice }: AdvicePanelProps) {
  return (
    <div className="w-full max-w-sm bg-bg2 border border-border2 shadow-[0_2px_12px_rgba(220,205,185,0.15)] rounded-2xl p-4 mb-6 text-ink2 text-sm shadow-sm flex gap-3 items-start">
      <div className="w-7 h-7 rounded-xl bg-ink/5 flex items-center justify-center flex-shrink-0 text-ink">
        <Compass className="w-4 h-4" />
      </div>
      <div>
        <h4 className="font-serif font-bold text-ink mb-0.5 leading-snug">A Gentle Guide</h4>
        <p className="font-sans text-xs text-ink2 leading-relaxed italic">{advice}</p>
      </div>
    </div>
  )
}
