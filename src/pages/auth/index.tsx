import * as style from '@/pages/auth/index.css.ts';
import { useAuth } from '@/core/hooks/auth/useAuth.ts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoginSection from '@/components/auth/LoginSection.tsx';

export default function AuthPage() {
  const [isEndAuth, openAuthPopup] = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isEndAuth) {
      router.push('/');
    }
  }, [isEndAuth, router]);

  return (
    <div className={style.root}>
      <LoginSection openAuthPopup={openAuthPopup} />
    </div>
  );
}
