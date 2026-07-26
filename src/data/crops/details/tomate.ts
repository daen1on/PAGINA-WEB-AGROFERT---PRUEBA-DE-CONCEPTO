import { CropDetail } from "../types";
import heroImg from "../../../assets/tomate.jpg";
import planImg from "../../../assets/PLAN FERTILIZACION AGROFERT_TOMATE.png";

export const tomate: CropDetail = {
        id: 2,
        slug: "tomate",
    
        name: "tomate",
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
        "Urea 46%",
        "Nitrato de Calcio",
        "Zinc Quelado"
        ]    
}