// Archivo: src/data/cropDetailsData.ts

export const cropDetailsData = {
  fresa: {
    name: "Fresa",
    heroImage: "/src/assets/fresas.jpg", // Asegúrate de que la ruta sea correcta
    heroText: "Guía completa para el manejo nutricional y fitosanitario. Maximiza el calibre, color y grados Brix de tu producción.",
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
    products: ["Nitrato de Calcio", "Sulfato de Potasio", "Boro Soluble"]
  },
  pera: {
    name: "Pera",
    heroImage: "/src/assets/pera.jpg",
    heroText: "Manejo integral para huertos frutales. Estrategias para alto rendimiento, calibre uniforme y prevención de fisiopatías.",
    stats: {
      clima: "Frío a Templado (Horas frío req.)",
      riego: "Microaspersión / Goteo",
      suelo: "Franco-arcilloso / 6.0 - 7.0",
    },
    process: [
      "El cultivo de la pera requiere una planificación a largo plazo. Es fundamental un buen manejo de podas (de formación y de fructificación) para garantizar que la luz solar penetre adecuadamente en el dosel del árbol, mejorando el color y la calidad del fruto.",
      "Durante la etapa de brotación y floración, el peral es extremadamente demandante de micronutrientes como el Zinc y el Boro. Una deficiencia en esta etapa compromete el cuajado del fruto y reduce drásticamente la cosecha."
    ],
    diseases: [
      {
        name: "Fuego Bacteriano (Erwinia amylovora)",
        desc: "Bacteria devastadora que marchita flores, brotes y ramas, dándoles un aspecto de haber sido quemados por fuego.",
        solution: "Podar y quemar ramas infectadas. Aplicar cobres y antibióticos agrícolas preventivos."
      },
      {
        name: "Sarna del Peral",
        desc: "Hongo que causa manchas oscuras y agrietamiento en hojas y frutos, arruinando su valor comercial.",
        solution: "Aplicación de fungicidas sistémicos y de contacto, y eliminación de hojas caídas en invierno."
      }
    ],
    nutrition: [
      {
        nutrient: "Nitrógeno (N)",
        desc: "Crucial en la brotación para asegurar un buen desarrollo foliar, pero debe limitarse antes de la cosecha."
      },
      {
        nutrient: "Calcio (Ca)",
        desc: "Vital para prevenir el 'corazón pardo' (pudrición interna del fruto) durante el almacenamiento frigorífico."
      },
      {
        nutrient: "Zinc y Boro",
        desc: "Aplicados en pre-floración para asegurar una excelente polinización y retención del fruto."
      }
    ],
    products: ["Urea 46%", "Nitrato de Calcio", "Zinc Quelado"]
  },
  papa: {
    name: "Papa",
    heroImage: "/src/assets/papa.jpg",
    heroText: "Programa nutricional especializado para maximizar la tuberización, uniformidad y calidad industrial de la cosecha.",
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
};