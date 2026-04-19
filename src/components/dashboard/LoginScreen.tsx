// src/components/dashboard/LoginScreen.tsx
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  authenticateDashboardUser,
  DASHBOARD_CREDENTIALS,
  DashboardRole,
  DashboardSession,
  roleLabel,
} from '@/src/lib/dashboard-auth';

interface LoginScreenProps {
  expectedRole: DashboardRole;
  onLogin: (session: DashboardSession) => void;
}

export default function LoginScreen({ expectedRole, onLogin }: LoginScreenProps) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState('');

  const expectedLabel = roleLabel(expectedRole);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const session = authenticateDashboardUser(email, password);

    if (!session) {
      setError('Invalid credentials. Use the demo credentials below.');
      return;
    }

    if (session.role !== expectedRole) {
      setError(`You are trying to access the ${expectedLabel} dashboard. Please use ${expectedLabel} credentials.`);
      return;
    }

    onLogin(session);
  }

  return (
    <div className="h-full flex items-center justify-center bg-[#f7f7f7]">
      {/* decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 40px),' +
            'repeating-linear-gradient(90deg,#000 0,#000 1px,transparent 1px,transparent 40px)',
        }}
      />

      <div className="relative w-full max-w-md mx-4">
        <div className="h-1 w-16 bg-black rounded-full mb-8" />

        <h1 className="text-4xl font-black tracking-tight text-black mb-1">{expectedLabel} Portal</h1>
        <p className="text-sm text-gray-500 mb-8">PrereleaseHub · Dashboard Access</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder={`${expectedRole}@preleasehub.com`}
              className="w-full h-11 border border-black/20 rounded-xl px-4 text-sm bg-white outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className="w-full h-11 border border-black/20 rounded-xl px-4 pr-10 text-sm bg-white outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShow((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full h-11 bg-black text-white rounded-xl text-sm font-bold tracking-wide hover:bg-gray-900 active:scale-[0.98] transition"
          >
            Sign In →
          </button>
        </form>

        {/* Demo hint */}
        <div className="mt-6 border border-dashed border-black/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Demo Credentials
          </p>
          <div className="space-y-1.5">
            {DASHBOARD_CREDENTIALS.map((item) => (
              <p key={item.role} className="text-xs text-gray-700 font-mono">
                {item.label}: {item.email} / {item.password}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}