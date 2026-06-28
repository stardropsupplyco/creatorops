import React, { useState } from 'react'
import { Wand2, Copy, RefreshCw, Check } from 'lucide-react'

const FORMATS = ['Instagram Caption', 'Twitter Thread', 'TikTok Script', 'LinkedIn Post', 'Email Newsletter', 'YouTube Description', 'Pinterest Description', 'Blog Intro']
const TONES = ['Inspiring', 'Educational', 'Conversational', 'Humorous', 'Bold', 'Empathetic']

export default function DraftGenerator({ plan }) {
  const [topic, setTopic] = useState('')
  const [format, setFormat] = useState('Instagram Caption')
  const [tone, setTone] = useState('Conversational')
  const [brandVoice, setBrandVoice] = useState('')
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const FREE_LIMIT = 5

  const generate = async () => {
    if (!topic.trim()) return
    if (plan === 'free' && usageCount >= FREE_LIMIT) return
    setLoading(true)
    setUsageCount(p => p + 1)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: `You are an expert content writer for solo creators. Write in a ${tone.toLowerCase()} tone. ${brandVoice ? `Brand voice notes: ${brandVoice}` : ''} Return only the draft content, no explanation.`,
          messages: [{ role: 'user', content: `Write a ${format} about: ${topic}` }]
        })
      })
      const data = await res.json()
      setDraft(data.content?.[0]?.text || 'Could not generate. Try again.')
    } catch {
      setDraft('Connection error. Please try again.')
    }
    setLoading(false)
  }

  const copy = () => {
    navigator.clipboard.writeText(draft)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const hitLimit = plan === 'free' && usageCount >= FREE_LIMIT

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-ink">Draft Generator</h1>
        <p className="text-muted text-sm mt-0.5">Write anything in seconds</p>
      </div>

      <div className="card mb-4">
        <div className="mb-3">
          <div className="label mb-1.5">Topic or Idea</div>
          <textarea
            className="input resize-none"
            rows={2}
            placeholder="e.g. How I built a business from my phone"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="label mb-1.5">Format</div>
            <select className="input" value={format} onChange={e => setFormat(e.target.value)}>
              {FORMATS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <div className="label mb-1.5">Tone</div>
            <select className="input" value={tone} onChange={e => setTone(e.target.value)}>
              {TONES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <div className="label mb-1.5">Brand Voice (optional)</div>
          <input
            className="input"
            placeholder="e.g. Direct, no fluff, speaks to busy founders"
            value={brandVoice}
            onChange={e => setBrandVoice(e.target.value)}
          />
        </div>

        {hitLimit ? (
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-3 text-center">
            <p className="text-sm font-medium text-gold mb-1">Free limit reached</p>
            <p className="text-xs text-muted">Upgrade to Starter for 50 generations/mo</p>
          </div>
        ) : (
          <button onClick={generate} disabled={loading || !topic.trim()} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
            {loading ? 'Writing...' : `Generate ${format}`}
          </button>
        )}

        {plan === 'free' && !hitLimit && (
          <p className="text-xs text-muted text-center mt-2">{FREE_LIMIT - usageCount} free generations left</p>
        )}
      </div>

      {draft && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div className="label">Your Draft</div>
            <button onClick={copy} className="flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors">
              {copied ? <Check size={14} className="text-sage" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-sm text-ink leading-relaxed whitespace-pre-wrap bg-surface rounded-xl p-3">
            {draft}
          </div>
          <button onClick={generate} disabled={loading} className="btn-ghost w-full mt-3 flex items-center justify-center gap-2 text-xs">
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
      )}
    </div>
  )
}
