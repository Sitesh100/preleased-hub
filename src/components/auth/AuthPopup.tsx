'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Eye, EyeOff, X } from 'lucide-react';
import {
  DashboardRole,
  getDashboardRoute,
  roleLabel,
  setDashboardSession,
} from '@/src/lib/dashboard-auth';
import { useLoginMutation, useRegisterMutation } from '@/src/redux/features/auth/authApi';
import { setUser } from '@/src/redux/features/auth/authSlice';
import type { AppDispatch } from '@/src/redux/store';

type Tab = 'login' | 'signup';
type UserType = 'Seller' | 'Buyer' | 'Lessee';

const REGISTER_ROLE_MAP: Record<UserType, number> = {
  Seller: 1,
  Buyer: 2,
  Lessee: 3,
};

const DASHBOARD_ROLE_MAP: Record<UserType, DashboardRole> = {
  Seller: 'seller',
  Buyer: 'buyer',
  Lessee: 'lessee',
};

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: Tab;
  onLoginSuccess?: () => void;
  redirectToDashboard?: boolean;
}

export default function AuthPopup({
  isOpen,
  onClose,
  defaultTab = 'login',
  onLoginSuccess,
  redirectToDashboard = true,
}: AuthPopupProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [login, loginState] = useLoginMutation();
  const [register, registerState] = useRegisterMutation();
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserType>('Seller');
  const [authError, setAuthError] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  if (!isOpen) return null;

  const inputCls =
    'w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#1a6db5] focus:ring-2 focus:ring-[#1a6db5]/10 transition';

  function getApiErrorMessage(error: unknown, fallback: string) {
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const data = (error as { data?: { message?: string } }).data;
      if (data?.message) {
        return data.message;
      }
    }

    if (typeof error === 'object' && error !== null && 'error' in error) {
      const message = (error as { error?: string }).error;
      if (message) {
        return message;
      }
    }

    return fallback;
  }

  function getDashboardRole() {
    return DASHBOARD_ROLE_MAP[userType];
  }

  function renderRoleSelector() {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">User Type</label>
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
                onChange={() => {
                  setUserType(type);
                  setAuthError('');
                  setAuthMessage('');
                }}
                className="accent-[#1a6db5]"
              />
              {type}
            </label>
          ))}
        </div>
      </div>
    );
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setAuthMessage('');

    try {
      const response = await login({
        phone_no: loginPhone.trim(),
        password: loginPassword,
      }).unwrap();

      dispatch(
        setUser({
          token: response.access_token,
          refreshToken: response.refresh_token,
        }),
      );

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('preleasehub:isLoggedIn', 'true');
      }

      const dashboardRole = getDashboardRole();
      setDashboardSession({
        role: dashboardRole,
        email: loginPhone.trim(),
        label: roleLabel(dashboardRole),
        loggedInAt: Date.now(),
      });

      onLoginSuccess?.();
      onClose();
      if (redirectToDashboard) {
        router.push(getDashboardRoute(dashboardRole));
      }
    } catch (error) {
      setAuthError(getApiErrorMessage(error, 'Unable to log in. Please try again.'));
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setAuthMessage('');

    try {
      const registerResponse = await register({
        user_name: signupName.trim(),
        email: signupEmail.trim(),
        phone_no: signupPhone.trim(),
        password: signupPassword,
        role: REGISTER_ROLE_MAP[userType],
      }).unwrap();

      if (!registerResponse.status) {
        setAuthError(registerResponse.message || 'Unable to register your account.');
        return;
      }

      try {
        const loginResponse = await login({
          phone_no: signupPhone.trim(),
          password: signupPassword,
        }).unwrap();

        dispatch(
          setUser({
            token: loginResponse.access_token,
            refreshToken: loginResponse.refresh_token,
          }),
        );

        if (typeof window !== 'undefined') {
          window.localStorage.setItem('preleasehub:isLoggedIn', 'true');
        }

        const dashboardRole = getDashboardRole();
        setDashboardSession({
          role: dashboardRole,
          email: signupPhone.trim(),
          label: roleLabel(dashboardRole),
          loggedInAt: Date.now(),
        });

        onLoginSuccess?.();
        onClose();
        if (redirectToDashboard) {
          router.push(getDashboardRoute(dashboardRole));
        }
        return;
      } catch {
        setAuthMessage(registerResponse.message || 'Account created successfully.');
        setTab('login');
        setLoginPhone(signupPhone.trim());
        setLoginPassword('');
        setShowPassword(false);
        setAuthError('Account created, but sign in failed. Please log in with your phone number and password.');
      }
    } catch (error) {
      setAuthError(getApiErrorMessage(error, 'Unable to register your account. Please try again.'));
    }
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
                {renderRoleSelector()}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={loginPhone}
                    onChange={(e) => {
                      setLoginPhone(e.target.value);
                      setAuthError('');
                      setAuthMessage('');
                    }}
                    className={inputCls}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
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
                        setAuthError('');
                        setAuthMessage('');
                      }}
                      className={`${inputCls} pr-10`}
                      placeholder="••••••••"
                      autoComplete="current-password"
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

                {authError && (
                  <p className="text-xs font-medium text-red-600">{authError}</p>
                )}
                {authMessage && (
                  <p className="text-xs font-medium text-emerald-600">{authMessage}</p>
                )}

                <div className="flex items-center justify-end">
                  <button type="button" className="text-sm font-medium text-[#1a6db5] hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loginState.isLoading}
                  className="w-full rounded-xl bg-[#0f3557] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2e4a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loginState.isLoading ? 'Signing in...' : 'Log in'}
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
                      onChange={(e) => {
                        setSignupName(e.target.value);
                        setAuthError('');
                        setAuthMessage('');
                      }}
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
                      onChange={(e) => {
                        setSignupEmail(e.target.value);
                        setAuthError('');
                        setAuthMessage('');
                      }}
                      className={inputCls}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {renderRoleSelector()}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => {
                          setSignupPassword(e.target.value);
                          setAuthError('');
                          setAuthMessage('');
                        }}
                        className={`${inputCls} pr-10`}
                        placeholder="••••••••"
                        autoComplete="new-password"
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

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => {
                        setSignupPhone(e.target.value);
                        setAuthError('');
                        setAuthMessage('');
                      }}
                      className={inputCls}
                      placeholder="+91 98765 43210"
                      pattern="[+]?[0-9\s\-()]{7,15}"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={registerState.isLoading}
                  className="w-full rounded-xl bg-[#0f3557] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d2e4a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {registerState.isLoading ? 'Creating account...' : 'Create account'}
                </button>

                {authError && (
                  <p className="text-xs font-medium text-red-600">{authError}</p>
                )}
                {authMessage && (
                  <p className="text-xs font-medium text-emerald-600">{authMessage}</p>
                )}

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
