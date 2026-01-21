// Swagger API base URL
// Swagger API base URL removed (handled in api-client)
import { apiRequest } from './api-client';

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

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    return apiRequest<LoginResponse>('/api/account/login', {
        method: 'POST',
        body: { email, password },
    });
}

export async function changePassword(currentPassword: string, newPassword: string, accessToken: string): Promise<void> {
    return apiRequest<void>('/api/account/change-password', {
        method: 'POST',
        body: { currentPassword, newPassword },
        token: accessToken,
    });
}

export async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return apiRequest<RefreshTokenResponse>('/api/account/refresh', {
        method: 'POST',
        headers: {},
        token: refreshToken, 
    });
}

export async function logoutUser(accessToken: string): Promise<void> {
    return apiRequest<void>('/api/account/logout', {
        method: 'POST',
        token: accessToken,
    });
}

const isBrowser = () => typeof window !== 'undefined';

function setCookie(name: string, value: string, days: number) {
    if (!isBrowser()) return;
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Strict";
}

function deleteCookie(name: string) {
    if (!isBrowser()) return;
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function setTokens(accessToken: string, refreshToken: string): void {
    if (!isBrowser()) return;
    
    try {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        setCookie('accessToken', accessToken, 1); 
        setCookie('refreshToken', refreshToken, 7); 
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
        
        // Clear cookies
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
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