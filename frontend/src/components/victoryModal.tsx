import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface VictoryModalProps {
  isOpen: boolean
  onClose: () => void
  victoryMessage: string
}

export default function VictoryModal({ isOpen, onClose, victoryMessage }: VictoryModalProps) {
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -5, 0],
            }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              y: {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            className="relative z-10 w-[320px] overflow-hidden rounded-2xl bg-[#2E7D32] p-8 text-center shadow-xl"
          >
            {/* Trophy Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#4CAF50]/20">
              <svg className="h-8 w-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16.93a8 8 0 1 1 14 0l-7 4zm7-14.93a6 6 0 1 0 0 12 6 6 0 0 0 0-12m0 18-3-1.67V17h6v2.33z" />
              </svg>
            </div>

            {/* Text Content */}
            <h2 className="mb-2 text-3xl font-bold text-white">{victoryMessage}</h2>
            {/* Button */}
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-[#4CAF50] px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-[#45A049] active:bg-[#3D8B40]"
            >
              Continue Playing
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

