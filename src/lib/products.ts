// src/lib/products.ts
import { unstable_cache } from "next/cache";
import { apiRequest } from "./api-client";

// --- 1. INTERFACE-LƏR ---

export interface BackendImage {
  id: number;
  imageUrl: string;
  isCover: boolean;
}

export interface BackendSpec {
  key: string;
  value: string;
}

export interface BackendColor {
  id: number;
  name: string;
  hexCode: string;
}

export interface ProductQueryParams {
  searchTerm?: string;
  categoryId?: number;
  collectionId?: number;
  designerId?: number;
  colorIds?: number[];
  productGroupId?: number; // Eyni qrupdakı variantları gətirmək üçün (rəng variantları)
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  pageNumber?: number;
  pageSize?: number;
}

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

  categoryId?: number;
  designerId?: number;
  collectionId?: number;
  productGroupId?: number | null;

  // Backend-dən adlar gəlirsə
  categoryName?: string;
  designerName?: string;
  collectionName?: string;

  // Obyekt kimi gəlirsə
  category?: { id: number; name: string };
  designer?: { id: number; name: string };
  collection?: { id: number; name: string };

  images: BackendImage[];
  specifications: BackendSpec[];
  colors?: BackendColor[];
}

export interface FrontendProduct {
  id: number;
  title: string;
  sku: string;
  shortDescription: string;

  categoryId: number;
  designerId: number;
  collectionId: number;
  selectedColorIds: number[];
  productGroupId?: number | null; // Eyni məhsulun digər rəng variantları üçün

  // YENİ: Kategoriya adı (Rahat göstərmək üçün)
  categoryName: string;

  width: number;
  height: number;
  depth: number;
  weight: number;

  color: string; // Ana rəng adı
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

/** Backend-in POST /api/Products/{id}/variants üçün body. ProductGroupId backend tərəfindən avtomatik təyin edilir. */
export interface CreateProductVariantPayload {
  name: string;
  sku: string;
  description?: string;
  shortDescription?: string;
  price: number;
  isFeatured?: boolean;
  height: number;
  width: number;
  depth: number;
  weight: number;
  categoryId: number;
  designerId: number;
  collectionId: number;
  productGroupId?: number; // İstəyə bağlı, backend özü də təyin edə bilər
  colorIds: number[];
  materialIds?: number[];
  roomIds?: number[];
  tagIds?: number[];
  specifications?: { key: string; value: string }[];
}

// --- 2. MAPPER ---

const mapBackendToFrontend = (item: BackendProduct): FrontendProduct => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7042";

  const coverImage =
    item.images?.find((img) => img.isCover) || item.images?.[0];
  const hoverImage = item.images?.find((img) => !img.isCover) || coverImage;
  const placeholder = "/images/placeholder.png";

  const mainImgUrl = coverImage
    ? `${baseUrl}${coverImage.imageUrl}`
    : placeholder;
  const hoverImgUrl = hoverImage
    ? `${baseUrl}${hoverImage.imageUrl}`
    : mainImgUrl;

  const gallery = item.images?.map((img) => `${baseUrl}${img.imageUrl}`) || [];
  if (gallery.length === 0) gallery.push(mainImgUrl);

  const findSpec = (key: string) =>
    item.specifications?.find((s) => s.key.toLowerCase() === key.toLowerCase())
      ?.value || "N/A";

  // Rəng Məntiqi
  let mainColor = "Standard";
  let selectedColorIds: number[] = [];

  if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
    mainColor = item.colors[0].name; // İlk rəngi götürürük
    selectedColorIds = item.colors.map((c) => c.id);
  }

  // ID və Ad Məntiqi
  const finalCategoryId = item.categoryId || item.category?.id || 0;
  const finalCategoryName =
    item.categoryName || item.category?.name || "Uncategorized";

  const finalDesignerId = item.designerId || item.designer?.id || 0;
  const finalCollectionId = item.collectionId || item.collection?.id || 0;
  const productGroupId =
    item.productGroupId ??
    (item as unknown as { ProductGroupId?: number }).ProductGroupId ??
    undefined;

  return {
    id: item.id,
    title: item.name,
    sku: item.sku || "",
    shortDescription: item.shortDescription || "",

    categoryId: finalCategoryId,
    categoryName: finalCategoryName,
    productGroupId,

    designerId: finalDesignerId,
    collectionId: finalCollectionId,
    selectedColorIds: selectedColorIds,

    width: item.width,
    height: item.height,
    depth: item.depth,
    weight: item.weight,

    color: mainColor, // Rəng adı
    measurements: `W ${item.width} x H ${item.height} x D ${item.depth} cm`,
    position: item.collectionName || item.collection?.name || "Collection",
    description: item.description || "",
    price: `${item.price}`, // AZN yazısını sildim, təmiz rəqəm olsun

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

// --- 3. API METODLARI ---

export async function getProducts(
  params?: ProductQueryParams,
  options?: { retryCount?: number; skipCache?: boolean },
): Promise<FrontendProduct[]> {
  // Query parametrlərini URL stringə çevirmək
  const queryParams = new URLSearchParams();
  if (params) {
    if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
    if (params.productGroupId != null)
      queryParams.append("productGroupId", params.productGroupId.toString());
    if (params.pageNumber)
      queryParams.append("pageNumber", params.pageNumber.toString());
    if (params.pageSize)
      queryParams.append("pageSize", params.pageSize.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    // Digər parametrlər lazım olsa əlavə et
  }

  const endpoint = `/api/Products?${queryParams.toString()}`;

  // API sorğusu
  const data = await apiRequest<any>(endpoint, { cache: "no-store" });

  // Backend paginated response qaytara bilər: { items: [], totalCount: 10 }
  // Və ya birbaşa array: []
  let items: BackendProduct[] = [];

  if (Array.isArray(data)) {
    items = data;
  } else if (data && Array.isArray(data.items)) {
    items = data.items;
  }

  return items.map(mapBackendToFrontend);
}

export async function getProductById(
  id: string | number,
): Promise<FrontendProduct | null> {
  try {
    const endpoint = `/api/Products/${id}`;
    const data = await apiRequest<BackendProduct>(endpoint, {
      cache: "no-store",
    });
    if (!data || !data.id) return null;
    return mapBackendToFrontend(data);
  } catch (error) {
    console.error(`Product Error: ${id}`, error);
    return null;
  }
}

export async function createProduct(data: CreateProductPayload, token: string) {
  return apiRequest("/api/Products", { method: "POST", data, token });
}

/**
 * Mövcud məhsulun rəng variantını yaradır.
 * Backend ProductGroupId-ni avtomatik idarə edir (yoxdursa yaradır, varsa eyni ID-ni yeni varianta verir).
 */
export async function createProductVariant(
  baseProductId: number | string,
  data: CreateProductVariantPayload,
  token: string,
) {
  return apiRequest<BackendProduct>(`/api/Products/${baseProductId}/variants`, {
    method: "POST",
    data,
    token,
  });
}

/** Eyni ProductGroupId-dakı variant məhsulları (məs. eyni stulun digər rəngləri). Backend productGroupId filter dəstəkləyəndə işləyir. */
export async function getProductVariants(
  productGroupId: number,
): Promise<FrontendProduct[]> {
  return getProducts({ productGroupId, pageSize: 50 });
}

/** Ad əsasına görə eyni məhsulun variantlarını tapır (məs. "Stul – Qırmızı" / "Stul" → eyni base "Stul"). productGroupId olmayan məhsullar üçün fallback. */
function getBaseName(title: string): string {
  if (!title || typeof title !== "string") return "";
  const normalized = title.trim();
  const dash = normalized.indexOf(" – ");
  const dash2 = normalized.indexOf(" - ");
  const idx = dash >= 0 && (dash2 < 0 || dash <= dash2) ? dash : dash2;
  const base = idx >= 0 ? normalized.slice(0, idx).trim() : normalized;
  return base.toLowerCase();
}

/** productGroupId olmadıqda, eyni ad əsası və kategoriyaya görə "qardaş" məhsulları gətirir (bütün rəngləri göstərməyin qarşısını alır). */
export async function getProductVariantsByNameFallback(
  product: FrontendProduct,
): Promise<FrontendProduct[]> {
  const base = getBaseName(product.title);
  if (!base) return [];
  const all = await getProducts({ pageSize: 200 });
  return all.filter(
    (p) =>
      getBaseName(p.title) === base &&
      p.categoryId === product.categoryId,
  );
}

export async function updateProduct(
  id: number | string,
  data: CreateProductPayload,
  token: string,
) {
  return apiRequest(`/api/Products/${id}`, {
    method: "PUT",
    data: { ...data, id: Number(id) },
    token,
  });
}

export async function deleteProduct(id: number | string, token: string) {
  return apiRequest(`/api/Products/${id}`, { method: "DELETE", token });
}

export async function uploadProductImages(
  id: number | string,
  files: FileList,
  token: string,
) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) formData.append("files", files[i]);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7042";
  const res = await fetch(`${baseUrl}/api/Products/${id}/images`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Şəkillər yüklənmədi.");
  return true;
}

export async function deleteProductImage(
  pid: number | string,
  imgId: number,
  token: string,
) {
  return apiRequest(`/api/Products/${pid}/images/${imgId}`, {
    method: "DELETE",
    token,
  });
}

export async function setProductCoverImage(
  pid: number | string,
  imgId: number,
  token: string,
) {
  return apiRequest(`/api/Products/${pid}/images/${imgId}/set-cover`, {
    method: "POST",
    token,
  });
}
