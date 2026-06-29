import React, { useState } from 'react'
import { Zap, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState('signin') // signin | signup | forgot
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSignIn = async () => {
    if (!email || !password) return setError('Please fill in all fields.')
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else {
      const profile = await getOrCreateProfile(data.user)
      onAuth(data.user, profile)
    }
    setLoading(false)
  }

  const handleSignUp = async () => {
    if (!email || !password || !name) return setError('Please fill in all fields.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    if (error) setError(error.message)
    else if (data.user) {
      await createProfile(data.user, name)
      setMessage('Account created! Check your email to confirm, or sign in now.')
      setMode('signin')
    }
    setLoading(false)
  }

  const handleForgot = async () => {
    if (!email) return setError('Enter your email address.')
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    })
    if (error) setError(error.message)
    else setMessage('Password reset email sent! Check your inbox.')
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-5 py-10">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
          <Zap size={15} className="text-gold-light" />
        </div>
        <span className="font-display font-bold text-ink text-lg">CreatorOps</span>
      </div>

      <div className="w-full max-w-sm">
        <div className="card">
          {/* Header */}
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

          {/* Error/Message */}
          {error && (
            <div className="bg-rose/10 border border-rose/20 rounded-xl px-3 py-2 mb-4">
              <p className="text-xs text-rose">{error}</p>
            </div>
          )}
          {message && (
            <div className="bg-sage/10 border border-sage/20 rounded-xl px-3 py-2 mb-4">
              <p className="text-xs text-sage">{message}</p>
            </div>
          )}

          {/* Google */}
          {mode !== 'forgot' && (
            <>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full border border-border rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-ink hover:bg-surface transition-colors mb-4"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          {/* Form */}
          <div className="space-y-3">
            {mode === 'signup' && (
              <div>
                <div className="label mb-1">Name</div>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    className="input pl-9"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <div className="label mb-1">Email</div>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  className="input pl-9"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (mode === 'signin' ? handleSignIn() : mode === 'signup' ? handleSignUp() : handleForgot())}
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="label mb-1">Password</div>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    className="input pl-9 pr-9"
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (mode === 'signin' ? handleSignIn() : handleSignUp())}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  >
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Forgot password link */}
          {mode === 'signin' && (
            <button
              onClick={() => { setMode('forgot'); setError(''); setMessage('') }}
              className="text-xs text-muted hover:text-ink mt-2 block"
            >
              Forgot password?
            </button>
          )}

          {/* Submit */}
          <button
            onClick={mode === 'signin' ? handleSignIn : mode === 'signup' ? handleSignUp : handleForgot}
            disabled={loading}
            className="btn-primary w-full mt-5 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Please wait...' :
             mode === 'signin' ? 'Sign In' :
             mode === 'signup' ? 'Create Account' :
             'Send Reset Link'}
            {!loading && <ArrowRight size={16} />}
          </button>

          {/* Switch mode */}
          <div className="text-center mt-4">
            {mode === 'signin' ? (
              <p className="text-xs text-muted">
                No account?{' '}
                <button onClick={() => { setMode('signup'); setError(''); setMessage('') }} className="text-gold font-medium">
                  Sign up free
                </button>
              </p>
            ) : mode === 'signup' ? (
              <p className="text-xs text-muted">
                Already have an account?{' '}
                <button onClick={() => { setMode('signin'); setError(''); setMessage('') }} className="text-gold font-medium">
                  Sign in
                </button>
              </p>
            ) : (
              <button onClick={() => { setMode('signin'); setError(''); setMessage('') }} className="text-xs text-gold font-medium">
                Back to sign in
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-4">
          By continuing you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

async function getOrCreateProfile(user) {
  const { supabase: sb } = await import('../lib/supabase')
  const { data } = await sb.from('co_profiles').select('*').eq('email', user.email).single()
  if (data) return data
  return createProfile(user, user.user_metadata?.name || '')
}

async function createProfile(user, name) {
  const { supabase: sb } = await import('../lib/supabase')
  const { data } = await sb.from('co_profiles').insert({
    email: user.email,
    name,
    plan: 'free',
  }).select().single()
  return data
}
