// Swagger API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

// API calls to Swagger backend
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/account/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
}

export async function changePassword(currentPassword: string, newPassword: string, accessToken: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/account/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Password change failed');
    }
}

export async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await fetch(`${API_BASE_URL}/api/account/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Token refresh failed');
    }

    return response.json();
}

export async function logoutUser(accessToken: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/account/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Logout failed');
    }
}

// Token management utilities
export function setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
}

export function getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
}

export function getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('refreshToken');
    }
    return null;
}

export function clearTokens(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}

export function getStoredUser(): User | null {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
    return null;
}

export function setStoredUser(user: User): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    }
}

export function clearStoredUser(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
    }
}
