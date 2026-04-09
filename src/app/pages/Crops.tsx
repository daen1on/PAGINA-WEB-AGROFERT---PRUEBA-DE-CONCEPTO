import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

export default function Crops() {
  const crops = [
    {
      id: 1,
      name: "Fresa",
      image: "/src/assets/fresas.jpg", // Asegúrate de que esta ruta coincida con tu proyecto
      description: "Programa de nutrición intensiva para maximizar el calibre, color y grados Brix del fruto.",
      nutrients: ["Calcio para firmeza y vida de anaquel", "Potasio para tamaño y dulzor", "Fósforo para desarrollo radicular continuo"],
      products: ["Nitrato de Calcio", "Sulfato de Potasio", "Boro Soluble"],
    },
    {
      id: 2,
      name: "Pera",
      image: "/src/assets/pera.jpg", // Asegúrate de que esta ruta coincida con tu proyecto
      description: "Soluciones de fertilización para huertos frutales buscando alto rendimiento y prevención de fisiopatías.",
      nutrients: ["Nitrógeno balanceado en brotación", "Calcio para prevenir corazón pardo", "Zinc y Boro para floración"],
      products: ["Urea 46%", "Nitrato de Calcio", "Zinc Quelado"],
    },
    {
      id: 3,
      name: "Papa",
      image: "/src/assets/papa.jpg", // Asegúrate de que esta ruta coincida con tu proyecto
      description: "Programa de fertilización enfocado en maximizar el calibre, la uniformidad y la calidad del tubérculo.",
      nutrients: ["Fósforo crucial en la siembra", "Potasio esencial para el llenado y peso", "Nitrógeno balanceado para desarrollo foliar"],
      products: ["DAP", "Sulfato de Potasio", "Urea 46%"],
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Soluciones por Cultivo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programas de fertilización específicos diseñados para cada tipo de cultivo
          </p>
        </div>

        {/* Crops Grid */}
        <div className="space-y-12">
          {crops.map((crop, index) => (
            <div
              key={crop.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center bg-gray-50 rounded-xl overflow-hidden`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 h-80">
                <ImageWithFallback
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{crop.name}</h2>
                <p className="text-gray-600 mb-6">{crop.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Requerimientos Nutricionales:
                  </h3>
                  <ul className="space-y-2">
                    {crop.nutrients.map((nutrient, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{nutrient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Productos Recomendados:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {crop.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botones Modificados */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link 
                    to={`/cultivos/${crop.name.toLowerCase()}`}
                    className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer inline-block text-center"
                  >
                    Ver más
                  </Link>
                  {/* AQUÍ ESTÁ LA CORRECCIÓN: Cambiamos button por Link apuntando a /contacto */}
                  <Link 
                    to="/contacto"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer inline-block text-center"
                  >
                    Solicitar Asesoramiento
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}