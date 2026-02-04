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
export async function getDesigners(): Promise<BackendDesigner[]> {
  return apiRequest<BackendDesigner[]>('/api/Designers');
}

// --- 2. GET BY ID (Tək Dizayner) ---
export async function getDesignerById(id: number | string, token?: string): Promise<BackendDesigner> {
  return apiRequest<BackendDesigner>(`/api/Designers/${id}`, { token });
}

// --- 3. CREATE (Yeni Dizayner + Şəkil) ---
export async function createDesigner(name: string, biography: string, file: File, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Biography', biography);
  formData.append('file', file); 

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
  
  const response = await fetch(`${baseUrl}/api/Designers`, {
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

// --- 4. UPDATE (Redaktə et) ---
export async function updateDesigner(id: number | string, name: string, biography: string, file: File | null, token: string) {
  const formData = new FormData();
  formData.append('Name', name);
  formData.append('Biography', biography);
  
  if (file) {
    formData.append('file', file);
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';

  const response = await fetch(`${baseUrl}/api/Designers/${id}`, {
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
export async function deleteDesigner(id: number | string, token: string) {
  return apiRequest(`/api/Designers/${id}`, {
    method: 'DELETE',
    token: token
  });
}