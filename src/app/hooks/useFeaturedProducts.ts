// app/hooks/useFeaturedProducts.ts
import { useState, useEffect } from "react";
import { productsService } from "../services/productsService";
import { EstrellaProduct } from "../interfaces/types/types";

export const useFeaturedProducts = () => {
    const [productos, setProductos] = useState<EstrellaProduct[]>(() => productsService.getFeaturedProducts());
    const [loading, setLoading] = useState<boolean>(() => productsService.getIsLoading());
    const [isFallback, setIsFallback] = useState<boolean>(() => productsService.getIsFallback());

    useEffect(() => {
        const updateState = () => {
            setProductos(productsService.getFeaturedProducts());
            setLoading(productsService.getIsLoading());
            setIsFallback(productsService.getIsFallback());
        };

        // Si ya están listos los datos, actualizamos el estado inicial de inmediato
        updateState();

        const unsubscribe = productsService.subscribe(updateState);
        productsService.fetchProducts();

        return unsubscribe;
    }, []);

    return { productos, loading, isFallback };
};