const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://furniture.elforduniversity.com';

interface ApiOptions extends RequestInit {
  data?: any;
  token?: string;
  headers?: Record<string, string>;
}

// ------------------------------------------------------------------
// REFRESH MUTEX (Bir neçə sorğu eyni anda 401 alsa 1 dəfə yenilənəcək)
// ------------------------------------------------------------------
let refreshPromise: Promise<string | null> | null = null;

async function doRefresh(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  // Əgər artıq arxa planda refresh call gedirsə, onu gözlə
  if (refreshPromise) {
    console.log('[api-client] Refresh artiq gedir, mutex gözləyir...');
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      console.log('[api-client] /api/admin/refresh proksi çağırılır...');
      const currentToken = localStorage.getItem('accessToken');

      const res = await fetch('/api/admin/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(currentToken ? { 'Authorization': `Bearer ${currentToken}` } : {})
        },
        credentials: 'include'
      });

      if (!res.ok) {
        console.warn('[api-client] Proxy refresh uğursuz, status:', res.status);
        return null;
      }

      const data = await res.json();
      if (data.accessToken) {
        // Tokeni localStorage və cookie-yə yaz (Frontend və Middleware üçün)
        localStorage.setItem('accessToken', data.accessToken);
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
        console.log('[api-client] ✅ Token uğurla yeniləndi');
        return data.accessToken;
      }
      return null;
    } catch (err) {
      console.error('[api-client] Refresh Xətası:', err);
      return null;
    } finally {
      // Kilidi açırıq ki, gələcəkdə yenidən lazım olsa işləsin
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// ------------------------------------------------------------------
// ƏSAS API REQUEST FUNKSİYASI
// ------------------------------------------------------------------
export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
  retryCount = 0
): Promise<T> {
  // Avtomatik token tapırıq (əgər ötürülməyibsə)
  let currentToken = options.token;
  if (!currentToken && typeof window !== 'undefined') {
    currentToken = localStorage.getItem('accessToken') || undefined;
  }

  const { data, token, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
      ...(headers || {}),
    },
    cache: options.cache,
    ...customConfig,
  };

  if (data) {
    if (data instanceof FormData) {
      config.body = data;
      delete (config.headers as Record<string, string>)['Content-Type'];
    } else {
      config.body = JSON.stringify(data);
    }
  }

  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);

    // 1. Rate Limit gələrsə (429)
    if (response.status === 429 && retryCount < 3) {
      const waitTime = 2000 * Math.pow(2, retryCount);
      console.warn(`[api-client] Rate limit (429), ${waitTime}ms gözlənilir...`);
      await new Promise((r) => setTimeout(r, waitTime));
      return apiRequest<T>(endpoint, options, retryCount + 1);
    }

    // 2. Token Expired gələrsə (401)
    if (response.status === 401 && currentToken) {
      if (retryCount >= 1) {
        // Artıq refresh edilib və yenə 401 gəlirsə -> Logout
        console.error('[api-client] Refresh sonrası yenə 401. Sessiya bitdi.');

        // Error atırıq, lakin UI-da Catch edib çıxmaq da olar
        const err: any = new Error('Sessiya tamamilə bitdi. Yenidən daxil olun.');
        err.status = 401;
        throw err;
      }

      console.warn(`[api-client] 401 Unauthorized (${endpoint}). Refresh cəhd edilir...`);
      const newAccessToken = await doRefresh();

      if (newAccessToken) {
        // Uğurlu refresh: orijinal sorğunu yeni tokenlə TƏKRARLA
        console.log(`[api-client] Orijinal sorğu yeni tokenlə təkrarlanır: ${endpoint}`);
        return apiRequest<T>(endpoint, { ...options, token: newAccessToken }, retryCount + 1);
      } else {
        // Refresh uğursuz: İstifadəçi loginə qayıtmalıdır
        const err: any = new Error('Sessiya yenilənmədi. Zəhmət olmasa yenidən daxil olun.');
        err.status = 401;
        throw err;
      }
    }

    // 401 amma token heç vaxt olmayıbsa (məsələn public api)
    if (response.status === 401) {
      const err: any = new Error('İcazəniz yoxdur.');
      err.status = 401;
      throw err;
    }

    // 3. Digər xətalar
    if (!response.ok) {
      if (response.status === 204) return {} as T;
      let errorMessage = `API xəta (${response.status})`;
      try {
        const rawText = await response.text();
        if (rawText) {
          try {
            const errorData = JSON.parse(rawText);
            errorMessage = errorData.message ?? errorData.detail ?? errorData.title ?? rawText.slice(0, 200);
          } catch {
            errorMessage = rawText.slice(0, 200);
          }
        }
      } catch { }
      const error: any = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    // 4. Uğurlu cavab
    if (response.status === 204) return {} as T;
    const text = await response.text();
    if (!text) return {} as T;
    try {
      return JSON.parse(text) as T;
    } catch {
      return { message: text } as any;
    }

  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('Sessiya')) {
      console.error(`[api-client] Request Failed (${endpoint}):`, error);
    }
    throw error;
  }
}
