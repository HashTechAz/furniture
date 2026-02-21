import { apiRequest } from "./api-client";

// Backend-dən gələn
export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string | null;
  parentCategoryId?: number | null; // <--- Bu vacibdir
  parentCategoryName?: string | null;
  subCategories?: Category[];
  productCount?: number;
}

type CategoryApiResponse = Category & { ImageUrl?: string; image?: string };

function normalizeCategory(c: CategoryApiResponse): Category {
  const raw = c.imageUrl ?? c.ImageUrl ?? (c as CategoryApiResponse).image ?? null;
  const imageUrl = getCategoryImageFullUrl(raw) ?? raw ?? null;
  const subCategories = Array.isArray(c.subCategories)
    ? c.subCategories.map((sub) => normalizeCategory(sub as CategoryApiResponse))
    : c.subCategories;
  return { ...c, imageUrl, subCategories };
}

// Backend-ə göndərilən
export interface CategoryPayload {
  name: string;
  description?: string;
  parentCategoryId?: number | null; // <--- Bunu göndərəcəyik
}

// 1. READ
export async function getCategories(): Promise<Category[]> {
  const data = await apiRequest<CategoryApiResponse[]>('/api/Categories');
  return Array.isArray(data) ? data.map(normalizeCategory) : [];
}

// 2. READ ONE
export async function getCategoryById(id: number | string, token?: string): Promise<Category> {
  const data = await apiRequest<CategoryApiResponse>(`/api/Categories/${id}`, { token });
  return normalizeCategory(data);
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

export const CATEGORY_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
const BASE_URL = CATEGORY_API_BASE_URL;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

/** Relative path-i API əsas URL ilə birləşdirir; artıq tam URL-dirsə olduğu kimi qaytarır */
export function getCategoryImageFullUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.trim()) return null;
  const trimmed = imageUrl.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  return trimmed.startsWith('/') ? `${base}${trimmed}` : `${base}/${trimmed}`;
}

export function isAllowedCategoryImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
}

// 6. POST /api/Categories/{categoryId}/image — Şəkil yüklə
export async function uploadCategoryImage(categoryId: number | string, file: File, token: string): Promise<void> {
  if (!isAllowedCategoryImageFile(file)) {
    throw new Error('Yalnız .jpg, .jpeg, .png formatlı fayllara icazə verilir.');
  }
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/Categories/${categoryId}/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Şəkil yüklənə bilmədi: ${response.status} - ${errorText || response.statusText}`);
  }
}

// 7. DELETE /api/Categories/{categoryId}/image — Şəkli sil
export async function deleteCategoryImage(categoryId: number | string, token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/Categories/${categoryId}/image`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Şəkil silinə bilmədi: ${response.status} - ${errorText || response.statusText}`);
  }
}