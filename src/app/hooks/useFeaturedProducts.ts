// app/hooks/useFeaturedProducts.ts
import { useState, useEffect } from "react";
import { EstrellaProduct } from "../interfaces/types/types";
import { PRODUCTOS_ESTRELLA_STATIC } from "../utils/constants";
import { parseWooCommerceDescription } from "../utils/utils";

export const useFeaturedProducts = () => {
    const [productos, setProductos] = useState<EstrellaProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        const customerKey = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_KEY || '';
        const customerSecret = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_SECRET || '';

        const isDev = import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';
        const baseUrl = isDev ? '' : 'https://www.agrofert.com.co';

        // Agregamos _fields para optimizar el rendimiento de descarga
        const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${customerKey}&consumer_secret=${customerSecret}&include=23376,23351,23394,23377,23332,23406,23419&_fields=id,name,description,short_description,images,attributes`;

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

                const mappedData: EstrellaProduct[] = data.map((item: any) => {
                    const parsed = parseWooCommerceDescription(item.description || '');
                    let descLarga = "Sin descripción detallada disponible.";
                    let application = "Consulte con nuestros asesores";
                    let compositionArray = ["Ver especificaciones técnicas"];

                    if (parsed) {
                        descLarga = parsed.description || descLarga;
                        application = parsed.application;
                        compositionArray = parsed.composition ? parsed.composition.split(',').map((s: string) => s.trim()).filter(Boolean) : compositionArray;
                    } else {
                        descLarga = (item.description || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() || descLarga;
                        if (item.attributes?.length > 0) {
                            const compAttr = item.attributes.find((attr: any) => attr.name.toLowerCase().includes("composic"));
                            const appAttr = item.attributes.find((attr: any) => attr.name.toLowerCase().includes("aplicac"));
                            if (compAttr?.options?.length > 0) compositionArray = compAttr.options.join(", ").split(",").map((s: string) => s.trim());
                            if (appAttr?.options?.length > 0) application = appAttr.options.join(", ");
                        }
                    }

                    const rawBreve = (item.short_description || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
                    const shortDesc = rawBreve
                        ? (rawBreve.length > 120 ? rawBreve.substring(0, 117) + '...' : rawBreve)
                        : (descLarga.length > 120 ? descLarga.substring(0, 117) + '...' : descLarga);

                    return {
                        id: item.id,
                        nombre: item.name,
                        descBreve: shortDesc || "Sin descripción corta disponible.",
                        descLarga,
                        aplicacion: application,
                        composicion: compositionArray,
                        img: item.images?.length > 0 ? item.images[0].src : undefined,
                    };
                });

                const desiredOrder = [23376, 23351, 23394, 23377, 23332, 23406, 23419];
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