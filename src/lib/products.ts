// src/lib/products.ts
import { unstable_cache } from 'next/cache';
import { apiRequest } from "./api-client";

// --- 1. INTERFACE-LƏR (TİPLƏR) ---

export interface BackendImage {
  id: number;
  imageUrl: string;
  isCover: boolean;
}

export interface BackendSpec {
  key: string;
  value: string;
}

// Backend-dən gələn Rəng Tipi
export interface BackendColor {
  id: number;
  name: string;
  hexCode: string;
}

// 1. Filter Parametrləri
export interface ProductQueryParams {
  searchTerm?: string;
  categoryId?: number;
  collectionId?: number;
  designerId?: number;
  colorIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string; // 'newest', 'price_asc', 'price_desc', 'name_asc', 'name_desc'
  pageNumber?: number;
  pageSize?: number;
}

// Backend-dən gələn əsas Məhsul
export interface BackendProduct {
  id: number;
  name: string;
  sku: string;
  description: string;
  shortDescription: string;
  price: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  
  categoryId: number;
  designerId: number;
  collectionId: number;
  
  categoryName: string;
  designerName: string;
  collectionName: string;
  
  images: BackendImage[];
  specifications: BackendSpec[];
  
  // YENİ: Rənglər siyahısı
  colors?: BackendColor[]; 
}

// Frontend-də istifadə olunan Məhsul
export interface FrontendProduct {
  id: number;
  title: string;
  sku: string;
  shortDescription: string;
  
  // ID-lər (Admin panel üçün lazım ola bilər)
  categoryId: number;
  designerId: number;
  collectionId: number;
  
  // Ölçülər
  width: number;
  height: number;
  depth: number;
  weight: number;
  
  // Görünüş sahələri
  color: string; // Dinamik Rəng Adı (Məs: "Orange")
  measurements: string;
  position: string; // Collection adını bura qoyuruq
  description: string;
  price: string; // Formatlanmış qiymət (Məs: "120 AZN")
  
  // Şəkillər
  mainImage: string;
  imageSrc: string; // Eyni şey
  imageSrcHover: string;
  galleryImages: string[];
  
  designer: string;
  
  specifications: {
    material: string;
    finish: string;
    weight: string;
    assembly: string;
  };
}

// Məhsul Yaratmaq/Yeniləmək üçün Payload
export interface CreateProductPayload {
  name: string;
  sku: string;
  description: string;
  shortDescription: string;
  price: number;
  isFeatured: boolean;
  height: number;
  width: number;
  depth: number;
  weight: number;
  categoryId: number;
  designerId: number;
  collectionId: number;
  colorIds: number[];
  materialIds: number[];
  roomIds: number[];
  tagIds: number[];
  specifications: { key: string; value: string }[];
}

// --- 2. MAPPER (Çevirici) FUNKSİYASI ---

const mapBackendToFrontend = (item: BackendProduct): FrontendProduct => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'; 
  
  // Şəkil Məntiqi
  const coverImage = item.images?.find(img => img.isCover) || item.images?.[0];
  const hoverImage = item.images?.find(img => !img.isCover) || coverImage;
  const placeholder = '/images/placeholder.png'; // Layihəndə belə bir şəkil yoxdursa dəyiş

  const mainImgUrl = coverImage ? `${baseUrl}${coverImage.imageUrl}` : placeholder;
  const hoverImgUrl = hoverImage ? `${baseUrl}${hoverImage.imageUrl}` : mainImgUrl;
  
  const gallery = item.images?.map(img => `${baseUrl}${img.imageUrl}`) || [];
  if (gallery.length === 0) gallery.push(mainImgUrl);

  // Spesifikasiya tapmaq
  const findSpec = (key: string) => item.specifications?.find(s => s.key.toLowerCase() === key.toLowerCase())?.value || "N/A";

  // RƏNG MƏNTİQİ (Düzəliş edilmiş hissə)
  let mainColor = "Standard";
  if (item.colors && item.colors.length > 0) {
    mainColor = item.colors[0].name; // İlk rəngin adını götürür
  }

  return {
    id: item.id,
    title: item.name,
    sku: item.sku || "",
    shortDescription: item.shortDescription || "",
    
    categoryId: item.categoryId || 0,
    designerId: item.designerId || 0,
    collectionId: item.collectionId || 0,
    
    width: item.width,
    height: item.height,
    depth: item.depth,
    weight: item.weight,

    color: mainColor, // Dinamik rəng
    measurements: `W ${item.width} x H ${item.height} x D ${item.depth} cm`,
    position: item.collectionName || "Collection", // Collection adını istifadə edirik
    description: item.description || "",
    price: `${item.price} AZN`,
    
    mainImage: mainImgUrl,
    imageSrc: mainImgUrl,
    imageSrcHover: hoverImgUrl,
    galleryImages: gallery,
    
    designer: item.designerName || "Unknown Designer",
    
    specifications: {
      material: findSpec("Material"),
      finish: findSpec("Finish"),
      weight: `${item.weight} kg`,
      assembly: "Required", // Və ya findSpec("Assembly")
    }
  };
};

// --- 3. API METODLARI ---

// GET ALL PRODUCTS
export async function getProducts(
  params?: ProductQueryParams, 
  options?: { retryCount?: number; skipCache?: boolean }
): Promise<FrontendProduct[]> {
  
  const retryCount = options?.retryCount || 0;
  const skipCache = options?.skipCache || false;
  const maxRetries = 3;

  try {
    const searchParams = new URLSearchParams();
    if (params) {
       if (params.searchTerm) searchParams.append('SearchTerm', params.searchTerm);
       if (params.categoryId) searchParams.append('CategoryId', params.categoryId.toString());
       if (params.collectionId) searchParams.append('CollectionId', params.collectionId.toString());
       if (params.colorIds) params.colorIds.forEach(id => searchParams.append('ColorIds', id.toString()));
       if (params.sortBy) searchParams.append('SortBy', params.sortBy);
       if (params.pageNumber) searchParams.append('PageNumber', params.pageNumber.toString());
       if (params.pageSize) searchParams.append('PageSize', params.pageSize.toString());
    }

    const queryString = searchParams.toString();
    const endpoint = queryString ? `/api/Products?${queryString}` : '/api/Products';

    let data: BackendProduct[] | null = null;

    if (typeof window === 'undefined' && !skipCache) {
      // Server-side (Public) -> Cache aktiv
      data = await unstable_cache(
        async () => apiRequest<BackendProduct[]>(endpoint),
        ['products', endpoint], 
        { revalidate: 60, tags: ['products'] }
      )();
    } else {
      // Client-side və ya Admin -> No Cache
      data = await apiRequest<BackendProduct[]>(endpoint, {
        cache: 'no-store'
      });
    }

    if (!data || !Array.isArray(data)) {
      if (!data) throw new Error("API-dən məlumat boş gəldi");
      return [];
    }
    
    return data.map(mapBackendToFrontend);
    
  } catch (error: any) {
    console.error(`❌ Products List Error (attempt ${retryCount + 1}):`, error);
    
    // Retry Logic
    if (retryCount < maxRetries && (error.message?.includes('fetch') || error.status === 429)) {
       const waitTime = Math.pow(2, retryCount) * 1000;
       await new Promise(r => setTimeout(r, waitTime));
       return getProducts(params, { retryCount: retryCount + 1, skipCache });
    }
    
    throw error; 
  }
}

// GET SINGLE PRODUCT BY ID
export async function getProductById(id: string | number, retryCount = 0): Promise<FrontendProduct | null> {
  const maxRetries = 3;
  
  try {
    const endpoint = `/api/Products/${id}`;
    let data: BackendProduct | null = null;
    
    if (typeof window === 'undefined') {
      data = await unstable_cache(
        async () => apiRequest<BackendProduct>(endpoint),
        ['product', id.toString()],
        { revalidate: 60, tags: ['products'] }
      )();
    } else {
      data = await apiRequest<BackendProduct>(endpoint, { cache: 'no-store' });
    }

    if (!data || !data.id) {
      return null;
    }
    
    return mapBackendToFrontend(data);
  } catch (error: any) {
    console.error(`❌ Product Detail Error (ID: ${id})`, error);
    
    if (retryCount < maxRetries) {
       const waitTime = Math.pow(2, retryCount) * 1000;
       await new Promise(r => setTimeout(r, waitTime));
       return getProductById(id, retryCount + 1);
    }
    return null;
  }
}

// CREATE PRODUCT
export async function createProduct(data: CreateProductPayload, token: string) {
  return apiRequest('/api/Products', {
    method: 'POST',
    data: data,
    token: token 
  });
}

// UPDATE PRODUCT
export async function updateProduct(id: number | string, data: CreateProductPayload, token: string) {
  return apiRequest(`/api/Products/${id}`, {
    method: 'PUT',
    data: { ...data, id: parseInt(id.toString()) }, 
    token: token
  });
}

// DELETE PRODUCT
export async function deleteProduct(id: number | string, token: string) {
  return apiRequest(`/api/Products/${id}`, {
    method: 'DELETE',
    token: token
  });
}

// UPLOAD IMAGES
export async function uploadProductImages(id: number | string, files: FileList, token: string) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042';
  const response = await fetch(`${baseUrl}/api/Products/${id}/images`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  if (!response.ok) {
    throw new Error('Şəkillər yüklənmədi.');
  }
  return true;
}

// DELETE IMAGE
export async function deleteProductImage(productId: number | string, imageId: number, token: string) {
  return apiRequest(`/api/Products/${productId}/images/${imageId}`, {
    method: 'DELETE',
    token: token
  });
}

// SET COVER IMAGE
export async function setProductCoverImage(productId: number | string, imageId: number, token: string) {
  return apiRequest(`/api/Products/${productId}/images/${imageId}/set-cover`, {
    method: 'POST',
    token: token
  });
}