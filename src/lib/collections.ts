import { apiRequest } from '@/lib/api-client';

export interface CollectionProduct {
  id: number;
  name: string;
  price: number;
  coverImageUrl?: string;
  discountPrice?: number;
}

// 2. Kolleksiyanın əsas tipi
export interface BackendCollection {
  id: number;
  name: string;
  description: string;
  coverImageUrl: string;
  products?: CollectionProduct[];
}

// --- 1. GET ALL (Siyahı) ---
export async function getCollections(options?: { skipCache?: boolean }): Promise<BackendCollection[]> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["collections"] } };
  return apiRequest<BackendCollection[]>('/api/Collections', cacheConfig);
}

// --- 2. GET BY ID (Tək Kolleksiya) ---
export async function getCollectionById(id: number | string, token?: string, options?: { skipCache?: boolean }): Promise<BackendCollection> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["collections", `collection-${id}`] } };
  return apiRequest<BackendCollection>(`/api/Collections/${id}`, { token, ...cacheConfig });
}

// --- 3. CREATE (Yeni Kolleksiya) ---
export async function createCollection(name: string, description: string, file: File, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Description', description);
  formData.append('file', file);

  return apiRequest('/api/Collections', {
    method: 'POST',
    data: formData,
    token: token
  });
}

// --- 4. UPDATE (Yenilə) ---
export async function updateCollection(id: number | string, name: string, description: string, file: File | null, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Description', description);

  if (file) {
    formData.append('file', file);
  }

  return apiRequest(`/api/Collections/${id}`, {
    method: 'PUT',
    data: formData,
    token: token
  });
}

// --- 5. DELETE (Sil) ---
export async function deleteCollection(id: number | string, token: string) {
  return apiRequest(`/api/Collections/${id}`, {
    method: 'DELETE',
    token: token
  });
}