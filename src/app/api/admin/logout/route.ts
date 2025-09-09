import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Logout successful' });

    // Clear the admin token cookie
    response.cookies.set('admin-token', '', {
        path: '/',
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    return response;
}
