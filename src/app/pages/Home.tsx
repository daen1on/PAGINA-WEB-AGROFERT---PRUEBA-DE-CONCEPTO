// app/pages/Home.tsx
import { useState, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Leaf, TrendingUp, Award, Users, X, ChevronLeft, ChevronRight, MessageCircle, CheckCircle, Droplets, FlaskConical } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from '../../assets/logo-agrofert.svg';
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { EstrellaProduct } from "../interfaces/types/types";

export default function Home() {
  const { productos, loading, isFallback } = useFeaturedProducts();
  const [productoSeleccionado, setProductoSeleccionado] = useState<EstrellaProduct | null>(null);
  const carruselRef = useRef<HTMLDivElement>(null);

  const moverCarrusel = (direccion: "izquierda" | "derecha") => {
    if (carruselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carruselRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (direccion === "derecha") {
        if (scrollLeft >= maxScroll - 10) {
          carruselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carruselRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      } else if (direccion === "izquierda") {
        if (scrollLeft <= 10) {
          carruselRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          carruselRef.current.scrollBy({ left: -320, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1775143305394-51365287542f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc3NTYwNTY2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Campo agrícola"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="flex justify-center gap-2">
            <img src={logo} alt="Logo Agrofert" className="h-24 md:h-34 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] object-contain" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Fertilizantes de Alta Calidad para tu Cultivo</h1>
          <p className="text-xl md:text-2xl mb-8">Potenciamos tu producción agrícola con soluciones innovadoras y sostenibles</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/productos" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2">
              Ver Productos <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contacto" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por Qué Elegir AGROFERT?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Más de 20 años de experiencia brindando soluciones nutricionales para el campo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Leaf className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Productos Ecológicos</h3>
              <p className="text-gray-600">Fórmulas desarrolladas con respeto al medio ambiente</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><TrendingUp className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Mayor Rendimiento</h3>
              <p className="text-gray-600">Incrementa la productividad de tus cultivos hasta un 40%</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Award className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Calidad Certificada</h3>
              <p className="text-gray-600">Productos que certifican su calidad</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Asesoría Técnica</h3>
              <p className="text-gray-600">Equipo de expertos para acompañarte en todo el proceso</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section CON CARRUSEL DE PRODUCTOS REALES */}
      <section className="py-20 bg-green-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Encuentra la solución ideal para tu cultivo</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Conoce nuestros productos estrella, diseñados para garantizar el éxito de tu cosecha.</p>

          <div className="relative bg-black/10 rounded-3xl p-6 md:p-8 shadow-2xl mb-12">
            <button onClick={() => moverCarrusel('izquierda')} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-white cursor-pointer text-green-700 p-3 rounded-full shadow-lg hover:bg-green-50 transition-colors hidden md:block border border-gray-200">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div ref={carruselRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none' }}>
              {loading ? (
                // Skeletons de Carga
                [...Array(3)].map((_, i) => (
                  <div key={i} className="snap-center shrink-0 w-72 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 animate-pulse space-y-4">
                    <div className="w-full h-48 bg-gray-200 rounded-xl" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="pt-3 border-t border-gray-100 h-6 bg-gray-250 rounded w-1/2" />
                  </div>
                ))
              ) : (
                // Renderizado Dinámico de Productos Destacados
                productos.map((producto) => (
                  <div
                    key={producto.id}
                    onClick={() => setProductoSeleccionado(producto)}
                    className="snap-center shrink-0 w-72 bg-white text-gray-900 rounded-2xl p-0 cursor-pointer hover:-translate-y-2 transition-transform duration-350 text-left shadow-lg overflow-hidden flex flex-col border border-gray-100/50"
                  >
                    <div className="relative">
                      {producto.img ? (
                        <img src={producto.img} alt={producto.nombre} className="w-full h-48 object-cover bg-gray-100" />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-green-50">
                          <Leaf className="w-12 h-12 text-green-600/40" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-white/90 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm uppercase tracking-wide">Destacado</span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{producto.nombre}</h3>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{producto.descBreve}</p>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-green-600 font-bold text-sm hover:text-green-700">Ficha Técnica</span>
                        <ArrowRight className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => moverCarrusel('derecha')} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 bg-white cursor-pointer text-green-700 p-3 rounded-full shadow-lg hover:bg-green-50 transition-colors hidden md:block border border-gray-200">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <h3 className="text-2xl font-medium mb-6">Estos son solo nuestros recomendados. Descubre todo lo que tenemos para tu finca.</h3>
          <Link to="/productos" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 shadow-lg">
            Ir al Catálogo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Pilares / Metodología */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Compromiso con tu Campo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Trabajamos bajo tres pilares fundamentales para garantizar que tu inversión se traduzca en una cosecha abundante y de calidad.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0 group-hover:scale-110 transition-transform duration-500">01</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Agricultura Inteligente</h3>
                <p className="text-gray-600 leading-relaxed">Acompañamiento basado en las necesidades específicas de tu suelo para recomendarte la fórmula exacta que maximizará tu rendimiento.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group md:mt-12">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0 group-hover:scale-110 transition-transform duration-500">02</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Calidad Garantizada</h3>
                <p className="text-gray-600 leading-relaxed">Materias primas de primer nivel con procesos de fabricación certificados que aseguran una absorción eficiente en menos tiempo.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group md:mt-24">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0 group-hover:scale-110 transition-transform duration-500">03</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nutrición Sostenible</h3>
                <p className="text-gray-600 leading-relaxed">Cuidamos tu tierra a largo plazo. Fórmulas diseñadas para nutrir la planta sin degradar el suelo, asegurando cosechas prósperas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL TÉCNICO AVANZADO */}
      {productoSeleccionado && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setProductoSeleccionado(null); }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl cursor-default animate-in fade-in zoom-in duration-200">
            <div className="relative h-64 sm:h-72 bg-gray-100">
              {productoSeleccionado.img ? (
                <img src={productoSeleccionado.img} alt={productoSeleccionado.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-50">
                  <Leaf className="w-20 h-20 text-green-600/40" />
                </div>
              )}
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-gray-200 transition z-10 shadow-md"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{productoSeleccionado.nombre}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-lg mb-8 leading-relaxed border-l-4 border-green-500 pl-4 bg-green-50/50 py-2">
                {productoSeleccionado.descLarga}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <h4 className="font-bold text-gray-900 text-lg">Modo de Aplicación</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {productoSeleccionado.aplicacion}
                  </p>
                </div>

                <div className="bg-green-50/30 rounded-2xl p-5 border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-gray-900 text-lg">Composición</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {productoSeleccionado.composicion.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/573000000000?text=Hola,%20vengo%20de%20la%20página%20web%20y%20estoy%20interesado%20en%20el%20producto%20*${productoSeleccionado.nombre}*.%20¿Me%20podrían%20dar%20más%20información?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white hover:bg-[#128C7E] px-6 py-4 rounded-xl font-bold flex-1 text-center transition shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-6 h-6" />
                  Cotizar por WhatsApp
                </a>
                <Link
                  to="/distribuidores"
                  onClick={() => {
                    setProductoSeleccionado(null);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="bg-white text-gray-700 hover:bg-gray-50 px-6 py-4 rounded-xl font-semibold sm:w-1/3 text-center transition border border-gray-200"
                >
                  Distribuidores
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}