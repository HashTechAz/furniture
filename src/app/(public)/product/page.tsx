import React from 'react';
import ProductHero from './components/ProductHero/ProductHero';
import CategoryFilters from './components/CategoryFilters/CategoryFilters';
import DropdownFilters from './components/DropdownFilters/DropdownFilters';
import ProductGrid from './components/ProductGrid/ProductGrid';

const ProductPage = () => {
  return (
    <main>
      <ProductHero />
      <CategoryFilters />
      <DropdownFilters />
      <ProductGrid />
    </main>
  );
};

export default ProductPage;