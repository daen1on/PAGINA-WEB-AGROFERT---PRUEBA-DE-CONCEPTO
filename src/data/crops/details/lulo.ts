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
        "Hidrafos 400",
        "NPK Agrofert",
        "fcuaje Yan",
        "Nutrifos-k",
        ]
    
}   