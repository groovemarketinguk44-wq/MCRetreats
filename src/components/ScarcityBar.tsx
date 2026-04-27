'use client'

import { motion } from 'framer-motion'

interface ScarcityBarProps {
  taken?: number
  total?: number
}

export default function ScarcityBar({ taken = 3, total = 10 }: ScarcityBarProps) {
  const pct = (taken / total) * 100

  return (
    <div className="bg-[#0C0A08] border-y border-[rgba(196,150,58,0.1)] py-5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase">
              Availability
            </span>
            <span className="text-[#F2EDE4] text-sm font-medium">
              {taken} of {total} rooms taken
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <div className="flex-1 h-1 bg-[rgba(196,150,58,0.15)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C4963A] rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
            <span className="text-[#706050] text-xs whitespace-nowrap">
              {total - taken} left
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
