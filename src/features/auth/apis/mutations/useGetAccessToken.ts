import { useMutation } from '@tanstack/react-query';
import { getAccessToken } from '@/features/auth/apis/index.ts';

const useGetAccessToken = () =>
  useMutation({
    mutationFn: (code: string) => getAccessToken(code),
  });

export default useGetAccessToken;
