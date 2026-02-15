// src/lib/rooms.ts
import { apiRequest } from '@/lib/api-client';

export interface Room {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  products?: unknown[];
}

export interface RoomInput {
  name: string;
  description: string;
  imageUrl?: string;
}

// --- 1. GET ALL (Siyahı) ---
export async function getRooms(token?: string): Promise<Room[]> {
  return apiRequest<Room[]>('/api/Rooms', token ? { token } : {});
}

// --- 2. GET BY ID (Tək Otaq) ---
export async function getRoomById(id: number | string, token?: string): Promise<Room> {
  return apiRequest<Room>(`/api/Rooms/${id}`, token ? { token } : {});
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