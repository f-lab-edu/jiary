import { useQuery } from '@tanstack/react-query';

import { AUTH_KEY } from '@/constants/queryKey.ts';
import { getAccessToken } from '@/features/auth/apis/index.ts';
import { AuthToken } from '@/features/auth/apis/interfaces.ts';

const useGetAccessToken = (code: string) =>
  useQuery<AuthToken>({
    queryKey: [AUTH_KEY, code],
    queryFn: () => getAccessToken(code),
    enabled: !!code,
    staleTime: Infinity,
  });

export default useGetAccessToken;
