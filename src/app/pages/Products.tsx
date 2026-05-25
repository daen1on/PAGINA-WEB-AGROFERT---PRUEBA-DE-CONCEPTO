import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Leaf, Droplet, Zap, Shield, Search, AlertCircle, WifiOff, ExternalLink, X, Droplets, FlaskConical, MessageCircle } from "lucide-react";
import logo from '../../assets/Nutrifos.png';

interface WCProduct {
  id: number;
  name: string;
  description: string;
  short_description: string;
  images: { src: string }[];
  categories: { id: number; name: string; slug: string }[];
  attributes: { name: string; options: string[] }[];
}

interface MappedProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  fullDescription?: string;
  composition: string;
  application: string;
  image?: string;
  icon: React.ComponentType<any>;
}

const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "Urea Granulada 46%",
    category: "nitrogenados",
    description: "Fertilizante nitrogenado de alta concentración para máximo rendimiento",
    composition: "46% Nitrógeno (N)",
    application: "Cereales, forrajes, cultivos extensivos",
    icon: Leaf,
  },
  {
    id: 2,
    name: "Nitrato de Amonio",
    category: "nitrogenados",
    description: "Acción rápida y sostenida para nutrición nitrogenada",
    composition: "33.5% Nitrógeno (N)",
    application: "Maíz, trigo, pasturas",
    icon: Leaf,
  },
  {
    id: 3,
    name: "Fosfato Diamónico (DAP)",
    category: "fosforados",
    description: "Fertilizante fosfatado con nitrógeno para arranque de cultivos",
    composition: "18% N - 46% P₂O₅",
    application: "Siembra de cereales, oleaginosas",
    icon: Droplet,
  },
  {
    id: 4,
    name: "Superfosfato Triple",
    category: "fosforados",
    description: "Alta concentración de fósforo para desarrollo radicular",
    composition: "46% P₂O₅",
    application: "Todos los cultivos en fase inicial",
    icon: Droplet,
  },
  {
    id: 5,
    name: "Cloruro de Potasio",
    category: "potasicos",
    description: "Fuente de potasio para calidad y resistencia del cultivo",
    composition: "60% K₂O",
    application: "Frutales, hortalizas, soja",
    icon: Zap,
  },
  {
    id: 6,
    name: "Sulfato de Potasio",
    category: "potasicos",
    description: "Potasio sin cloruro para cultivos sensibles",
    composition: "50% K₂O - 18% S",
    application: "Hortalizas, papa, tabaco",
    icon: Zap,
  },
  {
    id: 7,
    name: "Compost Orgánico Premium",
    category: "organicos",
    description: "Mejora la estructura y fertilidad del suelo",
    composition: "Materia orgánica 65%",
    application: "Todos los cultivos orgánicos",
    icon: Shield,
  },
  {
    id: 8,
    name: "Humus de Lombriz",
    category: "organicos",
    description: "Bioestimulante natural rico en microorganismos",
    composition: "Materia orgánica 55%",
    application: "Horticultura, jardinería",
    icon: Shield,
  },
  {
    id: 9,
    name: "Boro Soluble",
    category: "micronutrientes",
    description: "Esencial para floración y fructificación",
    composition: "17% Boro (B)",
    application: "Frutales, girasol, alfalfa",
    icon: Droplet,
  },
  {
    id: 10,
    name: "Zinc Quelado",
    category: "micronutrientes",
    description: "Previene y corrige deficiencias de zinc",
    composition: "14% Zinc (Zn) quelado",
    application: "Maíz, cítricos, vid",
    icon: Droplet,
  },
  {
    id: 11,
    name: "NPK 15-15-15",
    category: "all",
    description: "Fertilizante balanceado para mantenimiento general",
    composition: "15% N - 15% P₂O₅ - 15% K₂O",
    application: "Cultivos en general",
    icon: Leaf,
  },
  {
    id: 12,
    name: "NPK 20-10-10",
    category: "all",
    description: "Alto en nitrógeno para fase vegetativa",
    composition: "20% N - 10% P₂O₅ - 10% K₂O",
    application: "Cultivos en crecimiento vegetativo",
    icon: Leaf,
  },
];

const getIconForCategory = (category: string) => {
  switch (category) {
    case "nitrogenados":
      return Leaf;
    case "fosforados":
    case "micronutrientes":
      return Droplet;
    case "potasicos":
      return Zap;
    case "organicos":
      return Shield;
    default:
      return Leaf;
  }
};

const getDetailedSolutionText = (issue: "cors" | "credentials" | "not_found" | "generic_network" | "none") => {
  switch (issue) {
    case "cors":
      return "Habilite cabeceras CORS en el archivo functions.php de WordPress.";
    case "credentials":
      return "Verifique que las claves API de WooCommerce sean válidas y tengan permisos de lectura.";
    case "not_found":
      return "Asegúrese de activar los enlaces permanentes (Permalinks) en WordPress.";
    default:
      return "Verifique la conectividad de red con el dominio de WordPress.";
  }
};

interface ApiDebugInfo {
  status: number | null;
  statusText: string;
  errorName: string;
  errorMessage: string;
  timestamp: string;
  requestUrl: string;
  analyzedIssue: "cors" | "credentials" | "not_found" | "generic_network" | "none";
  detailedSolution: string;
  rawErrorStack?: string;
}

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [productos, setProductos] = useState<MappedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [apiDebugInfo, setApiDebugInfo] = useState<ApiDebugInfo | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<MappedProduct | null>(null);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "nitrogenados", label: "Nitrogenados" },
    { id: "fosforados", label: "Fosforados" },
    { id: "potasicos", label: "Potásicos" },
    { id: "organicos", label: "Orgánicos" },
    { id: "micronutrientes", label: "Micronutrientes" },
  ];

  useEffect(() => {
    const customerKey = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_KEY || '';
    const customerSecret = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_SECRET || '';
    
    // Si estamos en desarrollo local (Vite dev server), usamos el proxy relativo
    // para saltar CORS. En producción usamos la URL absoluta.
    const isDev = import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';
    const baseUrl = isDev ? '' : 'https://www.agrofert.com.co';
    const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${customerKey}&consumer_secret=${customerSecret}&per_page=100`;
    
    // URL enmascarada para la UI por seguridad
    const maskedUrl = `${isDev ? '[LOCAL PROXY]' : 'https://www.agrofert.com.co'}/wp-json/wc/v3/products?consumer_key=ck_7752...1c2a&consumer_secret=cs_bbe4...2477&per_page=100`;

    console.group("%c[WooCommerce API Connection Debug]", "color: #16a34a; font-weight: bold; font-size: 13px;");
    console.log("Iniciando petición a la API de WooCommerce...");
    console.log("Entorno detectado:", isDev ? "DESARROLLO (Proxy Local)" : "PRODUCCIÓN (Llamada Directa)");
    console.log("URL Completa de Petición:", url);
    console.log("Timestamp:", new Date().toLocaleString());

    fetch(url)
      .then((response) => {
        console.log(`Respuesta del servidor recibida. Status: ${response.status} (${response.statusText})`);
        
        if (!response.ok) {
          let analyzedIssue: "cors" | "credentials" | "not_found" | "generic_network" | "none" = "none";
          if (response.status === 401 || response.status === 403) {
            analyzedIssue = "credentials";
          } else if (response.status === 404) {
            analyzedIssue = "not_found";
          }

          setApiDebugInfo({
            status: response.status,
            statusText: response.statusText,
            errorName: "HTTP Response Error",
            errorMessage: `La petición falló con código de estado HTTP ${response.status}.`,
            timestamp: new Date().toLocaleTimeString(),
            requestUrl: maskedUrl,
            analyzedIssue,
            detailedSolution: getDetailedSolutionText(analyzedIssue)
          });
          
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data: WCProduct[]) => {
        console.log("Productos recibidos de WooCommerce exitosamente:", data);
        
        if (!Array.isArray(data)) {
          throw new Error("El formato de datos devuelto no es un arreglo válido de productos.");
        }
        
        console.log(`Mapeando ${data.length} productos...`);

        const mappedData: MappedProduct[] = data.map((item) => {
          // Extraer categoría mapeando slugs o nombres comunes
          let category = "all";
          if (item.categories && item.categories.length > 0) {
            const firstCat = item.categories[0].slug.toLowerCase();
            if (firstCat.includes("nitrog")) category = "nitrogenados";
            else if (firstCat.includes("fosf")) category = "fosforados";
            else if (firstCat.includes("potas")) category = "potasicos";
            else if (firstCat.includes("organ")) category = "organicos";
            else if (firstCat.includes("micro") || firstCat.includes("nutri")) category = "micronutrientes";
            else category = firstCat; // Usar el slug tal cual si no coincide
          }

          // Extraer composición y aplicación desde atributos de WooCommerce si existen
          let composition = "Ver especificaciones técnicas";
          let application = "Consulte con nuestros asesores";

          if (item.attributes && item.attributes.length > 0) {
            const compAttr = item.attributes.find(attr => 
              attr.name.toLowerCase().includes("composic") || attr.name.toLowerCase().includes("composición")
            );
            const appAttr = item.attributes.find(attr => 
              attr.name.toLowerCase().includes("aplicac") || attr.name.toLowerCase().includes("aplicación")
            );

            if (compAttr && compAttr.options && compAttr.options.length > 0) {
              composition = compAttr.options.join(", ");
            }
            if (appAttr && appAttr.options && appAttr.options.length > 0) {
              application = appAttr.options.join(", ");
            }
          }

          // Limpiar etiquetas HTML de la descripción
          const rawDesc = item.short_description || item.description || "";
          const cleanDesc = rawDesc
            .replace(/<[^>]*>/g, '') // Quita tags HTML
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .trim();

          const shortDesc = cleanDesc.length > 120 
            ? cleanDesc.substring(0, 117) + "..." 
            : cleanDesc || "Sin descripción disponible";

          return {
            id: item.id,
            name: item.name,
            category: category,
            description: shortDesc,
            fullDescription: cleanDesc || "Sin descripción detallada disponible.",
            composition: composition,
            application: application,
            image: item.images && item.images.length > 0 ? item.images[0].src : undefined,
            icon: getIconForCategory(category),
          };
        });

        setProductos(mappedData);
        setLoading(false);
        console.groupEnd();
      })
      .catch((error: any) => {
        console.error("Error cargando productos de WooCommerce (activando fallback local):", error);
        
        setApiDebugInfo(prev => {
          if (prev) return prev; // ya se asignó un error específico anteriormente
          
          const isCorsOrNetwork = error instanceof TypeError && error.message.toLowerCase().includes("failed to fetch");
          const analyzedIssue = isCorsOrNetwork ? "cors" : "generic_network";

          return {
            status: null,
            statusText: "Network Error / CORS Blocked",
            errorName: error.name || "NetworkError",
            errorMessage: error.message || "No se pudo realizar la conexión debido a un problema de red o restricciones de CORS.",
            timestamp: new Date().toLocaleTimeString(),
            requestUrl: maskedUrl,
            analyzedIssue,
            detailedSolution: getDetailedSolutionText(analyzedIssue),
            rawErrorStack: error.stack
          };
        });

        // Fallback robusto a productos locales
        setProductos(STATIC_PRODUCTS);
        setIsFallback(true);
        setLoading(false);
        console.groupEnd();
      });
  }, []);

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
          <div className="mb-8 max-w-4xl mx-auto bg-amber-50/90 border border-amber-200 p-5 rounded-xl shadow-md animate-fade-in backdrop-blur-xs">
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 text-sm">
                  Modo de Demostración Local (Fallo de Conexión con WooCommerce)
                </h4>
                <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                  No pudimos conectar con la base de datos de tu WordPress/WooCommerce. Para asegurar la disponibilidad de la web, se muestra un catálogo de contingencia local.
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  <button 
                    onClick={() => setShowDebugPanel(!showDebugPanel)}
                    className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    {showDebugPanel ? "Ocultar Diagnósticos" : "Ver Diagnóstico Técnico"}
                    <span className="text-[9px] bg-amber-700/80 px-1 py-0.2 rounded font-mono font-bold">DEBUG</span>
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center gap-1 bg-white hover:bg-amber-100/50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    Reintentar Conexión
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Debug & Diagnostics Panel */}
            {showDebugPanel && apiDebugInfo && (
              <div className="mt-5 border-t border-amber-200/50 pt-5 space-y-5 animate-slide-down">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  
                  {/* Left Column: Diagnostics Analysis */}
                  <div className="lg:col-span-1 space-y-4">
                    <h5 className="font-semibold text-amber-950 text-xs flex items-center gap-2 uppercase tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      Análisis de Estado
                    </h5>
                    
                    <div className="bg-amber-100/30 rounded-xl p-4 space-y-3.5 text-xs border border-amber-200/20 shadow-xs">
                      <div>
                        <span className="text-amber-850 font-bold block mb-0.5">Timestamp:</span>
                        <span className="font-mono text-gray-700">{apiDebugInfo.timestamp}</span>
                      </div>
                      <div>
                        <span className="text-amber-850 font-bold block mb-0.5">Ruta Consultada:</span>
                        <span className="font-mono text-gray-600 break-all select-all">{apiDebugInfo.requestUrl}</span>
                      </div>
                      <div>
                        <span className="text-amber-850 font-bold block mb-0.5">Error Capturado:</span>
                        <span className="font-bold text-red-600 font-mono bg-red-50/50 px-1.5 py-0.5 rounded border border-red-100/30 inline-block">{apiDebugInfo.errorName}</span>
                      </div>
                      <div>
                        <span className="text-amber-850 font-bold block mb-0.5">Detalle:</span>
                        <span className="text-gray-750 leading-relaxed font-medium">{apiDebugInfo.errorMessage}</span>
                      </div>
                      {apiDebugInfo.status !== null && (
                        <div>
                          <span className="text-amber-850 font-bold block mb-0.5">Código HTTP:</span>
                          <span className="font-mono text-red-700 font-bold bg-red-100/60 px-2 py-0.5 rounded border border-red-200/40 inline-block">
                            {apiDebugInfo.status} {apiDebugInfo.statusText}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-[10px] border border-slate-800 shadow-inner">
                      <div className="flex justify-between items-center text-slate-400 mb-2 border-b border-slate-850 pb-1.5">
                        <span className="font-semibold text-slate-300">Stack Trace / Info</span>
                        <span className="text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-bold uppercase">React Client</span>
                      </div>
                      <pre className="whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed select-all">
                        {apiDebugInfo.rawErrorStack || `${apiDebugInfo.errorName}: ${apiDebugInfo.errorMessage}\n  at Products.tsx (WooCommerce Fetch Request)`}
                      </pre>
                    </div>
                  </div>

                  {/* Right Column: Smart Guide & Solutions (Takes 2 cols) */}
                  <div className="lg:col-span-2 space-y-4">
                    <h5 className="font-semibold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      Guía Técnica de Resolución
                    </h5>
                    
                    {apiDebugInfo.analyzedIssue === "cors" && (
                      <div className="bg-white rounded-xl p-5 border border-amber-200/50 shadow-xs space-y-4">
                        <div className="bg-red-50/70 text-red-900 text-xs p-3.5 rounded-lg border border-red-100 flex flex-col gap-1">
                          <strong className="text-red-950 font-bold">Causa Detectada: Bloqueo de CORS (Cross-Origin Resource Sharing)</strong>
                          <p className="leading-relaxed text-red-800">
                            El navegador bloqueó la petición porque el servidor de WordPress en `www.agrofert.com.co` no responde con las cabeceras CORS necesarias para autorizar consultas externas desde tu entorno actual (`localhost` o dominio web).
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <h6 className="font-bold text-xs text-slate-850">¿Cómo habilitar CORS en tu WordPress?</h6>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Agrega el siguiente código al final del archivo <code className="font-mono bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[11px] font-bold">functions.php</code> de tu tema activo en WordPress para habilitar el acceso:
                          </p>
                          
                          <div className="relative group">
                            <pre className="bg-slate-950 text-slate-100 rounded-xl p-4.5 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-900 shadow-md">
{`// Habilitar peticiones CORS desde el frontend
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, X-Requested-With");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        status_header(200);
        exit;
    }
});`}
                            </pre>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`// Habilitar peticiones CORS desde el frontend
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce, X-Requested-With");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        status_header(200);
        exit;
    }
});`);
                                alert("¡Código PHP copiado al portapapeles con éxito!");
                              }}
                              className="absolute top-3 right-3 bg-slate-800 hover:bg-slate-700 text-white text-[10px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer font-bold border border-slate-700"
                            >
                              Copiar PHP
                            </button>
                          </div>

                          <div className="bg-blue-50/70 text-blue-900 p-4 rounded-xl text-xs border border-blue-100 space-y-1.5 leading-relaxed">
                            <strong className="text-blue-950 font-bold block">💡 Recomendación de Seguridad de Agrofert:</strong>
                            <p className="text-blue-800">
                              Actualmente, las credenciales se encuentran expuestas en el código del navegador. La arquitectura recomendada es consultar un microservicio intermedio (Backend Proxy / API Serverless) que contenga las claves en variables de entorno seguras, lo cual elimina el riesgo de robo de claves y resuelve el problema de CORS automáticamente.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {apiDebugInfo.analyzedIssue === "credentials" && (
                      <div className="bg-white rounded-xl p-5 border border-amber-200/50 shadow-xs space-y-4">
                        <div className="bg-red-50/70 text-red-900 text-xs p-3.5 rounded-lg border border-red-100 flex flex-col gap-1">
                          <strong className="text-red-950 font-bold">Causa Detectada: Credenciales Inválidas o Permisos Insuficientes (401/403)</strong>
                          <p className="leading-relaxed text-red-800">
                            WordPress rechazó las claves de acceso de WooCommerce. La clave de consumidor (`customerKey`) o el secreto de consumidor (`customerSecret`) no coinciden, han sido borradas o no tienen privilegios de lectura en WordPress.
                          </p>
                        </div>
                        
                        <div className="space-y-3 text-xs leading-relaxed">
                          <h6 className="font-bold text-slate-850">Solución:</h6>
                          <ol className="list-decimal list-inside space-y-2 text-slate-650 font-medium">
                            <li>Ingresa al administrador de WordPress de Agrofert.</li>
                            <li>Dirígete a <strong>WooCommerce &gt; Ajustes &gt; Avanzado &gt; API REST</strong>.</li>
                            <li>Verifica que la clave API asignada esté activa y sus permisos estén definidos en <strong>Leer</strong> o en <strong>Lectura/Escritura</strong>.</li>
                            <li>Si es necesario, genera una nueva clave API de lectura y actualízala en las constantes <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-700 font-bold">customerKey</code> y <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-amber-700 font-bold">customerSecret</code> de este archivo.</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    {apiDebugInfo.analyzedIssue === "not_found" && (
                      <div className="bg-white rounded-xl p-5 border border-amber-200/50 shadow-xs space-y-4">
                        <div className="bg-red-50/70 text-red-900 text-xs p-3.5 rounded-lg border border-red-100 flex flex-col gap-1">
                          <strong className="text-red-950 font-bold">Causa Detectada: Ruta Inexistente (404 Not Found)</strong>
                          <p className="leading-relaxed text-red-800">
                            La ruta solicitada no fue localizada en el servidor de WordPress. Esto ocurre comúnmente cuando las URL amigables o enlaces permanentes (Permalinks) no están configurados en WordPress.
                          </p>
                        </div>
                        
                        <div className="space-y-3 text-xs leading-relaxed">
                          <h6 className="font-bold text-slate-850">Pasos de Corrección:</h6>
                          <ol className="list-decimal list-inside space-y-2 text-slate-650 font-medium">
                            <li>En WordPress, ve a <strong>Ajustes &gt; Enlaces permanentes</strong>.</li>
                            <li>Asegúrate de que <strong>NO</strong> esté seleccionada la opción "Simple". Selecciona "Nombre de la entrada" o cualquier otra opción estructurada.</li>
                            <li>Guarda los cambios para regenerar la configuración de URLs de WordPress.</li>
                            <li>Verifica que la ruta base responda con JSON abriendo <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-amber-700 break-all select-all font-bold">https://www.agrofert.com.co/wp-json/</code> directamente en tu navegador.</li>
                          </ol>
                        </div>
                      </div>
                    )}

                    {apiDebugInfo.analyzedIssue === "generic_network" && (
                      <div className="bg-white rounded-xl p-5 border border-amber-200/50 shadow-xs space-y-4">
                        <div className="bg-red-50/70 text-red-900 text-xs p-3.5 rounded-lg border border-red-100 flex flex-col gap-1">
                          <strong className="text-red-950 font-bold">Causa Detectada: Falla de Conexión de Red</strong>
                          <p className="leading-relaxed text-red-800">
                            No fue posible contactar físicamente con el servidor de `www.agrofert.com.co`. Esto indica una falta de conectividad local o una restricción de firewall/servidor.
                          </p>
                        </div>
                        
                        <div className="space-y-2 text-xs leading-relaxed text-slate-600 font-medium">
                          <h6 className="font-bold text-slate-850 mb-1.5">Acciones recomendadas:</h6>
                          <ul className="list-disc list-inside space-y-1.5">
                            <li>Asegúrate de tener acceso a internet y de poder abrir la página <a href="https://www.agrofert.com.co" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline inline-flex items-center gap-0.5 font-bold">www.agrofert.com.co<ExternalLink className="w-3.5 h-3.5" /></a> en tu navegador.</li>
                            <li>Verifica si algún plugin de seguridad en WordPress (Wordfence, Sucuri) o un servicio proxy (Cloudflare) está bloqueando las peticiones desde tu dirección IP.</li>
                            <li>Comprueba si el servidor web de Agrofert se encuentra caído temporalmente.</li>
                          </ul>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer shadow-sm ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white shadow-green-200"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
                <div className="h-10 bg-gray-200 rounded-lg w-full" />
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  onClick={() => setProductoSeleccionado(product)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden border border-gray-100 cursor-pointer"
                >
                  <div>
                    {product.image ? (
                      <div className="w-full h-48 overflow-hidden bg-gray-100 border-b border-gray-100 relative group">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full shadow-xs">
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 font-sans tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="space-y-2 text-xs border-t border-gray-100 pt-4">
                        <div className="flex items-start gap-1">
                          <span className="font-semibold text-gray-700 shrink-0">Composición: </span>
                          <span className="text-gray-600 line-clamp-2">{product.composition}</span>
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="font-semibold text-gray-700 shrink-0">Aplicación: </span>
                          <span className="text-gray-600 line-clamp-2">{product.application}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setProductoSeleccionado(product); }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors cursor-pointer shadow-xs"
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
            <p className="text-gray-500 text-lg">
              No se encontraron productos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>

      {/* MODAL TÉCNICO AVANZADO */}
      {productoSeleccionado && (
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) setProductoSeleccionado(null); }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl cursor-default animate-in fade-in zoom-in duration-200">
            
            {/* Cabecera con Imagen */}
            <div className="relative h-64 sm:h-72 bg-gray-100">
              {productoSeleccionado.image ? (
                <img src={productoSeleccionado.image} alt={productoSeleccionado.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-50">
                  {(() => {
                    const IconComponent = productoSeleccionado.icon;
                    return <IconComponent className="w-20 h-20 text-green-600/50" />;
                  })()}
                </div>
              )}
              <button 
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-gray-200 transition z-10 shadow-md cursor-pointer animate-fade-in"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
              {/* Título superpuesto con gradiente */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{productoSeleccionado.name}</h3>
              </div>
            </div>
            
            {/* Contenido Técnico */}
            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed border-l-4 border-green-500 pl-4 bg-green-50/50 py-3 rounded-r-xl font-medium">
                {productoSeleccionado.fullDescription || productoSeleccionado.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Columna: Aplicación */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <h4 className="font-bold text-gray-900 text-base md:text-lg">Modo de Aplicación</h4>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium">
                    {productoSeleccionado.application}
                  </p>
                </div>

                {/* Columna: Composición */}
                <div className="bg-green-50/30 rounded-2xl p-5 border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-gray-900 text-base md:text-lg">Composición</h4>
                  </div>
                  {productoSeleccionado.composition && productoSeleccionado.composition.includes(",") ? (
                    <ul className="text-xs md:text-sm text-gray-700 space-y-2 font-medium">
                      {productoSeleccionado.composition.split(",").map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1 shrink-0">•</span>
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">{productoSeleccionado.composition || "Ver especificaciones técnicas"}</p>
                  )}
                </div>
              </div>
              
              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/573000000000?text=Hola,%20vengo%20de%20la%20página%20web%20y%20estoy%20interesado%20en%20el%20producto%20*${productoSeleccionado.name}*.%20¿Me%20podrían%20dar%20más%20información?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-xl font-bold flex-1 text-center transition shadow-lg flex items-center justify-center gap-2 cursor-pointer font-sans"
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
                  className="bg-white text-gray-700 hover:bg-gray-50 px-6 py-4 rounded-xl font-semibold sm:w-1/3 text-center transition border border-gray-200 cursor-pointer font-sans"
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

