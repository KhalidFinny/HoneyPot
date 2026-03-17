import { usePasscodeLock } from './PasscodeLock.hooks'
import { motion } from 'framer-motion'
import { Lock, Fingerprint, Delete } from 'lucide-react'

interface PasscodeLockProps {
  onUnlock: () => void;
  correctPin: string;
}

export default function PasscodeLock({ onUnlock, correctPin }: PasscodeLockProps) {
  const {
    pin,
    error,
    handleKeyPress,
    handleDelete,
    triggerBiometrics,
  } = usePasscodeLock({ correctPin, onUnlock })

  return (

    <motion.div 
      className="fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center p-6"

      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center text-center max-w-sm w-full">
        <motion.div 
          className="w-16 h-16 rounded-3xl bg-pkl flex items-center justify-center mb-4 border border-border2/30"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Lock className="w-7 h-7 text-pkd" />
        </motion.div>
        
        <h1 className="text-xl font-serif font-bold text-ink mb-1">Unlock Ledger</h1>
        <p className="text-ink3 text-xs mb-8">Enter your 4-digit secret key</p>

        {/* 🟡 Dots display */}
        <div className="flex gap-4 mb-12">
          {[0, 1, 2, 3].map((index) => (
            <motion.div 
              key={index}
              className={`w-3 h-3 rounded-full border border-border2 ${index < pin.length ? 'bg-ink' : 'bg-transparent'}`}
              animate={error && index < pin.length ? { backgroundColor: '#881818' } : {}}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        {/* 🔢 Keypad */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button 
              key={num} 
              onClick={() => handleKeyPress(num)}
              className="w-16 h-16 rounded-full bg-bg2 hover:bg-border2/20 active:scale-95 text-xl font-serif font-bold text-ink transition flex items-center justify-center shadow-sm"
            >
              {num}
            </button>
          ))}
          
          <button 
            onClick={triggerBiometrics}
            className="w-16 h-16 rounded-full flex items-center justify-center text-ink3 hover:bg-bg2 transition"
          >
            <Fingerprint className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => handleKeyPress('0')}
            className="w-16 h-16 rounded-full bg-bg2 hover:bg-border2/20 active:scale-95 text-xl font-serif font-bold text-ink transition flex items-center justify-center shadow-sm"
          >
            0
          </button>

          <button 
            onClick={handleDelete}
            className="w-16 h-16 rounded-full flex items-center justify-center text-ink3 hover:bg-bg2 transition"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
