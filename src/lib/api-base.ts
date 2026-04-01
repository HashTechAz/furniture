const DEFAULT_API_BASE_URL = 'https://furniture.elforduniversity.com';

/**
 * Single source of truth for backend API base URL.
 *
 * - Client + server safe
 * - Prefers NEXT_PUBLIC_API_BASE_URL (new)
 * - Keeps backward compatibility with NEXT_PUBLIC_API_URL (existing)
 */
export function getApiBaseUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL;
  return (fromEnv || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
}

