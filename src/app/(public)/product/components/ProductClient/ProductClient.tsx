'use client';

import React, { useState, useEffect, useRef, Suspense, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductHero from '../ProductHero/ProductHero';
import CategoryFilters from '../CategoryFilters/CategoryFilters';
import DropdownFilters from '../DropdownFilters/DropdownFilters';
import ProductGrid from '../ProductGrid/ProductGrid';
import ProductAbout from '../ProductAbout/ProductAbout';
import { getProducts, type FrontendProduct } from '@/lib/products';
import { type BackendColor } from '@/lib/colors';
import { type Material } from '@/lib/materials';
import { type BackendCollection } from '@/lib/collections';
import { type Room } from '@/lib/rooms';
import { type Category } from '@/lib/categories';
import styles from '../../page.module.css';

interface ClientProductPageProps {
  initialProducts: FrontendProduct[];
  initialColors: BackendColor[];
  initialMaterials: Material[];
  initialCollections: BackendCollection[];
  initialRooms: Room[];
  initialCategories: Category[];
}

function ProductGridSkeleton() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

const ProductPageContent = ({ 
  initialProducts, 
  initialColors, 
  initialMaterials, 
  initialCollections, 
  initialRooms, 
  initialCategories 
}: ClientProductPageProps) => {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get('search')?.trim() || null;

  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(() => {
    const v = searchParams.get('roomsId');
    return v ? parseInt(v, 10) || null : null;
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(() => {
    const v = searchParams.get('CategoryId');
    return v ? parseInt(v, 10) || null : null;
  });

  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(() => {
    const v = searchParams.get('collectionId');
    return v ? parseInt(v, 10) || null : null;
  });

  // Digər filtrlər
  const [selectedMaterialId, setSelectedMaterialId] = useState<number | null>(null);
  const [selectedDepthRange, setSelectedDepthRange] = useState<{ min: number; max?: number } | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateUrlParams = (updates: Record<string, string | null>) => {
    startTransition(() => {
      const url = new window.URL(window.location.href);
      Object.entries(updates).forEach(([key, val]) => {
        if (val === null || val === '') url.searchParams.delete(key);
        else url.searchParams.set(key, val);
      });
      router.push(url.pathname + url.search, { scroll: false });
    });
  };

  // SSR-dən gələn datalarla initialize edirik (LOADING OLMUR)
  const [allProducts, setAllProducts] = useState<FrontendProduct[]>(initialProducts);
  const [displayedProducts, setDisplayedProducts] = useState<FrontendProduct[]>(initialProducts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const productsPerPage = 12;
  const [hasMore, setHasMore] = useState(initialProducts.length >= productsPerPage);

  // URL-dən yeni data gələndə (Server Component təzələnəndə) siyahını sıfırla
  useEffect(() => {
    setAllProducts(initialProducts);
    setDisplayedProducts(initialProducts);
    setCurrentPage(1);
    setHasMore(initialProducts.length >= productsPerPage);
  }, [initialProducts]);

  // Daha çox məhsul yüklə
  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      
      const selectedColorObj = initialColors.find(c => c.name === selectedColor);
      const selectedColorId = selectedColorObj ? selectedColorObj.id : null;

      const newProducts = await getProducts({
        pageNumber: nextPage,
        pageSize: productsPerPage,
        sortBy,
        ...(searchFromUrl && { searchTerm: searchFromUrl }),
        ...(selectedCategoryId != null && { categoryId: selectedCategoryId }),
        ...(selectedRoomId != null && { roomId: selectedRoomId }),
        ...(selectedMaterialId != null && { materialIds: [selectedMaterialId] }),
        ...(selectedDepthRange != null && {
          minDepth: selectedDepthRange.min,
          ...(selectedDepthRange.max != null && { maxDepth: selectedDepthRange.max }),
        }),
        ...(selectedCollectionId != null && { collectionId: selectedCollectionId }),
        ...(selectedColorId != null && { colorIds: [selectedColorId] }),
      });

      if (newProducts.length === 0) {
        setHasMore(false);
        return;
      }

      const updatedProducts = [...allProducts, ...newProducts];
      setAllProducts(updatedProducts);
      setDisplayedProducts(updatedProducts);
      setCurrentPage(nextPage);

      if (newProducts.length < productsPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Daha çox məhsul yüklənmədi:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleColorSelect = (colorName: string) => {
    const newColor = selectedColor === colorName ? '' : colorName;
    setSelectedColor(newColor);
    const colorObj = initialColors.find(c => c.name === newColor);
    updateUrlParams({ colorId: colorObj ? String(colorObj.id) : null });
  };

  const handleCategoryChange = (id: number | null) => {
    setSelectedCategoryId(id);
    updateUrlParams({ CategoryId: id ? String(id) : null });
  };

  const handleMaterialSelect = (id: number | null) => {
    setSelectedMaterialId(id);
    updateUrlParams({ materialId: id ? String(id) : null });
  };

  const handleCollectionSelect = (id: number | null) => {
    setSelectedCollectionId(id);
    updateUrlParams({ collectionId: id ? String(id) : null });
  };

  const handleRoomSelect = (id: number | null) => {
    setSelectedRoomId(id);
    updateUrlParams({ roomsId: id ? String(id) : null });
  };

  const handleDepthSelect = (range: {min: number, max?: number} | null) => {
    setSelectedDepthRange(range);
    updateUrlParams({ 
        minDepth: range ? String(range.min) : null,
        maxDepth: range?.max ? String(range.max) : null
    });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrlParams({ sortBy: sort });
  };

  const heroTitle = selectedCategoryId == null
    ? 'All Products'
    : (initialCategories.find((c) => c.id === selectedCategoryId)?.name ?? 'All Products');

  return (
    <main>
      <ProductHero title={heroTitle} />
      <CategoryFilters
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={handleCategoryChange}
      />
      <DropdownFilters
        onColorSelect={handleColorSelect}
        selectedColor={selectedColor}
        colors={initialColors}
        materials={initialMaterials}
        selectedMaterialId={selectedMaterialId}
        onMaterialSelect={handleMaterialSelect}
        selectedDepthRange={selectedDepthRange}
        onDepthRangeSelect={handleDepthSelect}
        collections={initialCollections}
        selectedCollectionId={selectedCollectionId}
        onCollectionSelect={handleCollectionSelect}
        rooms={initialRooms}
        selectedRoomId={selectedRoomId}
        onRoomSelect={handleRoomSelect}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      {isPending ? (
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

export default function ClientProductPage(props: ClientProductPageProps) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductPageContent {...props} />
    </Suspense>
  );
}
