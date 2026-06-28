import React, { useState } from 'react'
import { Calendar, Wand2, Lock, RefreshCw, Check } from 'lucide-react'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const PLATFORMS = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube', 'Pinterest']
const NICHES = ['Lifestyle', 'Business', 'Fitness', 'Food', 'Tech', 'Fashion', 'Education', 'Finance']

const SAMPLE_PLANS = {
  Instagram: [
    { day: 'Mon', type: 'Reel', idea: 'Morning routine that doubled my productivity' },
    { day: 'Tue', type: 'Carousel', idea: '5 things I wish I knew before starting my business' },
    { day: 'Wed', type: 'Story', idea: 'Behind the scenes of my content creation process' },
    { day: 'Thu', type: 'Post', idea: 'Motivational quote with personal story caption' },
    { day: 'Fri', type: 'Reel', idea: 'Week in review + lessons learned' },
    { day: 'Sat', type: 'Carousel', idea: 'Tools I use to run my business from my phone' },
    { day: 'Sun', type: 'Post', idea: 'Sunday reset routine + goal setting for the week' },
  ],
  TikTok: [
    { day: 'Mon', type: 'Video', idea: 'POV: Running a business solo (day in the life)' },
    { day: 'Tue', type: 'Duet', idea: 'React to a trending creator tip with your take' },
    { day: 'Wed', type: 'Tutorial', idea: 'How I plan a week of content in 30 minutes' },
    { day: 'Thu', type: 'Storytime', idea: 'The moment I decided to go solo' },
    { day: 'Fri', type: 'Video', idea: 'What $0 marketing looks like (organic strategy)' },
    { day: 'Sat', type: 'Tutorial', idea: '3 free tools every solo creator needs' },
    { day: 'Sun', type: 'Video', idea: 'Realistic income update as a solo creator' },
  ],
}

export default function ContentPlanner({ plan }) {
  const [platform, setPlatform] = useState('Instagram')
  const [niche, setNiche] = useState('Business')
  const [generated, setGenerated] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState({})

  const generate = async () => {
    if (plan === 'free') {
      setGenerated(SAMPLE_PLANS[platform] || SAMPLE_PLANS.Instagram)
      return
    }
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: 'You are a content strategist for solo creators. Return ONLY a JSON array of 7 objects with keys: day (Mon-Sun), type (content format), idea (compelling content idea). No markdown, no explanation.',
          messages: [{ role: 'user', content: `Create a 7-day ${platform} content plan for a ${niche} creator. Return JSON array only.` }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '[]'
      const clean = text.replace(/```json|```/g, '').trim()
      setGenerated(JSON.parse(clean))
    } catch {
      setGenerated(SAMPLE_PLANS[platform] || SAMPLE_PLANS.Instagram)
    }
    setLoading(false)
  }

  const toggle = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-ink">Content Planner</h1>
        <p className="text-muted text-sm mt-0.5">AI-generated 7-day content calendar</p>
      </div>

      <div className="card mb-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <div className="label mb-1.5">Platform</div>
            <select className="input" value={platform} onChange={e => setPlatform(e.target.value)}>
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <div className="label mb-1.5">Niche</div>
            <select className="input" value={niche} onChange={e => setNiche(e.target.value)}>
              {NICHES.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw size={16} className="animate-spin" /> : <Wand2 size={16} />}
          {loading ? 'Generating...' : 'Generate 7-Day Plan'}
        </button>
        {plan === 'free' && (
          <p className="text-xs text-muted text-center mt-2">Free preview · Upgrade for custom AI plans</p>
        )}
      </div>

      {generated && (
        <div className="space-y-2">
          <div className="label mb-2">Your 7-Day Plan — {platform}</div>
          {generated.map((item, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`card cursor-pointer transition-all ${checked[i] ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  checked[i] ? 'bg-sage text-white' : 'bg-ink/5 text-ink'
                }`}>
                  {checked[i] ? <Check size={14} /> : item.day}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gold font-semibold">{item.type}</span>
                  </div>
                  <div className={`text-sm mt-0.5 ${checked[i] ? 'line-through text-muted' : 'text-ink'}`}>
                    {item.idea}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
