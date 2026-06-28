import React, { useState } from 'react'
import Layout from './components/Layout'
import ContentPlanner from './pages/ContentPlanner'
import DraftGenerator from './pages/DraftGenerator'
import IdeaRepurposer from './pages/IdeaRepurposer'
import IdeaBank from './pages/IdeaBank'
import PerformanceTracker from './pages/PerformanceTracker'
import Settings from './pages/Settings'
import Landing from './pages/Landing'

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
  const [plan, setPlan] = useState('free')
  const [activeTab, setActiveTab] = useState('planner')

  if (!user) {
    return <Landing onEnter={(p) => { setUser({ name: 'Creator', email: 'creator@example.com' }); setPlan(p || 'free') }} />
  }

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || ContentPlanner

  return (
    <Layout tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} plan={plan} user={user}>
      <ActiveComponent plan={plan} onUpgrade={() => setPlan('pro')} />
    </Layout>
  )
}
