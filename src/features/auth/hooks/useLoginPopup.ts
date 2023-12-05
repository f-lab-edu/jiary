import { useEffect } from 'react';

import { MESSAGE_TYPE } from '@/constants/auth.ts';
import { JIARY_DOMAIN } from '@/constants/domain.ts';
import { useAuth } from '@/features/auth/hooks/useAuth.ts';

let popupWindow: Window | null = null;
const openPopup = (url: string | undefined) => {
  popupWindow = window.open(
    url,
    MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE,
    'toolbar=no, width=560, height=700, top=100, left=100',
  );
};

export const useLoginPopup = () => {
  const { messageCallback } = useAuth();
  const openLoginPopup = (url: string | undefined) => {
    if (popupWindow === null || popupWindow.closed) {
      openPopup(url);
    } else if (window.location.href !== `${JIARY_DOMAIN}/auth`) {
      openPopup(url);
      popupWindow.focus();
    } else {
      popupWindow.focus();
      return;
    }
  };

  useEffect(() => {
    window.addEventListener('message', messageCallback);
    return () => window.removeEventListener('message', messageCallback);
  }, [messageCallback]);

  return { openLoginPopup };
};
