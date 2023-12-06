import { Suspense, useEffect, useState } from 'react';

export default function SSRSafeSuspense(
  props: React.ComponentProps<typeof Suspense>,
) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    return <Suspense {...props} />;
  }

  return <>{props.fallback}</>;
}
