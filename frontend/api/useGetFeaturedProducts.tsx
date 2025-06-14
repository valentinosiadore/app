import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";

export function useGetFeaturedProducts(): ResponseType<{ data: ProductType[] }> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[isFeatured][$eq]=true&populate=*`;
  const [result, setResult] = useState<{ data: ProductType[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log("Response JSON:", json);
        setResult(json);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    })();
  }, [url]);
  return { loading, result, error };
}
