import { useState } from 'react'
import { db } from '../data/db'

export default function Onboarding() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    
    await db.table('settings').put({ key: 'username', value: name.trim() })
    if (amount) {
      await db.table('expenses').add({
        title: 'Initial Balance',
        amount: parseFloat(amount),
        category: 'Income',
        date: new Date().toLocaleDateString(),
        type: 'income',
        storyNote: 'Starting'
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-slate-100 animate-fade-in animate-duration-200">
        <div className="flex justify-center mb-4"><img src="/honeypot/logo1.svg" alt="HoneyPot" className="w-16 h-16 object-contain" /></div><h2 className="text-xl font-bold text-slate-800 mb-1">Welcome!</h2>
        <p className="text-slate-500 text-sm mb-5">Before we start tracking, what should I call you?</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Your name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 bg-transparent border-b border-slate-300 focus:outline-none focus:border-slate-800 text-sm font-sans"
            autoFocus
          />
          <input 
            type="number" 
            placeholder="Starting Balance" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="px-4 py-2 bg-transparent border-b border-slate-300 focus:outline-none focus:border-slate-800 text-sm font-sans [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button 
            type="submit"
            className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 rounded-xl transition text-sm"
          >
            Start Tracking
          </button>
        </form>
      </div>
    </div>
  )
}
