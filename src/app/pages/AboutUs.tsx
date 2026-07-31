import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Eye, Award, Users } from "lucide-react";
import ImgAgro from "../../assets/About-us-img.jpg";

export default function AboutUs() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="relative p-16 flex items-center justify-center bg-green-600 text-white mb-16">
        <div className="absolute inset-0 z-10"></div>

        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl">Liderando la innovación en nutrición agrícola</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4">
                Desde hace más de 20 años, AGROFERT se ha dedicado a desarrollar y distribuir
                fertilizantes de alta calidad para el sector agrícola. Comenzamos como una pequeña
                empresa familiar con la visión de ayudar a los productores a maximizar sus rendimientos
                de manera sostenible.
              </p>
              <p className="text-gray-600 mb-4">
                Hoy somos líderes en el mercado, sirviendo a más de 5,000 clientes en toda Colombia.
                Nuestro compromiso con la innovación y la calidad nos ha convertido
                en el socio de confianza de agricultores de todos los tamaños.
              </p>
              <p className="text-gray-600">
                Contamos con un equipo de ingenieros agrónomos y técnicos especializados que trabajan
                constantemente en el desarrollo de nuevas fórmulas y en brindar asesoramiento
                personalizado a nuestros clientes.
              </p>
            </div>
            <div className="relative h-96">
              <ImageWithFallback
                src={ImgAgro}
                alt="Agricultura moderna"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="bg-green-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-700">
                Proporcionar soluciones nutricionales innovadoras y sostenibles que permitan a los
                productores agrícolas maximizar sus rendimientos mientras cuidan el medio ambiente
                y garantizan la seguridad alimentaria para las futuras generaciones.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-700">
                Ser la empresa líder en América Latina en nutrición vegetal, reconocida por nuestra
                innovación constante, compromiso con la sostenibilidad y excelencia en el servicio
                al cliente, contribuyendo al desarrollo de una agricultura más productiva y responsable.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad</h3>
              <p className="text-gray-600">
                Productos de la más alta calidad respaldados por la experiencia
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovación</h3>
              <p className="text-gray-600">
                Investigación constante para desarrollar soluciones más eficientes
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
              <p className="text-gray-600">
                Acompañamiento personalizado en cada etapa del proceso productivo
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sostenibilidad</h3>
              <p className="text-gray-600">
                Cuidado del medio ambiente en todos nuestros procesos y productos
              </p>
            </div>
          </div>
        </section>

        {/* Team CTA */}
        <section className="bg-green-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para crecer con nosotros?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarte a alcanzar tus objetivos de producción
          </p>
          <a target="_blank" rel="noopener noreferrer"
            href={`https://wa.me/573202724352?text=${encodeURIComponent(
              `Hola, vengo de la página web y estoy interesado en hablar con un asesor".`
            )}`}
            className="bg-white cursor-pointer text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
            Contáctanos Hoy
          </a>
        </section>
      </div>
    </div>
  );
}
