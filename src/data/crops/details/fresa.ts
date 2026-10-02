import { CropDetail } from "../types";
import heroImg from "../../../assets/fresas.jpg";
import planImg from "../../../assets/PLAN FERTILIZACION AGROFERT_FRESA.png";

export const fresa: CropDetail = {
        id: 1,
        slug: "fresa",
    
        name: "Fresa",

        heroImage: heroImg,
        planImage: planImg,

        cardDescription:
        "Programa de nutrición intensiva para maximizar el calibre, color y grados Brix del fruto.",

        heroText: "Guía completa para el manejo nutricional y fitosanitario. Maximiza el calibre, color y grados Brix de tu producción.",
        
        featuredNutrients: [
            "Calcio para firmeza y vida de anaquel",
            "Potasio para tamaño y dulzor",
            "Fósforo para desarrollo radicular continuo",
        ],

        stats: {
        clima: "Templado (15°C - 20°C)",
        riego: "Por goteo (Frecuente)",
        suelo: "Franco-arenoso / 5.5 - 6.5",
        },
        process: [
        "La fresa es un cultivo de alto rendimiento que exige un programa nutricional muy preciso. Al ser una planta de raíces superficiales, es altamente sensible al déficit o exceso de humedad, por lo que el riego por goteo es obligatorio para evitar pudriciones y lavar nutrientes.",
        "Preparación del terreno: Se recomienda levantar camas altas (camellones) cubiertas con acolchado plástico (mulch) para controlar malezas, mantener la humedad y evitar que el fruto toque la tierra, reduciendo drásticamente la incidencia de hongos."
        ],
        diseases: [
        {
            name: "Botrytis (Moho Gris)",
            desc: "Hongo que ataca las flores y pudre el fruto cubriéndolo de un polvo gris. Aparece por alta humedad.",
            solution: "Controlar riego, ventilación y aplicar fungicidas preventivos en pre-floración."
        },
        {
            name: "Arañita Roja",
            desc: "Plaga que se ubica en el envés de las hojas, tejiendo telarañas finas y secando la planta.",
            solution: "Aplicación de acaricidas específicos y mantener buena humedad foliar."
        }
        ],
        nutrition: [
        {
            nutrient: "Calcio (Ca)",
            desc: "Fundamental para la firmeza del fruto y prolongar su vida de anaquel."
        },
        {
            nutrient: "Potasio (K)",
            desc: "Responsable directo del aumento de tamaño y los azúcares (Grados Brix)."
        },
        {
            nutrient: "Fósforo (P)",
            desc: "Esencial en el inicio para asegurar un sistema radicular fuerte."
        }
        ],
        products: [
          "NPK Agrofert",
          "Hidrostar",
          "Humifos K",
          "Creci Yan",
          "fCuaje Yan",
          "Magnesio Agrofer",
          "Nutrifos K",
          "Starmin-k",
          "Bullterr K",
          "Nitro"
        ],
        hotspots: [
          // PLAN 1 (Fila Superior - Rosa) - Tooltips abajo
          { name: "NPK Agrofert", x: 16, y: 28, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "Hidrostar", x: 16, y: 33, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "Humifos K", x: 33, y: 28, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "Creci Yan", x: 33, y: 33, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "fCuaje Yan", x: 49, y: 28, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "Magnesio", x: 49, y: 33, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "Nutrifos K", x: 65, y: 28, w: 14, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "Starmin-k", x: 65, y: 33, w: 14, h: 5, showDot: false, tooltipPosition: "bottom" },
          { name: "Bullterr K", x: 82, y: 30, w: 11, h: 7, showDot: false, tooltipPosition: "bottom" },

          // PLAN 2 (Fila Inferior - Verde) - Tooltips arriba
          { name: "Humifos K", x: 16, y: 42, w: 16, h: 6, showDot: false, tooltipPosition: "top" },
          { name: "Nitro", x: 33, y: 38, w: 16, h: 4, showDot: false, tooltipPosition: "top" },
          { name: "Magnesio", x: 33, y: 45.5, w: 16, h: 3, showDot: false, tooltipPosition: "top" },
          { name: "Starmin-k", x: 49, y: 42, w: 16, h: 6, showDot: false, tooltipPosition: "top" },
          { name: "Nutrifos K", x: 65, y: 42, w: 14, h: 6, showDot: false, tooltipPosition: "top" },
          { name: "Bullterr K", x: 82, y: 42, w: 11, h: 6, showDot: false, tooltipPosition: "top" },
        ]
};
