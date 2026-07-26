import { CropDetail } from "../types";
import heroImg from "../../../assets/cana-hero.jpg";
import planImg from "../../../assets/cana.png";

export const cana: CropDetail = {
        id: 5,
        slug: "cana",
    
        name: "Caña de Azúcar",
        heroImage: heroImg,
        planImage: planImg,
        cardDescription:
        "Programa de fertilización orientado a maximizar el rendimiento y la acumulación de sacarosa.",
        heroText: "Programa nutricional orientado a maximizar el desarrollo vegetativo, el contenido de sacarosa y el rendimiento por hectárea.",

        featuredNutrients: [
        "Nitrógeno para crecimiento inicial",
        "Potasio para transporte de azúcares",
        "Fósforo para desarrollo radicular",
        ],
        stats: {
        clima: "Cálido (24°C - 32°C)",
        riego: "Gravedad / Goteo",
        suelo: "Franco-arcilloso, profundo / pH 5.5 - 7.5",
        },
        process: [
        "La caña de azúcar requiere suelos profundos, fértiles y con buen drenaje para favorecer el desarrollo del sistema radicular. La preparación adecuada del terreno y una correcta fertilización inicial son determinantes para lograr un buen establecimiento del cultivo.",
        "Durante el crecimiento es importante mantener un adecuado control de malezas y realizar monitoreos constantes para prevenir plagas y enfermedades que puedan disminuir el rendimiento y la acumulación de sacarosa."
        ],
        diseases: [
        {
            name: "Carbón de la Caña",
            desc: "Enfermedad causada por un hongo que produce estructuras negras en forma de látigo y reduce considerablemente la producción.",
            solution: "Utilizar semilla certificada, variedades resistentes y eliminar plantas afectadas."
        },
        {
            name: "Roya Parda",
            desc: "Produce manchas alargadas de color marrón en las hojas, disminuyendo la capacidad fotosintética.",
            solution: "Monitoreo permanente, variedades tolerantes y manejo oportuno mediante programas fitosanitarios."
        }
        ],
        nutrition: [
        {
            nutrient: "Nitrógeno (N)",
            desc: "Favorece el crecimiento inicial y la formación de biomasa."
        },
        {
            nutrient: "Potasio (K)",
            desc: "Contribuye al transporte de azúcares y mejora el rendimiento y la calidad del cultivo."
        },
        {
            nutrient: "Fósforo (P)",
            desc: "Estimula el desarrollo radicular y mejora el establecimiento del cultivo."
        }
        ],
        products: [
        "NPK Agrofert",
        "Nitro",
        "K-thion"
        ]
  
}