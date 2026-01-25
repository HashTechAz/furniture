import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        try {
            const loginResponse = await loginUser(email, password);

            // Set HTTP-only cookies for security
            const response = NextResponse.json({
                message: 'Login successful',
                user: loginResponse.user,
            });

            // Set access token as HTTP-only cookie
            response.cookies.set('accessToken', loginResponse.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            // Set refresh token as HTTP-only cookie (if available)
            if (loginResponse.refreshToken) {
                response.cookies.set('refreshToken', loginResponse.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 * 7, // 7 days
                    path: '/',
                });
            }

            return response;
        } catch (apiError: unknown) {
            const errorMessage = apiError instanceof Error ? apiError.message : 'Login failed';
            return NextResponse.json(
                { error: errorMessage },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
