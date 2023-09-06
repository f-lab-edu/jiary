import { useMutation } from '@tanstack/react-query';

import { DIARY_KEY } from '@/constants/queryKey.ts';
import { patchFile } from '@/features/diary/apis/index.ts';
import { PatchFileArgs } from '@/features/diary/apis/interfaces.ts';

const usePatchFile = () =>
  useMutation({
    mutationKey: [DIARY_KEY, 'save-diary'],
    mutationFn: (patchRequest: PatchFileArgs) => patchFile(patchRequest),
  });

export default usePatchFile;
