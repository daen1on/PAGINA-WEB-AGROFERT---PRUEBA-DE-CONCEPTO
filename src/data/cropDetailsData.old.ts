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
  tomate: {
    name: "tomate",
    heroImage: "/src/assets/tomate.jpg",
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
  },
  lulo: {
    name: "Lulo",
    heroImage: "/src/assets/lulo.png",
    heroText: "Programa nutricional diseñado para favorecer un desarrollo vegetativo equilibrado, alta floración y producción constante de frutos de excelente calidad.",
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
      "DAP",
      "Nutrifos K",
      "Humifos K"
    ]
  },
  cana: {
    name: "Caña de Azúcar",
    heroImage: "/src/assets/cana.png",
    heroText: "Programa nutricional orientado a maximizar el desarrollo vegetativo, el contenido de sacarosa y el rendimiento por hectárea.",
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
      "DAP",
      "Urea 46%",
      "Sulfato de Potasio"
    ]
  }

};