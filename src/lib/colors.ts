// src/lib/colors.ts

import { apiRequest } from '@/lib/api-client';

// Swagger-dən gələn cavab modelinə uyğun interface
export interface BackendColor {
  id: number;
  name: string;
  hexCode: string;
}

// Bütün rəngləri gətirən funksiya
export async function getColors(): Promise<BackendColor[]> {
  return apiRequest<BackendColor[]>('/api/Colors');
}
