'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  q: string
  a: string
}

const defaultFAQs: FAQItem[] = [
  {
    q: 'What fitness level do I need?',
    a: 'You need to be able to train. We work with men across a range of levels — from consistent gym-goers to those returning after a long break. The training is challenging but intelligent. You will be pushed but not broken. If you have injuries or specific conditions, tell us on your application.',
  },
  {
    q: 'What is included in the price?',
    a: 'Everything. All accommodation at The Corn Crib, all meals and nutrition (designed to support training), all coaching sessions, all training equipment, recovery facilities (pool, sauna, cold plunge), and all group activities. You just need to get yourself to Wiltshire.',
  },
  {
    q: 'How does the payment plan work?',
    a: 'You secure your place with a £500 deposit. The remaining balance can then be spread in monthly installments until August 2025. We will agree a schedule with you directly after you apply.',
  },
  {
    q: 'Can I book a room for two people?',
    a: 'Yes. The room price (£2,200) covers two people sharing. This is the most cost-effective way to attend and is ideal for training partners or friends attending together.',
  },
  {
    q: 'What happens after I apply?',
    a: 'Once you complete the application and secure payment, you will receive a confirmation email with full pre-retreat preparation details, a kit list, and everything you need to prepare for the four days.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Deposits are non-refundable. Full balance payments are refundable minus the deposit if you cancel more than 60 days before the retreat. Within 60 days, we are unable to offer refunds but will work with you on transfers.',
  },
  {
    q: 'What should I bring?',
    a: 'Training kit for 4 days, casual wear for evenings, any personal supplements, and an open mind. Full kit list sent after booking.',
  },
]

interface FAQAccordionProps {
  items?: FAQItem[]
}

export default function FAQAccordion({ items = defaultFAQs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="card-dark border border-[rgba(196,150,58,0.1)] overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="text-[#F2EDE4] font-medium text-base group-hover:text-[#C4963A] transition-colors duration-200">
              {item.q}
            </span>
            <span
              className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
                openIndex === i ? 'rotate-45' : 'rotate-0'
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C4963A"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="px-6 pb-5">
                  <div className="h-px bg-[rgba(196,150,58,0.1)] mb-4" />
                  <p className="text-[#9A9080] text-sm leading-relaxed">{item.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
