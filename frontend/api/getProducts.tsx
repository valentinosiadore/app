//Funcion encargada de obtener las categorias

import { useEffect, useState } from "react";

export function useGetCategories(){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      (async () => {
        try {
            const res = await fetch(url)
            const json = await res.json()
            setResult(json.data)
            setLoading(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                    setError(error.message)
                } else if (typeof error === 'string') {
                    // En caso de que el error sea una cadena directamente
                    setError(error);
                } else {
                    // Para cualquier otro tipo de error inesperado
                    setError("Ocurrió un error desconocido.");
                }
                setLoading(false)
        }
      })()
    }, [url])
    return { result, loading, error }
}