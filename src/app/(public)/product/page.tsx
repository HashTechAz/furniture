import React from 'react';
import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { getColors } from '@/lib/colors';
import { getMaterials } from '@/lib/materials';
import { getCollections } from '@/lib/collections';
import { getRooms } from '@/lib/rooms';
import { getCategories } from '@/lib/categories';
import ClientProductPage from './components/ProductClient/ProductClient';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: ProductPageProps): Promise<Metadata> {
  const params = await searchParams;
  
  const getParamStr = (key: string) => {
    const val = params[key];
    return Array.isArray(val) ? val[0] : val;
  };

  const categoryIdStr = getParamStr('CategoryId');
  const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) || undefined : undefined;

  let title = 'Məhsullar | Elford Furniture';

  if (categoryId) {
    try {
      const categoriesData = await getCategories();
      const categories = Array.isArray(categoriesData) ? categoriesData : [];
      const category = categories.find((c: typeof categoriesData[0]) => c.id === categoryId);
      if (category && category.name) {
        title = `${category.name} - Məhsullar | Elford Furniture`;
      }
    } catch (e) {
      // API fail olarsa normal title qalsın
    }
  }

  return {
    title,
    description: 'Elford Furniture mükəmməl keyfiyyətli mebellər kataloqu. İşıqlı məkanlar üçün premium dizaynlı İsveçrə dizaynlı mebellər.',
    openGraph: {
      title,
      description: 'Elford Furniture mükəmməl keyfiyyətli mebellər kataloqu.',
    }
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  // Paralel şəkildə statik məlumatların yüklənməsi
  const [colorsData, materialsData, collectionsData, roomsData, categoriesData] = await Promise.all([
    getColors(),
    getMaterials(),
    getCollections(),
    getRooms(),
    getCategories()
  ]);

  const colors = Array.isArray(colorsData) ? colorsData : [];
  const materials = Array.isArray(materialsData) ? materialsData : [];
  const collections = Array.isArray(collectionsData) ? collectionsData : [];
  const rooms = Array.isArray(roomsData) ? roomsData : [];
  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  const params = await searchParams;
  
  const getParamStr = (key: string) => {
    const val = params[key];
    return Array.isArray(val) ? val[0] : val;
  };

  const categoryIdStr = getParamStr('CategoryId');
  const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) || undefined : undefined;

  const roomIdStr = getParamStr('roomsId');
  const roomId = roomIdStr ? parseInt(roomIdStr, 10) || undefined : undefined;

  const collectionIdStr = getParamStr('collectionId');
  const collectionId = collectionIdStr ? parseInt(collectionIdStr, 10) || undefined : undefined;

  const materialIdStr = getParamStr('materialId');
  const materialId = materialIdStr ? parseInt(materialIdStr, 10) || undefined : undefined;

  const colorIdStr = getParamStr('colorId');
  const colorId = colorIdStr ? parseInt(colorIdStr, 10) || undefined : undefined;

  const minDepthStr = getParamStr('minDepth');
  const minDepth = minDepthStr ? parseInt(minDepthStr, 10) || undefined : undefined;

  const maxDepthStr = getParamStr('maxDepth');
  const maxDepth = maxDepthStr ? parseInt(maxDepthStr, 10) || undefined : undefined;

  const searchTerm = getParamStr('search')?.trim() || undefined;
  const sortBy = getParamStr('sortBy') || 'newest';

  // İlk açılışda Server Side Rendering (SSR) ilə gətiriləcək məhsullar
  const initialProducts = await getProducts({
    pageNumber: 1,
    pageSize: 12,
    sortBy,
    searchTerm,
    categoryId,
    roomId,
    collectionId,
    materialIds: materialId ? [materialId] : undefined,
    colorIds: colorId ? [colorId] : undefined,
    minDepth,
    maxDepth,
  });

  return (
    <ClientProductPage 
      initialProducts={initialProducts}
      initialColors={colors}
      initialMaterials={materials}
      initialCollections={collections}
      initialRooms={rooms}
      initialCategories={categories}
    />
  );
}