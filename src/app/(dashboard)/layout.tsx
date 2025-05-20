'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '../_context/AuthContext';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isUserAuthenticated } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (!isUserAuthenticated) {
      push('/login');
    }
  }, [isUserAuthenticated, push]);

  if (!isUserAuthenticated) {
    return null;
  }

  return <div>{children}</div>;
}
