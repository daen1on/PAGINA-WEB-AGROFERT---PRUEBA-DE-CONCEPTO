import { useParams, Link, Navigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import {
  Droplets, Sun, ThermometerSun, ShieldAlert, CheckCircle, ArrowLeft,
  X, FlaskConical, MessageCircle, ChevronLeft, ChevronRight, ZoomIn, AlertCircle, FileSpreadsheet
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { cropDetailsData } from "../../data/cropDetailsData";
import { useProducts } from "../hooks/useProducts";
import { MappedProduct } from "../interfaces/types/types";

// ==========================================================
// COMPONENTE PARA INTERACCIÓN DE ZOOM REUTILIZADO DEL CATÁLOGO
// ==========================================================
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const toggleZoom = () => setZoom(!zoom);

  let lastTap = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      setZoom((prev) => !prev);
      if (containerRef.current && e.touches[0]) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.touches[0].clientX - left) / width) * 100;
        const y = ((e.touches[0].clientY - top) / height) * 100;
        setPosition({ x, y });
      }
    }
    lastTap = now;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!zoom || !containerRef.current || e.touches.length === 0) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    let x = ((e.touches[0].clientX - left) / width) * 100;
    let y = ((e.touches[0].clientY - top) / height) * 100;
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

export default function CropDetail() {
  const { id } = useParams();
  const { productos } = useProducts();

  const [productoSeleccionado, setProductoSeleccionado] = useState<MappedProduct | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Intentar obtener la información base desde el archivo estático
  // Nota: Si el id es "tomate" y en tu archivo aún se llama "pera", lo interceptamos abajo
  const keyBuscar = (id === "tomate" && !cropDetailsData["tomate" as keyof typeof cropDetailsData]) ? "pera" : id;
  const cropData = cropDetailsData[keyBuscar as keyof typeof cropDetailsData];

  // Interceptar y setear dinámicamente los productos reales y nombres correctos según el cultivo
  useEffect(() => {
    if (cropData && id) {
      if (id === "fresa") {
        cropData.name = "Fresa";
        cropData.products = ["Humifos K", "Nutrifos k", "Bullterr k"];
      } else if (id === "tomate" || id === "pera") {
        cropData.name = "Tomate";
        cropData.products = ["Humifos k", "Aminox V", "Nutrifos K"];
      } else if (id === "papa") {
        cropData.name = "Papa";
        cropData.products = ["Humifos k", "Nutrifos K", "Bullterr K"];
      }
    }
  }, [cropData, id]);

  useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [productoSeleccionado]);

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [productoSeleccionado]);

  if (!cropData) {
    return <Navigate to="/cultivos" replace />;
  }

  // ==========================================================
  // RESOLUCIÓN DINÁMICA DE LA RUTA DE LA IMAGEN DEL PLAN
  // ==========================================================
  const getPlanFertilizacionSrc = (): string => {
    if (id === "fresa") {
      return "/src/assets/PLAN FERTILIZACION AGROFERT_FRESA.png";
    }
    if (id === "tomate" || id === "pera") {
      return "/src/assets/PLAN FERTILIZACION AGROFERT_TOMATE.png";
    }
    if (id === "papa") {
      return "/src/assets/PLAN FERTILIZACION AGROFERT_PAPA.png";
    }
    return "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop";
  };

  const renderTextoConIcaDestacado = (texto: string) => {
    if (!texto) return null;
    const regexIca = /(REGISTRO DE VENTA ICA\s*(?:NO\.|N°|NUMERO)?\s*\d+)/i;
    const coincidencia = texto.match(regexIca);

    if (coincidencia) {
      const textoIca = coincidencia[1];
      const textoRestante = texto.replace(textoIca, "").replace(/^[\s.,;:-]+/, "");
      return (
        <div className="space-y-2">
          <div className="inline-block bg-green-100 text-green-800 font-bold rounded-md px-2.5 py-1 text-xs tracking-wide uppercase border border-green-200 mb-1">
            {textoIca}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{textoRestante}</p>
        </div>
      );
    }
    return <p className="text-gray-700 text-sm leading-relaxed">{texto}</p>;
  };

  const obtenerGaleriaUnificada = (): string[] => {
    if (!productoSeleccionado) return [];
    let listaUrls: string[] = [];
    if (productoSeleccionado.images && Array.isArray(productoSeleccionado.images) && productoSeleccionado.images.length > 0) {
      listaUrls = productoSeleccionado.images.map(img => typeof img === 'string' ? img : img.src);
    } else if (productoSeleccionado.imagenes && Array.isArray(productoSeleccionado.imagenes)) {
      // @ts-ignore
      listaUrls = productoSeleccionado.imagenes;
    }
    if (listaUrls.length === 0 && productoSeleccionado.image) {
      listaUrls = [productoSeleccionado.image];
    }
    return listaUrls.filter(url => !!url);
  };

  const galeriaImagenes = obtenerGaleriaUnificada();

  const siguienteImagen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galeriaImagenes.length > 1) setCurrentImgIndex((prev) => (prev + 1) % galeriaImagenes.length);
  };

  const anteriorImagen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galeriaImagenes.length > 1) setCurrentImgIndex((prev) => (prev - 1 + galeriaImagenes.length) % galeriaImagenes.length);
  };

  const handleProductClick = (productName: string) => {
    const foundProduct = productos.find(p => p.name.toLowerCase().trim() === productName.toLowerCase().trim());

    if (foundProduct) {
      setProductoSeleccionado(foundProduct);
    } else {
      alert(`El producto "${productName}" está recomendado pero no se encontró en el catálogo de la distribuidora actualmente.`);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* HERO BANNER PRINCIPAL */}
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

        {/* ICONOS DE FICHA RÁPIDA (Clima, Riego, Suelo) */}
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

        {/* CONTENIDO EN DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* COLUMNA PRINCIPAL IZQUIERDA (2 Tercios de ancho) */}
          <div className="lg:col-span-2 space-y-12">

            {/* SECCIÓN 1: PROCESO DE CULTIVO Y CUIDADOS */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Proceso de Cultivo y Cuidados</h2>
              <div className="prose max-w-none text-gray-600 space-y-4 leading-relaxed">
                {cropData.process.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* SECCIÓN NUEVA: IMAGEN DEL PLAN DE FERTILIZACIÓN DINÁMICA */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 text-gray-800 pb-2 border-b border-gray-100">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Plan de Fertilización Sugerido</h2>
              </div>

              {/* Contenedor Gráfico Dinámico */}
              <div className="w-full bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden shadow-xs relative flex items-center justify-center max-h-[450px]">
                <img
                  src={getPlanFertilizacionSrc()}
                  alt={`Plan de Fertilización para ${cropData.name}`}
                  className="w-full h-full object-contain max-h-[450px]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop";
                  }}
                />
                <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full font-medium backdrop-blur-xs">
                  Gráfico Técnico Agrofert
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center italic">Esquema referencial de etapas fenológicas y dosificación de macro y micronutrientes.</p>
            </section>

            {/* SECCIÓN 3: TARJETAS DE ENFERMEDADES COMUNES */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Enfermedades Comunes y Soluciones</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {cropData.diseases.map((disease, index) => (
                  <div key={index} className="bg-red-50/60 p-6 rounded-xl border border-red-100/70 shadow-2xs">
                    <div className="flex items-center gap-3 text-red-700 mb-3">
                      <ShieldAlert size={22} className="shrink-0" />
                      <h3 className="font-bold text-lg">{disease.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{disease.desc}</p>
                    <div className="pt-3 border-t border-red-200/40">
                      <p className="text-xs font-bold text-red-950 uppercase tracking-wide mb-0.5">Solución Técnica:</p>
                      <p className="text-sm text-gray-900 font-medium">{disease.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COLUMNA DERECHA LATERAL (1 Tercio de ancho) */}
          <div className="space-y-8 lg:sticky lg:top-6 self-start">

            {/* PROGRAMA DE NUTRICIÓN */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Programa de Nutrición</h3>
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
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Productos Agrofert Recomendados:</h4>
                <div className="flex flex-wrap gap-2">
                  {cropData.products?.map((product, index) => (
                    <button
                      key={index}
                      onClick={() => handleProductClick(product)}
                      className="bg-green-100 hover:bg-green-600 hover:text-white text-green-800 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-all border border-green-200/50 shadow-2xs"
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA / BANNER DE CONTACTO FINAL */}
            <div className="bg-green-600 p-8 rounded-2xl text-center text-white shadow-xl space-y-4">
              <h3 className="text-2xl font-bold leading-snug">¿Necesitas un plan a la medida?</h3>
              <p className="text-sm opacity-90 leading-relaxed">Nuestros agrónomos te asesoran con el programa de fertilización exacto para tu finca.</p>
              <Link to="/contacto" className="inline-block bg-white text-green-600 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all w-full shadow-md text-sm tracking-wide uppercase cursor-pointer">
                Solicitar Asesoría
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* ==========================================================
          MODAL DE FICHA TÉCNICA DINÁMICO (REUTILIZADO)
         ========================================================== */}
      {productoSeleccionado && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setProductoSeleccionado(null); }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-200"
        >
          <div className="bg-white rounded-3xl max-w-5xl w-full relative flex flex-col md:flex-row overflow-hidden shadow-2xl max-h-[90vh] md:h-[650px] animate-in fade-in zoom-in-95 duration-200">

            <button
              onClick={() => setProductoSeleccionado(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-gray-900/20 hover:bg-gray-900/40 md:bg-gray-100 p-2.5 rounded-full hover:scale-105 transition z-50 shadow-md cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            {/* COLUMNA IZQUIERDA MODAL */}
            <div className="w-full md:w-1/2 bg-gray-50 relative flex items-center justify-center p-4 md:p-8 h-80 md:h-full border-b md:border-b-0 md:border-r border-gray-100 group/modal">
              {galeriaImagenes.length > 0 ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <ZoomableImage
                    src={galeriaImagenes[currentImgIndex]}
                    alt={productoSeleccionado.name}
                  />

                  {galeriaImagenes.length > 1 && (
                    <>
                      <button
                        onClick={anteriorImagen}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-2.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer border border-gray-100"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                      </button>
                      <button
                        onClick={siguienteImagen}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-2.5 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer border border-gray-100"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wider backdrop-blur-xs">
                        {currentImgIndex + 1} / {galeriaImagenes.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-50">
                  <AlertCircle className="w-12 h-12 text-green-600/30" />
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA MODAL */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-[calc(90vh-320px)] md:h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight pr-8">
                    {productoSeleccionado.name}
                  </h3>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-green-50/40 py-3.5 rounded-r-2xl">
                  {renderTextoConIcaDestacado(productoSeleccionado.fullDescription || productoSeleccionado.description)}
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <h4 className="font-bold text-gray-800 text-sm">Modo de Aplicación</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{productoSeleccionado.application}</p>
                  </div>

                  <div className="bg-green-50/30 rounded-2xl p-4 border border-green-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="w-4 h-4 text-green-600" />
                      <h4 className="font-bold text-gray-800 text-sm">Composición Química</h4>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">{productoSeleccionado.composition || "Ver especificaciones técnicas"}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100 mt-8 bg-white sticky bottom-0">
                <a
                  href={`https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20*${productoSeleccionado.name}*.`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3.5 rounded-xl font-bold flex-1 text-center flex items-center justify-center gap-2 transition-colors shadow-md text-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" /> Cotizar por WhatsApp
                </a>
                <Link
                  to="/distribuidores"
                  onClick={() => setProductoSeleccionado(null)}
                  className="bg-white text-gray-700 hover:bg-gray-50 px-5 py-3.5 rounded-xl font-semibold sm:w-1/3 text-center border border-gray-200 transition-colors text-sm"
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