import React, { Suspense } from 'react';
import ProductHero from './components/ProductHero/ProductHero';
import CategoryFilters from './components/CategoryFilters/CategoryFilters';
import DropdownFilters from './components/DropdownFilters/DropdownFilters';
import ProductGrid from './components/ProductGrid/ProductGrid';
import ProductAbout from './components/ProductAbout/ProductAbout';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

function ProductGridSkeleton() {
  return (
    <div className="min-h-[400px] flex items-center justify-center text-gray-400 py-12">
      Məhsullar yüklənir...
    </div>
  );
}

async function ProductGridAsync() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}

const ProductPage = () => {
  return (
    <main>
      <ProductHero />
      <CategoryFilters />
      <DropdownFilters />
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGridAsync />
      </Suspense>
      <ProductAbout />
    </main>
  );
};

export default ProductPage;