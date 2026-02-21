// src/lib/materials.ts

import { apiRequest } from "./api-client";

export interface Material {
  id: number;
  name: string;
  description?: string;
  products?: any[];
}

export interface MaterialPayload {
  name: string;
  description?: string;
}

// 1. Bütün materialları gətir
export async function getMaterials(): Promise<Material[]> {
  return apiRequest<Material[]>("/api/Materials", { next: { revalidate: 3600 } });
}

// 2. Tək materialı gətir (ID ilə)
export async function getMaterialById(id: number | string, token?: string): Promise<Material> {
  return apiRequest<Material>(`/api/Materials/${id}`, { cache: "no-store", ...(token ? { token } : {}) });
}

// 3. Yeni material yarat
export async function createMaterial(data: MaterialPayload, token: string) {
  return apiRequest("/api/Materials", {
    method: "POST",
    data,
    token,
  });
}

// 4. Materialı yenilə
export async function updateMaterial(id: number | string, data: MaterialPayload, token: string) {
  return apiRequest(`/api/Materials/${id}`, {
    method: "PUT",
    data,
    token,
  });
}

// 5. Materialı sil
export async function deleteMaterial(id: number | string, token: string) {
  return apiRequest(`/api/Materials/${id}`, {
    method: "DELETE",
    token,
  });
}