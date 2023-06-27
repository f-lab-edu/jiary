import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AUTH_KEY, DOMAIN_URI } from '@/features/auth/apis/index.ts';
import { GoogleLoginUrl } from '@/features/auth/apis/interfaces.ts';

const getAuthCode = async (): Promise<GoogleLoginUrl> =>
  await axios.get(`${DOMAIN_URI}/api/auth`).then(res => res.data);

export const useGetAuthCode = () =>
  useQuery<GoogleLoginUrl>({
    queryKey: [AUTH_KEY, 'code'],
    queryFn: getAuthCode,
    staleTime: Infinity,
  });
