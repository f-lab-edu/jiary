import { useMutation } from '@tanstack/react-query';
import { getAccessTokenByRefreshToken } from '@/features/auth/apis/index.ts';

const useGetAccessTokenByRefreshToken = () =>
  useMutation({ mutationFn: () => getAccessTokenByRefreshToken() });

export default useGetAccessTokenByRefreshToken;
