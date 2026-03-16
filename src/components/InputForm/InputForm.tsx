import { useInputForm } from './InputForm.hooks'
import { Check, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react'
import { InputFormProps } from "../../types"
import { motion } from 'framer-motion'

export default function InputForm({ onComplete, t }: InputFormProps) {


  const {
    title,
    setTitle,
    amount,
    setAmount,
    type,
    setType,
    category,
    setCategory,
    handleAmountChange,
    handleSubmit,
  } = useInputForm({ onComplete })


  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col">
      {/* Type Toggle */}
      <div className="flex gap-2 mb-6 bg-rule p-1 rounded-xl">
        <motion.button 
          type="button"
          onClick={() => setType('expense')}
          whileHover={{ scale: 1.02, translateY: -1 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            type === 'expense' ? 'bg-white shadow-sm text-pkd font-bold' : 'text-ink3 hover:text-ink2'
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5" /> {t?.expense || 'Expense'}
        </motion.button>
        <motion.button 
          type="button"
          onClick={() => setType('income')}
          whileHover={{ scale: 1.02, translateY: -1 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-semibold rounded-lg transition ${
            type === 'income' ? 'bg-white shadow-sm text-grd font-bold' : 'text-ink3 hover:text-ink2'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" /> {t?.income || 'Income'}
        </motion.button>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-ink3 text-[9px] font-semibold tracking-[2px] uppercase mb-1 block">
            {type === "income" ? (t?.source || "Source") : (t?.description || "Description")}
          </label>
          <input 
            type="text" 
            placeholder={type === 'income' ? "E.g., Stipend" : "E.g., Dinner"} 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-b border-rule focus:outline-none focus:border-ink py-1 text-base font-sans font-medium text-ink"
            autoFocus
          />
        </div>

        <div>
          <label className="text-ink3 text-[9px] font-semibold tracking-[2px] uppercase mb-1 block">{t?.amount || "Amount"}</label>
          <input 
            type="text" 
            placeholder="0" 
            value={amount}
            onChange={handleAmountChange}
            className="w-full bg-transparent border-b border-rule focus:outline-none focus:border-ink py-1 text-2xl font-sans font-extrabold text-ink"
          />
        </div>
        
        {type === 'expense' && (
          <div>
            <label className="text-ink3 text-[9px] font-semibold tracking-[2px] uppercase mb-1 block">{t?.category || "Category"}</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer [&>option]:bg-white"
              >
                <option value="Food">{t?.food || 'Food'}</option>
                <option value="Transport">{t?.transport || 'Transport'}</option>
                <option value="Housing">{t?.housing || 'Housing'}</option>
                <option value="Shopping">{t?.shopping || 'Shopping'}</option>
                <option value="Bills">{t?.bills || 'Bills'}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink3 pointer-events-none" />
            </div>
          </div>
        )}

        <motion.button 
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 bg-ink hover:bg-ink2 text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center gap-1 shadow-sm font-sans"
        >
          <Check className="w-4 h-4" /> {type === "income" ? (t?.save_income || "Save Income") : (t?.save_expense || "Save Expense")}
        </motion.button>
      </div>
    </form>
  )
}
