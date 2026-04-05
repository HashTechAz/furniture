import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://furniture.elforduniversity.com';

export async function POST(request: NextRequest) {
    try {
        // 1. Authorization header-i oxuyuruq
        const authHeader = request.headers.get('authorization');

        let token = '';
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else {
            // Əgər header yoxdursa, bəlkə local HTTP cookie-dən gəlib
            token = request.cookies.get('accessToken')?.value || '';
        }

        if (!token) {
            return NextResponse.json(
                { error: 'Giriş icazəsi yoxdur (Token tapılmadı)' },
                { status: 401 }
            );
        }

        // 2. Browser-dən gələn cookieləri (və ya başqa lazımlı headerləri) backend-ə ötürürük
        const incomingCookies = request.headers.get('cookie');

        // Backend-ə birbaşa sorğu atırıq
        const response = await fetch(`${BASE_URL}/api/Account/refresh`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
                ...(incomingCookies && { 'Cookie': incomingCookies })
            },
            body: '' // Swagger-ə oxşar olaraq body boşdur
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('[Next.js Proxy] Refresh backend xətası:', response.status, errText);

            // Xətaya rəğmən mövcud cookieləri silmirik ki, user proaktiv olaraq təkrar cəhd edə bilsin
            return NextResponse.json(
                { error: 'Backend tokeni yeniləyə bilmədi' },
                { status: 401 }
            );
        }

        // 3. Backend-dən gələn yeni tokeni oxuyuruq
        const data = await response.json();
        const newAccessToken = data.accessToken || data.AccessToken;

        const newRefreshToken = data.refreshToken || data.RefreshToken;

        if (!newAccessToken) {
            return NextResponse.json(
                { error: 'Backend yeni token qaytarmadı' },
                { status: 500 }
            );
        }

        // 4. Yeni tokeni həm JSON cavabında, həm də HTTP-Only cookie-də qaytarırıq
        const res = NextResponse.json({
            message: 'Token uğurla yeniləndi',
            accessToken: newAccessToken
        });

        res.cookies.set('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 gün
            path: '/',
        });

        if (newRefreshToken) {
            res.cookies.set('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 gün
                path: '/',
            });
        }

        return res;

    } catch (error) {
        console.error('[Next.js Proxy] Catch Error:', error);
        return NextResponse.json(
            { error: 'Daxili server xətası' },
            { status: 500 }
        );
    }
}
