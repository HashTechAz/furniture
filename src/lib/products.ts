// src/lib/products.ts
import { unstable_cache } from "next/cache";
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

  // ID-lər birbaşa gələ bilər
  categoryId?: number;
  designerId?: number;
  collectionId?: number;

  // Adlar gələ bilər
  categoryName?: string;
  designerName?: string;
  collectionName?: string;

  // Obyekt kimi gələrsə
  category?: { id: number; name: string };
  designer?: { id: number; name: string };
  collection?: { id: number; name: string };

  images: BackendImage[];
  specifications: BackendSpec[];
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

  // *** YENİ SAHƏ: Seçilmiş rəng ID-ləri (Edit səhifəsi üçün) ***
  selectedColorIds: number[];

  // Ölçülər
  width: number;
  height: number;
  depth: number;
  weight: number;

  // Görünüş sahələri
  color: string; // Dinamik Rəng Adı (Məs: "Orange") - Sadəcə göstərmək üçün
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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7042";

  // Şəkil Məntiqi
  const coverImage =
    item.images?.find((img) => img.isCover) || item.images?.[0];
  const hoverImage = item.images?.find((img) => !img.isCover) || coverImage;
  const placeholder = "/images/placeholder.png"; // Layihəndə belə bir şəkil yoxdursa dəyiş

  const mainImgUrl = coverImage
    ? `${baseUrl}${coverImage.imageUrl}`
    : placeholder;
  const hoverImgUrl = hoverImage
    ? `${baseUrl}${hoverImage.imageUrl}`
    : mainImgUrl;

  const gallery = item.images?.map((img) => `${baseUrl}${img.imageUrl}`) || [];
  if (gallery.length === 0) gallery.push(mainImgUrl);

  // Spesifikasiya tapmaq
  const findSpec = (key: string) =>
    item.specifications?.find((s) => s.key.toLowerCase() === key.toLowerCase())
      ?.value || "N/A";

  // *** RƏNG MƏNTİQİ (DÜZƏLDİLMİŞ HİSSƏ) ***
  let mainColor = "Standard";
  let selectedColorIds: number[] = []; // Boş array ilə başlayırıq

  if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
    // 1. Görünüş üçün ilk rəngin adını götürürük
    mainColor = item.colors[0].name;

    // 2. Edit forması üçün bütün rənglərin ID-lərini yığırıq
    selectedColorIds = item.colors.map((c) => c.id);
  }

  // ID-LƏRİ TAPMAQ
  const finalCategoryId = item.categoryId || item.category?.id || 0;
  const finalDesignerId = item.designerId || item.designer?.id || 0;
  const finalCollectionId = item.collectionId || item.collection?.id || 0;

  return {
    id: item.id,
    title: item.name,
    sku: item.sku || "",
    shortDescription: item.shortDescription || "",

    // Düzəltdiyimiz ID-ləri bura yazırıq
    categoryId: finalCategoryId,
    designerId: finalDesignerId,
    collectionId: finalCollectionId,

    // *** YENİ SAHƏNİ BURA ƏLAVƏ EDİRİK ***
    selectedColorIds: selectedColorIds,

    width: item.width,
    height: item.height,
    depth: item.depth,
    weight: item.weight,

    color: mainColor, // Dinamik rəng adı
    measurements: `W ${item.width} x H ${item.height} x D ${item.depth} cm`,
    position: item.collectionName || item.collection?.name || "Collection",
    description: item.description || "",
    price: `${item.price} AZN`,

    mainImage: mainImgUrl,
    imageSrc: mainImgUrl,
    imageSrcHover: hoverImgUrl,
    galleryImages: gallery,

    designer: item.designerName || item.designer?.name || "Unknown Designer",

    specifications: {
      material: findSpec("Material"),
      finish: findSpec("Finish"),
      weight: `${item.weight} kg`,
      assembly: "Required",
    },
  };
};

// --- 3. API METODLARI (Bunlar eyni qalır, amma tam olsun deyə atıram) ---

export async function getProducts(
  params?: ProductQueryParams,
  options?: { retryCount?: number; skipCache?: boolean }
): Promise<FrontendProduct[]> {
  const skipCache = options?.skipCache || false;
  const endpoint = "/api/Products"; // Parametrləri bura əlavə edərsən

  let data: BackendProduct[] | null = null;

  if (typeof window === "undefined" && !skipCache) {
    data = await unstable_cache(
      async () => apiRequest<BackendProduct[]>(endpoint),
      ["products", endpoint],
      { revalidate: 60, tags: ["products"] }
    )();
  } else {
    data = await apiRequest<BackendProduct[]>(endpoint, { cache: "no-store" });
  }

  if (!data || !Array.isArray(data)) {
    if (!data) throw new Error("API-dən məlumat boş gəldi");
    return [];
  }
  return data.map(mapBackendToFrontend);
}

export async function getProductById(
  id: string | number,
  retryCount = 0
): Promise<FrontendProduct | null> {
  try {
    const endpoint = `/api/Products/${id}`;
    const data = await apiRequest<BackendProduct>(endpoint, {
      cache: "no-store",
    });

    if (!data || !data.id) return null;

    return mapBackendToFrontend(data);
  } catch (error: any) {
    console.error(`Product Detail Error (ID: ${id})`, error);
    return null;
  }
}

export async function createProduct(data: CreateProductPayload, token: string) {
  return apiRequest("/api/Products", {
    method: "POST",
    data: data,
    token: token,
  });
}

export async function updateProduct(
  id: number | string,
  data: CreateProductPayload,
  token: string
) {
  return apiRequest(`/api/Products/${id}`, {
    method: "PUT",
    data: { ...data, id: parseInt(id.toString()) },
    token: token,
  });
}

export async function deleteProduct(id: number | string, token: string) {
  return apiRequest(`/api/Products/${id}`, { method: "DELETE", token: token });
}

export async function uploadProductImages(
  id: number | string,
  files: FileList,
  token: string
) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7042";
  const response = await fetch(`${baseUrl}/api/Products/${id}/images`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!response.ok) throw new Error("Şəkillər yüklənmədi.");
  return true;
}

export async function deleteProductImage(
  productId: number | string,
  imageId: number,
  token: string
) {
  return apiRequest(`/api/Products/${productId}/images/${imageId}`, {
    method: "DELETE",
    token: token,
  });
}

export async function setProductCoverImage(
  productId: number | string,
  imageId: number,
  token: string
) {
  return apiRequest(`/api/Products/${productId}/images/${imageId}/set-cover`, {
    method: "POST",
    token: token,
  });
}
