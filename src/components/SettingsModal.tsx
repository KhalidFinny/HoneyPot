import { useState, useEffect } from 'react'
import { db } from '../data/db'
import { useLiveQuery } from 'dexie-react-hooks'
import BottomModal from './BottomModal'
import { ChevronDown } from 'lucide-react'

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [lang, setLang] = useState('en')
  const [curr, setCurr] = useState('USD')

  const languageSetting = useLiveQuery(() => db.table('settings').get('language'))
  const currencySetting = useLiveQuery(() => db.table('settings').get('currency'))

  useEffect(() => {
    if (languageSetting?.value) setLang(languageSetting.value)
  }, [languageSetting])

  useEffect(() => {
    if (currencySetting?.value) setCurr(currencySetting.value)
  }, [currencySetting])

  const handleSave = async () => {
    await db.table('settings').put({ key: 'language', value: lang })
    await db.table('settings').put({ key: 'currency', value: curr })
    onClose()
  }

  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title="Settings & Kingdom Config">
      <div className="flex flex-col gap-5">
        <div>
          <label className="text-ink3 text-[10px] uppercase font-semibold tracking-wider mb-1.5 block">Language</label>
          <div className="relative">
            <select 
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer [&>option]:bg-white"
            >
              <option value="en">English (Enchanted)</option>
              <option value="id">Indonesia (Bahasa)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink3 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-ink3 text-[10px] uppercase font-semibold tracking-wider mb-1.5 block">Currency</label>
          <div className="relative">
            <select 
              value={curr}
              onChange={(e) => setCurr(e.target.value)}
              className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-xl px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer [&>option]:bg-white"
            >
              <option value="USD">USD ($)</option>
              <option value="IDR">IDR (Rp)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="PHP">PHP (₱)</option>
              <option value="CNY">CNY (¥)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink3 pointer-events-none" />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="mt-4 bg-ink hover:bg-ink2 text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"
        >
          Save Changes
        </button>

        <button 
          onClick={async () => {
            if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
              await db.table('expenses').clear();
              await db.table('settings').clear();
              window.location.reload();
            }
          }}
          className="mt-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"
        >
          Reset All Data & Start Over
        </button>
      </div>
    </BottomModal>
  )
}
