import { CropDetail } from "../types";
import papaImg from "../../../assets/papa.jpg";


export const papa: CropDetail = {    
    id: 3,
    slug: "papa",
    name: "Papa",
    heroImage: papaImg,
    cardDescription:
      "Programa de fertilización enfocado en maximizar el calibre, la uniformidad y la calidad del tubérculo.",
    heroText:
      "Programa nutricional especializado para maximizar la tuberización, uniformidad y calidad industrial de la cosecha.",
    featuredNutrients: [
      "Fósforo crucial en la siembra",
      "Potasio esencial para el llenado y peso",
      "Nitrógeno balanceado para desarrollo foliar",
    ],
    stats: {
      clima: "Frío (10°C - 20°C)",
      riego: "Aspersión / Gravedad",
      suelo: "Franco-arenoso, profundo / 5.0 - 6.0",
    },
    process: [
      "La papa es un cultivo intensivo que requiere suelos sueltos y bien drenados para permitir la correcta expansión de los tubérculos. El manejo del agua es crítico: requiere humedad constante, pero el encharcamiento causa pudrición inmediata de la semilla o el cultivo.",
      "El 'aporque' (amontonar tierra alrededor de la base de la planta) es una labor cultural indispensable. Protege los tubérculos de la luz solar (evitando que se pongan verdes y tóxicos), controla malezas y facilita la cosecha."
    ],
    diseases: [
      {
        name: "Gota o Tizón Tardío (Phytophthora infestans)",
        desc: "El hongo más destructivo de la papa. Causa manchas necróticas en las hojas y pudrición en los tubérculos. Avanza rápido con lluvia y frío.",
        solution: "Monitoreo constante, uso de variedades resistentes y programas de fungicidas preventivos y curativos."
      },
      {
        name: "Polilla Guatemalteca",
        desc: "Las larvas perforan los tubérculos en el campo y en la bodega, dejando galerías llenas de excremento.",
        solution: "Aporque alto, control de humedad, uso de trampas de feromonas e insecticidas específicos."
      }
    ],
    nutrition: [
      {
        nutrient: "Fósforo (P)",
        desc: "Imprescindible en el momento de la siembra para promover un enraizamiento fuerte y aumentar el número de tubérculos."
      },
      {
        nutrient: "Potasio (K)",
        desc: "El macronutriente de mayor demanda. Define el tamaño, peso y calidad de fritura de la papa (materia seca)."
      },
      {
        nutrient: "Nitrógeno (N)",
        desc: "Necesario para el desarrollo del follaje, que actuará como 'panel solar' para llenar los tubérculos."
      }
    ],
    products: ["DAP", "Sulfato de Potasio", "Urea 46%"]  
}