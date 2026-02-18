import React, { Suspense } from 'react';
import HomeContent from "@/components/HomeContent/HomeContent";
import { getProducts } from "@/lib/products";
import Loader from "@/components/Loader/Loader";
export const dynamic = 'force-dynamic';

async function HomeWithProducts() {
  try {
    const allProducts = await getProducts();
    const newsProducts = allProducts.slice(0, 10);
    return <HomeContent products={newsProducts} />;
  } catch (err) {
    console.error('Home products yüklənərkən xəta:', err);
    return (
      <HomeContent products={[]} />
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