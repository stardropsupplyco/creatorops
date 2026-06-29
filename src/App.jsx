import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import Landing from './pages/Landing'
import ContentPlanner from './pages/ContentPlanner'
import DraftGenerator from './pages/DraftGenerator'
import IdeaRepurposer from './pages/IdeaRepurposer'
import IdeaBank from './pages/IdeaBank'
import PerformanceTracker from './pages/PerformanceTracker'
import Settings from './pages/Settings'

const TABS = [
  { id: 'planner', label: 'Content Planner', component: ContentPlanner },
  { id: 'drafts', label: 'Draft Generator', component: DraftGenerator },
  { id: 'repurpose', label: 'Repurposer', component: IdeaRepurposer },
  { id: 'ideas', label: 'Idea Bank', component: IdeaBank },
  { id: 'performance', label: 'Performance', component: PerformanceTracker },
  { id: 'settings', label: 'Settings', component: Settings },
]

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [activeTab, setActiveTab] = useState('planner')

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        loadProfile(session.user.email)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        loadProfile(session.user.email)
        setShowAuth(false)
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfile = async (email) => {
    const { data } = await supabase.from('co_profiles').select('*').eq('email', email).single()
    if (data) setProfile(data)
    else {
      // Create profile if doesn't exist
      const { data: newProfile } = await supabase.from('co_profiles').insert({ email, plan: 'free' }).select().single()
      setProfile(newProfile)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setShowAuth(false)
  }

  const handleUpgrade = (plan) => {
    setProfile(prev => ({ ...prev, plan }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    )
  }

  if (showAuth) {
    return <Auth onAuth={(u, p) => { setUser(u); setProfile(p); setShowAuth(false) }} />
  }

  if (!user) {
    return <Landing onEnter={(plan) => {
      if (plan === 'free' || !plan) setShowAuth(true)
      else setShowAuth(true)
    }} />
  }

  const plan = profile?.plan || 'free'
  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || ContentPlanner

  return (
    <Layout tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} plan={plan} user={user}>
      <ActiveComponent
        plan={plan}
        user={user}
        profile={profile}
        onUpgrade={handleUpgrade}
        onSignOut={handleSignOut}
      />
    </Layout>
  )
}
