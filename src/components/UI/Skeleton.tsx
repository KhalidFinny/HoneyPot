import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export default function Skeleton({ className = '', variant = 'rect' }: SkeletonProps) {
  const baseClasses = "bg-bg2/50 relative overflow-hidden"
  let variantClasses = ""

  if (variant === 'text') {
    variantClasses = "h-4 w-full rounded-md mt-1"
  } else if (variant === 'circle') {
    variantClasses = "rounded-full"
  } else if (variant === 'rect') {
    variantClasses = "rounded-xl"
  }

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFFBF7]/30 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5, 
          ease: "linear" 
        }}
      />
    </div>
  )
}
