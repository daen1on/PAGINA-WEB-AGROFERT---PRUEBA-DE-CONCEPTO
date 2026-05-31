// app/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { WCProduct, MappedProduct, ApiDebugInfo } from "../interfaces/types/types";
import { STATIC_PRODUCTS } from "../utils/constants";
import { getIconForCategory, getDetailedSolutionText, parseWooCommerceDescription } from "../utils/utils";

export const useProducts = () => {
    const [productos, setProductos] = useState<MappedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(false);
    const [apiDebugInfo, setApiDebugInfo] = useState<ApiDebugInfo | null>(null);

    useEffect(() => {
        const customerKey = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_KEY || '';
        const customerSecret = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_SECRET || '';

        const isDev = import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';
        const baseUrl = isDev ? '' : 'https://www.agrofert.com.co';

        const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${customerKey}&consumer_secret=${customerSecret}&per_page=100&_fields=id,name,description,short_description,images,categories,attributes`;

        const maskedUrl = `${isDev ? '[LOCAL PROXY]' : 'https://www.agrofert.com.co'}/wp-json/wc/v3/products?consumer_key=ck_7752...1c2a&consumer_secret=cs_bbe4...2477&per_page=100`;

        console.group("%c[WooCommerce API Connection Debug]", "color: #16a34a; font-weight: bold; font-size: 13px;");
        console.log("Iniciando petición a la API de WooCommerce...");

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
                        requestUrl: maskedUrl,
                        analyzedIssue,
                        detailedSolution: getDetailedSolutionText(analyzedIssue)
                    });
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: WCProduct[]) => {
                if (!Array.isArray(data)) throw new Error("El formato de datos devuelto no es un arreglo válido.");

                const mappedData: MappedProduct[] = data.map((item) => {
                    console.log(`Procesando producto ID ${item.id}: ${item.name}`);

                    let categoriesArray: string[] = [];

                    if (item.categories && item.categories.length > 0) {
                        for (const cat of item.categories) {
                            const firstCat = cat.slug.toLowerCase();

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

                    const rawShort = item.short_description || "";
                    const cleanShort = rawShort.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();

                    let finalDescription = cleanShort;
                    let composition = "Ver especificaciones técnicas";
                    let application = "Consulte con nuestros asesores";

                    const parsedData = parseWooCommerceDescription(item.description || "");

                    if (parsedData) {
                        finalDescription = parsedData.description;
                        application = parsedData.application;
                        composition = parsedData.composition;
                    } else {
                        if (item.attributes && item.attributes.length > 0) {
                            const compAttr = item.attributes.find(attr => attr.name.toLowerCase().includes("composic") || attr.name.toLowerCase().includes("composición"));
                            const appAttr = item.attributes.find(attr => attr.name.toLowerCase().includes("aplicac") || attr.name.toLowerCase().includes("aplicación"));

                            if (compAttr && compAttr.options?.length > 0) composition = compAttr.options.join(", ");
                            if (appAttr && appAttr.options?.length > 0) application = appAttr.options.join(", ");
                        }
                        const rawFull = item.description || item.short_description || "";
                        finalDescription = rawFull.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
                    }

                    const cardDesc = cleanShort || (finalDescription.length > 120 ? finalDescription.substring(0, 117) + "..." : finalDescription) || "Sin descripción disponible";

                    const primaryCategoryForIcon = categoriesArray[0] || "all";

                    // =======================================================
                    // SOLUCIÓN: EXTRACTOR CON FILTRADO DE IMAGEN DUPLICADA
                    // =======================================================
                    // Si hay más de una imagen, excluimos la primera (index 0) para que no se repita en la ficha técnica.
                    const allImagesMapped = item.images && item.images.length > 1
                        ? item.images.slice(1).map(img => ({ src: img.src }))
                        : [];

                    return {
                        id: item.id,
                        name: item.name,
                        category: categoriesArray,
                        description: cardDesc,
                        fullDescription: finalDescription || "Sin descripción detallada disponible.",
                        composition: composition,
                        application: application,
                        image: item.images && item.images.length > 0 ? item.images[0].src : undefined,
                        images: allImagesMapped, // Galería limpia sin la foto de portada repetida
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
                        requestUrl: maskedUrl,
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