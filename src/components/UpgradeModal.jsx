import React, { useState } from 'react'
import { Crown, Check, Zap, X } from 'lucide-react'

const STRIPE_PK = 'pk_live_51TciLK1GzCx7BlHpGTn4fa4TQfdyHRZ4scfVBV1gDZHC5384dKjdHunBdAoneJk9HxVIVHOvD0swN6yX0xiS7XOA00tP0L1mAr'

const PLANS = {
  starter: {
    name: 'Starter',
    price: '$9/mo',
    priceId: 'price_1TnKjh1GzCx7BlHpiYLoCrxI',
    features: [
      '50 AI generations/month',
      'Content Planner',
      'Draft Generator',
      'Idea Repurposer',
      'Idea Bank',
      'Performance Tracker',
      'Unlimited saves',
    ],
  },
  pro: {
    name: 'Pro',
    price: '$19/mo',
    priceId: 'price_1TnKkL1GzCx7BlHpmYyVKWGd',
    features: [
      'Unlimited AI generations',
      'Everything in Starter',
      'Brand voice training',
      'Priority support',
      'Affiliate program (30% commission)',
      'Early access to new features',
    ],
  },
}

export default function UpgradeModal({ onClose, currentPlan }) {
  const [loading, setLoading] = useState(null)

  const checkout = async (planKey) => {
    setLoading(planKey)
    try {
      const stripe = await loadStripe(STRIPE_PK)
      await stripe.redirectToCheckout({
        lineItems: [{ price: PLANS[planKey].priceId, quantity: 1 }],
        mode: 'subscription',
        successUrl: window.location.origin + '?upgraded=' + planKey,
        cancelUrl: window.location.href,
      })
    } catch (e) {
      alert('Checkout failed. Please try again.')
    }
    setLoading(null)
  }

  return (
    <div className="fixed inset-0 bg-ink/50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-gold" />
            <span className="font-display font-bold text-ink">Upgrade CreatorOps</span>
          </div>
          <button onClick={onClose} className="text-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {Object.entries(PLANS).map(([key, plan]) => (
            <div key={key} className={`border rounded-2xl p-4 ${key === 'pro' ? 'border-gold bg-gold/5' : 'border-border'}`}>
              {key === 'pro' && (
                <div className="text-xs text-gold font-bold mb-2 uppercase tracking-wider">Most Popular</div>
              )}
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-ink text-lg">{plan.name}</span>
                <span className="font-mono font-bold text-gold">{plan.price}</span>
              </div>
              <div className="space-y-1.5 mb-4">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-muted">
                    <Check size={12} className="text-sage flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => checkout(key)}
                disabled={loading === key || currentPlan === key}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${
                  key === 'pro' ? 'btn-gold' : 'btn-primary'
                }`}
              >
                {loading === key ? 'Redirecting...' : currentPlan === key ? 'Current Plan' : `Get ${plan.name}`}
              </button>
            </div>
          ))}
          <p className="text-center text-xs text-muted">Cancel anytime · Secured by Stripe</p>
        </div>
      </div>
    </div>
  )
}

// Stripe loader
function loadStripe(pk) {
  return new Promise((resolve, reject) => {
    if (window.Stripe) return resolve(window.Stripe(pk))
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.onload = () => resolve(window.Stripe(pk))
    script.onerror = reject
    document.head.appendChild(script)
  })
}
