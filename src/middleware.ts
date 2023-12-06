import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: 로그인 시 diary redirect 이슈로 인한 주석처리
export const config = {
  matcher: ['/diary/:path*'],
};

export function middleware(request: NextRequest) {
  if (!request.cookies.has('Authorization')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}
