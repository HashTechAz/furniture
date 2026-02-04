// src/lib/contact.ts
import { apiRequest } from '@/lib/api-client';

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt?: string; 
}

export interface ContactResponse {
  items: ContactMessage[]; 
  totalCount?: number;
}

// 1. GET ALL (Mesajları Gətir - Pagination ilə)
export async function getMessages(pageNumber: number = 1, pageSize: number = 10, token: string): Promise<ContactMessage[]> {

  const query = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return apiRequest<ContactMessage[]>(`/api/Contact${query}`, { token });
}


export async function getMessageById(id: number | string, token: string): Promise<ContactMessage> {
  return apiRequest<ContactMessage>(`/api/Contact/${id}`, { token });
}

// 3. DELETE (Mesajı Sil)
export async function deleteMessage(id: number | string, token: string) {
  return apiRequest(`/api/Contact/${id}`, {
    method: 'DELETE',
    token: token
  });
}