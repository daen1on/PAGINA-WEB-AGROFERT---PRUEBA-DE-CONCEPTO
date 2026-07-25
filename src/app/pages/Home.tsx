// app/pages/Home.tsx
import { useState, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Leaf, TrendingUp, Award, Users, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from '../../assets/logo-agrofert.svg';
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { EstrellaProduct } from "../interfaces/types/types";
import ProductModal from "../components/ProductModal";
import ZoomableImage from "../components/ZoomableImage";
import HeroBackground from "./HeroBackground";

export default function Home() {
  const { productos, loading } = useFeaturedProducts();
  const [productoSeleccionado, setProductoSeleccionado] = useState<EstrellaProduct | null>(null);
  const carruselRef = useRef<HTMLDivElement>(null);

  const renderTextoConIcaDestacado = ( texto: string, esModal = false, textoResumen?: string) => {
      if (!texto) return null;

      const regexIca = /(REGISTRO DE VENTA ICA\s*(?:NO\.|N°|NUMERO)?\s*\d+)/i;
      const coincidencia = texto.match(regexIca);

      if (coincidencia) {
        const textoIca = coincidencia[1];

        return (
          <div className="space-y-2">
            <div
              className={`inline-block bg-green-100 text-green-800 font-semibold rounded-md px-2.5 py-1 text-xs uppercase tracking-wide border border-green-200 ${
                esModal ? "mb-1" : ""
              }`}
            >
              {textoIca}
            </div>

            <p
              className={
                esModal
                  ? "text-gray-700 text-sm leading-relaxed"
                  : "text-gray-500 text-sm line-clamp-2 leading-relaxed"
              }
            >
              {esModal
                ? texto.replace(textoIca, "").replace(/^[\s.,;:-]+/, "")
                : (textoResumen ?? texto.replace(textoIca, "").replace(/^[\s.,;:-]+/, ""))}
            </p>
          </div>
        );
      }

      return (
        <p
          className={
            esModal
              ? "text-gray-700 text-sm leading-relaxed"
              : "text-gray-500 text-sm line-clamp-2 leading-relaxed"
          }
        >
          {textoResumen ?? texto}
        </p>
      );
    };

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
      <section className="relative min-h-[90vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <HeroBackground />
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir AGROFERT?</h2>
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

      {/* RECOMENDADOS DEL HOME */}
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
                [...Array(3)].map((_, i) => (
                  <div key={i} className="snap-center shrink-0 w-72 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 animate-pulse space-y-4">
                    <div className="w-full h-48 bg-gray-200 rounded-xl" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                ))
              ) : (
                productos.map((producto) => (
                  <div
                    key={producto.id}
                    onClick={() => setProductoSeleccionado(producto)}
                    className="snap-center shrink-0 w-80 bg-white text-gray-900 rounded-3xl p-0 cursor-pointer hover:-translate-y-2 transition-all duration-300 text-left shadow-lg overflow-hidden flex flex-col border border-gray-100/50 group"
                  >
                    <div className="w-full h-64 overflow-hidden bg-gray-50 relative p-3 flex items-center justify-center border-b border-gray-100">
                      {producto.img ? (
                        <img
                          src={producto.img}
                          alt={producto.nombre}
                          className="w-full h-full object-contain scale-125 group-hover:scale-135 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-green-50">
                          <Leaf className="w-14 h-14 text-green-600/40" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-white/90 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm uppercase tracking-wide">Destacado</span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                      <div>                        
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">{producto.nombre}</h3>
                        {renderTextoConIcaDestacado(producto.descLarga, false, producto.descBreve)}
                      </div>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <span className="text-green-600 font-bold text-sm group-hover:text-green-700 transition-colors">Ficha Técnica</span>
                        <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Trabajamos bajo tres pilares fundamentales para garantizar que tu inversión se traduzca en una cosecha abundante.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0">01</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Agricultura Inteligente</h3>
                <p className="text-gray-600 leading-relaxed">Acompañamiento basado en las necesidades específicas de tu suelo.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group md:mt-12">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0">02</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Calidad Garantizada</h3>
                <p className="text-gray-600 leading-relaxed">Materias primas de primer nivel con procesos certificados.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group md:mt-24">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0">03</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nutrición Sostenible</h3>
                <p className="text-gray-600 leading-relaxed">Cuidamos tu tierra a largo plazo. Fórmulas para nutrir sin degradar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        isOpen={!!productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        product={productoSeleccionado}
      />
    </div>
  );
}