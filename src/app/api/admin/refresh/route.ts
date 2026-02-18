import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const accessToken = request.cookies.get('accessToken')?.value;
        const refreshToken = request.cookies.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { error: 'Refresh token not found' },
                { status: 401 }
            );
        }

        try {
            const refreshResponse = await refreshAccessToken(refreshToken, accessToken ?? undefined);
            
            // Body-də token qaytarırıq ki, client localStorage-ı yeniləyə bilsin (admin paneldə apiRequest token oradan oxuyur)
            const response = NextResponse.json({
                message: 'Token refreshed successfully',
                accessToken: refreshResponse.accessToken,
                refreshToken: refreshResponse.refreshToken,
            });

            // Set new access token
            response.cookies.set('accessToken', refreshResponse.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            // Set new refresh token
            response.cookies.set('refreshToken', refreshResponse.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return response;
        } catch (apiError: unknown) {
            // If refresh fails, clear tokens and redirect to login
            const errorMessage = apiError instanceof Error ? apiError.message : 'Token refresh failed';
            const response = NextResponse.json(
                { error: errorMessage },
                { status: 401 }
            );

            // Clear tokens
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

            return response;
        }
    } catch (error) {
        console.error('Refresh token error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
