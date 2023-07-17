import { useMutation } from '@tanstack/react-query';
import { DIARY_KEY, patchFile } from '@/features/diaryList/apis/index.ts';
import { PatchFileArgs } from '@/features/diaryList/apis/interfaces.ts';

const usePatchFile = () =>
  useMutation({
    mutationKey: [DIARY_KEY],
    mutationFn: (patchRequest: PatchFileArgs) => patchFile(patchRequest),
  });

export default usePatchFile;
