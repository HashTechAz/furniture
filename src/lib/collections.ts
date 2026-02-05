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
export async function getCollections(): Promise<BackendCollection[]> {
  return apiRequest<BackendCollection[]>('/api/Collections');
}

// --- 2. GET BY ID (Tək Kolleksiya) ---
export async function getCollectionById(id: number | string, token?: string): Promise<BackendCollection> {
  return apiRequest<BackendCollection>(`/api/Collections/${id}`, { token });
}

// --- 3. CREATE (Yeni Kolleksiya) ---
export async function createCollection(name: string, description: string, file: File, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Description', description);
  formData.append('file', file); 

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
  
  const response = await fetch(`${baseUrl}/api/Collections`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Xəta: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// --- 4. UPDATE (Yenilə) ---
export async function updateCollection(id: number | string, name: string, description: string, file: File | null, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Description', description);
  
  if (file) {
    formData.append('file', file);
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';

  const response = await fetch(`${baseUrl}/api/Collections/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
     if (response.status === 204) return true;
     const errorText = await response.text();
     throw new Error(`Xəta: ${response.status} - ${errorText}`);
  }
  
  return true;
}

// --- 5. DELETE (Sil) ---
export async function deleteCollection(id: number | string, token: string) {
  return apiRequest(`/api/Collections/${id}`, {
    method: 'DELETE',
    token: token
  });
}