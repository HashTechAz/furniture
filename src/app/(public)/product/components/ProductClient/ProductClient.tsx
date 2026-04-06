'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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

  // SSR-dən gələn datalarla initialize edirik (LOADING OLMUR)
  const [allProducts, setAllProducts] = useState<FrontendProduct[]>(initialProducts);
  const [displayedProducts, setDisplayedProducts] = useState<FrontendProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false); // Ilk açılışda false-dir, çünki data artıq var
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const productsPerPage = 12;
  const [hasMore, setHasMore] = useState(initialProducts.length >= productsPerPage);

  const isFirstMount = useRef(true);

  // URL dəyişdikcə state-ləri yeniləyirik (Back/Forward düymələri üçün)
  useEffect(() => {
    const v = searchParams.get('roomsId');
    setSelectedRoomId(v ? parseInt(v, 10) || null : null);
  }, [searchParams]);

  useEffect(() => {
    const v = searchParams.get('collectionId');
    setSelectedCollectionId(v ? parseInt(v, 10) || null : null);
  }, [searchParams]);

  useEffect(() => {
    const v = searchParams.get('CategoryId');
    setSelectedCategoryId(v ? parseInt(v, 10) || null : null);
  }, [searchParams]);

  // Yeni məhsulları mütəmadi olaraq gətirmək üçün
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return; // İlkin açılışda axtarış etmə, çünki SSR artıq edib
    }

    const fetchProductsData = async () => {
      try {
        setLoading(true);
        setCurrentPage(1);

        const selectedColorObj = initialColors.find(c => c.name === selectedColor);
        const selectedColorId = selectedColorObj ? selectedColorObj.id : null;

        const productsData = await getProducts({
          pageNumber: 1,
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

        setAllProducts(productsData);
        setDisplayedProducts(productsData);

        if (productsData.length < productsPerPage) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

      } catch (error) {
        console.error('Məhsullar yüklənmədi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsData();
  }, [selectedCategoryId, sortBy, selectedRoomId, searchFromUrl, selectedMaterialId, selectedDepthRange, selectedCollectionId, selectedColor, initialColors]);

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
    setSelectedColor(prev => prev === colorName ? '' : colorName);
  };

  const heroTitle = selectedCategoryId == null
    ? 'All Products'
    : (initialCategories.find((c) => c.id === selectedCategoryId)?.name ?? 'All Products');

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
        colors={initialColors}
        materials={initialMaterials}
        selectedMaterialId={selectedMaterialId}
        onMaterialSelect={setSelectedMaterialId}
        selectedDepthRange={selectedDepthRange}
        onDepthRangeSelect={setSelectedDepthRange}
        collections={initialCollections}
        selectedCollectionId={selectedCollectionId}
        onCollectionSelect={setSelectedCollectionId}
        rooms={initialRooms}
        selectedRoomId={selectedRoomId}
        onRoomSelect={setSelectedRoomId}
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

export default function ClientProductPage(props: ClientProductPageProps) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductPageContent {...props} />
    </Suspense>
  );
}
