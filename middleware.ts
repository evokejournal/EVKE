import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define paths that don't require authentication
const publicPaths = [
  '/auth',
  '/api/auth',
  '/_next',
  '/static',
  '/favicon.ico',
  '/manifest.json',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // Get the session cookie
  const session = request.cookies.get('__session')

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // If it's not a public path and user is not logged in, redirect to auth
  if (!session) {
    const redirectUrl = new URL('/auth', request.url)
    redirectUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // For API routes that require auth
  if (pathname.startsWith('/api/') && !isPublicPath && !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json).*)',
  ],
} 