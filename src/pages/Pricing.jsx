import React, { useState } from 'react'
import { Check, Crown, Zap } from 'lucide-react'
import UpgradeModal from '../components/UpgradeModal'

export default function Pricing({ plan, onUpgrade }) {
  const [showModal, setShowModal] = useState(false)

  // Check for successful upgrade in URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const upgraded = params.get('upgraded')
    if (upgraded) {
      onUpgrade(upgraded)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const tiers = [
    {
      key: 'free',
      name: 'Free',
      price: '$0',
      sub: 'forever',
      features: ['5 AI generations/mo', 'Content planner', 'Idea bank', '3 saved drafts'],
      cta: 'Current Plan',
      disabled: true,
    },
    {
      key: 'starter',
      name: 'Starter',
      price: '$9',
      sub: '/mo',
      features: ['50 AI generations/mo', 'All 5 tools', 'Unlimited saves', 'Performance tracker'],
      cta: plan === 'starter' ? 'Current Plan' : 'Get Starter',
      highlight: true,
    },
    {
      key: 'pro',
      name: 'Pro',
      price: '$19',
      sub: '/mo',
      features: ['Unlimited AI', 'Brand voice training', 'Affiliate program', 'Priority support', 'Early features'],
      cta: plan === 'pro' ? 'Current Plan' : 'Get Pro',
    },
  ]

  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Pricing</h1>
        <p className="text-muted text-sm mt-1">Simple plans for every stage</p>
      </div>

      <div className="space-y-3 max-w-sm mx-auto">
        {tiers.map(tier => (
          <div key={tier.key} className={`card ${tier.highlight ? 'border-gold bg-gold/5' : ''} ${plan === tier.key ? 'ring-2 ring-gold' : ''}`}>
            {tier.highlight && (
              <div className="text-xs text-gold font-bold uppercase tracking-wider mb-2">Most Popular</div>
            )}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {tier.key === 'pro' ? <Crown size={16} className="text-gold" /> : <Zap size={16} className="text-muted" />}
                <span className="font-display font-bold text-ink">{tier.name}</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-mono font-bold text-gold text-xl">{tier.price}</span>
                <span className="text-xs text-muted">{tier.sub}</span>
              </div>
            </div>
            <div className="space-y-1.5 mb-4">
              {tier.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-muted">
                  <Check size={12} className="text-sage flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <button
              onClick={() => !tier.disabled && plan !== tier.key && setShowModal(true)}
              disabled={tier.disabled || plan === tier.key}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-default ${
                tier.highlight ? 'btn-gold' : 'btn-primary'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
        <p className="text-center text-xs text-muted pt-2">Cancel anytime · Secured by Stripe</p>
      </div>

      {showModal && (
        <UpgradeModal
          onClose={() => setShowModal(false)}
          currentPlan={plan}
        />
      )}
    </div>
  )
}
