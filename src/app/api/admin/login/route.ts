import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        // 1. Frontend-dən gələn məlumatı oxuyuruq
        const body = await request.json();
        const { username, password } = body; // DÜZƏLİŞ: email yox, username

        if (!username || !password) {
            return NextResponse.json(
                { error: 'İstifadəçi adı və şifrə tələb olunur' },
                { status: 400 }
            );
        }

        try {
            // 2. Auth kitabxanası vasitəsilə Backend-ə sorğu atırıq
            const loginResponse = await loginUser(username, password);

            // 3. Uğurlu cavab hazırlayırıq
            const response = NextResponse.json({
                message: 'Giriş uğurludur',
                user: loginResponse.user,
                accessToken: loginResponse.accessToken, // Frontend üçün
                refreshToken: loginResponse.refreshToken
            });

            // 4. Tokenləri Cookie-yə də yazırıq (Təhlükəsizlik üçün)
            response.cookies.set('accessToken', loginResponse.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 gün
                path: '/',
            });

            if (loginResponse.refreshToken) {
                response.cookies.set('refreshToken', loginResponse.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 * 7, // 7 gün
                    path: '/',
                });
            }

            return response;

        } catch (apiError: any) {
            return NextResponse.json(
                { error: apiError.message || 'Giriş uğursuz oldu' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Login Route Error:', error);
        return NextResponse.json(
            { error: 'Daxili server xətası' },
            { status: 500 }
        );
    }
}