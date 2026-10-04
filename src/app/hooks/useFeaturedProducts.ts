// app/hooks/useFeaturedProducts.ts
import { useState, useEffect } from "react";
import { EstrellaProduct } from "../interfaces/types/types";
import { PRODUCTOS_ESTRELLA_STATIC } from "../utils/constants";
import { buildProductDescriptions } from "../utils/utils";

export const useFeaturedProducts = () => {
    const [productos, setProductos] = useState<EstrellaProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        const customerKey = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_KEY || '';
        const customerSecret = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_SECRET || '';

        const isDev = import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';
        const baseUrl = isDev ? '' : 'https://www.agrofert.com.co';

        const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${customerKey}&consumer_secret=${customerSecret}&include=26680,26665,23376,23351,23394,23377,23332,23406&_fields=id,name,description,short_description,images,tags,attributes`;

        console.group("%c[Home Featured Products Fetch]", "color: #2563eb; font-weight: bold;");

        if (!customerKey || !customerSecret) {
            console.warn("Claves no configuradas. Cargando fallback.");
            setProductos(PRODUCTOS_ESTRELLA_STATIC);
            setIsFallback(true);
            setLoading(false);
            console.groupEnd();
            return;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error("No se encontraron productos estrella.");
                }

                // Filtramos los destacados que tengan la categoría/etiqueta "oculto"
                const filteredData = data.filter((item: any) => {
                    const hasHiddenCategory = item.categories?.some((cat: any) => 
                        cat.slug.toLowerCase().includes("oculto") || 
                        cat.name.toLowerCase().includes("oculto")
                    );
                    return !hasHiddenCategory;
                });

                const mappedData: EstrellaProduct[] = filteredData.map((item: any) => {
                    const {
                        cardDescription,
                        fullDescription,
                        application,
                        composition
                    } = buildProductDescriptions(
                        item.short_description,
                        item.description
                    );

                    const compositionArray =
                        composition
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);



                    // =======================================================
                    // SOLUCIÓN: EXTRACTOR CON FILTRADO DE IMAGEN DUPLICADA
                    // =======================================================
                    // Extraemos del index 1 en adelante para no duplicar la foto principal (index 0)
                    const allUrlsArray = item.images && item.images.length > 1
                        ? item.images.slice(1).map((img: any) => img.src)
                        : [];

                    return {
                        id: item.id,
                        nombre: item.name,
                        descBreve: cardDescription,
                        descLarga: fullDescription,
                        aplicacion: application,
                        composicion: compositionArray,
                        img: item.images?.length > 0 ? item.images[0].src : undefined,
                        imagenes: allUrlsArray,
                        tags: item.tags || []
                    };
                });

                const desiredOrder = [26680,26665,23376,23351,23394,23377,23332,23406];
                mappedData.sort((a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id));

                setProductos(mappedData);
                setLoading(false);
                console.groupEnd();
            })
            .catch((error) => {
                console.error("Fallo al consumir productos destacados:", error);
                setProductos(PRODUCTOS_ESTRELLA_STATIC);
                setIsFallback(true);
                setLoading(false);
                console.groupEnd();
            });
    }, []);

    return { productos, loading, isFallback };
};