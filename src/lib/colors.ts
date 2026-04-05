// src/lib/colors.ts
import { apiRequest } from '@/lib/api-client';

// Məhsulun daxilindəki "colorVariants" array-i üçün (JSON-a əsasən)
export interface ProductColorVariant {
  productId: number;
  colorName: string;
  colorHexCode: string;
}

// Swagger cavabına uyğun Interface (Bəzi yerlərdə hexCode gəlmədiyi üçün optional etdim)
export interface BackendColor {
  id: number;
  name: string;
  hexCode?: string; 
  products?: any[];
}

// Yaratmaq və Yeniləmək üçün Payload
export interface ColorPayload {
  name: string;
  hexCode: string;
}

// --- 1. GET ALL (Siyahı) ---
export async function getColors(options?: { skipCache?: boolean }): Promise<BackendColor[]> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["colors"] } };
  return apiRequest<BackendColor[]>('/api/Colors', cacheConfig);
}

// --- 2. GET BY ID (Tək rəng - Redaktə üçün) ---
export async function getColorById(id: number | string, token?: string, options?: { skipCache?: boolean }): Promise<BackendColor> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["colors", `color-${id}`] } };
  return apiRequest<BackendColor>(`/api/Colors/${id}`, { token, ...cacheConfig });
}

// --- 3. CREATE (Yeni rəng yarat) ---
export async function createColor(data: ColorPayload, token: string) {
  return apiRequest('/api/Colors', {
    method: 'POST',
    data: data,
    token: token
  });
}

// --- 4. UPDATE (Rəngi yenilə) ---
export async function updateColor(id: number | string, data: ColorPayload, token: string) {
  return apiRequest(`/api/Colors/${id}`, {
    method: 'PUT',
    data: data,
    token: token
  });
}

// --- 5. DELETE (Rəngi sil) ---
export async function deleteColor(id: number | string, token: string) {
  return apiRequest(`/api/Colors/${id}`, {
    method: 'DELETE',
    token: token
  });
}