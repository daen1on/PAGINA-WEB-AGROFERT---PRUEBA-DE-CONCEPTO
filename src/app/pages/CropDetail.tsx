import { useParams, Link, Navigate } from "react-router";
import { Droplets, Sun, ThermometerSun, ShieldAlert, CheckCircle, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { cropDetailsData } from "../../data/cropDetailsData"; // <-- Importamos los datos (ajusta la ruta según donde lo guardes)

export default function CropDetail() {
  const { id } = useParams(); // Esto captura si es 'fresa', 'pera' o 'papa'
  
  // Buscamos los datos del cultivo específico
  const cropData = cropDetailsData[id as keyof typeof cropDetailsData];

  // Si alguien escribe una URL de un cultivo que no existe (ej. /cultivos/mango), lo devolvemos a la página de cultivos
  if (!cropData) {
    return <Navigate to="/cultivos" replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <ImageWithFallback
          src={cropData.heroImage}
          alt={`Cultivo de ${cropData.name}`}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/cultivos" className="text-white hover:text-green-400 flex items-center gap-2 mb-4 w-fit transition-colors">
            <ArrowLeft size={20} /> Volver a Cultivos
          </Link>
          <h1 className="text-5xl font-bold text-white mb-4">Cultivo de {cropData.name}</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            {cropData.heroText}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        
        {/* Ficha Técnica Rápida */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12 flex flex-wrap gap-8 justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600"><ThermometerSun size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">Clima Ideal</p>
              <p className="font-semibold text-gray-900">{cropData.stats.clima}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Droplets size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">Riego</p>
              <p className="font-semibold text-gray-900">{cropData.stats.riego}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-600"><Sun size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">Suelo / pH</p>
              <p className="font-semibold text-gray-900">{cropData.stats.suelo}</p>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: Información Detallada */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Proceso de Cultivo y Cuidados</h2>
              <div className="prose max-w-none text-gray-600 space-y-4">
                {cropData.process.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enfermedades Comunes y Soluciones</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {cropData.diseases.map((disease, index) => (
                  <div key={index} className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <div className="flex items-center gap-3 text-red-700 mb-3">
                      <ShieldAlert size={24} />
                      <h3 className="font-bold text-lg">{disease.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{disease.desc}</p>
                    <p className="text-sm font-semibold text-gray-900">
                      Solución: {disease.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Columna Derecha: Nutrición y CTA */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Programa de Nutrición</h3>
              <ul className="space-y-4 mb-8">
                {cropData.nutrition.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <strong className="block text-gray-900">{item.nutrient}</strong>
                      <span className="text-sm text-gray-600">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Productos Agrofert Recomendados:</h4>
                <div className="flex flex-wrap gap-2">
                  {cropData.products.map((product, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-600 p-8 rounded-xl text-center text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">¿Necesitas un plan a la medida?</h3>
              <p className="mb-6 opacity-90">Nuestros agrónomos te asesoran con el programa de fertilización exacto para tu finca.</p>
              <Link to="/contacto" className="inline-block bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full cursor-pointer">
                Solicitar Asesoría
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}