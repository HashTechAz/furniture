// src/lib/designers.ts
import { apiRequest } from '@/lib/api-client';

export interface BackendDesigner {
  id: number;
  name: string;
  biography: string;
  imageUrl: string;
  products?: any[];
}

// --- 1. GET ALL (Siyahı) ---
export async function getDesigners(options?: { skipCache?: boolean }): Promise<BackendDesigner[]> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["designers"] } };
  return apiRequest<BackendDesigner[]>('/api/Designers', cacheConfig);
}

// --- 2. GET BY ID (Tək Dizayner) ---
export async function getDesignerById(id: number | string, token?: string, options?: { skipCache?: boolean }): Promise<BackendDesigner> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["designers", `designer-${id}`] } };
  return apiRequest<BackendDesigner>(`/api/Designers/${id}`, { token, ...cacheConfig });
}

// --- 3. CREATE (Yeni Dizayner + Şəkil) ---
export async function createDesigner(name: string, biography: string, file: File, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Biography', biography);
  formData.append('file', file);

  return apiRequest('/api/Designers', {
    method: 'POST',
    data: formData,
    token: token
  });
}

// --- 4. UPDATE (Redaktə et) ---
export async function updateDesigner(id: number | string, name: string, biography: string, file: File | null, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Biography', biography);

  if (file) {
    formData.append('file', file);
  }

  return apiRequest(`/api/Designers/${id}`, {
    method: 'PUT',
    data: formData,
    token: token
  });
}

// --- 5. DELETE (Sil) ---
export async function deleteDesigner(id: number | string, token: string) {
  return apiRequest(`/api/Designers/${id}`, {
    method: 'DELETE',
    token: token
  });
}