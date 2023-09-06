import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/diary/:path*'],
};

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('Authorization');
  if (!authCookie) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }
  return NextResponse.next();
}
