import { CropDetail } from "../types";
import heroImg from "../../../assets/lulo-hero.jpg";
import planImg from "../../../assets/lulo.png";

export const lulo: CropDetail = {
        id: 4,
        slug: "lulo",

        name: "Lulo",
        heroImage: heroImg,
    planImage: planImg,
        cardDescription:
        "Programa nutricional para favorecer un desarrollo vigoroso, alta floración y excelente calidad del fruto.",
        heroText: "Programa nutricional diseñado para favorecer un desarrollo vegetativo equilibrado, alta floración y producción constante de frutos de excelente calidad.",
        featuredNutrients: [
        "Nitrógeno para crecimiento vegetativo",
        "Potasio para tamaño y calidad del fruto",
        "Calcio para firmeza y resistencia",
        ],
        stats: {
        clima: "Templado (18°C - 24°C)",
        riego: "Goteo / Microaspersión",
        suelo: "Franco a franco-arenoso / pH 5.5 - 6.5",
        },
        process: [
        "El lulo requiere suelos con excelente drenaje y alto contenido de materia orgánica. Es un cultivo sensible al exceso de humedad, por lo que el manejo adecuado del riego y el drenaje resulta fundamental para prevenir enfermedades radiculares.",
        "La poda de formación y mantenimiento mejora la aireación de la planta, facilita las labores de manejo y favorece una mayor producción de frutos de buena calidad. Es recomendable realizar monitoreos frecuentes para detectar oportunamente plagas y enfermedades."
        ],
        diseases: [
        {
            name: "Antracnosis",
            desc: "Enfermedad causada por hongos que produce manchas oscuras en frutos, ramas y hojas, reduciendo la calidad comercial.",
            solution: "Realizar podas sanitarias, mejorar la ventilación del cultivo y aplicar fungicidas preventivos cuando las condiciones climáticas lo favorezcan."
        },
        {
            name: "Marchitez Vascular",
            desc: "Provocada por hongos del suelo que afectan el sistema vascular, ocasionando marchitez progresiva y muerte de la planta.",
            solution: "Utilizar suelos bien drenados, evitar encharcamientos y realizar rotación de cultivos."
        }
        ],
        nutrition: [
        {
            nutrient: "Nitrógeno (N)",
            desc: "Favorece el desarrollo vegetativo y la formación de follaje vigoroso durante las primeras etapas."
        },
        {
            nutrient: "Potasio (K)",
            desc: "Esencial para mejorar el llenado, tamaño, color y calidad de los frutos."
        },
        {
            nutrient: "Calcio (Ca)",
            desc: "Fortalece la estructura celular y contribuye a obtener frutos más firmes y resistentes."
        }
        ],
        products: [
          "Humifos K",
          "Creci Yan",
          "Magnesio Agrofer",
          "fCuaje Yan",
          "Nutrifos K",
          "Bullterr K",
          "Calcio",
          "Hidrafos 400",
          "NPK Agrofert",
          "Aminox V",
          "Starmin-k",
          "Hidrón Producción"
        ],
        hotspots: [
          // PLAN 1 (Fila Superior - Rosa) - Tooltips abajo
          // Col 1: Trasplante (Humifos-k)
          { name: "Humifos K", x: 16.5, y: 31.0, w: 9.0, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 2: Desarrollo Vegetativo (Creci Yan + Magnesio)
          { name: "Creci Yan", x: 32.5, y: 29.8, w: 9.0, h: 2.5, showDot: false, tooltipPosition: "bottom" },
          { name: "Magnesio", x: 32.5, y: 32.7, w: 9.0, h: 2.7, showDot: false, tooltipPosition: "bottom" },

          // Col 3: Floración (fCuaje Yan + Magnesio)
          { name: "fCuaje Yan", x: 48.5, y: 29.8, w: 9.5, h: 2.5, showDot: false, tooltipPosition: "bottom" },
          { name: "Magnesio", x: 48.5, y: 32.7, w: 9.5, h: 2.7, showDot: false, tooltipPosition: "bottom" },

          // Col 4: Desarrollo de fruto (Nutrifos-k)
          { name: "Nutrifos K", x: 65.5, y: 31.0, w: 8.5, h: 2.6, showDot: false, tooltipPosition: "bottom" },

          // Col 5: Engruese (Bullterr-k + Calcio)
          { name: "Bullterr K", x: 82.0, y: 29.8, w: 8.5, h: 2.5, showDot: false, tooltipPosition: "bottom" },
          { name: "Calcio", x: 82.0, y: 32.7, w: 8.5, h: 2.7, showDot: false, tooltipPosition: "bottom" },

          // PLAN 2 (Fila Inferior - Verde) - Tooltips arriba
          // Col 1: Trasplante (Hidrafos 400)
          { name: "Hidrafos 400", x: 16.0, y: 41.8, w: 10.5, h: 2.6, showDot: false, tooltipPosition: "top" },

          // Col 2: Desarrollo Vegetativo (NPK + Magnesio)
          { name: "NPK Agrofert", x: 33.5, y: 40.5, w: 8.0, h: 2.5, showDot: false, tooltipPosition: "top" },
          { name: "Magnesio", x: 33.5, y: 43.5, w: 8.0, h: 2.7, showDot: false, tooltipPosition: "top" },

          // Col 3: Floración (fCuaje Yan + Aminox V)
          { name: "fCuaje Yan", x: 48.5, y: 40.5, w: 9.5, h: 2.5, showDot: false, tooltipPosition: "top" },
          { name: "Aminox V", x: 48.5, y: 43.5, w: 9.5, h: 2.7, showDot: false, tooltipPosition: "top" },

          // Col 4: Desarrollo de fruto (Nutrifos-k + Starmin-k)
          { name: "Nutrifos K", x: 65.0, y: 40.5, w: 9.5, h: 2.5, showDot: false, tooltipPosition: "top" },
          { name: "Starmin-k", x: 65.0, y: 43.5, w: 9.5, h: 2.7, showDot: false, tooltipPosition: "top" },

          // Col 5: Engruese (Hidrón producción + Calcio)
          { name: "Hidrón Producción", x: 79.0, y: 40.2, w: 14.0, h: 3.0, showDot: false, tooltipPosition: "top" },
          { name: "Calcio", x: 82.5, y: 43.5, w: 7.5, h: 2.6, showDot: false, tooltipPosition: "top" },
        ]
};   