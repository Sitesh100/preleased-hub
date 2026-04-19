'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, X } from 'lucide-react';
import {
  authenticateDashboardUser,
  DASHBOARD_CREDENTIALS,
  getDashboardRoute,
  setDashboardSession,
} from '@/src/lib/dashboard-auth';

type Tab = 'login' | 'signup';
type UserType = 'Seller' | 'Buyer' | 'Lessee';

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: Tab;
  onLoginSuccess?: () => void;
}

export default function AuthPopup({
  isOpen,
  onClose,
  defaultTab = 'login',
  onLoginSuccess,
}: AuthPopupProps) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>('Seller');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  if (!isOpen) return null;

  const inputCls =
    'w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1a6db5] focus:ring-2 focus:ring-[#1a6db5]/10 transition';

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const session = authenticateDashboardUser(loginEmail, loginPassword);

    if (!session) {
      setLoginError('Invalid credentials. Please use one of the demo accounts.');
      return;
    }

    setDashboardSession(session);
    console.log({ loginEmail, rememberMe, role: session.role });
    onLoginSuccess?.();
    onClose();

    router.push(getDashboardRoute(session.role));
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    console.log({ signupName, signupEmail, userType, signupPassword, signupPhone });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-gray-900">PrereleaseHub Access</span>
            </div>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="px-6 pt-4">
            <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1">
              <button
                onClick={() => setTab('signup')}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                  tab === 'signup'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setTab('login')}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200 ${
                  tab === 'login'
                    ? 'bg-white text-[#1a6db5] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Login
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="px-6 pb-6 pt-4">

            {/* ── LOGIN FORM ── */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Demo hint */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500 space-y-1">
                  {DASHBOARD_CREDENTIALS.map((item) => (
                    <p key={item.role}>
                      {item.label}: {item.email} / {item.password}
                    </p>
                  ))}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginError('');
                    }}
                    className={inputCls}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setLoginError('');
                      }}
                      className={`${inputCls} pr-10`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <p className="text-xs font-medium text-red-600">{loginError}</p>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#1a6db5] accent-[#1a6db5]"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm font-medium text-[#1a6db5] hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#0f3557] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2e4a] active:scale-[0.98]"
                >
                  Log in
                </button>

                <p className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
                    className="font-medium text-[#1a6db5] hover:underline"
                  >
                    Create one
                  </button>
                </p>
              </form>
            )}

            {/* ── SIGNUP FORM ── */}
            {tab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      User Name
                    </label>
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className={inputCls}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className={inputCls}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* User Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    User Type
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {(['Seller', 'Buyer', 'Lessee'] as UserType[]).map((type) => (
                      <label
                        key={type}
                        className={`flex flex-1 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                          userType === type
                            ? 'border-[#1a6db5] bg-[#f0f7ff] text-[#1a6db5]'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={type}
                          checked={userType === type}
                          onChange={() => setUserType(type)}
                          className="accent-[#1a6db5]"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className={`${inputCls} pr-10`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* ── Phone Number (replaces Confirm Password) ── */}
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className={inputCls}
                      placeholder="+91 98765 43210"
                      pattern="[+]?[0-9\s\-()]{7,15}"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#0f3557] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2e4a] active:scale-[0.98]"
                >
                  Create account
                </button>

                <p className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                  Demo signup keeps mock mode active. For dashboard access, use login with role credentials.
                </p>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="font-medium text-[#1a6db5] hover:underline"
                  >
                    Log in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}