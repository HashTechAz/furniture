import React, { Suspense } from 'react';
import HomeContent from "@/components/HomeContent/HomeContent";
import { getProducts } from "@/lib/products";
import { getCollections } from "@/lib/collections";
import Loader from "@/components/Loader/Loader";
export const dynamic = 'force-dynamic';

async function HomeWithProducts() {
  try {
    const [allProducts, collections] = await Promise.all([
      getProducts().catch(() => []),
      getCollections().catch(() => [])
    ]);
    const newsProducts = Array.isArray(allProducts) ? allProducts.slice(0, 10) : [];
    return <HomeContent products={newsProducts} collections={collections || []} />;
  } catch (err) {
    console.error('Home data fetching error:', err);
    return (
      <HomeContent products={[]} collections={[]} />
    );
  }
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <HomeWithProducts />
      </Suspense>
    </main>
  );
}