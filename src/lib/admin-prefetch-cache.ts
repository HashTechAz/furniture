/**
 * Admin panel üçün hover prefetch cache.
 * Sidebar link üzərinə gələndə məlumat prefetch olunur, klikdə dərhal göstərilir.
 */

type CacheEntry<T> = { data: T; timestamp: number };
const CACHE_TTL_MS = 60_000; // 1 dəqiqə

const cache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCached<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}
