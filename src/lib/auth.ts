// src/lib/auth.ts
import { apiRequest } from './api-client';

// --- TİPLƏR (INTERFACES) ---

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: User;
  expiration?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Tokeni oxumaq üçün köməkçi funksiya (Sənin kodun)
function decodeJWT(token: string): any {
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return null;
    
    let payload = tokenParts[1];
    
    // Base64Url -> Base64
    payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    
    // Padding əlavə etmək (atob xəta verməsin deyə)
    const padding = payload.length % 4;
    if (padding > 0) {
      payload += '='.repeat(4 - padding);
    }

    const decoded = typeof window !== 'undefined' 
      ? decodeURIComponent(escape(atob(payload))) // UTF-8 dəstəyi üçün
      : Buffer.from(payload, 'base64').toString('utf-8');
      
    return JSON.parse(decoded);
  } catch (e) {
    console.error('[auth] decodeJWT xətası:', e);
    return null;
  }
}

/** JWT-nin bitmə vaxtını millisaniyə qaytarır (Date.now() ilə müqayisə üçün) */
export function getTokenExpiryMs(accessToken: string): number | null {
  const payload = decodeJWT(accessToken);
  if (!payload || typeof payload.exp !== 'number') return null;
  return payload.exp * 1000;
}

// ================= API METODLARI =================

// --- 1. LOGIN USER ---
export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  console.log("📡 Login sorğusu göndərilir: /api/Account/login");

  const response: any = await apiRequest('/api/Account/login', {
    method: 'POST',
    data: {
      username: username, 
      password: password  
    }
  });

  const accessToken = response.accessToken ?? response.AccessToken ?? (typeof response === 'string' ? response : null);

  if (!accessToken) {
     console.error("❌ Token tapılmadı. Cavab:", response);
     throw new Error("Login uğursuz oldu. Token gəlmədi.");
  }

  // User məlumatlarını tokendən oxuma
  let user: User = { id: '0', email: username };
  
  try {
    const payload = decodeJWT(accessToken);
    if (payload) {
      const emailFromToken = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] 
                           || payload.email 
                           || payload.sub 
                           || username;
      user = {
        id: payload.jti || payload.sub || '0',
        email: emailFromToken,
        roles: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || []
      };
    }
  } catch (e) {
    console.warn("⚠️ Token decode edilə bilmədi:", e);
  }

  return {
    accessToken: accessToken,
    refreshToken: response.refreshToken ?? response.RefreshToken ?? '', 
    user: user,
    expiration: response.expiration
  };
}

// --- 2. CHANGE PASSWORD ---
export async function changePassword(payload: ChangePasswordPayload, token: string) {
  return apiRequest('/api/Account/change-password', {
    method: 'POST',
    data: {
      CurrentPassword: payload.currentPassword,
      NewPassword: payload.newPassword,
      ConfirmPassword: payload.confirmNewPassword,
    },
    token: token
  });
}

// --- 3. LOGOUT ---
export async function logoutUser(accessToken: string) {
  try {
    await apiRequest<void>('/api/Account/logout', { 
       method: 'POST',
       token: accessToken,
    });
  } catch (e) {
    console.log("Logout API xətası (kritik deyil):", e);
  }

  // 2. Brauzerdən təmizləyirik
  logout();
}

// ================= KÖMƏKÇİ FUNKSİYALAR (HELPERS) =================

export function logout() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Bütün cookieləri sıfırlayırıq
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    window.location.href = '/login';
}

export function setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
    if(refreshToken) localStorage.setItem('refreshToken', refreshToken);
}

export function getAccessToken() {
  if (typeof window !== 'undefined') return localStorage.getItem('accessToken');
  return null;
}

export function getRefreshToken() {
  if (typeof window !== 'undefined') return localStorage.getItem('refreshToken');
  return null;
}