// src/lib/auth.ts
import { apiRequest } from './api-client';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: User;
  expiration?: string;
}

// Tokeni oxumaq üçün köməkçi funksiya
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

  const accessToken = response.accessToken || (typeof response === 'string' ? response : null);

  if (!accessToken) {
     console.error("❌ Token tapılmadı. Cavab:", response);
     throw new Error("Login uğursuz oldu. Token gəlmədi.");
  }

  // User məlumatlarını tokendən oxuyuruq
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
      };
    }
  } catch (e) {
    console.warn("⚠️ Token decode edilə bilmədi:", e);
  }

  return {
    accessToken: accessToken,
    refreshToken: '', 
    user: user,
    expiration: response.expiration
  };
}

// --- 2. LOGOUT USER (Backend üçün) ---
// Server-side (route.ts) bunu axtarır
export async function logoutUser(accessToken: string): Promise<void> {
  try {
    await apiRequest<void>('/api/Account/logout', { 
       method: 'POST',
       token: accessToken,
    });
  } catch (e) {
    console.log("Logout API xətası (əhəmiyyətsizdir):", e);
  }
}

// --- 3. LOGOUT (Frontend üçün) ---
// Brauzer (Login səhifəsi) bunu axtarır
export function logout() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    window.location.href = '/login';
}

// --- Digər funksiyalar ---
export function setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
    if(refreshToken) localStorage.setItem('refreshToken', refreshToken);
}
