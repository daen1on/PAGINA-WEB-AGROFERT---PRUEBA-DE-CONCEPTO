import { CropDetail } from "../types";
import heroImg from "../../../assets/tomate.jpg";
import planImg from "../../../assets/PLAN FERTILIZACION AGROFERT_TOMATE.png";

export const tomate: CropDetail = {
        id: 2,
        slug: "tomate",
    
        name: "Tomate",
        heroImage: heroImg,
        planImage: planImg,
        cardDescription:
        "Programa nutricional diseñado para mejorar el cuajado, llenado y calidad del fruto en cultivos de tomate.",
        heroText:
        "Programa nutricional especializado para maximizar el cuajado, desarrollo, firmeza y calidad del fruto durante todo el ciclo del cultivo.",
        featuredNutrients: [
            "Nitrógeno para crecimiento equilibrado",
            "Calcio para firmeza y prevención de pudrición apical",
            "Potasio para llenado, color y calidad del fruto",
        ],
        stats: {
        clima: "Templado (18°C - 27°C)",
        riego: "Goteo",
        suelo: "Franco-arenoso, bien drenado / pH 5.5 - 6.8",
        },
        process: [
        "El tomate requiere suelos fértiles, bien drenados y ricos en materia orgánica. Un adecuado manejo del riego por goteo permite mantener una humedad constante, favoreciendo el desarrollo radicular y reduciendo la incidencia de enfermedades.",
        "Durante las etapas de floración y llenado del fruto es indispensable mantener un equilibrio nutricional, especialmente de calcio y potasio, para obtener frutos uniformes, firmes y con excelente calidad comercial."
        ],
        diseases: [
        {
            name: "Tizón Tardío (Phytophthora infestans)",
            desc: "Enfermedad causada por un hongo que provoca manchas oscuras en hojas, tallos y frutos, avanzando rápidamente en condiciones de alta humedad.",
            solution: "Realizar monitoreo constante, mejorar la ventilación del cultivo y aplicar fungicidas preventivos y curativos según el nivel de riesgo."
        },
        {
            name: "Pudrición Apical",
            desc: "Desorden fisiológico asociado principalmente a deficiencias de calcio y fluctuaciones en la humedad del suelo.",
            solution: "Mantener un riego uniforme y asegurar un adecuado suministro de calcio durante el desarrollo del fruto."
        }
        ],
                nutrition: [
        {
            nutrient: "Nitrógeno (N)",
            desc: "Favorece el crecimiento vegetativo equilibrado durante las primeras etapas del cultivo."
        },
        {
            nutrient: "Calcio (Ca)",
            desc: "Fundamental para obtener frutos firmes y prevenir la pudrición apical."
        },
        {
            nutrient: "Potasio (K)",
            desc: "Mejora el llenado, color, firmeza y calidad final del fruto."
        }
        ],
        products: [
          "Hidrostar",
          "Creci Yan",
          "fCuaje Yan",
          "Nutrifos K",
          "Calcio",
          "Magnesio Agrofer",
          "Bullterr K",
          "Hidrafos 400",
          "Nitro",
          "Humika 150",
          "NPK Agrofert",
          "Starmin-k",
          "Hidrón Producción",
          "Humifos K",
          "Aminox V",
          "K-Thion"
        ],
        hotspots: [
          // PLAN 1 (Fila Superior - Rosa) - Tooltips abajo
          // Col 1: Establecimiento (Hidrostar)
          { name: "Hidrostar", x: 14.5, y: 24.0, w: 7.5, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 2: Desarrollo vegetativo (Creci Yan)
          { name: "Creci Yan", x: 29.0, y: 24.0, w: 7.5, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 3: Primera floración (fCuaje Yan)
          { name: "fCuaje Yan", x: 42.5, y: 24.0, w: 8.5, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 4: Primer desarrollo de frutos (Nutrifos-k)
          { name: "Nutrifos K", x: 57.0, y: 24.0, w: 8.5, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 5: Inicio de cosecha (Calcio + Magnesio)
          { name: "Calcio", x: 71.5, y: 22.8, w: 8.0, h: 2.2, showDot: false, tooltipPosition: "bottom" },
          { name: "Magnesio", x: 71.5, y: 25.4, w: 8.0, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 6: Cosecha (Bullterr-k + Calcio)
          { name: "Bullterr K", x: 85.5, y: 22.8, w: 8.5, h: 2.2, showDot: false, tooltipPosition: "bottom" },
          { name: "Calcio", x: 85.5, y: 25.4, w: 8.5, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // PLAN 2 (Fila Intermedia - Verde) - Tooltips abajo
          // Col 1: Establecimiento (Hidrafos 400)
          { name: "Hidrafos 400", x: 14.5, y: 34.0, w: 7.5, h: 5.2, showDot: false, tooltipPosition: "bottom" },

          // Col 2: Desarrollo vegetativo (Nitro + Humika 150)
          { name: "Nitro", x: 28.0, y: 33.5, w: 9.0, h: 2.5, showDot: false, tooltipPosition: "bottom" },
          { name: "Humika 150", x: 28.0, y: 36.5, w: 9.0, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 3: Primera floración (Magnesio + NPK Agrofert)
          { name: "Magnesio", x: 41.5, y: 33.3, w: 10.5, h: 2.5, showDot: false, tooltipPosition: "bottom" },
          { name: "NPK Agrofert", x: 41.5, y: 36.3, w: 10.5, h: 2.7, showDot: false, tooltipPosition: "bottom" },

          // Col 4: Primer desarrollo de frutos (Nutrifos-k)
          { name: "Nutrifos K", x: 56.5, y: 34.8, w: 9.0, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 5: Inicio de cosecha (Starmin-k)
          { name: "Starmin-k", x: 71.0, y: 34.8, w: 9.0, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 6: Cosecha (Hidrón producción + Calcio)
          { name: "Hidrón Producción", x: 82.5, y: 33.5, w: 14.5, h: 2.8, showDot: false, tooltipPosition: "bottom" },
          { name: "Calcio", x: 86.0, y: 36.8, w: 7.8, h: 2.5, showDot: false, tooltipPosition: "bottom" },

          // PLAN 3 (Fila Inferior - Rojo) - Tooltips arriba
          // Col 1: Establecimiento (Humifos-k)
          { name: "Humifos K", x: 14.0, y: 44.8, w: 8.5, h: 2.6, showDot: false, tooltipPosition: "top" },

          // Col 2: Desarrollo vegetativo (Nitro + Magnesio)
          { name: "Nitro", x: 28.5, y: 44.0, w: 8.5, h: 2.5, showDot: false, tooltipPosition: "top" },
          { name: "Magnesio", x: 28.5, y: 47.0, w: 8.5, h: 2.7, showDot: false, tooltipPosition: "top" },

          // Col 3: Primera floración (Aminox v)
          { name: "Aminox V", x: 42.5, y: 45.0, w: 8.0, h: 2.6, showDot: false, tooltipPosition: "top" },

          // Col 4: Primer desarrollo de frutos (fCuaje Yan)
          { name: "fCuaje Yan", x: 56.5, y: 45.2, w: 9.0, h: 2.6, showDot: false, tooltipPosition: "top" },

          // Col 5: Inicio de cosecha (K-Thion + Magnesio)
          { name: "K-Thion", x: 71.0, y: 44.0, w: 9.5, h: 2.5, showDot: false, tooltipPosition: "top" },
          { name: "Magnesio", x: 71.0, y: 47.0, w: 9.5, h: 2.7, showDot: false, tooltipPosition: "top" },

          // Col 6: Cosecha (Nutrifos-k)
          { name: "Nutrifos K", x: 85.5, y: 43.8, w: 9.0, h: 2.6, showDot: false, tooltipPosition: "top" },
        ]
};