// src/app/(public)/product/page.tsx

import React from 'react';
import ProductHero from './components/ProductHero/ProductHero'; // Yolların düzgünlüyünü yoxla
import CategoryFilters from './components/CategoryFilters/CategoryFilters';
import DropdownFilters from './components/DropdownFilters/DropdownFilters';
import ProductGrid from './components/ProductGrid/ProductGrid'; 
import ProductAbout from './components/ProductAbout/ProductAbout';
import { getProducts } from '@/lib/products'; // Fetch funksiyası

export const dynamic = 'force-dynamic'; // Hər dəfə real datanı çəkməsi üçün (önəmlidir!)

const ProductPage = async () => {
  // 1. Datanı backend-dən gözləyirik
  const products = await getProducts();

  return (
    <main>
      <ProductHero />
      <CategoryFilters />
      <DropdownFilters />
      
      {/* 2. Datanı ProductGrid-ə 'products' propu ilə ötürürük */}
      <ProductGrid products={products} />

      <ProductAbout />
    </main>
  );
};

export default ProductPage;