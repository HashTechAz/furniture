// src/lib/rooms.ts
import { apiRequest } from '@/lib/api-client';

export interface Room {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  products?: unknown[];
}

/** Backend PascalCase ilə gələ bilər (ImageUrl); cavabı Room tipinə normalizə edirik */
type RoomApiResponse = Room & { ImageUrl?: string };

function normalizeRoom(r: RoomApiResponse): Room {
  const imageUrl = r.imageUrl ?? r.ImageUrl;
  return { ...r, imageUrl };
}

export interface RoomInput {
  name: string;
  description: string;
  imageUrl?: string;
}

// --- 1. GET ALL (Siyahı) ---
export async function getRooms(token?: string, options?: { skipCache?: boolean }): Promise<Room[]> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["rooms"] } };
  const data = await apiRequest<RoomApiResponse[]>('/api/Rooms', {
    ...cacheConfig,
    ...(token ? { token } : {})
  });
  return Array.isArray(data) ? data.map(normalizeRoom) : [];
}

// --- 2. GET BY ID (Tək Otaq) ---
export async function getRoomById(id: number | string, token?: string, options?: { skipCache?: boolean }): Promise<Room> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["rooms", `room-${id}`] } };
  const data = await apiRequest<RoomApiResponse>(`/api/Rooms/${id}`, {
    ...cacheConfig,
    ...(token ? { token } : {})
  });
  return normalizeRoom(data);
}

// --- 3. CREATE (Yeni Otaq) ---
export async function createRoom(data: RoomInput, token: string) {
  return apiRequest<Room>('/api/Rooms', {
    method: 'POST',
    data,
    token,
  });
}

// --- 4. UPDATE (Redaktə et) ---
export async function updateRoom(id: number | string, data: RoomInput, token: string) {
  return apiRequest<Room | void>(`/api/Rooms/${id}`, {
    method: 'PUT',
    data,
    token,
  });
}

// --- 5. DELETE (Sil) ---
export async function deleteRoom(id: number | string, token: string) {
  return apiRequest<void>(`/api/Rooms/${id}`, {
    method: 'DELETE',
    token,
  });
}


const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

/** Şəkil faylının icazəli formatda olub-olmadığını yoxlayır (.jpg, .jpeg, .png) */
export function isAllowedRoomImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
}

// --- 6. POST /api/Rooms/{roomId}/image — Otaq üçün şəkil yüklə ---
export async function uploadRoomImage(roomId: number | string, file: File, token: string): Promise<void> {
  if (!isAllowedRoomImageFile(file)) {
    throw new Error('Yalnız .jpg, .jpeg, .png formatlı fayllara icazə verilir.');
  }
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest(`/api/Rooms/${roomId}/image`, {
    method: 'POST',
    data: formData,
    token: token
  });
}

// --- 7. DELETE /api/Rooms/{roomId}/image — Otağın şəklini sil ---
export async function deleteRoomImage(roomId: number | string, token: string): Promise<void> {
  return apiRequest(`/api/Rooms/${roomId}/image`, {
    method: 'DELETE',
    token: token
  });
}