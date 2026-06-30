import React, { useState } from 'react'
import { Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSignIn = async () => {
    if (!email || !password) return setError('Please fill in all fields.')
    setLoading(true); setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else {
      const { data: profile } = await supabase.from('co_profiles').select('*').eq('email', data.user.email).single()
      onAuth(data.user, profile)
    }
    setLoading(false)
  }

  const handleSignUp = async () => {
    if (!email || !password || !name) return setError('Please fill in all fields.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true); setError('')
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    if (error) setError(error.message)
    else if (data.user) {
      await supabase.from('co_profiles').upsert({ email, name, plan: 'free' }, { onConflict: 'email' })
      setMessage('Account created! Sign in now.')
      setMode('signin')
    }
    setLoading(false)
  }

  const handleForgot = async () => {
    if (!email) return setError('Enter your email address.')
    setLoading(true); setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin })
    if (error) setError(error.message)
    else setMessage('Password reset email sent! Check your inbox.')
    setLoading(false)
  }

  const submit = mode === 'signin' ? handleSignIn : mode === 'signup' ? handleSignUp : handleForgot

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-5 py-10">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
          <Zap size={15} className="text-gold-light" />
        </div>
        <span className="font-display font-bold text-ink text-lg">CreatorOps</span>
      </div>

      <div className="w-full max-w-sm">
        <div className="card">
          <div className="text-center mb-6">
            <h1 className="font-display text-xl font-bold text-ink">
              {mode === 'signin' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset password'}
            </h1>
            <p className="text-xs text-muted mt-1">
              {mode === 'signin' ? 'Sign in to your CreatorOps account' :
               mode === 'signup' ? 'Start free — no credit card required' :
               'We\'ll send you a reset link'}
            </p>
          </div>

          {error && <div className="bg-rose/10 border border-rose/20 rounded-xl px-3 py-2 mb-4"><p className="text-xs text-rose">{error}</p></div>}
          {message && <div className="bg-sage/10 border border-sage/20 rounded-xl px-3 py-2 mb-4"><p className="text-xs text-sage">{message}</p></div>}

          <div className="space-y-3">
            {mode === 'signup' && (
              <div>
                <div className="label mb-1">Name</div>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input className="input pl-9" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
            )}
            <div>
              <div className="label mb-1">Email</div>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input className="input pl-9" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
              </div>
            </div>
            {mode !== 'forgot' && (
              <div>
                <div className="label mb-1">Password</div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input className="input pl-9 pr-9" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {mode === 'signin' && (
            <button onClick={() => { setMode('forgot'); setError(''); setMessage('') }} className="text-xs text-muted hover:text-ink mt-2 block">
              Forgot password?
            </button>
          )}

          <button onClick={submit} disabled={loading} className="btn-primary w-full mt-5 flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            {!loading && <ArrowRight size={16} />}
          </button>

          <div className="text-center mt-4">
            {mode === 'signin' ? (
              <p className="text-xs text-muted">No account? <button onClick={() => { setMode('signup'); setError(''); setMessage('') }} className="text-gold font-medium">Sign up free</button></p>
            ) : mode === 'signup' ? (
              <p className="text-xs text-muted">Have an account? <button onClick={() => { setMode('signin'); setError(''); setMessage('') }} className="text-gold font-medium">Sign in</button></p>
            ) : (
              <button onClick={() => { setMode('signin'); setError(''); setMessage('') }} className="text-xs text-gold font-medium">Back to sign in</button>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-muted mt-4">By continuing you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
