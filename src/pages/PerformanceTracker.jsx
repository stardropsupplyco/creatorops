import React, { useState } from 'react'
import { BarChart2, Plus, TrendingUp, Trash2, Target } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const PLATFORMS = ['Instagram', 'TikTok', 'Twitter/X', 'LinkedIn', 'YouTube']

const SAMPLE_DATA = [
  { week: 'W1', reach: 1200, engagement: 89 },
  { week: 'W2', reach: 1800, engagement: 134 },
  { week: 'W3', reach: 1400, engagement: 102 },
  { week: 'W4', reach: 2200, engagement: 178 },
]

export default function PerformanceTracker({ plan }) {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Morning routine reel', platform: 'Instagram', reach: 2400, likes: 189, comments: 34, saves: 67, date: '2026-06-20' },
    { id: 2, title: 'Solo founder day in the life', platform: 'TikTok', reach: 5800, likes: 412, comments: 89, saves: 0, date: '2026-06-22' },
    { id: 3, title: 'Tools thread', platform: 'Twitter/X', reach: 890, likes: 67, comments: 12, saves: 0, date: '2026-06-25' },
  ])

  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('Instagram')
  const [reach, setReach] = useState('')
  const [likes, setLikes] = useState('')
  const [comments, setComments] = useState('')
  const [saves, setSaves] = useState('')

  const add = () => {
    if (!title.trim() || !reach) return
    setPosts(prev => [...prev, {
      id: Date.now(), title, platform,
      reach: Number(reach), likes: Number(likes), comments: Number(comments), saves: Number(saves),
      date: new Date().toISOString().split('T')[0]
    }])
    setTitle(''); setReach(''); setLikes(''); setComments(''); setSaves('')
  }

  const remove = id => setPosts(prev => prev.filter(p => p.id !== id))

  const topPost = posts.reduce((best, p) => p.reach > (best?.reach || 0) ? p : best, null)
  const avgEngagement = posts.length > 0
    ? Math.round(posts.reduce((sum, p) => sum + p.likes + p.comments + p.saves, 0) / posts.length)
    : 0

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-ink">Performance</h1>
        <p className="text-muted text-sm mt-0.5">Know what's working</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="card text-center">
          <div className="text-xs text-muted mb-1">Posts</div>
          <div className="text-xl font-bold font-mono text-ink">{posts.length}</div>
        </div>
        <div className="card text-center">
          <div className="text-xs text-muted mb-1">Avg Engage</div>
          <div className="text-xl font-bold font-mono text-gold">{avgEngagement}</div>
        </div>
        <div className="card text-center">
          <div className="text-xs text-muted mb-1">Top Reach</div>
          <div className="text-xl font-bold font-mono text-sage">{topPost ? topPost.reach.toLocaleString() : 0}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="card mb-5">
        <div className="label mb-3">Weekly Reach Trend</div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={SAMPLE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DC" />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#8A8AA0' }} />
            <YAxis tick={{ fontSize: 11, fill: '#8A8AA0' }} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E8E4DC', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="reach" fill="#C9922A" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top post */}
      {topPost && (
        <div className="card border-gold/30 bg-gold/5 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-gold" />
            <span className="text-xs font-semibold text-gold">Top Performing Post</span>
          </div>
          <div className="text-sm font-medium text-ink">{topPost.title}</div>
          <div className="text-xs text-muted mt-0.5">{topPost.platform} · {topPost.reach.toLocaleString()} reach</div>
        </div>
      )}

      {/* Add post */}
      <div className="card mb-5">
        <div className="label mb-3">Track a Post</div>
        <input className="input mb-2" placeholder="Post title or description" value={title} onChange={e => setTitle(e.target.value)} />
        <select className="input mb-2" value={platform} onChange={e => setPlatform(e.target.value)}>
          {PLATFORMS.map(p => <option key={p}>{p}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <input className="input" placeholder="Reach" type="number" value={reach} onChange={e => setReach(e.target.value)} />
          <input className="input" placeholder="Likes" type="number" value={likes} onChange={e => setLikes(e.target.value)} />
          <input className="input" placeholder="Comments" type="number" value={comments} onChange={e => setComments(e.target.value)} />
          <input className="input" placeholder="Saves" type="number" value={saves} onChange={e => setSaves(e.target.value)} />
        </div>
        <button onClick={add} className="btn-primary w-full flex items-center justify-center gap-2">
          <Plus size={16} /> Track Post
        </button>
      </div>

      {/* Posts list */}
      <div className="label mb-3">All Tracked Posts</div>
      <div className="space-y-2">
        {posts.map(post => (
          <div key={post.id} className="card">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-ink">{post.title}</div>
                <div className="text-xs text-muted mt-0.5">{post.platform} · {post.date}</div>
                <div className="flex gap-3 mt-1.5">
                  <span className="text-xs text-ink font-mono">{post.reach.toLocaleString()} reach</span>
                  <span className="text-xs text-muted">{post.likes} ♥</span>
                  <span className="text-xs text-muted">{post.comments} 💬</span>
                  {post.saves > 0 && <span className="text-xs text-muted">{post.saves} 🔖</span>}
                </div>
              </div>
              <button onClick={() => remove(post.id)} className="text-muted hover:text-rose transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
