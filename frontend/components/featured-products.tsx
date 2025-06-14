/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeletonSchema";
import { Card, CardContent } from "./ui/card";
import React from "react";
import { ProductType, ImageType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";

const FeaturedProducts = () => {
  const { result, loading } = useGetFeaturedProducts();
  const router = useRouter();

  console.log(result);
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && ( 
            <SkeletonSchema grid={3} />
          )}
          {result !== null && result?.data?.map((product: ProductType) => {

            //PASO DE USAR ATTRIBUTES A USAR PRODUCT
            const productName = product.productName;
            const images = product.images;
            const slug = product.category.slug || ""; // Aseguramos que slug sea un string
            const taste = product.category.categoryName || "Sin sabor"; // Aseguramos que categoryName sea un string
            const origin = product.origin || "Sin origen"; // Aseguramos que origin sea un string

            console.log("---Producto individual (Debugging) ---");
            console.log("Id del producto:", product.id);
            console.log("Nombre del producto:", productName);
            console.log("Imágenes del producto:", images);

            let imageUrl: string | undefined;

            //COMPROBACION DE QUE EXISTE EL ARRAY DE IMÁGENES
            if (images && Array.isArray(images) && images.length > 0) {
              const firstImage = images[0] as ImageType; // Aseguramos que es del tipo ImageType
              // Comprobamos que firstImage es un objeto y tiene la propiedad 'url'
              if (firstImage && firstImage.url) {
                imageUrl = firstImage.url;
              }
            }

            console.log("URL de la imagen:", imageUrl);

              //Evitar romper si no hay imagen;
              if (!imageUrl) {
                console.warn("No image URL found for product:", product);
                return null;
              }
              const fullImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
              console.log("URL de la imagen: ", fullImageUrl);
              return (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 group">
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                          <img 
                              src={fullImageUrl} 
                              alt={productName || "Image featured"} />
                              <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                                <div className="flex justify-center gap-x-6">
                                  <IconButton onClick={() => router.push(`/product/${slug}`)} icon={<Expand size={20} />} className="text-gray-600" />
                                  <IconButton onClick={() => console.log("Add item")} icon={<ShoppingCart size={20} />} className="text-gray-600" />
                                </div>
                              </div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{productName}</h3>
                        <div className="flex items-center justify-between gap-3">
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{taste}</p>
                          <p className="px-2 py-1 text-white bg-yellow-900 rounded-full">{origin}</p>
                        </div>
                      </div>
                    </Card>
                  </div> 

                </CarouselItem>
              );
            })
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
