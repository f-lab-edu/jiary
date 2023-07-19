import { useMutation } from '@tanstack/react-query';
import { logout } from '@/features/auth/apis/index.ts';

const useLogout = () =>
  useMutation({
    mutationFn: (accessToken: string) => logout(accessToken),
  });

export default useLogout;
