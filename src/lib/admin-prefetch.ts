/**
 * Admin sidebar hover prefetch – link üzərinə gələndə məlumat əvvəlcədən yüklənir.
 */
import { getRooms } from '@/lib/rooms';
import { getCategories } from '@/lib/categories';
import { getProducts } from '@/lib/products';
import { getDesigners } from '@/lib/designers';
import { getCollections } from '@/lib/collections';
import { getColors } from '@/lib/colors';
import { getMaterials } from '@/lib/materials';
import { getMessages } from '@/lib/contact';
import { getCached, setCached } from './admin-prefetch-cache';

export type AdminRouteKey = 'dashboard' | 'products' | 'categories' | 'collections' | 'designers' | 'colors' | 'materials' | 'rooms' | 'contact';

export async function prefetchAdminRoute(key: AdminRouteKey): Promise<void> {
  if (getCached(key)) return;
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') || '' : '';
  try {
    switch (key) {
      case 'rooms':
        const rooms = await getRooms(token);
        setCached('rooms', rooms);
        break;
      case 'categories':
        const cats = await getCategories();
        setCached('categories', cats);
        break;
      case 'products':
        const prods = await getProducts({ pageSize: 10 });
        setCached('products', prods);
        break;
      case 'designers':
        const designers = await getDesigners();
        setCached('designers', designers);
        break;
      case 'collections':
        const cols = await getCollections();
        setCached('collections', cols);
        break;
      case 'colors':
        const colors = await getColors();
        setCached('colors', colors);
        break;
      case 'materials':
        const mats = await getMaterials();
        setCached('materials', mats);
        break;
      case 'contact': {
        const msgs = await getMessages(1, 20, token);
        const list = Array.isArray(msgs) ? msgs : (msgs as { messages?: unknown[] })?.messages ?? [];
        setCached('contact', list);
        break;
      }
      case 'dashboard': {
        const [p, c, d, col, colors, mats, rooms, m] = await Promise.all([
          getProducts({ pageSize: 100 }).catch(() => []),
          getCategories().catch(() => []),
          getDesigners().catch(() => []),
          getCollections().catch(() => []),
          getColors().catch(() => []),
          getMaterials().catch(() => []),
          getRooms(token).catch(() => []),
          getMessages(1, 5, token).catch(() => ({ messages: [], totalCount: 0 })),
        ]);
        setCached('dashboard', {
          products: p,
          categories: c,
          designers: d,
          collections: col,
          colors,
          materials: mats,
          rooms,
          messages: m,
        });
        break;
      }
    }
  } catch {
    // Səssiz uğursuzluq
  }
}
