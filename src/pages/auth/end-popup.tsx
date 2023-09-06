import { ReactElement, useEffect } from 'react';

import { MESSAGE_TYPE } from '@/constants/auth.ts';
import { JIARY_DOMAIN } from '@/constants/domain.ts';

export default function EndPopup() {
  useEffect(() => {
    window.opener.postMessage(
      {
        type: MESSAGE_TYPE.JIARY_SIGNIN_MESSAGE,
        params: window.location.href,
      },
      JIARY_DOMAIN,
    );
  }, []);
}

EndPopup.getLayout = (page: ReactElement) => <>{page}</>;
