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

// Helper function to safely check if we're in browser
const isBrowser = () => typeof window !== 'undefined';

// Token management utilities
export function setTokens(accessToken: string, refreshToken: string): void {
    if (!isBrowser()) return;
    
    try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
        console.error('Error setting tokens:', error);
    }
}

export function getAccessToken(): string | null {
    if (!isBrowser()) return null;
    
    try {
        return localStorage.getItem('accessToken');
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

export function getRefreshToken(): string | null {
    if (!isBrowser()) return null;
    
    try {
        return localStorage.getItem('refreshToken');
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return null;
    }
}

export function clearTokens(): void {
    if (!isBrowser()) return;
    
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    } catch (error) {
        console.error('Error clearing tokens:', error);
    }
}

export function getStoredUser(): User | null {
    if (!isBrowser()) return null;
    
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error getting stored user:', error);
        return null;
    }
}

export function setStoredUser(user: User): void {
    if (!isBrowser()) return;
    
    try {
        localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        console.error('Error setting stored user:', error);
    }
}

export function clearStoredUser(): void {
    if (!isBrowser()) return;
    
    try {   
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Error clearing stored user:', error);
    }
}