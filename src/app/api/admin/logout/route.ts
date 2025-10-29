import { NextRequest, NextResponse } from 'next/server';
import { logoutUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const accessToken = request.cookies.get('accessToken')?.value;

        // Try to logout from the backend if we have a token
        if (accessToken) {
            try {
                await logoutUser(accessToken);
            } catch (apiError) {
                // Even if backend logout fails, we should still clear local tokens
                console.warn('Backend logout failed:', apiError);
            }
        }

        const response = NextResponse.json({ message: 'Logout successful' });

        // Clear all auth cookies
        response.cookies.set('accessToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
        });

        response.cookies.set('refreshToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
        });

        // Also clear the old admin-token cookie for backward compatibility
        response.cookies.set('admin-token', '', {
            path: '/',
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
