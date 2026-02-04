// src/lib/colors.ts
import { apiRequest } from '@/lib/api-client';

// Swagger cavabına uyğun Interface
export interface BackendColor {
  id: number;
  name: string;
  hexCode: string;
  products?: any[]; // Backend-dən gələn siyahı (əgər varsa)
}

// Yaratmaq və Yeniləmək üçün Payload
export interface ColorPayload {
  name: string;
  hexCode: string;
}

// --- 1. GET ALL (Siyahı) ---
export async function getColors(): Promise<BackendColor[]> {
  return apiRequest<BackendColor[]>('/api/Colors');
}

// --- 2. GET BY ID (Tək rəng - Redaktə üçün) ---
// QEYD: Swagger-də 401 aldığın üçün bura optional token əlavə etdim
export async function getColorById(id: number | string, token?: string): Promise<BackendColor> {
  return apiRequest<BackendColor>(`/api/Colors/${id}`, { token });
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