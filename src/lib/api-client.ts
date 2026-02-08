const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

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

    // --- 2. TOKEN BİTMƏSİ (401) - YENİ ƏLAVƏ ---
    if (response.status === 401) {
      console.error("🔒 Token keçərsizdir və ya müddəti bitib.");
      
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