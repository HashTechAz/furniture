// src/lib/tags.ts

import { apiRequest } from "./api-client";

export interface Tag {
  id: number;
  tagName: string;
  products?: unknown[];
}

export interface TagPayload {
  tagName: string;
}

export async function getTags(): Promise<Tag[]> {
  return apiRequest<Tag[]>("/api/Tags", { cache: "no-store" });
}

export async function getTagById(id: number | string, token?: string): Promise<Tag> {
  return apiRequest<Tag>(`/api/Tags/${id}`, { cache: "no-store", ...(token ? { token } : {}) });
}

export async function createTag(data: TagPayload, token: string) {
  return apiRequest("/api/Tags", {
    method: "POST",
    data,
    token,
  });
}

export async function updateTag(id: number | string, data: TagPayload, token: string) {
  return apiRequest(`/api/Tags/${id}`, {
    method: "PUT",
    data,
    token,
  });
}

export async function deleteTag(id: number | string, token: string) {
  return apiRequest(`/api/Tags/${id}`, {
    method: "DELETE",
    token,
  });
}
