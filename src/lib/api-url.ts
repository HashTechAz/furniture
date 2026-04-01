import { getApiBaseUrl } from './api-base';

/**
 * Builds an absolute URL for BACKEND API routes using NEXT_PUBLIC_API_BASE_URL.
 * Keeps the endpoint path unchanged (e.g. "/api/Account/login").
 */
export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  if (!path) return base;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * Builds a URL for THIS Next.js app's API routes (same-origin).
 *
 * Use this for internal proxy routes like "/api/admin/*" that only exist
 * inside the Next.js app (so they must be called same-origin in local dev).
 */
export function appApiUrl(path: string): string {
  if (!path) return '/';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return path.startsWith('/') ? path : `/${path}`;
}

