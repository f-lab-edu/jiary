import { useEffect } from 'react';

export default function EndPopup() {
  useEffect(() => {
    window.opener.postMessage(
      {
        type: 'jiarySignin',
        params: window.location.href,
      },
      process.env.NEXT_PUBLIC_DOMAIN_URI
    );
  });
}
