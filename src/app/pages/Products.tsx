// app/pages/Products.tsx
import { useState } from "react";
import { Link } from "react-router";
import { Search, AlertCircle, WifiOff, ExternalLink, X, Droplets, FlaskConical, MessageCircle } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { CATEGORIES } from "../utils/constants";
import { MappedProduct } from "../interfaces/types/types";

export default function Products() {
  const { productos, loading, isFallback, apiDebugInfo } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<MappedProduct | null>(null);

  const filteredProducts = productos.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
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
              className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid de Productos o Skeletons */}
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
                  onClick={() => setProductoSeleccionado(product)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden border border-gray-100 cursor-pointer"
                >
                  <div>
                    {product.image ? (
                      <div className="w-full h-48 overflow-hidden bg-gray-100 relative group">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                        <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-xs">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 pb-0">
                        <div className="bg-green-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="w-7 h-7 text-green-600" />
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                      <div className="space-y-2 text-xs border-t border-gray-100 pt-4">
                        <p><span className="font-semibold text-gray-700">Composición: </span><span className="text-gray-600">{product.composition}</span></p>
                        <p><span className="font-semibold text-gray-700">Aplicación: </span><span className="text-gray-600">{product.application}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
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
            <p className="text-gray-500 text-lg">No se encontraron productos con los filtros seleccionados</p>
          </div>
        )}
      </div>

      {/* MODAL TÉCNICO AVANZADO */}
      {productoSeleccionado && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setProductoSeleccionado(null); }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl">
            <div className="relative h-64 bg-gray-100">
              {productoSeleccionado.image ? (
                <img src={productoSeleccionado.image} alt={productoSeleccionado.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-50">
                  {(() => { const IconComponent = productoSeleccionado.icon; return <IconComponent className="w-20 h-20 text-green-600/50" />; })()}
                </div>
              )}
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-gray-200 transition z-10"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <h3 className="text-3xl font-bold text-white">{productoSeleccionado.name}</h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 text-sm mb-8 border-l-4 border-green-500 pl-4 bg-green-50/50 py-3 rounded-r-xl">
                {productoSeleccionado.fullDescription || productoSeleccionado.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <h4 className="font-bold text-gray-900">Modo de Aplicación</h4>
                  </div>
                  <p className="text-sm text-gray-600">{productoSeleccionado.application}</p>
                </div>
                <div className="bg-green-50/30 rounded-2xl p-5 border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-gray-900">Composición</h4>
                  </div>
                  <p className="text-sm text-gray-700">{productoSeleccionado.composition || "Ver especificaciones técnicas"}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20*${productoSeleccionado.name}*.`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-xl font-bold flex-1 text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-6 h-6" /> Cotizar por WhatsApp
                </a>
                <Link
                  to="/distribuidores"
                  onClick={() => { setProductoSeleccionado(null); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                  className="bg-white text-gray-700 hover:bg-gray-50 px-6 py-4 rounded-xl font-semibold sm:w-1/3 text-center border border-gray-200"
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