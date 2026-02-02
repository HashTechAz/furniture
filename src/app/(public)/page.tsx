// src/app/(public)/page.tsx

import React, { Suspense } from 'react';
import HomeContent from "@/components/HomeContent/HomeContent";
import { getProducts } from "@/lib/products";
import Loader from "@/components/Loader/Loader";

export const dynamic = 'force-dynamic';

// Məhsullar yüklənənə qədər skeleton göstərir; səhifə quruluşu dərhal gəlir (streaming)
async function HomeWithProducts() {
  const allProducts = await getProducts();
  const newsProducts = allProducts.slice(0, 10);
  return <HomeContent products={newsProducts} />;
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