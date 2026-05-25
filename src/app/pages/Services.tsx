import { Microscope, Users, Truck, FileText, Sprout, HeartHandshake } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Users,
      title: "Asesoramiento Técnico",
      description:
        "Equipo de ingenieros agrónomos disponibles para brindarte el mejor asesoramiento en nutrición vegetal.",
      features: [
        "Visitas a campo",
        "Planes de fertilización personalizados",
        "Seguimiento de cultivos",
        "Capacitaciones técnicas",
      ],
    },
    {
      icon: Truck,
      title: "Logística y Distribución",
      description:
        "Sistema de distribución eficiente para que recibas tus productos en tiempo y forma.",
      features: [
        "Entrega en todo el país",
        "Seguimiento de pedidos en tiempo real",
        "Descarga en campo",
        "Stock permanente de productos",
      ],
    },
    {
      icon: HeartHandshake,
      title: "Programa de Fidelización",
      description:
        "Beneficios exclusivos para nuestros clientes más fieles y comprometidos.",
      features: [
        "Descuentos por volumen",
        "Acceso anticipado a nuevos productos",
        "Capacitaciones gratuitas",
        "Soporte prioritario",
      ],
    },
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Mucho más que fertilizantes: un servicio integral para potenciar tu producción
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-8"
              >
                <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                  Más Información
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestro Proceso de Trabajo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Consulta Inicial</h3>
              <p className="text-gray-600">
                Nos contactas y agendamos una visita o videollamada
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Diagnóstico</h3>
              <p className="text-gray-600">
                Evaluamos tu situación y analizamos las necesidades
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Propuesta</h3>
              <p className="text-gray-600">
                Diseñamos un plan personalizado de nutrición
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Seguimiento</h3>
              <p className="text-gray-600">
                Acompañamos el proceso y ajustamos según resultados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-green-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para optimizar tu producción?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contáctanos hoy y descubre cómo nuestros servicios pueden transformar tu cultivo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white cursor-pointer text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Solicitar Visita Técnica
            </button>
            <button className="bg-green-700 cursor-pointer hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
