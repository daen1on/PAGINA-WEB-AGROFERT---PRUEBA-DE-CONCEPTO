// constants.ts
import { Leaf, Droplet, Zap, Shield } from "lucide-react";
import { EstrellaProduct } from "../interfaces/types/types";
export const CATEGORIES = [
    { id: "all", label: "Todos" },
    { id: "nitrogenados", label: "Nitrogenados" },
    { id: "fosforados", label: "Fosforados" },
    { id: "potasicos", label: "Potásicos" },
    { id: "organicos", label: "Orgánicos" },
    { id: "micronutrientes", label: "Micronutrientes" },
];

export const STATIC_PRODUCTS = [
    {
        id: 1,
        name: "Urea Granulada 46%",
        category: "nitrogenados",
        description: "Fertilizante nitrogenado de alta concentración para máximo rendimiento",
        composition: "46% Nitrógeno (N)",
        application: "Cereales, forrajes, cultivos extensivos",
        icon: Leaf,
    },
    {
        id: 2,
        name: "Nitrato de Amonio",
        category: "nitrogenados",
        description: "Acción rápida y sostenida para nutrición nitrogenada",
        composition: "33.5% Nitrógeno (N)",
        application: "Maíz, trigo, pasturas",
        icon: Leaf,
    },
    {
        id: 3,
        name: "Fosfato Diamónico (DAP)",
        category: "fosforados",
        description: "Fertilizante fosfatado con nitrógeno para arranque de cultivos",
        composition: "18% N - 46% P₂O₅",
        application: "Siembra de cereales, oleaginosas",
        icon: Droplet,
    },
    {
        id: 4,
        name: "Superfosfato Triple",
        category: "fosforados",
        description: "Alta concentración de fósforo para desarrollo radicular",
        composition: "46% P₂O₅",
        application: "Todos los cultivos en fase inicial",
        icon: Droplet,
    },
    {
        id: 5,
        name: "Cloruro de Potasio",
        category: "potasicos",
        description: "Fuente de potasio para calidad y resistencia del cultivo",
        composition: "60% K₂O",
        application: "Frutales, hortalizas, soja",
        icon: Zap,
    },
    {
        id: 6,
        name: "Sulfato de Potasio",
        category: "potasicos",
        description: "Potasio sin cloruro para cultivos sensibles",
        composition: "50% K₂O - 18% S",
        application: "Hortalizas, papa, tabaco",
        icon: Zap,
    },
    {
        id: 7,
        name: "Compost Orgánico Premium",
        category: "organicos",
        description: "Mejora la structure y fertilidad del suelo",
        composition: "Materia orgánica 65%",
        application: "Todos los cultivos orgánicos",
        icon: Shield,
    },
    {
        id: 8,
        name: "Humus de Lombriz",
        category: "organicos",
        description: "Bioestimulante natural rico en microorganismos",
        composition: "Materia orgánica 55%",
        application: "Horticultura, jardinería",
        icon: Shield,
    },
    {
        id: 9,
        name: "Boro Soluble",
        category: "micronutrientes",
        description: "Esencial para floración y fructificación",
        composition: "17% Boro (B)",
        application: "Frutales, girasol, alfalfa",
        icon: Droplet,
    },
    {
        id: 10,
        name: "Zinc Quelado",
        category: "micronutrientes",
        description: "Previene y corrige deficiencias de zinc",
        composition: "14% Zinc (Zn) quelado",
        application: "Maíz, cítricos, vid",
        icon: Droplet,
    },
    {
        id: 11,
        name: "NPK 15-15-15",
        category: "all",
        description: "Fertilizante balanceado para mantenimiento general",
        composition: "15% N - 15% P₂O₅ - 15% K₂O",
        application: "Cultivos en general",
        icon: Leaf,
    },
    {
        id: 12,
        name: "NPK 20-10-10",
        category: "all",
        description: "Alto en nitrógeno para fase vegetativa",
        composition: "20% N - 10% P₂O₅ - 10% K₂O",
        application: "Cultivos en crecimiento vegetativo",
        icon: Leaf,
    },
];
export const PRODUCTOS_ESTRELLA_STATIC: EstrellaProduct[] = [
    {
        id: 1,
        nombre: "Nutrifos K",
        descBreve: "Fósforo y potasio de máxima concentración sinergizados con boro y zinc.",
        descLarga: "Fósforo y potasio de máxima concentración sinergizados con boro, zinc y elementos orgánicos que optimizan los procesos productivos...",
        aplicacion: "Manejar en la dosis recomendada ya que a mayor concentración puede acelerar la maduración de los frutos.",
        composicion: ["Potasio Total (K2O): 600 g/L", "Fosforo Total (P2O5): 400 g/L", "Boro (B): 3 g/L", "Zinc (Zn): 5 g/L", "Solubilidad en agua: 100%", "Densidad: 1,35 g/ml"],
        img: "/src/assets/nutrifos.png"
    },
    {
        id: 2,
        nombre: "Nitro",
        descBreve: "Alta concentración de nitrógeno, fósforo y magnesio. Estimula la clorofila.",
        descLarga: "Nutriente de alta concentración de nitrógeno, fósforo y magnesio. Estimula la síntesis clorofílica para un mayor desempeño y crecimiento.",
        aplicacion: "Foliar: 1 L/200 L, ó 3-4 L/Ha (sólo o en mezcla). Edáfica: 1,0 L/1000 L, en tanque para aplicación directa, ó 3 L/Ha.",
        composicion: ["Nitrógeno Total (K2O): 205 g/L", "Fosforo Total (P2O5): 40 g/L", "Magnesio (MgO): 40 g/L", "Solubilidad en agua: 99%", "Densidad: 1,29 g/ml"],
        img: "/src/assets/nitro.png"
    },
    {
        id: 3,
        nombre: "Magnesio Agrofer",
        descBreve: "Magnesio altamente concentrado, esencial para los procesos de fotosíntesis.",
        descLarga: "Magnesio altamente concentrado y de alta asimilación, esencial en todos los procesos de fotosíntesis: es el núcleo de la clorofila para tomar la energía solar...",
        aplicacion: "Foliar: 0,5-1,0 L/200 L. Fertirrigación diaria recomendada: 0,5 L /1000 L.",
        composicion: ["Magnesio Total (MgO): 130 g/L", "Nitrógeno (N): 100 g/L", "Solubilidad en agua: 100%", "Densidad: 1,3 g/ml"],
        img: "/src/assets/magnesio.png"
    },
    {
        id: 4,
        nombre: "Bullterr K",
        descBreve: "Alta concentración de potasio para máxima respuesta en la carga de frutos.",
        descLarga: "Alta concentración de potasio, sinergizado con magnesio, boro y cobre. Eleva los promedios de rendimiento y calidad.",
        aplicacion: "Foliar: 0,5 a 1,0 L/200 L, ó 3-4 L/Ha. Edáfica: máx 1,0 L/1000 L ó 3 L/Ha. Aplicar al inicio del cuajado de frutos para favorecer el amarre.",
        composicion: ["Potasio Total (K2O): 500 g/L", "Magnesio (MgO): 8 g/L", "Azufre (S): 8 g/L", "Boro (B): 17 g/L", "Cobre (Cu): 1.5 g/L", "Manganeso (Mn): 4 g/L", "Solubilidad: 100%", "Densidad: 1,8 g/mL"],
        img: "/src/assets/bullterr.png"
    },
    {
        id: 5,
        nombre: "NPK Agrofert",
        descBreve: "Complejo de alta concentración para promover la diferenciación celular.",
        descLarga: "Fertilizante complejo de alta concentración con NPK, secundarios y micro-elementos. Ideal durante todo el ciclo de los cultivos...",
        aplicacion: "Foliar: 1 L/200 L, ó 3-4 L/Ha (sólo o en mezcla). Edáfica: 1,0 L/1000 L en tanque ó 3 L/Ha.",
        composicion: ["Nitrógeno Total (N): 100.0 g/L", "Nitrógeno Nítrico (N): 14.5 g/L", "Nitrógeno Ureico (N): 85.5 g/L", "Fósforo Soluble (P2O5): 300.0 g/L", "Potasio Soluble (K2O): 100.0 g/L", "Calcio (CaO): 10.0 g/L"],
        img: "/src/assets/npk.png"
    },
    {
        id: 6,
        nombre: "Hidrafos Agrofert",
        descBreve: "Fuente fosfórica de alta concentración recomendada para etapas de máxima exigencia.",
        descLarga: "Fósforo es un elemento esencial en todos los procesos de la planta, dado que conforma la molécula energética básica.",
        aplicacion: "Foliar: 0,3-0.5 L/200 L, o en soluciones nutritivas según recomendación del plan nutricional.",
        composicion: ["Fósforo Total (P2O5): 616 g/L", "Solubilidad en agua: 100%", "Densidad: 1,37 g/mL"],
        img: "/src/assets/hidrafos.png"
    },
    {
        id: 7,
        nombre: "Nitrato de potasio",
        descBreve: "Ideal para cultivos sensibles al cloruro. Mejora calidad y tamaño de frutos.",
        descLarga: "Suministra potasio y nitrógeno a cultivos sensibles como tabaco, cítricos y frutales tropicales. No genera problemas de salinidad ni sulfatación...",
        aplicacion: "Foliar: 1-2 Kg/200 L. Dosis efectiva general: 1000 ppm, ó 1 Kg por 1000 L.",
        composicion: ["Potasio Total (K): 46%", "Nitrógeno (N): 13%", "pH al 10%: 6.5"],
        img: "/src/assets/nitratodepotasio.png"
    }
];