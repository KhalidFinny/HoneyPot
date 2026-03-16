import { useOnboarding } from "./Onboarding.hooks";
import { translations } from "../../logic/settings";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    handleAmountChange,
    handleSubmit,
  } = useOnboarding();

  const t = translations[lang] || translations.en;


  if (step === "cover") {
    return (
      <div className="fixed inset-0 bg-[#F5EFE6] flex flex-col items-center justify-center p-6 z-50 animate-fade-in">
        <div className="flex flex-col items-center text-center max-w-xs">
          <img
            src="/honeypot/logo1.svg"
            alt="HoneyPot"
            className="w-64 h-64 object-contain mb-6 animate-bounce-slow"
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
    <div className="fixed inset-0 bg-[#F5EFE6] flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#FCF8F2] border border-[#EBE3D5] rounded-3xl shadow-[0_8px_32px_rgba(220,205,185,0.25)] p-6 w-full max-w-sm flex flex-col items-center">
        <img
          src="/honeypot/logo2.svg"
          alt="HoneyPot"
          className="w-14 h-14 object-contain mb-4"
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
              <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">
                Language
              </label>
              <div className="relative">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as "en" | "id")}
                  className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-lg px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer [&>option]:bg-white"
                >
                  <option value="en">English</option>
                  <option value="id">Indonesian</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink3 pointer-events-none" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-ink3 text-[9px] font-semibold tracking-[1px] uppercase mb-1 block">
                Currency
              </label>
              <div className="relative">
                <select
                  value={curr}
                  onChange={(e) => setCurr(e.target.value)}
                  className="w-full bg-[#F2EBDA]/40 border border-[#DCD2C3] rounded-lg px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-ink appearance-none cursor-pointer [&>option]:bg-white"
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
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink3 pointer-events-none" />
              </div>
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
              className="w-full bg-transparent border-b border-[#DCD2C3] focus:outline-none focus:border-ink py-1 text-base font-sans font-medium text-ink"
              autoFocus
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
              className="w-full bg-transparent border-b border-[#DCD2C3] focus:outline-none focus:border-ink py-1 text-xl font-sans font-extrabold text-ink"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-4 bg-ink hover:bg-ink2 text-white font-semibold py-2.5 rounded-xl transition text-sm flex items-center justify-center font-sans shadow-sm"
          >
            {lang === "id" ? "Mulai Menabung" : "Start My Journey"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
