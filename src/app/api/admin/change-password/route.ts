import { NextRequest, NextResponse } from 'next/server';
import { changePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { currentPassword, newPassword } = await request.json();
        const accessToken = request.cookies.get('accessToken')?.value;

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Cari şifrə və yeni şifrə tələb olunur.' },
                { status: 400 }
            );
        }

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Sessiya bitib. Zəhmət olmasa yenidən giriş edin.' },
                { status: 401 }
            );
        }

        try {
            // DÜZƏLİŞ: Funksiyaya obyekti və tokeni düzgün göndəririk
            await changePassword({
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmNewPassword: newPassword // Backend adətən təsdiq də istəyir
            }, accessToken);
            
            return NextResponse.json({
                message: 'Şifrə uğurla dəyişdirildi',
            });
        } catch (apiError: unknown) {
            const errorMessage = apiError instanceof Error ? apiError.message : 'Şifrəni dəyişmək mümkün olmadı';
            return NextResponse.json(
                { error: errorMessage },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json(
            { error: 'Daxili server xətası' },
            { status: 500 }
        );
    }
}