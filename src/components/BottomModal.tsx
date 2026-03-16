import { X } from 'lucide-react'

import { BottomModalProps } from '../types'

export default function BottomModal({ isOpen, onClose, title, children }: BottomModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-[#1A0830]/50 backdrop-blur-sm flex items-end justify-center animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-[420px] bg-bg rounded-t-[28px] overflow-hidden flex flex-col max-h-[90vh] shadow-xl animate-slide-up"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Grip handle */}
        <div className="w-9 h-1 bg-rule rounded-full mx-auto mt-3 mb-1" />

        <header className="flex justify-between items-center px-7 py-3 border-b border-rule/30">
          <h2 className="text-lg font-serif font-bold text-ink">{title}</h2>
          <button onClick={onClose} className="p-1 w-7 h-7 rounded-full bg-rule/50 flex items-center justify-center text-ink2">
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-7 pt-4">
          {children}
        </div>
      </div>
    </div>
  )
}
