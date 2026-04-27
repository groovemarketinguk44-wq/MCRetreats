'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Settings {
  depositAmount: number
  fullPricePP: number
  fullPriceRoom: number
  ctaText: string
  [key: string]: unknown
}

interface Props {
  settings: Settings
}

type Step = 1 | 2 | 3

interface FormData {
  roomType: 'pp' | 'room' | ''
  firstName: string
  lastName: string
  email: string
  phone: string
  goals: string
  healthNotes: string
  paymentType: 'full' | 'deposit' | 'plan' | ''
}

const initialForm: FormData = {
  roomType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  goals: '',
  healthNotes: '',
  paymentType: '',
}

export default function ApplyForm({ settings }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError('')
  }

  const getPrice = () => {
    if (!form.roomType) return 0
    return form.roomType === 'room' ? settings.fullPriceRoom : settings.fullPricePP
  }

  const getLabel = () => {
    if (!form.roomType) return ''
    return form.roomType === 'room' ? `Per Room (£${settings.fullPriceRoom.toLocaleString()})` : `Per Person (£${settings.fullPricePP.toLocaleString()})`
  }

  const validateStep1 = () => {
    if (!form.roomType) { setError('Please select an option'); return false }
    return true
  }

  const validateStep2 = () => {
    if (!form.firstName.trim()) { setError('First name required'); return false }
    if (!form.lastName.trim()) { setError('Last name required'); return false }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) { setError('Valid email required'); return false }
    if (!form.phone.trim()) { setError('Phone number required'); return false }
    return true
  }

  const validateStep3 = () => {
    if (!form.paymentType) { setError('Please select a payment option'); return false }
    return true
  }

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep((s) => (s + 1) as Step)
  }

  const handleSubmit = async () => {
    if (!validateStep3()) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: form.roomType,
          paymentType: form.paymentType,
          customerEmail: form.email,
          customerName: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          goals: form.goals,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const stepLabels = ['Your Spot', 'Your Details', 'Payment']

  return (
    <section className="pb-24">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {stepLabels.map((label, i) => {
            const n = (i + 1) as Step
            const active = step === n
            const done = step > n
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      done
                        ? 'bg-[#C4963A] text-[#080604]'
                        : active
                        ? 'border border-[#C4963A] text-[#C4963A]'
                        : 'border border-[rgba(255,255,255,0.1)] text-[#5A5048]'
                    }`}
                  >
                    {done ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : n}
                  </div>
                  <p className={`text-xs mt-2 tracking-wide ${active ? 'text-[#C4963A]' : 'text-[#5A5048]'}`}>
                    {label}
                  </p>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`w-16 sm:w-24 h-px mx-3 mb-5 transition-all duration-300 ${done ? 'bg-[#C4963A]' : 'bg-[rgba(255,255,255,0.08)]'}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step 1: Room type */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F2EDE4] mb-2">Select Your Option</h2>
            <p className="text-[#706050] text-sm mb-8">Choose how you'd like to attend the retreat.</p>

            <div className="space-y-4 mb-8">
              {[
                {
                  id: 'pp' as const,
                  title: 'Per Person',
                  price: `£${settings.fullPricePP.toLocaleString()}`,
                  desc: 'Shared accommodation. Full retreat access. All inclusive.',
                  badge: null,
                },
                {
                  id: 'room' as const,
                  title: 'Per Room',
                  price: `£${settings.fullPriceRoom.toLocaleString()}`,
                  desc: `Private room for two. £${Math.round(settings.fullPriceRoom / 2).toLocaleString()} each. Ideal for training partners.`,
                  badge: 'Best Value',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => update('roomType', opt.id)}
                  className={`w-full text-left card-dark p-6 cursor-pointer transition-all duration-300 ${
                    form.roomType === opt.id
                      ? 'border border-[#C4963A]'
                      : 'border border-[rgba(196,150,58,0.1)] hover:border-[rgba(196,150,58,0.25)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-lg font-semibold text-[#F2EDE4]">{opt.title}</h3>
                        {opt.badge && (
                          <span className="text-xs px-2 py-0.5 bg-[rgba(196,150,58,0.15)] text-[#C4963A]">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#706050] text-sm">{opt.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-serif text-2xl font-bold text-[#C4963A]">{opt.price}</p>
                    </div>
                  </div>
                  <div className={`mt-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    form.roomType === opt.id ? 'border-[#C4963A]' : 'border-[#3A3028]'
                  }`}>
                    {form.roomType === opt.id && <div className="w-2 h-2 rounded-full bg-[#C4963A]" />}
                  </div>
                </button>
              ))}
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <button onClick={nextStep} className="btn-gold w-full" style={{ padding: '1rem' }}>
              <span>Continue to Your Details</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F2EDE4] mb-2">Your Details</h2>
            <p className="text-[#706050] text-sm mb-8">Tell us about yourself so we can prepare for your arrival.</p>

            <div className="space-y-5 mb-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'James' },
                  { id: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Anderson' },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                      {field.label} *
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.id as keyof FormData] as string}
                      onChange={(e) => update(field.id as keyof FormData, e.target.value)}
                      className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                    />
                  </div>
                ))}
              </div>

              {[
                { id: 'email', label: 'Email Address', type: 'email', placeholder: 'james@example.com' },
                { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+44 7700 000000' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                    {field.label} *
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.id as keyof FormData] as string}
                    onChange={(e) => update(field.id as keyof FormData, e.target.value)}
                    className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="goals" className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                  What Do You Want To Achieve?
                </label>
                <textarea
                  id="goals"
                  placeholder="Tell us your main goals and what's led you here..."
                  value={form.goals}
                  onChange={(e) => update('goals', e.target.value)}
                  rows={3}
                  className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors resize-none"
                />
              </div>

              <div>
                <label htmlFor="healthNotes" className="block text-[#A09080] text-xs font-medium tracking-[0.1em] uppercase mb-2">
                  Health Notes / Injuries (Optional)
                </label>
                <textarea
                  id="healthNotes"
                  placeholder="Any injuries, health conditions, or limitations we should know about..."
                  value={form.healthNotes}
                  onChange={(e) => update('healthNotes', e.target.value)}
                  rows={2}
                  className="w-full bg-[#14100C] border border-[rgba(196,150,58,0.15)] text-[#F2EDE4] placeholder-[#3A3028] px-4 py-3 text-sm focus:outline-none focus:border-[#C4963A] transition-colors resize-none"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-ghost flex-shrink-0"
                style={{ padding: '1rem 1.5rem' }}
              >
                Back
              </button>
              <button onClick={nextStep} className="btn-gold flex-1" style={{ padding: '1rem' }}>
                <span>Continue to Payment</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#F2EDE4] mb-2">Payment Option</h2>
            <p className="text-[#706050] text-sm mb-8">
              Choose how you'd like to pay for your <span className="text-[#C4963A]">{getLabel()}</span> spot.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  id: 'deposit' as const,
                  title: 'Deposit',
                  price: `£${settings.depositAmount}`,
                  desc: `Secure your place now. Balance of £${(getPrice() - settings.depositAmount).toLocaleString()} due 30 days before the retreat.`,
                  badge: 'Most Popular',
                },
                {
                  id: 'full' as const,
                  title: 'Full Payment',
                  price: `£${getPrice().toLocaleString()}`,
                  desc: 'Pay in full and you\'re done. Nothing more to organise.',
                  badge: null,
                },
                {
                  id: 'plan' as const,
                  title: 'Payment Plan',
                  price: `£${settings.depositAmount} now`,
                  desc: 'Start with a deposit. We\'ll contact you to arrange monthly payments until August 2025.',
                  badge: null,
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => update('paymentType', opt.id)}
                  className={`w-full text-left card-dark p-6 cursor-pointer transition-all duration-300 ${
                    form.paymentType === opt.id
                      ? 'border border-[#C4963A]'
                      : 'border border-[rgba(196,150,58,0.1)] hover:border-[rgba(196,150,58,0.25)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-lg font-semibold text-[#F2EDE4]">{opt.title}</h3>
                        {opt.badge && (
                          <span className="text-xs px-2 py-0.5 bg-[rgba(196,150,58,0.15)] text-[#C4963A]">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#706050] text-sm">{opt.desc}</p>
                    </div>
                    <p className="font-serif text-xl font-bold text-[#C4963A] flex-shrink-0">{opt.price}</p>
                  </div>
                  <div className={`mt-4 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    form.paymentType === opt.id ? 'border-[#C4963A]' : 'border-[#3A3028]'
                  }`}>
                    {form.paymentType === opt.id && <div className="w-2 h-2 rounded-full bg-[#C4963A]" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="card-dark p-5 mb-8 border border-[rgba(196,150,58,0.1)]">
              <p className="text-[#C4963A] text-xs font-medium tracking-[0.2em] uppercase mb-3">Summary</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#706050]">Retreat</span>
                  <span className="text-[#F2EDE4]">MC Retreats, 7–11 Sept 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#706050]">Option</span>
                  <span className="text-[#F2EDE4]">{getLabel() || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#706050]">Name</span>
                  <span className="text-[#F2EDE4]">{form.firstName} {form.lastName}</span>
                </div>
                <div className="h-px bg-[rgba(196,150,58,0.1)] my-2" />
                <div className="flex justify-between">
                  <span className="text-[#706050]">Payment today</span>
                  <span className="font-semibold text-[#C4963A]">
                    {form.paymentType === 'full'
                      ? `£${getPrice().toLocaleString()}`
                      : form.paymentType
                      ? `£${settings.depositAmount}`
                      : '—'}
                  </span>
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="btn-ghost flex-shrink-0"
                style={{ padding: '1rem 1.5rem' }}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-gold flex-1"
                style={{ padding: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                <span>{loading ? 'Redirecting...' : 'Proceed to Payment'}</span>
                {!loading && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                )}
              </button>
            </div>

            <p className="text-center text-[#5A5048] text-xs mt-4">
              Secure payment via Stripe · SSL encrypted
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
