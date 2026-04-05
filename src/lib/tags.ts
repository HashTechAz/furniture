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

export async function getTags(options?: { skipCache?: boolean }): Promise<Tag[]> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["tags"] } };
  return apiRequest<Tag[]>("/api/Tags", cacheConfig);
}

export async function getTagById(id: number | string, token?: string, options?: { skipCache?: boolean }): Promise<Tag> {
  const cacheConfig = options?.skipCache ? { cache: "no-store" as RequestCache } : { next: { tags: ["tags", `tag-${id}`] } };
  return apiRequest<Tag>(`/api/Tags/${id}`, { ...cacheConfig, ...(token ? { token } : {}) });
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
