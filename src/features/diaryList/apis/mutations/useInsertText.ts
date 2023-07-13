import { useMutation } from '@tanstack/react-query';
import { DIARY_KEY, insertText } from '@/features/diaryList/apis/index.ts';
import { InsertText } from '@/features/diaryList/apis/interfaces.ts';

const useInsertText = () =>
  useMutation({
    // TODO:
    mutationKey: [DIARY_KEY],
    mutationFn: (insertRequest: { docId: string; insertText: InsertText }) =>
      insertText(insertRequest),
  });

export default useInsertText;
