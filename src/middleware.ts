import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the request is for admin routes
    if (pathname.startsWith('/admin')) {
        // Get the access token from cookies
        const accessToken = request.cookies.get('accessToken')?.value;
        const refreshToken = request.cookies.get('refreshToken')?.value;
       
        if (!accessToken) {
            // Redirect to login if no access token
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // If we have a refresh token but no access token, try to refresh
        if (!accessToken && refreshToken) {
            // This will be handled by the client-side refresh logic
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Allow access to admin routes (token validation will be done by the backend)
        return NextResponse.next();
    }

    // Allow access to all other routes
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
};
