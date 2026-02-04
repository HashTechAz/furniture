// src/lib/collections.ts

export interface BackendCollection {
  id: number;
  name: string;
}

// Hələlik boş array qaytarırıq
export async function getCollections(): Promise<BackendCollection[]> {
  return []; 
  // Gələcəkdə bura belə olacaq: return apiRequest('/api/Collections');
}