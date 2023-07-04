import AuthPage from '@/features/auth/pages/root/AuthPage.tsx';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';

export default function Index() {
  const { openLoginPopup } = useAuth();

  return <AuthPage openLoginPopup={openLoginPopup} />;
}
