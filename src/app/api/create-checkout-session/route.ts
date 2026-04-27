import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSettings } from '@/lib/content'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { roomType, paymentType, customerEmail, customerName, phone, goals } = body

    if (!roomType || !paymentType || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const settings = getSettings()

    // Determine the amount to charge
    let amountPence: number
    let productName: string
    let productDesc: string

    const fullPricePP = settings.fullPricePP as number
    const fullPriceRoom = settings.fullPriceRoom as number
    const depositAmount = settings.depositAmount as number
    const retreatDates = settings.retreatDates as string
    const retreatLocation = settings.retreatLocation as string

    const isRoom = roomType === 'room'
    const fullPrice = isRoom ? fullPriceRoom : fullPricePP
    const optionLabel = isRoom ? 'Per Room' : 'Per Person'

    if (paymentType === 'full') {
      amountPence = fullPrice * 100
      productName = `MC Retreats — ${optionLabel} (Full Payment)`
      productDesc = `Full payment for ${retreatDates} at ${retreatLocation}. ${optionLabel} — all inclusive.`
    } else {
      // deposit or plan — both charge the deposit amount
      amountPence = depositAmount * 100
      productName = `MC Retreats — ${optionLabel} (Deposit)`
      productDesc = `Deposit to secure your ${optionLabel} place at MC Retreats, ${retreatDates}. Balance: £${(fullPrice - depositAmount).toLocaleString()}.`
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'gbp',
            unit_amount: amountPence,
            product_data: {
              name: productName,
              description: productDesc,
              metadata: {
                roomType,
                paymentType,
                customerName,
                phone: phone || '',
                goals: goals?.slice(0, 500) || '',
              },
            },
          },
        },
      ],
      metadata: {
        customerName,
        customerEmail,
        roomType,
        paymentType,
        phone: phone || '',
      },
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/apply`,
      billing_address_collection: 'required',
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    const message = err instanceof Error ? err.message : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
