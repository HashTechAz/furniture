// Fayl: src/lib/products.ts

import { apiRequest } from "./api-client";

// --- 1. BACKEND-dən gələn datanın tipi (Swagger-ə əsasən) ---
export interface BackendImage {
  id: number;
  imageUrl: string;
  isCover: boolean;
}

export interface BackendProduct {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  width: number;
  height: number;
  depth: number;
  categoryName: string;
  designerName: string;
  images: BackendImage[];
  colors: any[]; 
}

// --- 2. FRONTEND-in (ProductCard) başa düşdüyü tip ---
export interface FrontendProduct {
  id: number;
  title: string;
  imageSrc: string;      // ProductCard bu adı gözləyir
  imageSrcHover: string; // ProductCard bu adı gözləyir
  price: number;
  measurements: string;
  position: string;
  color: string;
}

// --- 3. TƏRCÜMƏÇİ (MAPPER) FUNKSİYASI ---
const mapBackendToFrontend = (item: BackendProduct): FrontendProduct => {
  // Backend URL-i. Əgər .env faylında varsa ordan götürür, yoxdursa localhost
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7042'; 
  
  // Əsas şəkli tapırıq (isCover=true olan)
  const coverImage = item.images?.find(img => img.isCover) || item.images?.[0];
  
  // Hover şəkli (əgər 2-ci şəkil varsa onu, yoxdursa elə cover-i götürür)
  const hoverImage = item.images?.find(img => !img.isCover) || coverImage;

  // Şəkil yoxdursa, boş qalmasın deyə placeholder
  const placeholder = '/images/placeholder.png'; // Layihənin public papkasına belə bir şəkil ata bilərsən

  // Linkləri düzəldirik (http://localhost:7042/uploads/...)
  const finalImageSrc = coverImage 
    ? `${baseUrl}${coverImage.imageUrl}` 
    : placeholder;

  const finalHoverSrc = hoverImage 
    ? `${baseUrl}${hoverImage.imageUrl}` 
    : finalImageSrc;

  // Yekun obyekti qaytarırıq
  return {
    id: item.id,
    title: item.name,                     // name -> title oldu
    imageSrc: finalImageSrc,              // tam link
    imageSrcHover: finalHoverSrc,         // tam link
    price: item.price,
    measurements: `W ${item.width} x H ${item.height} x D ${item.depth} cm`, // Birləşdirdik
    position: item.categoryName || "Collection",
    color: "Standard",                    // Backend-dən gələnə qədər müvəqqəti
  };
};

// --- 4. DATA GƏTİRƏN FUNKSİYA ---
export async function getProducts(): Promise<FrontendProduct[]> {
  try {
    console.log("📡 API-yə sorğu göndərilir..."); // BUNU ƏLAVƏ ET
    const data = await apiRequest<BackendProduct[]>('/api/Products');
    console.log("✅ Data gəldi:", data.length, "ədəd məhsul"); // BUNU ƏLAVƏ ET
    
    return data.map(mapBackendToFrontend);
  } catch (error) {
    console.error("❌ XƏTA:", error); // Xəta varsa burda çıxacaq
    return [];
  }
}