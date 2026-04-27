'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/src/redux/store';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
