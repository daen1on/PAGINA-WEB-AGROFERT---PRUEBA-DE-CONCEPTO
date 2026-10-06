// app/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { productsService } from "../services/productsService";
import { MappedProduct, ApiDebugInfo } from "../interfaces/types/types";

export const useProducts = () => {
    const [productos, setProductos] = useState<MappedProduct[]>(() => productsService.getMappedProducts());
    const [loading, setLoading] = useState<boolean>(() => productsService.getIsLoading());
    const [isFallback, setIsFallback] = useState<boolean>(() => productsService.getIsFallback());
    const [apiDebugInfo, setApiDebugInfo] = useState<ApiDebugInfo | null>(() => productsService.getApiDebugInfo());

    useEffect(() => {
        const updateState = () => {
            setProductos(productsService.getMappedProducts());
            setLoading(productsService.getIsLoading());
            setIsFallback(productsService.getIsFallback());
            setApiDebugInfo(productsService.getApiDebugInfo());
        };

        // Si ya están listos los datos, actualizamos el estado inicial de inmediato
        updateState();

        const unsubscribe = productsService.subscribe(updateState);
        productsService.fetchProducts();

        return unsubscribe;
    }, []);

    return { productos, loading, isFallback, apiDebugInfo };
};