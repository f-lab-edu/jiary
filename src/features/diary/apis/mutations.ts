import { useMutation } from '@tanstack/react-query';
import { docsApi } from '@/features/diary/apis/index.ts';
import { Doc } from '@/features/diary/apis/interfaces.ts';

// const getAccessToken = async (code: string): Promise<AuthToken> =>
//   await axios
//     .post(`${DOMAIN_URI}/api/auth`, {
//       type: REQUEST_BODY_TYPE.GET_TOKEN,
//       code,
//     })
//     .then(res => res.data);

// export const useLogout = () =>
//   useMutation({
//     mutationFn: (accessToken: string | null) => logout(accessToken),
//   });

const createDoc = async (title: string): Promise<Doc> =>
  await docsApi.post('', { title: `jiary-${title}` }).then(res => res.data);

export const useCreateDoc = () =>
  useMutation({
    mutationFn: (title: string) => createDoc(title),
  });
