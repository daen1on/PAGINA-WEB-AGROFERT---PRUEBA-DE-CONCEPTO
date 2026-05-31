// app/pages/Home.tsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Leaf, TrendingUp, Award, Users, X, ChevronLeft, ChevronRight, MessageCircle, CheckCircle, Droplets, FlaskConical, ZoomIn } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from '../../assets/logo-agrofert.svg';
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import { EstrellaProduct } from "../interfaces/types/types";

// ==========================================
// COMPONENTE PARA ZOOM EN PC (MOUSE) Y MÓVIL (TOUCH)
// ==========================================
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Manejo para PC: Mover el mouse cambia el foco del zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  // Alternar zoom al hacer click en PC
  const toggleZoom = () => setZoom(!zoom);

  // Manejo para Móviles: Doble toque para activar/desactivar zoom
  let lastTap = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      setZoom((prev) => !prev);

      // Si se activa el zoom en móvil, centramos por defecto la vista
      if (containerRef.current && e.touches[0]) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.touches[0].clientX - left) / width) * 100;
        const y = ((e.touches[0].clientY - top) / height) * 100;
        setPosition({ x, y });
      }
    }
    lastTap = now;
  };

  // Mover el dedo arrastra la imagen ampliada en móviles
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!zoom || !containerRef.current || e.touches.length === 0) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    let x = ((e.touches[0].clientX - left) / width) * 100;
    let y = ((e.touches[0].clientY - top) / height) * 100;

    // Limitar los rangos para evitar que se desborde visualmente
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onClick={toggleZoom}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ cursor: zoom ? "zoom-out" : "zoom-in" }}
    >
      {/* Indicador visual flotante de que se puede hacer zoom si no está activo */}
      {!zoom && (
        <div className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full pointer-events-none z-10 flex items-center gap-1 text-xs backdrop-blur-xs md:flex hidden">
          <ZoomIn className="w-3.5 h-3.5" /> Haz click para zoom
        </div>
      )}
      {!zoom && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full pointer-events-none z-10 flex items-center gap-1 text-[11px] backdrop-blur-xs md:hidden">
          <ZoomIn className="w-3.5 h-3.5" /> Doble toque para hacer zoom
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-150 ease-out"
        style={{
          transform: zoom ? `scale(2.2)` : `scale(1.05)`,
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
}

export default function Home() {
  const { productos, loading, isFallback } = useFeaturedProducts();
  const [productoSeleccionado, setProductoSeleccionado] = useState<EstrellaProduct | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const carruselRef = useRef<HTMLDivElement>(null);

  // EFECTO: Evitar scroll de la página de fondo al abrir modal
  useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [productoSeleccionado]);

  // Resetear el índice de zoom/imagen cuando cambia el producto seleccionado
  useEffect(() => {
    setCurrentImgIndex(0);
  }, [productoSeleccionado]);

  const renderTextoConIcaDestacado = (texto: string, esModal = false) => {
    if (!texto) return null;

    const regexIca = /(REGISTRO DE VENTA ICA\s*(?:NO\.|N°|NUMERO)?\s*\d+)/i;
    const coincidencia = texto.match(regexIca);

    if (coincidencia) {
      const textoIca = coincidencia[1];
      const textoRestante = texto.replace(textoIca, "").replace(/^[\s.,;:-]+/, "");

      return (
        <div className="space-y-2">
          <div className={`inline-block bg-green-100 text-green-800 font-bold rounded-md px-2.5 py-1 text-xs tracking-wide uppercase border border-green-200 ${esModal ? "mb-1" : ""}`}>
            {textoIca}
          </div>
          <p className={esModal ? "text-gray-700 text-sm leading-relaxed" : "text-gray-500 text-sm line-clamp-2 leading-relaxed"}>
            {textoRestante}
          </p>
        </div>
      );
    }

    return (
      <p className={esModal ? "text-gray-700 text-sm leading-relaxed" : "text-gray-500 text-sm line-clamp-2 leading-relaxed"}>
        {texto}
      </p>
    );
  };

  const obtenerGaleriaHome = (): string[] => {
    if (!productoSeleccionado) return [];
    let lista: string[] = [];

    if (productoSeleccionado.imagenes && Array.isArray(productoSeleccionado.imagenes) && productoSeleccionado.imagenes.length > 0) {
      lista = productoSeleccionado.imagenes;
    }
    // @ts-ignore
    else if (productoSeleccionado.images && Array.isArray(productoSeleccionado.images)) {
      // @ts-ignore
      lista = productoSeleccionado.images.map(img => typeof img === 'string' ? img : img.src);
    }

    if (lista.length === 0) {
      if (productoSeleccionado.img) lista = [productoSeleccionado.img];
      // @ts-ignore
      else if (productoSeleccionado.image) lista = [productoSeleccionado.image];
    }

    return lista.filter(url => !!url);
  };

  const galeriaImagenes = obtenerGaleriaHome();

  const siguienteImagen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galeriaImagenes.length > 1) {
      setCurrentImgIndex((prev) => (prev + 1) % galeriaImagenes.length);
    }
  };

  const anteriorImagen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galeriaImagenes.length > 1) {
      setCurrentImgIndex((prev) => (prev - 1 + galeriaImagenes.length) % galeriaImagenes.length);
    }
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
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1775143305394-51365287542f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MT75NjA1NjY0fD&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                        {renderTextoConIcaDestacado(producto.descBreve, false)}
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

      {/* MODAL DEL HOME CON ZOOM REESTRUCTURADO */}
      {productoSeleccionado && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setProductoSeleccionado(null); }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer transition-opacity duration-200"
        >
          <div className="bg-white rounded-3xl max-w-5xl w-full relative flex flex-col md:flex-row overflow-hidden shadow-2xl max-h-[90vh] md:h-[650px] cursor-default animate-in fade-in zoom-in-95 duration-200">

            <button
              onClick={() => setProductoSeleccionado(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-gray-900/20 hover:bg-gray-900/40 md:bg-gray-100 p-2.5 rounded-full hover:scale-105 transition z-50 shadow-md cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            {/* IZQUIERDA: Galería con Zoom dinámico integrado */}
            <div className="w-full md:w-1/2 bg-gray-50 relative flex items-center justify-center p-4 md:p-8 h-80 md:h-full border-b md:border-b-0 md:border-r border-gray-100">
              {galeriaImagenes.length > 0 ? (
                <div className="w-full h-full flex items-center justify-center relative">

                  {/* AQUÍ INYECTAMOS NUESTRO COMPONENTE CON ZOOM */}
                  <ZoomableImage
                    src={galeriaImagenes[currentImgIndex]}
                    alt={productoSeleccionado.nombre}
                  />

                  {galeriaImagenes.length > 1 && (
                    <>
                      <button
                        onClick={anteriorImagen}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-2.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer border border-gray-100"
                        aria-label="Anterior"
                      >
                        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={siguienteImagen}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-2.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer border border-gray-100"
                        aria-label="Siguiente"
                      >
                        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-xs">
                        {currentImgIndex + 1} / {galeriaImagenes.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-50">
                  <Leaf className="w-20 h-20 text-green-600/40" />
                </div>
              )}
            </div>

            {/* DERECHA: Información Técnica */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-[calc(90vh-320px)] md:h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight pr-8">
                    {productoSeleccionado.nombre}
                  </h3>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50/40 py-3.5 rounded-r-2xl">
                  {renderTextoConIcaDestacado(productoSeleccionado.descLarga, true)}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <h4 className="font-bold text-gray-900 text-sm">Modo de Aplicación</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{productoSeleccionado.aplicacion}</p>
                  </div>

                  <div className="bg-green-50/30 rounded-2xl p-4 border border-green-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="w-4 h-4 text-green-600" />
                      <h4 className="font-bold text-gray-900 text-sm">Composición Química</h4>
                    </div>
                    <ul className="text-xs text-gray-700 space-y-1.5 font-medium">
                      {Array.isArray(productoSeleccionado.composicion) ? (
                        productoSeleccionado.composicion.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span>{productoSeleccionado.composicion || "Ver especificaciones técnicas"}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 mt-8 bg-white sticky bottom-0">
                <a
                  href={`https://wa.me/573000000000?text=Hola,%20vengo%20de%20la%20página%20web%20y%20estoy%20interesado%20en%20el%20producto%20*${productoSeleccionado.nombre}*.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white hover:bg-[#128C7E] px-5 py-3.5 rounded-xl font-bold flex-1 text-center transition shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Cotizar por WhatsApp
                </a>
                <Link
                  to="/distribuidores"
                  onClick={() => setProductoSeleccionado(null)}
                  className="bg-white text-gray-700 hover:bg-gray-50 px-5 py-3.5 rounded-xl font-semibold sm:w-1/3 text-center transition border border-gray-200 text-sm"
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