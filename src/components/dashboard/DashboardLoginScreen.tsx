'use client';

import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  authenticateDashboardUser,
  DASHBOARD_CREDENTIALS,
  DashboardRole,
  getDashboardRoute,
  getDashboardSession,
  roleLabel,
  setDashboardSession,
} from '@/src/lib/dashboard-auth';

export default function DashboardLoginScreen() {
  const router = useRouter();
  const [role, setRole] = useState<DashboardRole>('seller');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const session = getDashboardSession();
    if (session) {
      router.replace(getDashboardRoute(session.role));
    }
  }, [router]);

  const activeCredential = useMemo(
    () => DASHBOARD_CREDENTIALS.find((item) => item.role === role),
    [role],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const session = authenticateDashboardUser(email, password);

    if (!session) {
      setError('Invalid credentials. Please use the demo credentials below.');
      return;
    }

    if (session.role !== role) {
      setError(`Selected role is ${roleLabel(role)}. Please use matching credentials.`);
      return;
    }

    setDashboardSession(session);
    router.push(getDashboardRoute(session.role));
  }

  return (
    <div className="min-h-[70vh] bg-[#f7f7f7] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-5 sm:p-6">
        <h1 className="text-3xl font-black text-black leading-tight">Dashboard Login</h1>
        <p className="mt-1 text-sm text-gray-500">
          Select role, enter credentials, and continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Role</p>
            <div className="grid grid-cols-3 gap-2">
              {(['seller', 'buyer', 'lessee'] as DashboardRole[]).map((item) => {
                const isActive = role === item;
                return (
                  <label
                    key={item}
                    className={`flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border text-xs font-bold transition ${
                      isActive
                        ? 'border-black bg-black text-white'
                        : 'border-black/10 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={item}
                      checked={isActive}
                      onChange={() => {
                        setRole(item);
                        setError('');
                      }}
                      className="sr-only"
                    />
                    <span
                      className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
                        isActive ? 'border-white' : 'border-gray-400'
                      }`}
                    >
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                    {roleLabel(item)}
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder={`${role}@preleasehub.com`}
              className="w-full h-11 rounded-xl border border-black/20 bg-white px-4 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full h-11 rounded-xl border border-black/20 bg-white px-4 pr-10 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-xs font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-black text-sm font-bold text-white transition hover:bg-gray-800"
          >
            Continue to Dashboard
          </button>
        </form>

        <div className="mt-5 rounded-xl border border-dashed border-black/20 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Selected Role Demo</p>
          <p className="mt-1 text-xs font-mono text-gray-700">
            {activeCredential?.email} / {activeCredential?.password}
          </p>
        </div>
      </div>
    </div>
  );
}