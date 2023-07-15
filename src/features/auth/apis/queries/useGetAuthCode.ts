import { useQuery } from '@tanstack/react-query';
import { getAuthCode, AUTH_KEY } from '@/features/auth/apis/index.ts';
import { GoogleLoginUrl } from '@/features/auth/apis/interfaces.ts';

const useGetAuthCode = () =>
  useQuery<GoogleLoginUrl>({
    queryKey: [AUTH_KEY, 'code'],
    queryFn: getAuthCode,
    staleTime: Infinity,
  });

export default useGetAuthCode;
