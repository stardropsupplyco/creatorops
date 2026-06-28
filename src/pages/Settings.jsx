import React, { useState } from 'react'
import { User, Crown, Link2, HelpCircle, FileText, LogOut } from 'lucide-react'

export default function Settings({ plan, onUpgrade }) {
  const [name, setName] = useState('Creator')
  const [email, setEmail] = useState('creator@example.com')
  const [darkMode, setDarkMode] = useState(false)
  const [referralCode] = useState('CREATOR' + Math.random().toString(36).substr(2, 6).toUpperCase())

  const faq = [
    { q: 'How many AI generations do I get?', a: 'Free: 5/mo · Starter: 50/mo · Pro: Unlimited' },
    { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime from your billing settings. No questions asked.' },
    { q: 'Is my data secure?', a: 'Yes. We use Supabase with row-level security and never sell your data.' },
    { q: 'Do you offer refunds?', a: 'Yes, within 7 days of purchase if you\'re not satisfied.' },
  ]

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-ink">Settings</h1>
      </div>

      {/* Account */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-4">
          <User size={16} className="text-gold" />
          <span className="text-sm font-semibold text-ink">Account</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="label mb-1">Name</div>
            <input className="input" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <div className="label mb-1">Email</div>
            <input className="input" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="btn-primary text-sm">Save Changes</button>
        </div>
      </div>

      {/* Plan */}
      <div className={`card mb-4 ${plan === 'pro' ? 'border-gold/30 bg-gold/5' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Crown size={16} className="text-gold" />
            <span className="text-sm font-semibold text-ink">
              {plan === 'pro' ? 'Pro Plan' : plan === 'starter' ? 'Starter Plan' : 'Free Plan'}
            </span>
          </div>
          {plan !== 'pro' && (
            <button onClick={onUpgrade} className="btn-gold text-xs px-3 py-1.5">
              Upgrade
            </button>
          )}
        </div>
        <div className="text-xs text-muted">
          {plan === 'pro' ? 'Unlimited AI · All features · Priority support' :
           plan === 'starter' ? '50 AI generations/mo · All tools' :
           '5 AI generations/mo · Basic features'}
        </div>
        {plan !== 'free' && (
          <button className="text-xs text-muted mt-2 hover:text-rose transition-colors">Manage Billing →</button>
        )}
      </div>

      {/* Referral */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Link2 size={16} className="text-gold" />
          <span className="text-sm font-semibold text-ink">Referral Program</span>
        </div>
        <p className="text-xs text-muted mb-3">Share CreatorOps and earn 30% recurring commission on every referral.</p>
        <div className="bg-surface border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="font-mono text-sm text-ink">{referralCode}</span>
          <button
            onClick={() => navigator.clipboard.writeText(`https://creatorops-smoky.vercel.app?ref=${referralCode}`)}
            className="text-xs text-gold font-medium"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* Dark mode */}
      <div className="card mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ink">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-6 rounded-full transition-colors ${darkMode ? 'bg-ink' : 'bg-border'} relative`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${darkMode ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={16} className="text-gold" />
          <span className="text-sm font-semibold text-ink">FAQ</span>
        </div>
        <div className="space-y-3">
          {faq.map(({ q, a }) => (
            <div key={q}>
              <div className="text-xs font-semibold text-ink">{q}</div>
              <div className="text-xs text-muted mt-0.5">{a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TOS */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText size={16} className="text-muted" />
          <span className="text-sm font-semibold text-ink">Legal</span>
        </div>
        <div className="flex gap-4">
          <button className="text-xs text-muted hover:text-ink">Terms of Service</button>
          <button className="text-xs text-muted hover:text-ink">Privacy Policy</button>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-sm text-muted hover:text-rose transition-colors py-3">
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  )
}
