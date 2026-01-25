// src/app/(public)/page.tsx

import React from 'react';
import HomeContent from "@/components/HomeContent/HomeContent"; // Yeni yaratdığımız komponent
import { getProducts } from "@/lib/products"; // Backend-dən çəkən funksiya

// Səhifəni Server Component edirik (async)
export default async function Home() {
  
  // 1. Backend-dən bütün məhsulları gətiririk
  const allProducts = await getProducts();
  
  // 2. İlk 10 dənəsini "News" üçün ayırırıq
  const newsProducts = allProducts.slice(0, 10); 

  // 3. Datanı Client Component-ə ötürürük
  return (
    <main>
      <HomeContent products={newsProducts} />
    </main>
  );
}