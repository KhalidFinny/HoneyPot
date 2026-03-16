import { useSettingsModal } from './SettingsModal.hooks'
import BottomModal from '../BottomModal/BottomModal'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'


interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const {
    lang,
    setLang,
    curr,
    setCurr,
    passcode,
    setPasscode,
    isPinEnabled,
    setIsPinEnabled,
    handleSave,
    handleReset,
  } = useSettingsModal({ onClose })

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
              <option value="CAD">CAD (C$)</option>
              <option value="AUD">AUD (A$)</option>
              <option value="SGD">SGD (S$)</option>
              <option value="INR">INR (₹)</option>
              <option value="KRW">KRW (₩)</option>
              <option value="MYR">MYR (RM)</option>

            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink3 pointer-events-none" />
          </div>
        </div>

        {/* 🔒 Passcode Section */}
        <div className="border-t border-[#ECD8F0] pt-4">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-ink3 text-[10px] uppercase font-semibold tracking-wider block">Passcode Lock</label>
            <button 
              type="button"
              onClick={() => setIsPinEnabled(!isPinEnabled)}
              className={`text-xs font-semibold px-2 py-1 rounded-lg ${isPinEnabled ? 'bg-grl text-grd border border-gr' : 'bg-[#F5EFE6] text-ink3 border border-[#DCD2C3]'}`}
            >
              {isPinEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          {isPinEnabled && (
            <input 
              type="text" 
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-xl px-3 py-2 text-sm text-ink font-mono font-bold tracking-widest focus:outline-none focus:border-ink"
            />
          )}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="mt-4 bg-ink hover:bg-ink2 text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"
        >
          Save Changes
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
          className="mt-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-600 font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"
        >
          Reset All Data & Start Over
        </motion.button>

      </div>
    </BottomModal>
  )
}

