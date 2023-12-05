import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { AUTH_KEY } from '@/constants/queryKey.ts';
import { getAuthCode } from '@/features/auth/apis/index.ts';
import { GoogleLoginUrl } from '@/features/auth/apis/interfaces.ts';

export { default } from '@/features/auth/pages/root/AuthPage.tsx';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<GoogleLoginUrl>({
    queryKey: [AUTH_KEY, 'code'],
    queryFn: getAuthCode,
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
