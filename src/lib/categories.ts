import { apiRequest } from "./api-client";

// Backend-dən gələn
export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategoryId?: number | null; // <--- Bu vacibdir
  parentCategoryName?: string | null;
  subCategories?: Category[];
  productCount?: number;
}

// Backend-ə göndərilən
export interface CategoryPayload {
  name: string;
  description?: string;
  parentCategoryId?: number | null; // <--- Bunu göndərəcəyik
}

// 1. READ
export async function getCategories() {
  return apiRequest<Category[]>('/api/Categories');
}

// 2. READ ONE
export async function getCategoryById(id: number | string, token?: string) {
  return apiRequest<Category>(`/api/Categories/${id}`, { token });
}

// 3. CREATE (JSON)
export async function createCategory(data: CategoryPayload, token: string) {
  return apiRequest('/api/Categories', {
    method: 'POST',
    data: data,
    token: token
  });
}

// 4. UPDATE (JSON)
export async function updateCategory(id: number | string, data: CategoryPayload, token: string) {
  return apiRequest(`/api/Categories/${id}`, {
    method: 'PUT',
    data: data,
    token: token
  });
}

// 5. DELETE
export async function deleteCategory(id: number | string, token: string) {
  return apiRequest(`/api/Categories/${id}`, {
    method: 'DELETE',
    token: token
  });
}