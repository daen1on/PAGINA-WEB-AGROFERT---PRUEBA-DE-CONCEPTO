// app/services/productsService.ts
import { WCProduct, MappedProduct, EstrellaProduct, ApiDebugInfo } from "../interfaces/types/types";
import { STATIC_PRODUCTS, PRODUCTOS_ESTRELLA_STATIC } from "../utils/constants";
import { getIconForCategory, getDetailedSolutionText, buildProductDescriptions } from "../utils/utils";

const FEATURED_IDS = [26680, 26665, 23376, 23351, 23394, 23377, 23332, 23406];

class ProductsService {
    private rawProducts: WCProduct[] | null = null;
    private mappedProducts: MappedProduct[] | null = null;
    private featuredProducts: EstrellaProduct[] | null = null;
    private isFallback: boolean = false;
    private apiDebugInfo: ApiDebugInfo | null = null;
    private loading: boolean = false;
    private fetchPromise: Promise<void> | null = null;
    private listeners = new Set<() => void>();

    private notify() {
        this.listeners.forEach((fn) => {
            try {
                fn();
            } catch (err) {
                console.error("Error en listener de ProductsService:", err);
            }
        });
    }

    public subscribe(listener: () => void) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    public getMappedProducts(): MappedProduct[] {
        return this.mappedProducts || [];
    }

    public getFeaturedProducts(): EstrellaProduct[] {
        return this.featuredProducts || [];
    }

    public getIsLoading(): boolean {
        // Si no está mapeado y no es fallback, está en proceso o pendiente
        if (this.mappedProducts !== null || this.isFallback) {
            return false;
        }
        return true;
    }

    public getIsFallback(): boolean {
        return this.isFallback;
    }

    public getApiDebugInfo(): ApiDebugInfo | null {
        return this.apiDebugInfo;
    }

    public fetchProducts(): Promise<void> {
        // 1. Si ya tenemos los datos en memoria, devolvemos inmediatamente sin petición de red
        if (this.mappedProducts !== null || this.isFallback) {
            return Promise.resolve();
        }

        // 2. Si ya hay una petición en curso, reutilizamos la misma promesa (deduplicación)
        if (this.fetchPromise) {
            return this.fetchPromise;
        }

        this.loading = true;

        const isDev = import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';
        const baseUrl = isDev ? '' : 'https://www.agrofert.com.co';
        const url = `${baseUrl}/wp-json/agrofert/v1/products?per_page=100`;

        console.group("%c[Agrofert API - Unified Products Fetch]", "color: #16a34a; font-weight: bold; font-size: 13px;");
        console.log(`Iniciando llamada única a endpoint público seguro: ${url}`);

        this.fetchPromise = fetch(url)
            .then(async (response) => {
                if (!response.ok) {
                    let analyzedIssue: "cors" | "credentials" | "not_found" | "generic_network" | "none" = "none";
                    if (response.status === 401 || response.status === 403) analyzedIssue = "credentials";
                    else if (response.status === 404) analyzedIssue = "not_found";

                    this.apiDebugInfo = {
                        status: response.status,
                        statusText: response.statusText,
                        errorName: "HTTP Response Error",
                        errorMessage: `La petición falló con código de estado HTTP ${response.status}.`,
                        timestamp: new Date().toLocaleTimeString(),
                        requestUrl: url,
                        analyzedIssue,
                        detailedSolution: getDetailedSolutionText(analyzedIssue)
                    };
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: WCProduct[]) => {
                if (!Array.isArray(data)) {
                    throw new Error("El formato de datos devuelto no es un arreglo válido.");
                }

                this.rawProducts = data;

                // Filtrar productos excluyendo categoría 'oculto'
                const filteredData = data.filter((item) => {
                    const hasHiddenCategory = item.categories?.some((cat) =>
                        cat.slug?.toLowerCase().includes("oculto") ||
                        cat.name?.toLowerCase().includes("oculto")
                    );
                    return !hasHiddenCategory;
                });

                // Mapear catálogo completo
                this.mappedProducts = filteredData.map((item) => {
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

                    // Evitar duplicar imagen principal en la galería
                    const allImagesMapped = item.images && item.images.length > 1
                        ? item.images.slice(1).map((img) => typeof img === 'string' ? img : img.src)
                        : [];

                    return {
                        id: item.id,
                        name: item.name,
                        category: categoriesArray,
                        description: cardDescription,
                        fullDescription: fullDescription || "Sin descripción detallada disponible.",
                        composition: composition,
                        application: application,
                        image: item.images && item.images.length > 0
                            ? (typeof item.images[0] === 'string' ? item.images[0] : item.images[0].src)
                            : undefined,
                        images: allImagesMapped as any,
                        tags: item.tags || [],
                        icon: getIconForCategory(primaryCategoryForIcon),
                    };
                });

                // Mapear productos destacados a EstrellaProduct
                const featuredFiltered = filteredData.filter((item) => FEATURED_IDS.includes(item.id));
                const mappedFeatured: EstrellaProduct[] = featuredFiltered.map((item) => {
                    const {
                        cardDescription,
                        fullDescription,
                        application,
                        composition
                    } = buildProductDescriptions(
                        item.short_description || "",
                        item.description || ""
                    );

                    const compositionArray = composition
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);

                    const allUrlsArray = item.images && item.images.length > 1
                        ? item.images.slice(1).map((img) => typeof img === 'string' ? img : img.src)
                        : [];

                    return {
                        id: item.id,
                        nombre: item.name,
                        descBreve: cardDescription,
                        descLarga: fullDescription,
                        aplicacion: application,
                        composicion: compositionArray,
                        img: item.images && item.images.length > 0
                            ? (typeof item.images[0] === 'string' ? item.images[0] : item.images[0].src)
                            : undefined,
                        imagenes: allUrlsArray,
                        tags: item.tags || []
                    };
                });

                // Ordenar según el orden deseado
                mappedFeatured.sort((a, b) => FEATURED_IDS.indexOf(a.id) - FEATURED_IDS.indexOf(b.id));

                this.featuredProducts = mappedFeatured.length > 0 ? mappedFeatured : PRODUCTOS_ESTRELLA_STATIC;
                this.isFallback = false;
                this.loading = false;

                console.log(`Catálogo cargado en llamada única: ${this.mappedProducts.length} productos, ${mappedFeatured.length} destacados.`);
                console.groupEnd();
                this.notify();
            })
            .catch((error: any) => {
                if (!this.apiDebugInfo) {
                    const isCorsOrNetwork = error instanceof TypeError && error.message.toLowerCase().includes("failed to fetch");
                    const analyzedIssue = isCorsOrNetwork ? "cors" : "generic_network";
                    this.apiDebugInfo = {
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
                }

                console.warn("Fallo al consumir API de Agrofert. Activando fallback local:", error);
                this.mappedProducts = STATIC_PRODUCTS as any;
                this.featuredProducts = PRODUCTOS_ESTRELLA_STATIC;
                this.isFallback = true;
                this.loading = false;
                console.groupEnd();
                this.notify();
            })
            .finally(() => {
                this.fetchPromise = null;
            });

        return this.fetchPromise;
    }
}

export const productsService = new ProductsService();
export const preloadProducts = () => productsService.fetchProducts();
