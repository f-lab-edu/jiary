import { useAuth } from '@/core/hooks/auth/useAuth.ts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthPage() {
  const [isEndAuth, openAuthPopup] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isEndAuth) {
      router.push('/');
    }
  }, [isEndAuth, router]);

  return (
    <>
      <div>AuthPage</div>
      <br />
      <button onClick={openAuthPopup}>login</button>
    </>
  );
}
