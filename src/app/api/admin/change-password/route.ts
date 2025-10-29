import { NextRequest, NextResponse } from 'next/server';
import { changePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { currentPassword, newPassword } = await request.json();
        const accessToken = request.cookies.get('accessToken')?.value;

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        if (!accessToken) {
            return NextResponse.json(
                { error: 'Access token not found. Please login again.' },
                { status: 401 }
            );
        }

        try {
            await changePassword(currentPassword, newPassword, accessToken);
            
            return NextResponse.json({
                message: 'Password changed successfully',
            });
        } catch (apiError: unknown) {
            const errorMessage = apiError instanceof Error ? apiError.message : 'Password change failed';
            return NextResponse.json(
                { error: errorMessage },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
