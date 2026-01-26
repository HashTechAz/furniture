// src/lib/api-client.ts

// --- BU SƏTİR ÇOX VACİBDİR (SSL Xətasını keçmək üçün) ---
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

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

  console.log(`📡 Requesting: ${url}${token ? ' (with token)' : ' (public)'}`); // Terminalda görmək üçün

  try {
    const response = await fetch(url, config);
    
    // Timeout'u temizle
    clearTimeout(timeoutId);

    // Əgər cavab uğursuzdursa (400, 401, 500)
    if (!response.ok) {
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
      throw new Error(errorMessage);
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