import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the request is for admin routes
    if (pathname.startsWith('/admin')) {
        // Get the token from cookies
        const token = request.cookies.get('admin-token')?.value;
       console.log(token);
       
        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Verify the token
        const decoded = verifyToken(token);
        if (!decoded) {
            // Redirect to login if token is invalid
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Allow access to admin routes
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
