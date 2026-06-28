import React, { useState } from 'react'
import { Zap, Calendar, Wand2, RefreshCw, Lightbulb, BarChart2, Star, Check } from 'lucide-react'

export default function Landing({ onEnter }) {
  const [email, setEmail] = useState('')

  const features = [
    { icon: Calendar, title: 'Content Planner', desc: 'AI-generated 7-day content calendars in seconds' },
    { icon: Wand2, title: 'Draft Generator', desc: '8 formats, 6 tones, your brand voice trained in' },
    { icon: RefreshCw, title: 'Idea Repurposer', desc: 'Turn one idea into 6 platform-ready posts' },
    { icon: Lightbulb, title: 'Idea Bank', desc: 'Capture and organize your best content ideas' },
    { icon: BarChart2, title: 'Performance Tracker', desc: 'Know what works. Double down on it.' },
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="bg-white border-b border-border px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center">
            <Zap size={13} className="text-gold-light" />
          </div>
          <span className="font-display font-bold text-ink">CreatorOps</span>
        </div>
        <button onClick={() => onEnter('free')} className="btn-ghost text-xs px-3 py-1.5">
          Sign In
        </button>
      </nav>

      {/* Hero */}
      <div className="px-5 pt-14 pb-10 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-5">
          <Star size={10} className="text-gold fill-gold" />
          <span className="text-xs text-gold font-medium">Launching July 1 on Product Hunt</span>
        </div>
        <h1 className="font-display text-4xl font-bold text-ink leading-tight mb-4">
          The operating system<br />for <span className="text-gold">solo creators</span>
        </h1>
        <p className="text-muted text-base leading-relaxed mb-8">
          Plan content, write drafts, repurpose ideas, and track performance — all powered by AI, all in one place.
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input text-center"
          />
          <button onClick={() => onEnter('free')} className="btn-primary">
            Start Free — No Card Required
          </button>
          <button onClick={() => onEnter('pro')} className="btn-gold">
            Go Pro — $9/mo
          </button>
        </div>
        <p className="text-xs text-muted mt-3">Free plan · Starter $9/mo · Pro $19/mo</p>
      </div>

      {/* Features */}
      <div className="px-5 pb-10 max-w-lg mx-auto">
        <div className="grid gap-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-gold" />
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{title}</div>
                <div className="text-xs text-muted mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="px-5 pb-14 max-w-lg mx-auto">
        <h2 className="font-display text-xl font-bold text-ink text-center mb-5">Simple Pricing</h2>
        <div className="grid gap-3">
          {[
            { name: 'Free', price: '$0', features: ['5 AI generations/mo', 'Content planner', 'Idea bank', '3 saved drafts'] },
            { name: 'Starter', price: '$9/mo', features: ['50 AI generations/mo', 'All 5 tools', 'Unlimited saves', 'Performance tracker'], highlight: true },
            { name: 'Pro', price: '$19/mo', features: ['Unlimited AI', 'Brand voice training', 'Priority support', 'Early features', 'Affiliate program'] },
          ].map(tier => (
            <div key={tier.name} className={`card ${tier.highlight ? 'border-gold bg-gold/5' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-ink">{tier.name}</span>
                <span className="font-mono font-bold text-gold">{tier.price}</span>
              </div>
              <div className="space-y-1.5">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-muted">
                    <Check size={12} className="text-sage flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => onEnter('free')} className="btn-primary w-full mt-5">
          Get Started Free →
        </button>
      </div>
    </div>
  )
}
