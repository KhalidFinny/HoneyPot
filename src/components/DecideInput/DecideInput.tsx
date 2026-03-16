import { useDecideInput } from './DecideInput.hooks'
import { Sparkles } from 'lucide-react'
import { DecideInputProps } from '../../types'
import { motion } from 'framer-motion'


export default function DecideInput({ balance, transactions = [], curr, t }: DecideInputProps) {
  const { amount, handleAmountChange, result, getStyle, symbol } = useDecideInput({ balance, transactions, curr, t })

  return (

    <div className="w-full max-w-sm flex flex-col items-start mt-4 bg-[#F5EFE6] border border-[#DCD2C3] p-4 rounded-[24px] shadow-[0_2px_12px_rgba(220,205,185,0.15)]">
      <p className="text-ink font-sans font-bold text-sm mb-3">{t?.ask_honey_pot || 'Decide spending…'}</p>
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 min-w-0 flex items-baseline border-b border-rule/50 focus-within:border-ink transition">
          <span className="text-ink font-sans font-black text-lg mr-1">{symbol}</span>
          <input 
            type="text"
            placeholder="0"
            value={amount}
            onChange={handleAmountChange}
            className="flex-1 bg-transparent py-1.5 focus:outline-none font-sans font-extrabold text-2xl text-ink"
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-2xl bg-ink text-white hover:bg-ink2 transition shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
        </motion.button>
      </div>

      {result && (
        <div className={`mt-3 p-3 rounded-xl flex items-center gap-2 border ${getStyle(result.state)} animate-fade-in w-full`}>
          <result.icon className="w-3.5 h-3.5 flex-shrink-0" />
          <p className="text-xs font-semibold">{result.text}</p>
        </div>
      )}
    </div>
  )
}
