import { useSettingsModal } from './SettingsModal.hooks'
import BottomModal from '../BottomModal/BottomModal'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import CustomSelect from '../UI/CustomSelect'
import { db } from '../../data/db'




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
    theme,
    setTheme,
    payday,
    setPayday,
  } = useSettingsModal({ onClose })

  const calendarToday = new Date();
  const calendarYear = calendarToday.getFullYear();
  const calendarMonth = calendarToday.getMonth();
  const calendarMonthName = calendarToday.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const weekdays = lang === 'id' ? ['M','S','S','R','K','J','S'] : ['S','M','T','W','T','F','S'];

  return (

    <BottomModal isOpen={isOpen} onClose={onClose} title="Settings & Kingdom Config">
      <div className="flex flex-col gap-5">
        <div>
          <CustomSelect 
            label="Language"
            value={lang}
            onChange={setLang}
            options={[
              { value: "en", label: "English (Enchanted)" },
              { value: "id", label: "Indonesia (Bahasa)" }
            ]}
          />
        </div>


        <div>
          <CustomSelect 
            label="Currency"
            value={curr}
            onChange={setCurr}
            options={[
              { value: "USD", label: "USD ($)" },
              { value: "IDR", label: "IDR (Rp)" },
              { value: "EUR", label: "EUR (€)" },
              { value: "GBP", label: "GBP (£)" },
              { value: "PHP", label: "PHP (₱)" },
              { value: "CNY", label: "CNY (¥)" },
              { value: "JPY", label: "JPY (¥)" },
              { value: "CAD", label: "CAD (C$)" },
              { value: "AUD", label: "AUD (A$)" },
              { value: "SGD", label: "SGD (S$)" },
              { value: "INR", label: "INR (₹)" },
              { value: "KRW", label: "KRW (₩)" },
              { value: "MYR", label: "MYR (RM)" }
            ]}
          />
        </div>
        


        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-ink3 text-[10px] uppercase font-semibold tracking-wider block">Dark Mode</label>
            <button 
              type="button"
              onClick={async () => {
                const nt = theme === 'dark' ? 'light' : 'dark';
                setTheme(nt);
                await db.table('settings').put({ key: 'theme', value: nt });
              }}
              className={`text-xs font-semibold px-2 py-1 rounded-lg ${theme === 'dark' ? 'bg-grl text-grd border border-gr' : 'bg-bg2 text-ink3 border border-border2'}`}
            >
              {theme === 'dark' ? 'Enabled' : 'Disabled'}
            </button>
          </div>

        </div>

        <div className="border-t border-border2/30 pt-4">
          <label className="text-ink3 text-[10px] uppercase font-semibold tracking-wider mb-1.5 block">Payday (Recurring)</label>
          <div className="bg-bg2/50 p-2.5 rounded-xl border border-border2 mt-1">
            <p className="text-center text-[11px] font-bold text-ink2 mb-1.5">
              {calendarMonthName}
            </p>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {weekdays.map((w, i) => (
                <div key={i} className="text-[10px] font-bold text-ink3">
                  {w}
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`blank-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                return (
                  <button 
                    type="button"
                    key={d}
                    onClick={() => setPayday(payday === String(d) ? "" : String(d))}
                    className={`w-full aspect-square flex items-center justify-center text-xs font-sans font-bold rounded-lg transition-all duration-200 ${
                      payday === String(d) 
                        ? 'bg-ink text-bg shadow-sm scale-105' 
                        : 'text-ink hover:bg-border2/20'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* 🔒 Passcode Section */}
        <div className="border-t border-border2/30 pt-4">


          <div className="flex justify-between items-center mb-1.5">
            <label className="text-ink3 text-[10px] uppercase font-semibold tracking-wider block">Passcode Lock</label>
            <button 
              type="button"
              onClick={() => setIsPinEnabled(!isPinEnabled)}
              className={`text-xs font-semibold px-2 py-1 rounded-lg ${isPinEnabled ? 'bg-grl text-grd border border-gr' : 'bg-bg2 text-ink3 border border-border2'}`}
            >
              {isPinEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          {isPinEnabled && (
            <input 
              type="password" 
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full bg-bg2/50 border border-border2 rounded-xl px-3 py-2 text-sm text-ink font-mono font-bold tracking-widest focus:outline-none focus:border-ink"
            />
          )}
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="mt-4 bg-ink hover:bg-ink2 text-bg font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"

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

