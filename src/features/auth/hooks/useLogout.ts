import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import useLogoutMutation from '@/features/auth/apis/mutations/useLogoutMutation.ts';

import { removeAccessToken, removeUser } from '@/store/slices/authSlice.ts';

export const useLogout = () => {
  const logoutMutation = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = () => {
    const confirm = window.confirm('로그아웃 하시겠습니까?');
    if (!confirm) return;

    logoutMutation.mutate();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(removeUser());
    dispatch(removeAccessToken());
    queryClient.clear();
    router.push('/');
  };

  return { logout };
};
