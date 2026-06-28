import React, { useState } from 'react'
import { RefreshCw, Wand2, Copy, Check } from 'lucide-react'

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', format: 'Caption + hashtags' },
  { id: 'tiktok', label: 'TikTok', format: 'Video script hook' },
  { id: 'twitter', label: 'Twitter/X', format: 'Thread opener' },
  { id: 'linkedin', label: 'LinkedIn', format: 'Professional post' },
  { id: 'pinterest', label: 'Pinterest', format: 'Pin description' },
  { id: 'email', label: 'Email', format: 'Subject + preview' },
]

export default function IdeaRepurposer({ plan }) {
  const [idea, setIdea] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(null)
  const [usageCount, setUsageCount] = useState(0)
  const FREE_LIMIT = 3

  const repurpose = async () => {
    if (!idea.trim()) return
    if (plan === 'free' && usageCount >= FREE_LIMIT) return
    setLoading(true)
    setUsageCount(p => p + 1)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1500,
          system: 'You are a content repurposing expert. Given an idea, create platform-specific content for each platform. Return ONLY a JSON object with keys: instagram, tiktok, twitter, linkedin, pinterest, email. Each value is a string with platform-optimized content. No markdown, no explanation.',
          messages: [{ role: 'user', content: `Repurpose this idea for 6 platforms: "${idea}"` }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '{}'
      const clean = text.replace(/```json|```/g, '').trim()
      setResults(JSON.parse(clean))
    } catch {
      setResults({
        instagram: `✨ ${idea}\n\nThis is the moment everything changed for me...\n\n[Share your story here]\n\n#creator #solopreneur #contentcreator`,
        tiktok: `POV: ${idea} 🎯\n\nHook: "Nobody talks about this but..."\n[Continue with your story and a clear call to action]`,
        twitter: `🧵 Thread: ${idea}\n\n1/ Here's what I learned the hard way...\n2/ [Your first point]\n3/ [Your second point]`,
        linkedin: `I used to think ${idea} was impossible.\n\nThen I realized the secret was simple:\n\n[Your insight here]\n\nWhat's your experience with this?`,
        pinterest: `${idea} | Step-by-step guide for creators | Save this for later! Tips and strategies for solo creators and entrepreneurs.`,
        email: `Subject: ${idea} — here's what changed everything\nPreview: I wasn't going to share this, but...`,
      })
    }
    setLoading(false)
  }

  const copy = (key, text) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const hitLimit = plan === 'free' && usageCount >= FREE_LIMIT

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-ink">Idea Repurposer</h1>
        <p className="text-muted text-sm mt-0.5">One idea → 6 platforms instantly</p>
      </div>

      <div className="card mb-4">
        <div className="label mb-1.5">Your Core Idea</div>
        <textarea
          className="input resize-none mb-4"
          rows={3}
          placeholder="e.g. I built a profitable business from my Android phone with no laptop or team"
          value={idea}
          onChange={e => setIdea(e.target.value)}
        />
        {hitLimit ? (
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-3 text-center">
            <p className="text-sm font-medium text-gold mb-1">Free limit reached</p>
            <p className="text-xs text-muted">Upgrade for unlimited repurposing</p>
          </div>
        ) : (
          <button onClick={repurpose} disabled={loading || !idea.trim()} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
            {loading ? 'Repurposing...' : 'Repurpose for 6 Platforms'}
          </button>
        )}
        {plan === 'free' && !hitLimit && (
          <p className="text-xs text-muted text-center mt-2">{FREE_LIMIT - usageCount} free repurposes left</p>
        )}
      </div>

      {results && (
        <div className="space-y-3">
          {PLATFORMS.map(({ id, label, format }) => (
            <div key={id} className="card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-semibold text-ink">{label}</span>
                  <span className="text-xs text-muted ml-2">{format}</span>
                </div>
                <button onClick={() => copy(id, results[id])} className="flex items-center gap-1 text-xs text-muted hover:text-ink">
                  {copied === id ? <Check size={12} className="text-sage" /> : <Copy size={12} />}
                  {copied === id ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="text-sm text-ink bg-surface rounded-lg p-3 whitespace-pre-wrap leading-relaxed">
                {results[id]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
