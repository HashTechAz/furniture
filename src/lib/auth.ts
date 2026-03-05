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
    
    const payload = tokenParts[1];
    const decoded = typeof window !== 'undefined' 
      ? atob(payload) 
      : Buffer.from(payload, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

/** JWT-nin bitmə vaxtını millisaniyə qaytarır (Date.now() ilə müqayisə). */
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

// --- 2. REFRESH TOKEN (client - localStorage ilə) ---
export async function refreshTokenCall(accessToken: string, refreshToken: string): Promise<LoginResponse> {
  return apiRequest('/api/Account/refresh', {
    method: 'POST',
    data: { accessToken, refreshToken },
  });
}

// --- 2b. REFRESH TOKEN (server - API route üçün, birbaşa backend-ə) ---
const getApiBase = () => process.env.NEXT_PUBLIC_API_URL || 'https://furniture.hashtech.az';
export async function refreshAccessToken(refreshToken: string, accessToken?: string): Promise<LoginResponse> {
  const body = accessToken
    ? { accessToken, refreshToken }
    : { refreshToken };
  const res = await fetch(`${getApiBase()}/api/Account/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Token yenilənmədi');
  }
  const data = await res.json();
  return {
    accessToken: data.accessToken ?? data.AccessToken ?? '',
    refreshToken: data.refreshToken ?? data.RefreshToken ?? refreshToken,
  };
}

// --- 3. CHANGE PASSWORD (YENİ) ---
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

// --- 4. LOGOUT  ---
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