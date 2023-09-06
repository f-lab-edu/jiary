import { useQuery } from '@tanstack/react-query';

import { AUTH_KEY } from '@/constants/queryKey.ts';
import { getUserInfo } from '@/features/auth/apis/index.ts';
import { UserInfo } from '@/features/auth/apis/interfaces.ts';

const useGetUserInfo = (accessToken: string) =>
  useQuery<UserInfo>({
    queryKey: [AUTH_KEY, accessToken],
    queryFn: () => getUserInfo(accessToken),
    enabled: !!accessToken,
    staleTime: Infinity,
  });

export default useGetUserInfo;
