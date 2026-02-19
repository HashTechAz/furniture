const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7042';
// Yerli backend self-signed sertifikat istifadə edəndə TLS xətası olmasın deyə
// yalnız development-da .env faylında NODE_TLS_REJECT_UNAUTHORIZED=0 təyin edin.
// Node bu halda xəbərdarlıq göstərəcək; production-da heç vaxt istifadə etmeyin.

interface ApiOptions extends RequestInit {
  data?: any;
  token?: string;
  headers?: Record<string, string>;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
  retryCount = 0 
): Promise<T> {
  const { data, token, headers, ...customConfig } = options;
  
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    // Cache dəstəyi (istədiyin kimi)
    cache: options.cache, 
    ...customConfig,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  // URL-i düzəldirik (slash problemini həll edir)
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);

    // --- 1. RATE LIMITING (429) ---
    if (response.status === 429) {
      if (retryCount < 3) {
        const retryAfter = response.headers.get('Retry-After');
        
        const waitTime = retryAfter 
          ? parseInt(retryAfter) * 1000 
          : 2000 * Math.pow(2, retryCount);

        console.warn(`⏳ Rate limit (429). Retrying in ${waitTime / 1000}s...`);
        
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        return apiRequest<T>(endpoint, options, retryCount + 1);
      } else {
        throw new Error("Server çox məşğuldur (Rate Limit). Zəhmət olmasa bir az sonra yoxlayın.");
      }
    }

    // --- 2. TOKEN BİTMƏSİ (401) ---
    // Sorğuda token göndərilməyibsə (məs. public səhifə) — "Session expired" deyil, "Unauthorized"
    if (response.status === 401 && !token) {
      const err: any = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }

    // Klientdə token var, refresh cəhdi
    if (response.status === 401 && typeof window !== 'undefined' && retryCount === 0 && token) {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && accessToken) {
        try {
          const refreshRes = await fetch(`${BASE_URL}/api/Account/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, refreshToken }),
          });
          if (refreshRes.ok) {
            const data = await refreshRes.json();
            const newAccess = data.accessToken ?? data.AccessToken ?? null;
            const newRefresh = data.refreshToken ?? data.RefreshToken ?? refreshToken;
            if (newAccess) {
              localStorage.setItem('accessToken', newAccess);
              if (newRefresh) localStorage.setItem('refreshToken', newRefresh);
              // Cookie ilə sinxron (middleware və səhifə naviqasiyası üçün)
              const maxAge = 60 * 60 * 24;
              document.cookie = `accessToken=${newAccess}; path=/; max-age=${maxAge}; SameSite=Strict`;
              document.cookie = `refreshToken=${newRefresh}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
              return apiRequest<T>(endpoint, { ...options, token: newAccess }, 1);
            }
          }
        } catch (e) {
          console.warn('Refresh token cəhdi uğursuz:', e);
        }
      }
      window.dispatchEvent(new Event('auth-error'));
      throw new Error('Session expired');
    }
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth-error'));
      }
      throw new Error('Session expired');
    }

    // --- 3. DİGƏR XƏTALAR ---
    if (!response.ok) {
        if (response.status === 204) {
            return {} as T;
        }

        let errorMessage = `API xəta (${response.status})`;
        let rawText = '';

        try {
            rawText = await response.text();
            if (rawText) {
                try {
                    const errorData = JSON.parse(rawText);
                    const msg = errorData.message ?? errorData.detail ?? errorData.details ?? errorData.title;
                    const errorsObj = errorData.errors;
                    
                    if (msg) errorMessage = msg;
                    
                    if (errorsObj && typeof errorsObj === 'object') {
                        const parts = Object.entries(errorsObj).map(([k, v]) =>
                            `${k}: ${Array.isArray(v) ? v.join(', ') : v}`
                        );
                        if (parts.length) errorMessage = parts.join('; ');
                    }
                } catch {
                    errorMessage = rawText.slice(0, 300);
                }
            }
        } catch {
             // Response text oxuna bilmədi
        }

        if (response.status >= 500) {
            errorMessage = `Backend xəta (${response.status}). ${errorMessage} (Server loglarına baxın.)`;
        }

        const error: any = new Error(errorMessage);
        error.status = response.status;
        throw error;
    }

    // --- 4. UĞURLU CAVAB (SUCCESS) ---
    if (response.status === 204) return {} as T;

    const text = await response.text();
    if (!text) return {} as T;

    try {
      return JSON.parse(text) as T;
    } catch {
      return { message: text } as any; 
    }

  } catch (error) {
    console.error("🔥 API Request Failed:", error);
    throw error;
  }
}