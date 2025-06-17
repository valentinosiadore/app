/* eslint-disable @next/next/no-img-element */
"use client"
import { useGetCategories } from '@/api/getProducts';
import { ResponseType } from '@/types/response';
import { CategoryListItemType } from '@/types/category';
import Link from 'next/link';

const ChooseCategory = () => {
    const { result, loading, error } = useGetCategories() as ResponseType<CategoryListItemType[]>;

        // *** DEPURACIÓN ***
    console.log("Resultado COMPLETO de useGetCategories:", result);
    console.log("Estado de carga:", loading);
    console.log("Error (si existe):", error);
        // *******************************************************
    
    if (loading){
        return <p>Cargando categorias...</p>
    }

    if (error){
        return <p>Error al cargar las categorias: {error}</p>
    }

    if (!result || !Array.isArray(result) || result.length === 0){
        return <p>No se encontraron categorías.</p>
    }

    return (
        <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
            <h3 className='px-6 pb-4 text-3xl sm:pb-8'>Elige tu categoría favorita</h3>

            <div className='grid gap-5 grid-cols-1 lg:grid-cols-3'>
                {result.map((category) => {
                    // *** CAMBIO CLAVE AQUÍ: Acceder directamente a `category.slug` y `category.mainImage.url` ***
                    console.log("Procesando categoría:", category); // Log para ver el objeto completo de cada categoría

                    // Verificación más robusta
                    if (!category || !category.slug || !category.mainImage || !category.mainImage.url) {
                        console.warn("Categoría incompleta o sin URL de imagen válida:", category);
                        return null; // No renderizar si faltan datos esenciales
                    }

                    const fullImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`;

                    return (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`} // Acceder directamente a slug
                            className='relative mx-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg'
                        >
                            <img
                                src={fullImageUrl}
                                alt={category.categoryName} // Acceder directamente a categoryName
                                className='max-w-[270px] transition duration-300 ease-in-out rounded-lg hover:scale-110'
                            />
                            <p className='absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg'>{category.categoryName}</p>

                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default ChooseCategory;