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


export async function getProducts(): Promise<FrontendProduct[]> {
  try {
    const data = await apiRequest<BackendProduct[]>('/api/Products');
    return data.map(mapBackendToFrontend);
  } catch (error) {
    console.error("Products List Error:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<FrontendProduct | null> {
  try {
    const data = await apiRequest<BackendProduct>(`/api/Products/${id}`);
    return mapBackendToFrontend(data);
  } catch (error) {
    console.error(`Product Detail Error (ID: ${id}):`, error);
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