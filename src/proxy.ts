import { NextRequest, NextResponse } from 'next/server';

function isProtectedPath(pathname: string) {
  if (pathname === '/profile' || pathname.startsWith('/profile/')) return true;
  if (pathname === '/mycolumns' || pathname.startsWith('/mycolumns/')) return true;
  if (pathname === '/columns/create' || pathname.startsWith('/columns/create/')) return true;
  if (pathname === '/articles/create' || pathname.startsWith('/articles/create/')) return true;

  if (/^\/columns\/[^/]+\/edit(?:\/)?$/.test(pathname)) return true;
  if (/^\/articles\/[^/]+\/edit(?:\/)?$/.test(pathname)) return true;

  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get('session_id')?.value);

  if (!hasSession && isProtectedPath(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = '';

    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/profile/:path*',
    '/mycolumns/:path*',
    '/columns/:path*',
    '/articles/:path*',
  ],
};
