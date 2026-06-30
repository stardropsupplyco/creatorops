import React, { useState } from 'react'
import { Zap, Calendar, Wand2, RefreshCw, Lightbulb, BarChart2, Star, Check, ArrowRight, Twitter, Quote } from 'lucide-react'

const FEATURES = [
  { icon: Calendar, title: 'AI Content Planner', desc: 'Generate a full 7-day content calendar for any platform in seconds. Never stare at a blank screen again.', badge: 'Most Used' },
  { icon: Wand2, title: 'Draft Generator', desc: 'Write Instagram captions, TikTok scripts, LinkedIn posts, email newsletters and more — in your brand voice.', badge: null },
  { icon: RefreshCw, title: 'Idea Repurposer', desc: 'Turn one core idea into 6 platform-ready posts simultaneously. One idea, maximum reach.', badge: 'Fan Favorite' },
  { icon: Lightbulb, title: 'Idea Bank', desc: 'Capture every idea the moment it hits. AI generates more when you need them. Never lose a great concept.', badge: null },
  { icon: BarChart2, title: 'Performance Tracker', desc: 'Log your posts, track what performs, and get AI insights on what to do more of. Data-driven creating.', badge: null },
]

const TESTIMONIALS = [
  { name: 'Maya R.', handle: '@mayacreates', text: 'I planned an entire month of content in one afternoon. CreatorOps changed my workflow completely.', avatar: 'M' },
  { name: 'Jordan T.', handle: '@jordanbuilds', text: 'The repurposer alone is worth it. I make one TikTok and instantly have content for every platform.', avatar: 'J' },
  { name: 'Sage W.', handle: '@sagewrites', text: 'Finally a tool built for solo creators, not marketing teams. This is exactly what I needed.', avatar: 'S' },
]

const FAQS = [
  { q: 'Do I need a credit card to start?', a: 'No. The free plan is completely free forever — no card required.' },
  { q: 'What platforms does it support?', a: 'Instagram, TikTok, Twitter/X, LinkedIn, YouTube, Pinterest, Email, and Blog.' },
  { q: 'Can I train it on my brand voice?', a: 'Yes — Pro plan includes brand voice training so every draft sounds like you.' },
  { q: 'How many AI generations do I get?', a: 'Free: 5/mo · Starter: 50/mo · Pro: Unlimited.' },
  { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime. No contracts, no questions asked.' },
]

export default function Landing({ onEnter }) {
  const [email, setEmail] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-surface">
      {/* Nav */}
      <nav className="bg-white border-b border-border px-5 py-4 flex items-center justify-between sticky top-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="flex items-center">
          <img src="/images/logo-icon.png" alt="CreatorOps" className="h-7 w-auto" />
        </div>
        <div className="flex items-center gap-3">
          <a href="#pricing" className="text-xs text-muted hover:text-ink transition-colors hidden sm:block">Pricing</a>
          <button onClick={() => onEnter('free')} className="btn-ghost text-xs px-3 py-1.5">Sign In</button>
          <button onClick={() => onEnter('free')} className="btn-primary text-xs px-3 py-1.5">Start Free</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-5 pt-16 pb-8 text-center max-w-2xl mx-auto" aria-label="Hero">
        <img
          src="/images/logo-lockup.png"
          alt="CreatorOps — Plan. Write. Repurpose. Track."
          className="w-full max-w-sm mx-auto mb-6"
        />

        <div className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-6">
          <Star size={10} className="text-gold fill-gold" aria-hidden="true" />
          <span className="text-xs text-gold font-medium">🚀 Now Live on Product Hunt — July 1</span>
        </div>

        <p className="text-muted text-lg leading-relaxed mb-3 max-w-lg mx-auto">
          Stop juggling 10 tools. CreatorOps gives you AI-powered content planning, writing, repurposing, and performance tracking — all in one place.
        </p>

        <p className="text-sm text-ink font-medium mb-8">
          Join <span className="text-gold">500+</span> solo creators already using CreatorOps
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto mb-4">
          <input
            type="email"
            placeholder="Enter your email to get started"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input text-center"
            aria-label="Email address"
          />
          <button onClick={() => onEnter('free')} className="btn-primary py-3 text-base">
            Start Free — No Card Required →
          </button>
          <button onClick={() => onEnter('starter')} className="btn-gold py-3 text-base">
            Get Starter — $9/mo
          </button>
        </div>
        <p className="text-xs text-muted">Free forever · Starter $9/mo · Pro $19/mo · Cancel anytime</p>
      </section>

      {/* Social proof bar */}
      <section className="bg-ink py-4 px-5" aria-label="Social proof">
        <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-center">
          {[
            { stat: '500+', label: 'Active Creators' },
            { stat: '50K+', label: 'Posts Generated' },
            { stat: '4.9★', label: 'Average Rating' },
            { stat: '$9/mo', label: 'Starting Price' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="text-gold font-display font-bold text-xl">{stat}</div>
              <div className="text-soft text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-5 py-16 max-w-2xl mx-auto" id="features" aria-label="Features">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-ink mb-3">Everything a solo creator needs</h2>
          <p className="text-muted text-base">Five powerful tools. One seamless workflow.</p>
        </div>
        <div className="grid gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, badge }) => (
            <div key={title} className="card flex items-start gap-4 hover:border-gold transition-colors">
              <div className="w-10 h-10 rounded-xl bg-ink/5 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-gold" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-ink">{title}</h3>
                  {badge && (
                    <span className="text-xs bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 rounded-full">{badge}</span>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink px-5 py-16" aria-label="How it works">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-cream mb-3">How it works</h2>
            <p className="text-soft text-base">From zero to a full month of content in minutes</p>
          </div>
          <div className="grid gap-4">
            {[
              { step: '01', title: 'Pick your platform & niche', desc: 'Choose from Instagram, TikTok, LinkedIn, YouTube and more. Tell CreatorOps your niche.' },
              { step: '02', title: 'Generate your content plan', desc: 'AI creates a full 7-day content calendar with post types, ideas, and best times to post.' },
              { step: '03', title: 'Write and repurpose instantly', desc: 'Turn your ideas into polished drafts. Then repurpose each piece for every other platform.' },
              { step: '04', title: 'Track and double down', desc: 'Log what you post, see what performs, get AI insights on what to create more of.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-gold text-sm font-bold">{step}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-cream mb-1">{title}</h3>
                  <p className="text-xs text-soft leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-5 py-16 max-w-2xl mx-auto" aria-label="Testimonials">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-ink mb-3">Creators love it</h2>
          <p className="text-muted text-base">Real results from real solo creators</p>
        </div>
        <div className="grid gap-4">
          {TESTIMONIALS.map(({ name, handle, text, avatar }) => (
            <div key={name} className="card">
              <Quote size={16} className="text-gold mb-3" aria-hidden="true" />
              <p className="text-sm text-ink leading-relaxed mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-bold text-sm">{avatar}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink">{name}</div>
                  <div className="text-xs text-muted">{handle}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="text-gold fill-gold" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-surface px-5 py-16 max-w-2xl mx-auto" id="pricing" aria-label="Pricing">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-ink mb-3">Simple, honest pricing</h2>
          <p className="text-muted text-base">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid gap-4">
          {[
            {
              name: 'Free', price: '$0', sub: 'forever', cta: 'Start Free', action: 'free',
              features: ['5 AI generations/mo', 'Content planner', 'Idea bank', '3 saved drafts', 'Basic performance tracker'],
            },
            {
              name: 'Starter', price: '$9', sub: '/mo', cta: 'Get Starter', action: 'starter', highlight: true,
              features: ['50 AI generations/mo', 'All 5 tools', 'Unlimited saves', 'Performance tracker', 'Email support'],
            },
            {
              name: 'Pro', price: '$19', sub: '/mo', cta: 'Get Pro', action: 'pro',
              features: ['Unlimited AI generations', 'Everything in Starter', 'Brand voice training', 'Affiliate program (30%)', 'Priority support', 'Early access to features'],
            },
          ].map(tier => (
            <div key={tier.name} className={`card ${tier.highlight ? 'border-gold bg-gold/5' : ''}`}>
              {tier.highlight && <div className="text-xs text-gold font-bold uppercase tracking-wider mb-2">⚡ Most Popular</div>}
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display font-bold text-ink text-lg">{tier.name}</h3>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-mono font-bold text-gold text-2xl">{tier.price}</span>
                  <span className="text-xs text-muted">{tier.sub}</span>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-muted">
                    <Check size={12} className="text-sage flex-shrink-0" aria-hidden="true" />
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={() => onEnter(tier.action)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold ${tier.highlight ? 'btn-gold' : 'btn-primary'}`}
                aria-label={`${tier.cta} - ${tier.name} plan`}
              >
                {tier.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 max-w-2xl mx-auto" id="faq" aria-label="Frequently asked questions">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-ink mb-3">Frequently asked questions</h2>
        </div>
        <div className="space-y-2">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className="card cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink">{q}</h3>
                <span className="text-gold font-bold text-lg ml-3">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && <p className="text-xs text-muted mt-3 leading-relaxed">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink px-5 py-16 text-center" aria-label="Call to action">
        <div className="max-w-lg mx-auto">
          <h2 className="font-display text-3xl font-bold text-cream mb-4">Ready to run your content like a pro?</h2>
          <p className="text-soft text-base mb-8">Join 500+ solo creators who stopped winging it and started winning with CreatorOps.</p>
          <button onClick={() => onEnter('free')} className="btn-gold py-4 px-8 text-base mb-3 w-full max-w-sm">
            Start Free Today →
          </button>
          <p className="text-soft text-xs">No credit card · Cancel anytime · Instant access</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-white/10 px-5 py-8" role="contentinfo">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gold/20 flex items-center justify-center">
              <Zap size={12} className="text-gold" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-cream text-sm">CreatorOps</span>
          </div>
          <div className="flex gap-5">
            <a href="#features" className="text-xs text-soft hover:text-cream transition-colors">Features</a>
            <a href="#pricing" className="text-xs text-soft hover:text-cream transition-colors">Pricing</a>
            <a href="#faq" className="text-xs text-soft hover:text-cream transition-colors">FAQ</a>
            <button onClick={() => onEnter('free')} className="text-xs text-soft hover:text-cream transition-colors">Sign In</button>
          </div>
          <p className="text-xs text-soft">© 2026 CreatorOps · Stardrop Supply Co.</p>
        </div>
      </footer>
    </div>
  )
}
