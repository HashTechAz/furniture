// src/lib/categories.ts
import { apiRequest } from "./api-client";

export interface Category {
  id: number;
  name: string;
  description?: string;
  parentCategoryId?: number | null;
  parentCategoryName?: string | null;
  subCategories?: Category[];
}

export interface BackendCategory {
  id: number;
  name: string;
}

export interface CategoryPayload {
  name: string;
  description?: string;
  parentCategoryId?: number | null;
}

// 1. READ
export async function getCategories() {
  return apiRequest<Category[]>('/api/Categories');
}

// DÜZƏLİŞ BURADADIR: token parametrini əlavə etdik (optional)
export async function getCategoryById(id: number | string, token?: string) {
  return apiRequest<Category>(`/api/Categories/${id}`, { token });
}

// 2. CREATE
export async function createCategory(data: CategoryPayload, token: string) {
  return apiRequest('/api/Categories', {
    method: 'POST',
    data: data,
    token: token
  });
}

// 3. UPDATE
export async function updateCategory(id: number | string, data: CategoryPayload, token: string) {
  return apiRequest(`/api/Categories/${id}`, {
    method: 'PUT',
    data: data,
    token: token
  });
}

// 4. DELETE
export async function deleteCategory(id: number | string, token: string) {
  return apiRequest(`/api/Categories/${id}`, {
    method: 'DELETE',
    token: token
  });
}