import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { cropDetailsData } from "../../data/crops";

export default function Crops() {
  const crops = Object.values(cropDetailsData);

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
                  src={crop.heroImage}
                  alt={crop.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {crop.name}
                </h2>

                <p className="text-gray-600 mb-6">
                  {crop.cardDescription}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Requerimientos Nutricionales:
                  </h3>

                  <ul className="space-y-2">
                    {crop.featuredNutrients.map((nutrient, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          {nutrient}
                        </span>
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

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to={`/cultivos/${crop.slug}`}
                    className="bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer inline-block text-center"
                  >
                    Ver más
                  </Link>

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