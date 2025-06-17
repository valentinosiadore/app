//1. Tipo para la imagen principal de una categoria
export type CategoryMainImage = {
  id: number;
  name: string;
  url: string; // La URL está directamente aquí
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: { ext: string; url: string; hash: string; mime: string; name: string; path: null; size: number; width: number; height: number; sizeInBytes: number; };
    small?: { ext: string; url: string; hash: string; mime: string; name: string; path: null; size: number; width: number; height: number; sizeInBytes: number; };
    medium?: { ext: string; url: string; hash: string; mime: string; name: string; path: null; size: number; width: number; height: number; sizeInBytes: number; };
    thumbnail?: { ext: string; url: string; hash: string; mime: string; name: string; path: null; size: number; width: number; height: number; sizeInBytes: number; };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string | null;
  provider: string;
  provider_metadata: object | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
};

// 2. Tipo para un ítem de categoría tal como viene de la lista /api/categories
export type CategoryListItemType = {
  id: number;
  documentId?: string;
  categoryName: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  mainImage: CategoryMainImage; // Incluye la imagen principal con su estructura directa
};

// 3. Tipo para el objeto 'category' tal como aparece anidado en un 'product'
// Este es el tipo que tenías originalmente en product.ts para las categorías anidadas
export type NestedCategoryType = {
  id: number;
  categoryName: string;
  slug: string;
  createdAt: string;
  documentId?: string;
  publishedAt: string;
  updatedAt: string;
};