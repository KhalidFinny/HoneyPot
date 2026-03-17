import { useOnboarding } from "./Onboarding.hooks";
import { translations } from "../../logic/settings";
import { ChevronDown, Sparkles, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import CustomSelect from "../UI/CustomSelect";
import { db } from "../../data/db";
import { useState } from "react";



export default function Onboarding() {

  const {
    step,
    setStep,
    name,
    setName,
    amount,
    lang,
    setLang,
    curr,
    setCurr,
    payday,
    setPayday,
    isPinEnabled,
    setIsPinEnabled,
    passcode,
    setPasscode,
    handleAmountChange,
    handleSubmit,

  } = useOnboarding();

  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleDark = async () => {
    const nt = !isDark;
    setIsDark(nt);
    if (nt) {
      document.documentElement.classList.add('dark');
      await db.table('settings').put({ key: 'theme', value: 'dark' });
    } else {
      document.documentElement.classList.remove('dark');
      await db.table('settings').put({ key: 'theme', value: 'light' });
    }
  };





  const t = translations[lang] || translations.en;

  const calendarToday = new Date();
  const calendarYear = calendarToday.getFullYear();
  const calendarMonth = calendarToday.getMonth();
  const calendarMonthName = calendarToday.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const weekdays = lang === 'id' ? ['M','S','S','R','K','J','S'] : ['S','M','T','W','T','F','S'];


  if (step === "cover") {
    return (
      <div className="fixed inset-0 bg-bg2 flex flex-col items-center justify-center p-6 z-50 animate-fade-in relative">
        <button 
          type="button"
          onClick={toggleDark} 
          className="absolute top-4 right-4 p-2 rounded-xl bg-bg border border-border2 text-ink"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <div className="flex flex-col items-center text-center max-w-xs">

          <img
            src="/honeypot/logo1.svg"
            alt="HoneyPot"
            className="w-64 h-64 object-contain mb-6 animate-bounce-slow dark:invert"
          />
          <p className="text-ink3 text-sm font-medium leading-relaxed mb-8">
            Your gentle dashboard to mindful collections and sweet balance
            structures.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setStep("info")}
            className="w-full bg-ink hover:bg-ink2 text-white font-semibold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 font-sans"
          >
            Start Your Tale <Sparkles className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-bg2 flex items-center justify-center p-4 z-50 animate-fade-in relative">
      <button 
        type="button"
        onClick={toggleDark} 
        className="absolute top-4 right-4 p-2 rounded-xl bg-bg border border-border2 text-ink shadow-sm"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
      <div className="bg-bg border border-border2 rounded-3xl shadow-[0_8px_32px_rgba(220,205,185,0.25)] p-6 w-full max-w-sm flex flex-col items-center">


        <img
          src="/honeypot/logo2.svg"
          alt="HoneyPot"
          className="w-14 h-14 object-contain mb-4 dark:invert"
        />
        <h2 className="text-xl font-serif font-bold text-ink mb-1">
          {lang === "id" ? "Buka Lembaran Baru" : "Begin Your Setup"}
        </h2>
        <p className="text-ink3 text-xs font-semibold tracking-wide uppercase mb-5">
          {lang === "id"
            ? "Sesuaikan Preferensi Anda"
            : "Customize Your Experience"}
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex gap-2 w-full">
            <div className="flex-1">
              <CustomSelect 
                label="Language"
                value={lang}
                onChange={(val) => setLang(val as "en" | "id")}
                options={[
                  { value: "en", label: "English" },
                  { value: "id", label: "Indonesian" }
                ]}
              />
            </div>

            <div className="flex-1">
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

          </div>

          <div className="mt-1">
            <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">
              {lang === "id" ? "Apa Panggilan Anda?" : "Your Name?"}
            </label>
            <input
              type="text"
              placeholder={
                lang === "id" ? "Nama Anda" : "Your Name"
              }
              value={name}

              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-border2 focus:outline-none focus:border-ink py-1 text-base font-sans font-medium text-ink"
              required
            />
          </div>


          <div>
            <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">
              {lang === "id" ? "Saldo Awal Saat Ini" : "Starting Balance"}
            </label>
            <input
              type="text"
              placeholder="0"
              value={amount}
              onChange={handleAmountChange}
              className="w-full bg-transparent border-b border-border2 focus:outline-none focus:border-ink py-1 text-xl font-sans font-extrabold text-ink"
            />
          </div>

          <div className="mt-2">
            <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">
              {lang === "id" ? "Tanggal Gajian (Opsional)" : "Payday (Optional)"}
            </label>
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
          <div className="border-t border-border2/30 pt-4 w-full">
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
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2"
              >
                <input 
                  type="password"
                  maxLength={4}
                  placeholder="0000"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-bg2/50 border border-border2 rounded-xl px-3 py-2 text-sm text-ink font-mono font-bold tracking-widest focus:outline-none focus:border-ink"
                />
              </motion.div>
            )}
          </div>

          <motion.button

            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 bg-ink hover:bg-ink2 text-bg font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"

          >
            {lang === "id" ? "Mulai Menabung" : "Start My Journey"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
