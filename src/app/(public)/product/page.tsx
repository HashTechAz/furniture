'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductHero from './components/ProductHero/ProductHero';
import CategoryFilters from './components/CategoryFilters/CategoryFilters';
import DropdownFilters from './components/DropdownFilters/DropdownFilters';
import ProductGrid from './components/ProductGrid/ProductGrid';
import ProductAbout from './components/ProductAbout/ProductAbout';
import { getProducts, type FrontendProduct } from '@/lib/products';
import { getColors, type BackendColor } from '@/lib/colors';
import { getMaterials, type Material } from '@/lib/materials';
import { getCollections, type BackendCollection } from '@/lib/collections';
import { getCategories, type Category } from '@/lib/categories';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

function ProductGridSkeleton() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

const ProductPage = () => {
  const searchParams = useSearchParams();
  const roomsIdFromUrl = useMemo(() => {
    const v = searchParams.get('roomsId');
    if (v === null || v === '') return null;
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? null : n;
  }, [searchParams]);

  const [allProducts, setAllProducts] = useState<FrontendProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
  const [selectedDepthRange, setSelectedDepthRange] = useState<{ min: number; max?: number } | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [colors, setColors] = useState<BackendColor[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [collections, setCollections] = useState<BackendCollection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setCurrentPage(1);

        const [productsData, colorsData, materialsData, collectionsData, categoriesData] = await Promise.all([
          getProducts({
            pageNumber: 1,
            pageSize: productsPerPage,
            sortBy,
            ...(selectedCategoryId != null && { categoryId: selectedCategoryId }),
            ...(roomsIdFromUrl != null && { roomId: roomsIdFromUrl }),
            ...(selectedMaterialId != null && { materialIds: [selectedMaterialId] }),
            ...(selectedDepthRange != null && {
              minDepth: selectedDepthRange.min,
              ...(selectedDepthRange.max != null && { maxDepth: selectedDepthRange.max }),
            }),
            ...(selectedCollectionId != null && { collectionId: selectedCollectionId }),
          }),
          getColors(),
          getMaterials(),
          getCollections(),
          getCategories()
        ]);

        setAllProducts(productsData);
        setDisplayedProducts(productsData);
        setColors(Array.isArray(colorsData) ? colorsData : []);
        setMaterials(Array.isArray(materialsData) ? materialsData : []);
        setCollections(Array.isArray(collectionsData) ? collectionsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);

        if (productsData.length < productsPerPage) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        await new Promise(resolve => setTimeout(resolve, 0));
      } catch (error) {
        console.error('Data yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategoryId, sortBy, roomsIdFromUrl, selectedMaterialId, selectedDepthRange, selectedCollectionId]);

  // Daha çox məhsul yüklə
  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const newProducts = await getProducts({
        pageNumber: nextPage,
        pageSize: productsPerPage,
        sortBy,
        ...(selectedCategoryId != null && { categoryId: selectedCategoryId }),
        ...(roomsIdFromUrl != null && { roomId: roomsIdFromUrl }),
        ...(selectedMaterialId != null && { materialIds: [selectedMaterialId] }),
        ...(selectedDepthRange != null && {
          minDepth: selectedDepthRange.min,
          ...(selectedDepthRange.max != null && { maxDepth: selectedDepthRange.max }),
        }),
        ...(selectedCollectionId != null && { collectionId: selectedCollectionId }),
      });
      
      if (newProducts.length === 0) {
        setHasMore(false);
        return;
      }
      
      // Yeni məhsulları əlavə et
      const updatedProducts = [...allProducts, ...newProducts];
      setAllProducts(updatedProducts);
      setCurrentPage(nextPage);
      
      // Rəng filtrini tətbiq et
      applyColorFilter(updatedProducts, selectedColor);
      
      // Əgər az məhsul gəlibsə, daha çox yoxdur
      if (newProducts.length < productsPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Daha çox məhsul yüklənmədi:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Rəng filtrini tətbiq et
  const applyColorFilter = (productsToFilter: FrontendProduct[], colorName: string) => {
    if (!colorName) {
      setDisplayedProducts(productsToFilter);
      return;
    }

    const selectedColorObj = colors.find(c => c.name === colorName);
    if (!selectedColorObj) {
      setDisplayedProducts(productsToFilter);
      return;
    }

    const filtered = productsToFilter.filter(product => 
      product.selectedColorIds.includes(selectedColorObj.id)
    );
    setDisplayedProducts(filtered);
  };

  // Rəng dəyişəndə filtri tətbiq et
  useEffect(() => {
    applyColorFilter(allProducts, selectedColor);
  }, [selectedColor, allProducts, colors]);

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(prev => prev === colorName ? '' : colorName);
  };

  const heroTitle = selectedCategoryId == null
    ? 'All Products'
    : (categories.find((c) => c.id === selectedCategoryId)?.name ?? 'All Products');

  return (
    <main>
      <ProductHero title={heroTitle} />
      <CategoryFilters
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
      />
      <DropdownFilters
        onColorSelect={handleColorSelect}
        selectedColor={selectedColor}
        colors={colors}
        materials={materials}
        selectedMaterialId={selectedMaterialId}
        onMaterialSelect={setSelectedMaterialId}
        selectedDepthRange={selectedDepthRange}
        onDepthRangeSelect={setSelectedDepthRange}
        collections={collections}
        selectedCollectionId={selectedCollectionId}
        onCollectionSelect={setSelectedCollectionId}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <ProductGrid 
          products={displayedProducts} 
          onLoadMore={loadMoreProducts} 
          hasMore={hasMore} 
          loadingMore={loadingMore}
        />
      )}
      <ProductAbout />
    </main>
  );
};

export default ProductPage;