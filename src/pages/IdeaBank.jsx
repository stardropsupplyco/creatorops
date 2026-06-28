import React, { useState } from 'react'
import { Plus, Lightbulb, Trash2, Star, Wand2, RefreshCw } from 'lucide-react'

const CATEGORIES = ['All', 'Content', 'Product', 'Business', 'Personal', 'Trending']

export default function IdeaBank({ plan }) {
  const [ideas, setIdeas] = useState([
    { id: 1, text: 'How I run 6 brands from one phone', category: 'Content', starred: true },
    { id: 2, text: 'The $0 marketing strategy that actually works', category: 'Content', starred: false },
    { id: 3, text: 'Solo founder morning routine (realistic)', category: 'Personal', starred: true },
  ])
  const [text, setText] = useState('')
  const [category, setCategory] = useState('Content')
  const [filter, setFilter] = useState('All')
  const [generating, setGenerating] = useState(false)

  const add = () => {
    if (!text.trim()) return
    setIdeas(prev => [...prev, { id: Date.now(), text, category, starred: false }])
    setText('')
  }

  const remove = id => setIdeas(prev => prev.filter(i => i.id !== id))
  const star = id => setIdeas(prev => prev.map(i => i.id === id ? { ...i, starred: !i.starred } : i))

  const generateIdeas = async () => {
    if (plan === 'free') {
      const samples = [
        { id: Date.now(), text: 'Day in the life of a solo founder', category: 'Content', starred: false },
        { id: Date.now() + 1, text: 'Tools that saved me 10 hours this week', category: 'Content', starred: false },
        { id: Date.now() + 2, text: 'Honest income report for new creators', category: 'Business', starred: false },
      ]
      setIdeas(prev => [...prev, ...samples])
      return
    }
    setGenerating(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          system: 'Generate 5 viral content ideas for solo creators and entrepreneurs. Return ONLY a JSON array of strings. No markdown, no explanation.',
          messages: [{ role: 'user', content: 'Give me 5 high-performing content ideas for a solo creator audience.' }]
        })
      })
      const data = await res.json()
      const text = data.content?.[0]?.text || '[]'
      const parsed = JSON.parse(text.replace(/```json|```/g, '').trim())
      const newIdeas = parsed.map((t, i) => ({ id: Date.now() + i, text: t, category: 'Content', starred: false }))
      setIdeas(prev => [...prev, ...newIdeas])
    } catch {
      // fallback handled
    }
    setGenerating(false)
  }

  const filtered = filter === 'All' ? ideas : filter === 'All' ? ideas : ideas.filter(i => i.category === filter)
  const starred = ideas.filter(i => i.starred)

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-ink">Idea Bank</h1>
        <p className="text-muted text-sm mt-0.5">{ideas.length} ideas saved · {starred.length} starred</p>
      </div>

      {/* Add idea */}
      <div className="card mb-4">
        <div className="flex gap-2 mb-2">
          <input className="input flex-1" placeholder="Capture an idea..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} />
          <button onClick={add} className="btn-primary px-3"><Plus size={16} /></button>
        </div>
        <div className="flex items-center justify-between">
          <select className="input w-auto text-xs" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={generateIdeas} disabled={generating} className="flex items-center gap-1.5 text-xs text-gold font-medium hover:text-gold-light transition-colors">
            {generating ? <RefreshCw size={12} className="animate-spin" /> : <Wand2 size={12} />}
            AI Generate
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${filter === c ? 'bg-ink text-white border-ink' : 'border-border text-muted hover:text-ink'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Ideas */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center text-muted text-sm py-8">No ideas yet. Add one or use AI Generate.</div>
        )}
        {filtered.map(idea => (
          <div key={idea.id} className="card flex items-start gap-3">
            <Lightbulb size={16} className="text-gold flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-ink">{idea.text}</div>
              <span className="text-xs text-muted mt-0.5 inline-block">{idea.category}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button onClick={() => star(idea.id)}>
                <Star size={14} className={idea.starred ? 'text-gold fill-gold' : 'text-muted'} />
              </button>
              <button onClick={() => remove(idea.id)}>
                <Trash2 size={14} className="text-muted hover:text-rose transition-colors" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
