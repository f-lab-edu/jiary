import { useMutation } from '@tanstack/react-query';
import { getUserInfo } from '@/features/auth/apis/index.ts';

const useGetUserInfo = () =>
  useMutation({
    mutationFn: (accessToken: string) => getUserInfo(accessToken),
  });

export default useGetUserInfo;
