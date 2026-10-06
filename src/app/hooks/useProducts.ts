// app/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { WCProduct, MappedProduct, ApiDebugInfo } from "../interfaces/types/types";
import { STATIC_PRODUCTS } from "../utils/constants";
import { getIconForCategory, getDetailedSolutionText, buildProductDescriptions } from "../utils/utils";

export const useProducts = () => {
    const [productos, setProductos] = useState<MappedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(false);
    const [apiDebugInfo, setApiDebugInfo] = useState<ApiDebugInfo | null>(null);

    useEffect(() => {
        // En producción el frontend corre bajo el mismo dominio o consume el dominio oficial
        const isDev = import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';

        // Si tienes proxy en vite.config.ts para dev usa '', sino usa el dominio de WordPress directo
        const baseUrl = import.meta.env.DEV ? '' : 'https://www.agrofert.com.co';
        const url = `${baseUrl}/wp-json/agrofert/v1/products?per_page=100`;
        console.group("%c[Agrofert API Connection Debug]", "color: #16a34a; font-weight: bold; font-size: 13px;");
        console.log(`Iniciando petición al endpoint público: ${url}`);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    let analyzedIssue: "cors" | "credentials" | "not_found" | "generic_network" | "none" = "none";
                    if (response.status === 401 || response.status === 403) analyzedIssue = "credentials";
                    else if (response.status === 404) analyzedIssue = "not_found";

                    setApiDebugInfo({
                        status: response.status,
                        statusText: response.statusText,
                        errorName: "HTTP Response Error",
                        errorMessage: `La petición falló con código de estado HTTP ${response.status}.`,
                        timestamp: new Date().toLocaleTimeString(),
                        requestUrl: url,
                        analyzedIssue,
                        detailedSolution: getDetailedSolutionText(analyzedIssue)
                    });
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: WCProduct[]) => {
                if (!Array.isArray(data)) throw new Error("El formato de datos devuelto no es un arreglo válido.");

                // Excluir productos que tengan la categoría o etiqueta "oculto"
                const filteredData = data.filter((item) => {
                    const hasHiddenCategory = item.categories?.some(cat =>
                        cat.slug?.toLowerCase().includes("oculto") ||
                        cat.name?.toLowerCase().includes("oculto")
                    );
                    return !hasHiddenCategory;
                });

                const mappedData: MappedProduct[] = filteredData.map((item) => {
                    let categoriesArray: string[] = [];

                    if (item.categories && item.categories.length > 0) {
                        for (const cat of item.categories) {
                            const firstCat = cat.slug ? cat.slug.toLowerCase() : "";

                            if (firstCat.includes("itrogen")) categoriesArray.push("nitrogenados");
                            if (firstCat.includes("osfor")) categoriesArray.push("fosforados");
                            if (firstCat.includes("otasi")) categoriesArray.push("potasicos");
                            if (firstCat.includes("rgani")) categoriesArray.push("organicos");
                            if (firstCat.includes("icro") || firstCat.includes("nutri")) categoriesArray.push("micronutrientes");
                        }
                    }

                    if (categoriesArray.length === 0) {
                        categoriesArray.push("all");
                    }

                    const {
                        cardDescription,
                        fullDescription,
                        application,
                        composition
                    } = buildProductDescriptions(
                        item.short_description || "",
                        item.description || ""
                    );

                    const primaryCategoryForIcon = categoriesArray[0] || "all";

                    // Si hay más de una imagen, excluimos la primera (index 0) para que no se repita en la ficha técnica.
                    const allImagesMapped = item.images && item.images.length > 1
                        ? item.images.slice(1).map(img => ({ src: img.src }))
                        : [];

                    return {
                        id: item.id,
                        name: item.name,
                        category: categoriesArray,
                        description: cardDescription,
                        fullDescription: fullDescription || "Sin descripción detallada disponible.",
                        composition: composition,
                        application: application,
                        image: item.images && item.images.length > 0 ? item.images[0].src : undefined,
                        images: allImagesMapped,
                        tags: item.tags || [],
                        icon: getIconForCategory(primaryCategoryForIcon),
                    };
                });

                setProductos(mappedData);
                setLoading(false);
                console.groupEnd();
            })
            .catch((error: any) => {
                setApiDebugInfo(prev => {
                    if (prev) return prev;
                    const isCorsOrNetwork = error instanceof TypeError && error.message.toLowerCase().includes("failed to fetch");
                    const analyzedIssue = isCorsOrNetwork ? "cors" : "generic_network";
                    return {
                        status: null,
                        statusText: "Network Error / CORS Blocked",
                        errorName: error.name || "NetworkError",
                        errorMessage: error.message || "Problema de red o restricciones de CORS.",
                        timestamp: new Date().toLocaleTimeString(),
                        requestUrl: url,
                        analyzedIssue,
                        detailedSolution: getDetailedSolutionText(analyzedIssue),
                        rawErrorStack: error.stack
                    };
                });
                setProductos(STATIC_PRODUCTS as any);
                setIsFallback(true);
                setLoading(false);
                console.groupEnd();
            });
    }, []);

    return { productos, loading, isFallback, apiDebugInfo };
};