export type DashboardRole = 'seller' | 'buyer' | 'lessee';

export interface DashboardCredentials {
  role: DashboardRole;
  email: string;
  password: string;
  label: string;
}

export interface DashboardSession {
  role: DashboardRole;
  email: string;
  label: string;
  loggedInAt: number;
}

const SESSION_KEY = 'preleasehub:dashboardSession';

export const DASHBOARD_CREDENTIALS: DashboardCredentials[] = [
  {
    role: 'seller',
    label: 'Seller',
    email: 'seller@preleasehub.com',
    password: 'Seller@123',
  },
  {
    role: 'buyer',
    label: 'Buyer',
    email: 'buyer@preleasehub.com',
    password: 'Buyer@123',
  },
  {
    role: 'lessee',
    label: 'Lessee',
    email: 'lessee@preleasehub.com',
    password: 'Lessee@123',
  },
];

function isBrowser() {
  return typeof window !== 'undefined';
}

export function roleLabel(role: DashboardRole) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export function getDashboardRoute(role: DashboardRole) {
  return `/dashboard/${role}`;
}

export function authenticateDashboardUser(email: string, password: string): DashboardSession | null {
  const account = DASHBOARD_CREDENTIALS.find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password,
  );

  if (!account) {
    return null;
  }

  return {
    role: account.role,
    email: account.email,
    label: account.label,
    loggedInAt: Date.now(),
  };
}

export function setDashboardSession(session: DashboardSession) {
  if (!isBrowser()) return;

  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.localStorage.setItem('preleasehub:isLoggedIn', 'true');
}

export function getDashboardSession(): DashboardSession | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(SESSION_KEY);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as DashboardSession;

    if (!parsed.role || !parsed.email) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearDashboardSession() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem('preleasehub:isLoggedIn');
}
