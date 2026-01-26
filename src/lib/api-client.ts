// src/lib/api-client.ts

// --- BU SƏTİR ÇOX VACİBDİR (SSL Xətasını keçmək üçün) ---
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Rate limiting için request queue
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // İstekler arası minimum 1000ms bekle (saniyede max 1 istek)

interface RequestOptions extends RequestInit {
  token?: string;
  data?: any;
}

export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, data, headers, ...customConfig } = options;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'; // Backend portunu yoxla

  // Timeout controller (30 saniye)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  // Header-ləri hazırlayırıq
  const config: RequestInit = {
    ...customConfig,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json', // Default olaraq JSON
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  // Əgər FormData göndəririksə (Şəkil yükləmə kimi), Content-Type-ı silirik
  // Çünki brauzer özü boundary əlavə etməlidir
  if (data instanceof FormData) {
    const newHeaders = { ...config.headers } as Record<string, string>;
    delete newHeaders['Content-Type'];
    config.headers = newHeaders;
    config.body = data;
  } else if (data) {
    config.body = JSON.stringify(data);
  }

  // URL-i düzəldirik (Bəzən / işarəsi qarışır)
  const url = `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  // Rate limiting - istekler arası minimum bekleme
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  lastRequestTime = Date.now();

  console.log(`📡 Requesting: ${url}${token ? ' (with token)' : ' (public)'}`); // Terminalda görmək üçün

  try {
    const response = await fetch(url, config);
    
    // Timeout'u temizle
    clearTimeout(timeoutId);

    // Əgər cavab uğursuzdursa (400, 401, 429, 500)
    if (!response.ok) {
      // 429 Rate Limit hatası - özel handling
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000; // 5 saniye default
        
        console.warn(`⏳ Rate limit reached (429). Waiting ${waitTime/1000}s before retry...`);
        const rateLimitError: any = new Error(`RATE_LIMIT:${waitTime}`);
        rateLimitError.status = 429;
        rateLimitError.isRateLimit = true;
        throw rateLimitError;
      }
      
      // Xətanı oxumağa çalışırıq (JSON və ya Text)
      const errorText = await response.text();
      let errorMessage = 'API request failed';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.title || errorJson.message || errorMessage;
        if(errorJson.errors) {
            errorMessage += ' ' + JSON.stringify(errorJson.errors);
        }
      } catch {
        errorMessage = errorText || errorMessage;
      }

      console.error(`❌ API Error (${response.status}):`, errorMessage);
      const apiError: any = new Error(errorMessage);
      apiError.status = response.status;
      apiError.isRateLimit = response.status === 429;
      throw apiError;
    }

    // 204 No Content (Boş uğurlu cavab)
    if (response.status === 204) {
      return {} as T;
    }

    // JSON cavabını qaytarırıq
    return await response.json();

  } catch (error: any) {
    // Timeout'u temizle
    clearTimeout(timeoutId);
    
    // Timeout hatası
    if (error.name === 'TimeoutError' || error.name === 'AbortError' || error.message?.includes('aborted')) {
      console.error("⏱️ Request timeout:", url);
      throw new Error(`Request timeout: ${endpoint}`);
    }
    
    // Network hatası
    if (error.message?.includes('fetch') || error.message?.includes('ECONNREFUSED')) {
      console.error("🌐 Network connection error:", error.message);
      throw new Error(`Network error: Unable to connect to API server`);
    }
    
    // Diğer hatalar
    console.error("🔥 Network/Server Error:", {
      url,
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw error;
  }
}