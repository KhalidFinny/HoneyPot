import { motion } from 'framer-motion'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../data/db'
import { translations } from '../../logic/settings'

export default function LoadingOverlay() {
  const languageSetting = useLiveQuery(() => db?.table('settings').get('language'))
  const lang = languageSetting?.value === 'id' ? 'id' : 'en'
  const t = translations[lang] || translations.en


  return (
    <motion.div 
      className="fixed inset-0 bg-bg2 flex flex-col items-center justify-center p-6 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.img 
          src="/honeypot/logo2.svg" 
          alt="HoneyPot" 
          className="w-32 h-32 object-contain mb-4"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
        <motion.p 
          className="text-ink font-serif font-bold text-sm tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          {t.opening_ledger || 'Opening the Kingdom Ledger...'}
        </motion.p>
      </div>
    </motion.div>
  )
}
