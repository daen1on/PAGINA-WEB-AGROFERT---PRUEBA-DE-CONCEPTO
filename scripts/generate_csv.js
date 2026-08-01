const fs = require('fs');
const path = require('path');

// Raw data structured directly from crop details files
const crops = [
  {
    id: 1,
    slug: "fresa",
    name: "Fresa",
    cardDescription: "Programa de nutrición intensiva para maximizar el calibre, color y grados Brix del fruto.",
    heroText: "Guía completa para el manejo nutricional y fitosanitario. Maximiza el calibre, color y grados Brix de tu producción.",
    featuredNutrients: [
      "Calcio para firmeza y vida de anaquel",
      "Potasio para tamaño y dulzor",
      "Fósforo para desarrollo radicular continuo"
    ],
    stats: {
      clima: "Templado (15°C - 20°C)",
      riego: "Por goteo (Frecuente)",
      suelo: "Franco-arenoso / 5.5 - 6.5"
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
  {
    id: 2,
    slug: "tomate",
    name: "Tomate",
    cardDescription: "Programa nutricional diseñado para mejorar el cuajado, llenado y calidad del fruto en cultivos de tomate.",
    heroText: "Programa nutricional especializado para maximizar el cuajado, desarrollo, firmeza y calidad del fruto durante todo el ciclo del cultivo.",
    featuredNutrients: [
      "Nitrógeno para crecimiento equilibrado",
      "Calcio para firmeza y prevención de pudrición apical",
      "Potasio para llenado, color y calidad del fruto"
    ],
    stats: {
      clima: "Templado (18°C - 27°C)",
      riego: "Goteo",
      suelo: "Franco-arenoso, bien drenado / pH 5.5 - 6.8"
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
    products: ["Urea 46%", "Nitrato de Calcio", "Zinc Quelado"]
  },
  {
    id: 3,
    slug: "papa",
    name: "Papa",
    cardDescription: "Programa de fertilización enfocado en maximizar el calibre, la uniformidad y la calidad del tubérculo.",
    heroText: "Programa nutricional especializado para maximizar la tuberización, uniformidad y calidad industrial de la cosecha.",
    featuredNutrients: [
      "Fósforo crucial en la siembra",
      "Potasio esencial para el llenado y peso",
      "Nitrógeno balanceado para desarrollo foliar"
    ],
    stats: {
      clima: "Frío (10°C - 20°C)",
      riego: "Aspersión / Gravedad",
      suelo: "Franco-arenoso, profundo / 5.0 - 6.0"
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
  },
  {
    id: 4,
    slug: "lulo",
    name: "Lulo",
    cardDescription: "Programa nutricional para favorecer un desarrollo vigoroso, alta floración y excelente calidad del fruto.",
    heroText: "Programa nutricional diseñado para favorecer un desarrollo vegetativo equilibrado, alta floración y producción constante de frutos de excelente calidad.",
    featuredNutrients: [
      "Nitrógeno para crecimiento vegetativo",
      "Potasio para tamaño y calidad del fruto",
      "Calcio para firmeza y resistencia"
    ],
    stats: {
      clima: "Templado (18°C - 24°C)",
      riego: "Goteo / Microaspersión",
      suelo: "Franco a franco-arenoso / pH 5.5 - 6.5"
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
    products: ["Hidrafos 400", "NPK Agrofert", "fcuaje Yan", "Nutrifos-k"]
  },
  {
    id: 5,
    slug: "cana",
    name: "Caña de Azúcar",
    cardDescription: "Programa de fertilización orientado a maximizar el rendimiento y la acumulación de sacarosa.",
    heroText: "Programa nutricional orientado a maximizar el desarrollo vegetativo, el contenido de sacarosa y el rendimiento por hectárea.",
    featuredNutrients: [
      "Nitrógeno para crecimiento inicial",
      "Potasio para transporte de azúcares",
      "Fósforo para desarrollo radicular"
    ],
    stats: {
      clima: "Cálido (24°C - 32°C)",
      riego: "Gravedad / Goteo",
      suelo: "Franco-arcilloso, profundo / pH 5.5 - 7.5"
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
    products: ["NPK Agrofert", "Nitro", "K-thion"]
  }
];

function escapeCSV(str, delimiter = ',') {
  if (str === undefined || str === null) return '""';
  const stringified = String(str);
  // Escaping quotes by doubling them
  const escaped = stringified.replace(/"/g, '""');
  return `"${escaped}"`;
}

function generateCSV(delimiter = ',') {
  const headers = [
    "ID",
    "Slug",
    "Nombre del Cultivo",
    "Descripción Tarjeta (Página Principal)",
    "Texto Encabezado (Detalle Cultivo)",
    "Requerimientos Nutricionales Destacados",
    "Clima Recomendado",
    "Sistema de Riego",
    "Tipo de Suelo y pH",
    "Proceso y Manejo de Cultivo",
    "Enfermedades y Plagas (Descripción y Solución)",
    "Nutrición Detallada",
    "Productos Recomendados Agrofert"
  ];

  const rows = crops.map(crop => {
    const featuredNutrientsStr = crop.featuredNutrients.join(" ; ");
    const processStr = crop.process.map((p, i) => `${i + 1}. ${p}`).join("\n");
    const diseasesStr = crop.diseases.map(d => `• ${d.name}: ${d.desc} (Solución: ${d.solution})`).join("\n");
    const nutritionStr = crop.nutrition.map(n => `• ${n.nutrient}: ${n.desc}`).join("\n");
    const productsStr = crop.products.join(" ; ");

    return [
      crop.id,
      crop.slug,
      crop.name,
      crop.cardDescription,
      crop.heroText,
      featuredNutrientsStr,
      crop.stats.clima,
      crop.stats.riego,
      crop.stats.suelo,
      processStr,
      diseasesStr,
      nutritionStr,
      productsStr
    ].map(val => escapeCSV(val, delimiter)).join(delimiter);
  });

  // UTF-8 BOM byte order mark \uFEFF for proper Spanish character encoding in Excel
  return '\uFEFF' + [headers.map(h => escapeCSV(h, delimiter)).join(delimiter), ...rows].join('\n');
}

// Write standard comma-separated CSV
fs.writeFileSync(path.join(__dirname, '..', 'cultivos_agrofert.csv'), generateCSV(','), 'utf8');

// Write semicolon-separated CSV (for Spanish Excel defaults)
fs.writeFileSync(path.join(__dirname, '..', 'cultivos_agrofert_excel.csv'), generateCSV(';'), 'utf8');

console.log("CSV files generated successfully!");
