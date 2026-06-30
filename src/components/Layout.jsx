import React, { useState } from 'react'
import { Zap, Menu, X, Crown } from 'lucide-react'

export default function Layout({ tabs, activeTab, setActiveTab, plan, user, children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <img src="/images/logo-icon.png" alt="CreatorOps" className="h-6 w-auto" />
        <div className="flex items-center gap-3">
          {plan === 'pro' ? (
            <span className="flex items-center gap-1 text-xs text-gold font-semibold">
              <Crown size={12} /> Pro
            </span>
          ) : (
            <span className="text-xs text-muted bg-surface border border-border px-2 py-0.5 rounded-full">Free</span>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-ink">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Tab nav — desktop */}
      <nav className="hidden md:flex bg-white border-b border-border px-4 gap-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-ink text-ink'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMenuOpen(false) }}
              className={`w-full text-left px-4 py-3 text-sm border-b border-border last:border-0 ${
                activeTab === tab.id ? 'text-ink font-semibold bg-surface' : 'text-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <main className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
