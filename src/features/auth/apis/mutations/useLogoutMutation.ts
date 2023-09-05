import { useMutation } from '@tanstack/react-query';

import { logout } from '@/features/auth/apis/index.ts';

export default function useLogoutMutation() {
  return useMutation({ mutationFn: logout });
}
