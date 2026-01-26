// src/lib/products.ts
import { apiRequest } from "./api-client";

export interface BackendImage {
  id: number;
  imageUrl: string;
  isCover: boolean;
}

export interface BackendSpec {
  key: string;
  value: string;
}

// 1. Filter Parametrləri üçün yeni Interface yaradırıq
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

export interface BackendProduct {
  id: number;
  name: string;
  sku: string;
  description: string;
  shortDescription: string; // Backend-dən gəlir
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
}

// src/lib/products.ts

// ... (BackendProduct və digər tiplər qalır) ...

export interface FrontendProduct {
  id: number;
  title: string;
  sku: string;
  shortDescription: string;
  categoryId: number;
  designerId: number;
  collectionId: number;
  // --- YENİ ƏLAVƏLƏR (Ölçülər) ---
  width: number;
  height: number;
  depth: number;
  weight: number; // Bunu da əlavə edək (lazım ola bilər)
  // -----------------------------
  color: string;
  measurements: string;
  position: string;
  description: string;
  price: string;
  mainImage: string;
  imageSrc: string;
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

const mapBackendToFrontend = (item: BackendProduct): FrontendProduct => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'; 
  
  // ... (Image logic olduğu kimi qalır) ...
  const coverImage = item.images?.find(img => img.isCover) || item.images?.[0];
  const hoverImage = item.images?.find(img => !img.isCover) || coverImage;
  const placeholder = '/images/placeholder.png'; 
  const mainImgUrl = coverImage ? `${baseUrl}${coverImage.imageUrl}` : placeholder;
  const hoverImgUrl = hoverImage ? `${baseUrl}${hoverImage.imageUrl}` : mainImgUrl;
  const gallery = item.images?.map(img => `${baseUrl}${img.imageUrl}`) || [];
  if (gallery.length === 0) gallery.push(mainImgUrl);
  const findSpec = (key: string) => item.specifications?.find(s => s.key === key)?.value || "N/A";

  return {
    id: item.id,
    title: item.name,
    sku: item.sku || "",
    shortDescription: item.shortDescription || "",
    categoryId: item.categoryId || 0,
    designerId: item.designerId || 0,
    collectionId: item.collectionId || 0,
    
    // --- ÖLÇÜLƏRİ KÖÇÜRÜRÜK ---
    width: item.width,
    height: item.height,
    depth: item.depth,
    weight: item.weight,
    // -------------------------

    color: "Standard",
    measurements: `W ${item.width} x H ${item.height} x D ${item.depth} cm`,
    position: item.categoryName || "Collection",
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
      assembly: "Required",
    }
  };
};

// 2. getProducts funksiyasını gücləndiririk
export async function getProducts(params?: ProductQueryParams, retryCount = 0): Promise<FrontendProduct[]> {
  const maxRetries = 2;
  
  try {
    // Parametrləri URL Query String-ə çeviririk
    const searchParams = new URLSearchParams();

    if (params) {
      if (params.searchTerm) searchParams.append('SearchTerm', params.searchTerm);
      if (params.categoryId) searchParams.append('CategoryId', params.categoryId.toString());
      if (params.collectionId) searchParams.append('CollectionId', params.collectionId.toString());
      if (params.designerId) searchParams.append('DesignerId', params.designerId.toString());
      if (params.minPrice) searchParams.append('MinPrice', params.minPrice.toString());
      if (params.maxPrice) searchParams.append('MaxPrice', params.maxPrice.toString());
      if (params.sortBy) searchParams.append('SortBy', params.sortBy);
      if (params.pageNumber) searchParams.append('PageNumber', params.pageNumber.toString());
      if (params.pageSize) searchParams.append('PageSize', params.pageSize.toString());
      
      // Array tipli filtrlər (Məsələn rənglər)
      if (params.colorIds && params.colorIds.length > 0) {
        params.colorIds.forEach(id => searchParams.append('ColorIds', id.toString()));
      }
    }

    // Backend-ə sorğu: /api/Products?CategoryId=1&SortBy=price_asc...
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/api/Products?${queryString}` : '/api/Products';
    
    console.log(`📦 Fetching products from: ${endpoint}`);
    const data = await apiRequest<BackendProduct[]>(endpoint);
    
    // Response Header-dən x-pagination oxumaq lazım olsa, apiRequest-i dəyişməliyik.
    // Hələlik sadəcə məhsulları qaytarırıq.
    
    if (!data || !Array.isArray(data)) {
      console.warn("⚠️ Products API returned invalid data:", data);
      return [];
    }
    
    const mappedProducts = data.map(mapBackendToFrontend);
    console.log(`✅ Successfully loaded ${mappedProducts.length} products`);
    return mappedProducts;
    
  } catch (error: any) {
    console.error(`❌ Products List Error (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
    
    // Retry mekanizması - network hatalarında tekrar dene
    if (retryCount < maxRetries && (
      error.message?.includes('fetch') || 
      error.message?.includes('network') ||
      error.message?.includes('ECONNREFUSED') ||
      error.message?.includes('timeout')
    )) {
      console.log(`🔄 Retrying products fetch in 1 second...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getProducts(params, retryCount + 1);
    }
    
    // Son hata - boş array dön ama detaylı log
    console.error("🔥 Final Products Error:", {
      message: error.message,
      stack: error.stack,
      params: params
    });
    
    return [];
  }
}

export async function getProductById(id: string, retryCount = 0): Promise<FrontendProduct | null> {
  const maxRetries = 2;
  
  try {
    console.log(`📦 Fetching product by ID: ${id}`);
    const data = await apiRequest<BackendProduct>(`/api/Products/${id}`);
    
    if (!data || !data.id) {
      console.warn(`⚠️ Product with ID ${id} not found or invalid data`);
      return null;
    }
    
    const mappedProduct = mapBackendToFrontend(data);
    console.log(`✅ Successfully loaded product: ${mappedProduct.title}`);
    return mappedProduct;
  } catch (error: any) {
    console.error(`❌ Product Detail Error (ID: ${id}, attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
    
    // Retry mekanizması
    if (retryCount < maxRetries && (
      error.message?.includes('fetch') || 
      error.message?.includes('network') ||
      error.message?.includes('ECONNREFUSED') ||
      error.message?.includes('timeout')
    )) {
      console.log(`🔄 Retrying product fetch in 1 second...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getProductById(id, retryCount + 1);
    }
    
    console.error(`🔥 Final Product Error for ID ${id}:`, error.message);
    return null;
  }
}

// ... (CreateProductPayload və createProduct olduğu kimi qalır) ...
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

export async function createProduct(data: CreateProductPayload, token: string) {
  return apiRequest('/api/Products', {
    method: 'POST',
    data: data,
    token: token 
  });
}

// UPDATE HİSSƏSİ
export async function updateProduct(id: number | string, data: CreateProductPayload, token: string) {
  return apiRequest(`/api/Products/${id}`, {
    method: 'PUT',
    // ID-ni data-ya əlavə edirik
    data: { ...data, id: parseInt(id.toString()) }, 
    token: token
  });
}

export async function deleteProduct(id: number | string, token: string) {
  return apiRequest(`/api/Products/${id}`, {
    method: 'DELETE',
    token: token // Token mütləqdir!
  });
}


// --- 9. ÇOXLU ŞƏKİL YÜKLƏMƏK (UPLOAD) ---
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
    throw new Error('Şəkillər yüklənmədi. Formatı və ya ölçünü yoxlayın.');
  }
  return true;
}


// src/lib/products.ts sonuna əlavə et:

// --- 10. MƏHSULUN ŞƏKLİNİ SİLMƏK ---
export async function deleteProductImage(productId: number | string, imageId: number, token: string) {
  // Ehtimal olunan yol: /api/Products/{id}/images/{imageId}
  return apiRequest(`/api/Products/${productId}/images/${imageId}`, {
    method: 'DELETE',
    token: token
  });
}

// src/lib/products.ts sonuna əlavə et:

// --- 11. ŞƏKLİ COVER (ƏSAS) ETMƏK ---
export async function setProductCoverImage(productId: number | string, imageId: number, token: string) {
  return apiRequest(`/api/Products/${productId}/images/${imageId}/set-cover`, {
    method: 'POST',
    token: token
  });
}