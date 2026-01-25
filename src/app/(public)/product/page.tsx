
import React from 'react';
import ProductHero from './components/ProductHero/ProductHero'; 
import CategoryFilters from './components/CategoryFilters/CategoryFilters';
import DropdownFilters from './components/DropdownFilters/DropdownFilters';
import ProductGrid from './components/ProductGrid/ProductGrid'; 
import ProductAbout from './components/ProductAbout/ProductAbout';
import { getProducts } from '@/lib/products'; 

export const dynamic = 'force-dynamic'; 

const ProductPage = async () => {
  const products = await getProducts();

  return (
    <main>
      <ProductHero />
      <CategoryFilters />
      <DropdownFilters />
      <ProductGrid products={products} />
      <ProductAbout />
    </main>
  );
};

export default ProductPage;