// app/interfaces/types/types.ts
export interface WCProduct {
    id: number;
    name: string;
    description: string;
    short_description: string;
    images: { src: string }[];
    categories: { id: number; name: string; slug: string }[];
    attributes: { name: string; options: string[] }[];
}

export interface MappedProduct {
    id: number;
    name: string;
    category: string | string[];
    description: string;
    fullDescription?: string;
    composition: string;
    application: string;
    image?: string;
    images?: string[]; // <-- NUEVO: Para el carrusel del modal
    icon: React.ComponentType<any>;
}

export interface ApiDebugInfo {
    status: number | null;
    statusText: string;
    errorName: string;
    errorMessage: string;
    timestamp: string;
    requestUrl: string;
    analyzedIssue: "cors" | "credentials" | "not_found" | "generic_network" | "none";
    detailedSolution: string;
    rawErrorStack?: string;
}

export interface EstrellaProduct {
    id: number;
    nombre: string;
    descBreve: string;
    descLarga: string;
    aplicacion: string;
    composicion: string[];
    img?: string;
    imagenes?: string[]; // <-- NUEVO: Para el carrusel del modal en Home
}