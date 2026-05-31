// app/pages/Products.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, AlertCircle, WifiOff, X, Droplets, FlaskConical, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { CATEGORIES } from "../utils/constants";
import { MappedProduct } from "../interfaces/types/types";

export default function Products() {
  const { productos, loading, isFallback, apiDebugInfo } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<MappedProduct | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // EFECTO: Bloquear el scroll del fondo cuando el modal esté abierto
  useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [productoSeleccionado]);

  // =========================================================
  // FUNCIÓN PARA SEPARAR Y DESTACAR EL REGISTRO ICA DEL TEXTO
  // =========================================================
  const renderTextoConIcaDestacado = (texto: string, esModal = false) => {
    if (!texto) return null;

    // Expresión regular para detectar patrones como "REGISTRO DE VENTA ICA NO. 5795" o similares
    const regexIca = /(REGISTRO DE VENTA ICA\s*(?:NO\.|N°|NUMERO)?\s*\d+)/i;
    const coincidencia = texto.match(regexIca);

    if (coincidencia) {
      const textoIca = coincidencia[1];
      // Remueve el fragmento del ICA del texto original y limpia espacios u puntos sobrantes al inicio
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

    // Respaldo por si el producto no tiene un registro ICA en su descripción
    return (
      <p className={esModal ? "text-gray-700 text-sm leading-relaxed" : "text-gray-500 text-sm line-clamp-2 leading-relaxed"}>
        {texto}
      </p>
    );
  };

  // ==========================================
  // REVISIÓN Y EXTRACCIÓN ROBUSTA DE LA GALERÍA
  // ==========================================
  const obtenerGaleriaUnificada = (): string[] => {
    if (!productoSeleccionado) return [];

    let listaUrls: string[] = [];

    // 1. Si viene el array de imágenes oficial de WooCommerce mapeado ({ src: '...' })
    if (productoSeleccionado.images && Array.isArray(productoSeleccionado.images) && productoSeleccionado.images.length > 0) {
      listaUrls = productoSeleccionado.images.map(img => typeof img === 'string' ? img : img.src);
    }
    // 2. Alternativa: Si guardaron un array llamado 'imagenes' (común en Home)
    // @ts-ignore
    else if (productoSeleccionado.imagenes && Array.isArray(productoSeleccionado.imagenes)) {
      // @ts-ignore
      listaUrls = productoSeleccionado.imagenes;
    }

    // 3. Respaldo obligatorio: Si la lista está vacía pero hay una imagen de portada fija, la añadimos
    if (listaUrls.length === 0 && productoSeleccionado.image) {
      listaUrls = [productoSeleccionado.image];
    }

    // Filtramos cualquier valor nulo o vacío por seguridad
    return listaUrls.filter(url => !!url);
  };

  const galeriaImagenes = obtenerGaleriaUnificada();

  const siguienteImagen = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se cierre el modal accidentalmente
    if (galeriaImagenes.length > 1) {
      setCurrentImgIndex((prev) => (prev + 1) % galeriaImagenes.length);
    }
  };

  const anteriorImagen = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se cierre el modal accidentalmente
    if (galeriaImagenes.length > 1) {
      setCurrentImgIndex((prev) => (prev - 1 + galeriaImagenes.length) % galeriaImagenes.length);
    }
  };

  const filteredProducts = productos.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (Array.isArray(product.category)
        ? product.category.includes(selectedCategory)
        : product.category === selectedCategory);

    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestro Catálogo de Productos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fertilizantes especializados para cada necesidad de tu campo
          </p>
        </div>

        {/* Fallback Warning Banner */}
        {isFallback && (
          <div className="mb-8 max-w-4xl mx-auto bg-amber-50/90 border border-amber-200 p-5 rounded-xl shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 text-sm">
                  Modo de Demostración Local (Fallo de Conexión con WooCommerce)
                </h4>
                <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                  No pudimos conectar con la base de datos de tu WordPress. Se muestra un catálogo de contingencia local.
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setShowDebugPanel(!showDebugPanel)}
                    className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    {showDebugPanel ? "Ocultar Diagnósticos" : "Ver Diagnóstico Técnico"}
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-1 bg-white text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-medium"
                  >
                    Reintentar Conexión
                  </button>
                </div>
              </div>
            </div>

            {/* Diagnostic Panel */}
            {showDebugPanel && apiDebugInfo && (
              <div className="mt-5 border-t border-amber-200/50 pt-5 space-y-5">
                <div className="bg-amber-100/30 rounded-xl p-4 text-xs border border-amber-200/20 shadow-xs">
                  <p className="mb-1"><span className="font-bold text-amber-900">Error:</span> {apiDebugInfo.errorName} - {apiDebugInfo.errorMessage}</p>
                  <p><span className="font-bold text-amber-900">Solución:</span> {apiDebugInfo.detailedSolution}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`cursor-pointer px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-100 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-10 bg-gray-200 rounded-lg w-full mt-6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  onClick={() => {
                    setCurrentImgIndex(0);
                    setProductoSeleccionado(product);
                  }}
                  className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 cursor-pointer group"
                >
                  <div className="w-full h-72 overflow-hidden bg-gray-50 relative p-2 flex items-center justify-center border-b border-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain scale-105 group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center">
                        <Icon className="w-10 h-10 text-green-600" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 p-2.5 rounded-full shadow-xs backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-green-600" />
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      {/* MODIFICADO: Ahora renderiza dinámicamente separando el Registro ICA si existe */}
                      {renderTextoConIcaDestacado(product.description, false)}
                    </div>

                    <div className="space-y-3 mt-auto pt-4 border-t border-gray-100">
                      <div className="bg-green-50/50 rounded-xl p-3 border border-green-100/30">
                        <p className="text-xs font-bold text-green-800 flex items-center gap-1.5 mb-1">
                          <FlaskConical className="w-3.5 h-3.5 text-green-600" /> Composición
                        </p>
                        <p className="text-gray-600 text-xs line-clamp-1">{product.composition}</p>
                      </div>

                      <div className="bg-blue-50/40 rounded-xl p-3 border border-blue-100/20">
                        <p className="text-xs font-bold text-blue-800 flex items-center gap-1.5 mb-1">
                          <Droplets className="w-3.5 h-3.5 text-blue-500" /> Aplicación
                        </p>
                        <p className="text-gray-600 text-xs line-clamp-1">{product.application}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 bg-white">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIndex(0);
                        setProductoSeleccionado(product);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors shadow-xs cursor-pointer text-center text-sm"
                    >
                      Ver Ficha Técnica
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <WifiOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* MODAL RESPONSIVE CON CARRUSEL CORREGIDO */}
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

            {/* COLUMNA IZQUIERDA: Imagenes con Cambio de Estado de Index */}
            <div className="w-full md:w-1/2 bg-gray-50 relative flex items-center justify-center p-4 md:p-8 h-72 md:h-full border-b md:border-b-0 md:border-r border-gray-100 group/modal">
              {galeriaImagenes.length > 0 ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <img
                    src={galeriaImagenes[currentImgIndex]}
                    alt={productoSeleccionado.name}
                    className="max-w-full max-h-full object-contain drop-shadow-md transition-all duration-300 scale-105 md:scale-110"
                  />

                  {/* Flechas Laterales */}
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

                      {/* Indicador de posición visual */}
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

            {/* COLUMNA DERECHA: Información Técnica */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-[calc(90vh-288px)] md:h-full">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight pr-8">
                    {productoSeleccionado.name}
                  </h3>
                </div>

                {/* MODIFICADO: Aplica el destacado del ICA sobre la descripción completa del modal */}
                <div className="border-l-4 border-green-500 pl-4 bg-green-50/40 py-3.5 rounded-r-2xl">
                  {renderTextoConIcaDestacado(productoSeleccionado.fullDescription || productoSeleccionado.description, true)}
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