
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
  price: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  categoryName: string;
  designerName: string;
  collectionName: string;
  images: BackendImage[];
  specifications: BackendSpec[];
}

export interface FrontendProduct {
  id: number;
  title: string;
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
    color: "Standard",
    measurements: `W ${item.width} x H ${item.height} x D ${item.depth} cm`,
    position: item.categoryName || "Collection",
    description: item.description || "No description available.",
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