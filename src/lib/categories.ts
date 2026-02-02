// src/lib/categories.ts
import { apiRequest } from "./api-client";

// Backend-dən gələn data strukturu (Sənin atdığın JSON-a əsasən)
export interface Category {
  id: number;
  name: string;
  description?: string;
  parentCategoryId?: number | null;
  parentCategoryName?: string | null;
  subCategories?: Category[]; // İç-içə (Recursive) kateqoriyalar üçün
}

// Yeni kateqoriya yaradanda və ya yeniləyəndə göndəriləcək data
export interface CategoryPayload {
  name: string;
  description?: string;
  parentCategoryId?: number | null; // Əgər alt kateqoriya yaradırsansa
}

// ------------------------------------------
// 1. READ (Oxumaq)
// ------------------------------------------

// Bütün kateqoriyaları gətir (Ağac strukturu ilə)
export async function getCategories() {
  return apiRequest<Category[]>('/api/Categories');
}

// Tək bir kateqoriyanı ID-yə görə gətir
export async function getCategoryById(id: number | string) {
  return apiRequest<Category>(`/api/Categories/${id}`);
}

// ------------------------------------------
// 2. CREATE (Yaratmaq) - Admin üçün
// ------------------------------------------

export async function createCategory(data: CategoryPayload, token: string) {
  return apiRequest('/api/Categories', {
    method: 'POST',
    data: data,
    token: token // Admin tokeni mütləqdir
  });
}

// ------------------------------------------
// 3. UPDATE (Yeniləmək) - Admin üçün
// ------------------------------------------

export async function updateCategory(id: number | string, data: CategoryPayload, token: string) {
  return apiRequest(`/api/Categories/${id}`, {
    method: 'PUT',
    data: data,
    token: token
  });
}

// ------------------------------------------
// 4. DELETE (Silmək) - Admin üçün
// ------------------------------------------

export async function deleteCategory(id: number | string, token: string) {
  return apiRequest(`/api/Categories/${id}`, {
    method: 'DELETE',
    token: token
  });
}