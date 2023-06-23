import { useEffect } from 'react';
import { MESSAGE_TYPE } from '@/constant/auth.ts';

export default function EndPopup() {
  useEffect(() => {
    window.opener.postMessage(
      {
        type: MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE,
        params: window.location.href,
      },
      process.env.NEXT_PUBLIC_DOMAIN_URI
    );
  }, []);
}
