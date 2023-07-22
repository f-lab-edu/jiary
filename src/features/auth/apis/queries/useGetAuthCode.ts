import { useQuery } from '@tanstack/react-query';
import { AUTH_KEY } from '@/constants/queryKey.ts';
import { getAuthCode } from '@/features/auth/apis/index.ts';
import { GoogleLoginUrl } from '@/features/auth/apis/interfaces.ts';

const useGetAuthCode = () =>
  useQuery<GoogleLoginUrl>({
    queryKey: [AUTH_KEY, 'code'],
    queryFn: getAuthCode,
    staleTime: Infinity,
  });

export default useGetAuthCode;
