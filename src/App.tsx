import { useState, useEffect } from 'react'
import { db } from './data/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { generateSoftAdvice } from './logic/advice'
import BalanceBanner from './components/BalanceBanner'
import AdvicePanel from './components/AdvicePanel'
import InputForm from './components/InputForm'
import HistoryList from './components/HistoryList'
import Onboarding from './components/Onboarding'
import BottomModal from './components/BottomModal'
import RunwayDisplay from './components/RunwayDisplay'
import DecideInput from './components/DecideInput'
import BudgetMeter from './components/BudgetMeter'
import SmartNotes from './components/SmartNotes'
import CategoryTracker from './components/CategoryTracker'
import HistoryManager from './components/HistoryManager'
import { Plus, Settings } from 'lucide-react'
import SettingsModal from './components/SettingsModal'
import { translations, currencies } from './logic/settings'

function App() {
  const transactions = useLiveQuery(() => db.table('expenses').reverse().toArray()) || ([] as any[])
  const [isHistoryAllOpen, setIsHistoryAllOpen] = useState(false)
  const settingsList = useLiveQuery(() => db.table('settings').toArray())
  
  // Debug log
  console.log("Wishmint App Render Status:", { settingsList, transactions })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  const userSetting = settingsList?.find((s: any) => s.key === 'username')
  const languageSetting = settingsList?.find((s: any) => s.key === 'language')
  const currencySetting = settingsList?.find((s: any) => s.key === 'currency')

  const lang = (languageSetting?.value as 'en' | 'id') || 'en'
  const currencyKey = (currencySetting?.value as 'USD' | 'IDR' | 'EUR') || 'USD'
  const t = translations[lang] || translations.en
  const curr = currencies[currencyKey] || currencies.USD

  useEffect(() => {
    const t = setTimeout(() => {
      if (settingsList === undefined) setTimedOut(true)
    }, 2500)
    return () => clearTimeout(t)
  }, [settingsList])

  const handleReset = async () => {
    try {
      db.close()
      await db.delete()
      window.location.reload()
    } catch (err) {
      console.error("Manual Reset Failed:", err)
    }
  }

  const totalIncome = transactions
    .filter((e: any) => e.type === 'income')
    .reduce((sum: number, e: any) => sum + e.amount, 0)

  const totalExpense = transactions
    .filter((e: any) => e.type === 'expense')
    .reduce((sum: number, e: any) => sum + e.amount, 0)

  const balance = totalIncome - totalExpense
  const advice = generateSoftAdvice(transactions)

  const currentHour = new Date().getHours()
  let greetingKey = 'greeting_morning'
  if (currentHour >= 12 && currentHour < 17) greetingKey = 'greeting_afternoon'
  if (currentHour >= 17) greetingKey = 'greeting_evening'

  if (timedOut && settingsList === undefined) {
    return (
      <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center p-6 text-center animate-fade-in z-50">
        <h2 className="text-xl font-serif font-bold text-ink mb-1">The Kingdom Ledger is Locked</h2>
        <p className="text-xs text-ink3 mb-5 max-w-xs leading-relaxed">The continuous loading points to a stale database version lock in the browser.</p>
        <button 
          onClick={handleReset}
          className="bg-pkd hover:bg-ink text-white font-semibold px-4 py-2 rounded-xl shadow-md transition text-xs"
        >
          Reset Database
        </button>
      </div>
    )
  }

  if (settingsList === undefined) {
    return (
      <div className="fixed inset-0 bg-[#F5EFE6] flex flex-col items-center justify-center p-6 z-50 animate-fade-in">
        <img src="/honeypot/logo2.svg" alt="HoneyPot" className="w-16 h-16 object-contain mb-3 animate-bounce-slow" />
        <p className="text-ink font-serif font-bold text-sm">Opening the Kingdom Ledger...</p>
      </div>
    )
  }
  const username = userSetting?.value

  if (!username) {
    return <Onboarding />
  }

  return (
    <div className="relative min-h-screen bg-bg flex flex-col items-center p-6 text-ink scroll-smooth">
      
      {/* 🏰 Background Silhouette */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex justify-center">
        <img 
          src="/src/assets/tower.png" 
          alt="Rapunzel Tower Silhouette" 
          className="h-full w-auto object-cover object-bottom mix-blend-multiply" 
          style={{ opacity: '0.07' }} 
        />
      </div>

      {/* 📱 Single Column Container */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col items-start px-4">
        <div className="flex justify-between items-center w-full mb-8 mt-4 animate-fade-in">
          <img src="/honeypot/logo2.svg" alt="HoneyPot" className="w-16 h-16 object-contain" />
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-xl bg-[#F5EFE6] border border-[#DCD2C3] text-ink hover:bg-[#EDDAB4]/20 transition shadow-sm"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <header className="mb-6 text-left animate-fade-in w-full">
          <p className="text-ink3 text-[10px] font-semibold tracking-[3px] uppercase mb-1">
            {t[greetingKey as keyof typeof t]?.toUpperCase() || 'WELCOME'}
          </p>
          <h1 className="text-3xl font-serif font-bold text-ink">
            Hello, <span className="italic text-pkd">{username}.</span>
          </h1>
        </header>

        {/* 01. Hero & Balance */}
        <BalanceBanner balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} curr={curr} t={t} />
        
        {/* 02. Soft Guide Alert */}
        {totalExpense > totalIncome && totalIncome > 0 && <AdvicePanel advice={advice} />}

        {/* 03. Tales (Transactions) */}
        <HistoryList expenses={transactions} curr={curr} t={t} onOpenAll={() => setIsHistoryAllOpen(true)} />

        {/* 04. Runway */}
        <RunwayDisplay balance={balance} transactions={transactions} t={t} />

        {/* 05. Decide Checker */}
        <DecideInput balance={balance} transactions={transactions} curr={curr} t={t} />

        {/* 06. Budget Tracker */}
        <BudgetMeter currentExpenses={totalExpense} curr={curr} t={t} />

        {/* 07. Smart Notes */}
        <SmartNotes transactions={transactions} totalIncome={totalIncome} totalExpense={totalExpense} t={t} />
        
        {/* Categories Bar Chart */}
        <CategoryTracker transactions={transactions} curr={curr} t={t} />

        {/* FAB Clearance space */}
        <div className="h-[90px] w-full" />
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* ➕ Floating Action Button (FAB) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-7 left-1/2 -translate-x-[calc(-210px+24px)] w-14 h-14 bg-ink text-white rounded-full flex items-center justify-center shadow-xl hover:bg-ink2 transform hover:scale-105 active:scale-95 transition z-40 max-sm:right-6 max-sm:left-auto max-sm:translate-x-0"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* 📑 Modal Sheet */}
      <BottomModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="New Tale"
      >
        <InputForm onComplete={() => setIsModalOpen(false)} t={t} />
      </BottomModal>

      {/* 📜 Full History Modal */}
      <BottomModal 
        isOpen={isHistoryAllOpen} 
        onClose={() => setIsHistoryAllOpen(false)} 
        title={t?.tales || "History"}
      >
        <HistoryManager expenses={transactions} curr={curr} t={t} />
      </BottomModal>
    </div>
  )
}

export default App
