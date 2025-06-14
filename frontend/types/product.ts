// Primero, define el tipo para un 'formato' de imagen individual (como thumbnail)
export type ImageFormatDetail = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null; // Puede ser null
  size: number;
  sizeInBytes?: number; // Es opcional en tu ejemplo
  url: string; // La URL de esta versión del formato (ej. thumbnail)
  width: number;
};

// Luego, define el tipo para el objeto 'formats'
export type ImageFormats = {
  thumbnail?: ImageFormatDetail; // 'thumbnail' es un formato, puede ser opcional
  small?: ImageFormatDetail;   // Otros formatos comunes que Strapi genera
  medium?: ImageFormatDetail;
  large?: ImageFormatDetail;
  // Agrega otros formatos personalizados si los tienes configurados en Strapi
};

export type ImageAttributes = {
    url: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats?: {
        thumbnail?: {
            url: string;
            width: number;
            height: number;
        };
        small?: {
            url: string;
            width: number;
            height: number;
        };
        medium?: {
            url: string;
            width: number;
            height: number;
        };
        large?: {
            url: string;
            width: number;
            height: number;
        };
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    provider: string;
};

// Finalmente, actualiza tu ImageType para incluir 'formats'
export type ImageType = {
  id: number;
  url: string; // La URL de la imagen original/completa
  name: string;
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId?: string;
  ext: string;
  formats: ImageFormats; // ¡Ahora incluye el tipo ImageFormats aquí!
  hash: string;
  height: number;
  mime: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  publishedAt: string;
  size: number;
  updatedAt: string;
  width: number;
};

// Define el tipo para el objeto 'category' tal como aparece directamente en el 'product'
export type CategoryType = {
  id: number;
  categoryName: string;
  slug: string;
  createdAt: string;
  documentId?: string; // Es opcional en tu ejemplo
  publishedAt: string;
  updatedAt: string;
};

// Define el tipo principal del producto
export type ProductType = {
  id: number;
  // Todas las propiedades están directamente en el objeto product
  active: boolean;
  category: CategoryType; // Usamos el tipo CategoryType definido arriba
  createdAt: string;
  description: string;
  documentId?: string; // Es opcional en tu ejemplo
  images: ImageType[]; // ¡Ahora 'images' es un array DIRECTO de ImageType!
  isFeatured: boolean;
  origin: string;
  price: number;
  productName: string;
  publishedAt: string;
  slug: string;
  taste: string;
  updatedAt: string;
};