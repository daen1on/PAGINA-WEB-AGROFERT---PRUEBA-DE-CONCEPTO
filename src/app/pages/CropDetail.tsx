import { useParams, Link, Navigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import {
  Droplets, Sun, ThermometerSun, ShieldAlert, CheckCircle, ArrowLeft,
  AlertCircle, FileSpreadsheet
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { cropDetailsData } from "../../data/cropDetailsData";
import { useProducts } from "../hooks/useProducts";
import { MappedProduct } from "../interfaces/types/types";
import ProductModal from "../components/ProductModal";

export default function CropDetail() {
  const { id } = useParams();
  const { productos } = useProducts();

  const [productoSeleccionado, setProductoSeleccionado] = useState<MappedProduct | null>(null);

  // Intentar obtener la información base desde el archivo estático
  // Nota: Si el id es "tomate" y en tu archivo aún se llama "pera", lo interceptamos abajo
  const keyBuscar = (id === "tomate" && !cropDetailsData["tomate" as keyof typeof cropDetailsData]) ? "pera" : id;
  const cropData = cropDetailsData[keyBuscar as keyof typeof cropDetailsData];

  // Interceptar y setear dinámicamente los productos reales y nombres correctos según el cultivo
  useEffect(() => {
    if (cropData && id) {
      if (id === "fresa") {
        cropData.name = "Fresa";
        cropData.products = [
          "NPK Agrofert", "Hidrostar", "Humifos K", "Creci Yan",
          "Nitro", "Magnesio Agrofer", "fCuaje Yan", "Starmin-k",
          "Nutrifos K", "Bullterr K"
        ];
      } else if (id === "tomate" || id === "pera") {
        cropData.name = "Tomate";
        cropData.products = ["Humifos k", "Aminox V", "Nutrifos K"];
      } else if (id === "papa") {
        cropData.name = "Papa";
        cropData.products = ["Humifos k", "Nutrifos K", "Bullterr K"];
      }
    }
  }, [cropData, id]);

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
    const coincidencia = text => text.match(regexIca);
    const match = regexIca.exec(texto);

    if (match) {
      const textoIca = match[1];
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

  // ==========================================================
  // CONFIGURACIÓN DE PREVISUALIZACIONES Y HOTSPOTS DEL PLAN
  // ==========================================================
  const FALLBACK_PRODUCTS_DETAILS: Record<string, { name: string; description: string; composition: string; application: string; image?: string }> = {
    "hidrostar": {
      name: "Hidrostar",
      description: "Complejo soluble equilibrado para la fase de floración y llenado, estimula el cuaje de frutos.",
      composition: "18% Nitrógeno, 18% Fósforo, 18% Potasio + micronutrientes quelados",
      application: "Fertirriego: Aplicar de 1 a 2 g/litro de agua según la etapa del cultivo.",
      image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=200&auto=format&fit=crop"
    },
    "humifos k": {
      name: "Humifos K",
      description: "Acondicionador orgánico de suelos rico en ácidos húmicos y fúlvicos con potasio soluble.",
      composition: "Ácidos Húmicos 15%, Ácidos Fúlvicos 5%, Potasio (K2O) 10%",
      application: "Fertirriego o inyección edáfica para mejorar estructura radicular.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=200&auto=format&fit=crop"
    },
    "humifos-k": {
      name: "Humifos K",
      description: "Acondicionador orgánico de suelos rico en ácidos húmicos y fúlvicos con potasio soluble.",
      composition: "Ácidos Húmicos 15%, Ácidos Fúlvicos 5%, Potasio (K2O) 10%",
      application: "Fertirriego o inyección edáfica para mejorar estructura radicular.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=200&auto=format&fit=crop"
    },
    "aminox v": {
      name: "Aminox V",
      description: "Complejo a base de aminoácidos libres de origen vegetal para activación metabólica.",
      composition: "Aminoácidos libres 12.0%, Nitrógeno Orgánico 2.0%",
      application: "Foliar: 1 L/200 L de agua para superación de estrés vegetativo.",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=200&auto=format&fit=crop"
    },
    "creci yan": {
      name: "Creci Yan",
      description: "Bioestimulante foliar diseñado para potenciar el desarrollo de brotes y follaje activo.",
      composition: "Nitrógeno soluble, aminoácidos de origen vegetal y estimulantes de división celular.",
      application: "Foliar: 1 L por 200 L de agua, aplicar en fases de crecimiento rápido."
    },
    "fcuaje yan": {
      name: "fCuaje Yan",
      description: "Bioestimulante hormonal natural para maximizar el amarre de flores y desarrollo de primordios del fruto.",
      composition: "Boro 10%, Zinc 5%, Aminoácidos específicos y precursores hormonales.",
      application: "Foliar: aplicar antes del inicio de floración y durante la caída de pétalos."
    },
    "starmin-k": {
      name: "Starmin-K",
      description: "Nutriente potásico de alta asimilación con microelementos para el llenado y pigmentación.",
      composition: "Potasio soluble (K2O) 30%, Boro y Zinc quelatados.",
      application: "Foliar o fertirriego: aplicar en desarrollo y maduración del fruto."
    },
    "nitro": {
      name: "Nitro",
      description: "Nutriente de alta concentración de nitrógeno, fósforo y magnesio. Estimula la síntesis de clorofila.",
      composition: "Nitrógeno Total (K2O): 205 g/L, Fósforo (P2O5): 40 g/L, Magnesio (MgO): 40 g/L",
      application: "Foliar: 1 L/200 L. Edáfica: 1.0 L/1000 L.",
      image: "/src/assets/nitro.png"
    },
    "magnesio": {
      name: "Magnesio Agrofer",
      description: "Magnesio soluble altamente concentrado, ideal para la síntesis de clorofila y fotosíntesis activa.",
      composition: "Magnesio Total (MgO): 130 g/L, Nitrógeno (N): 100 g/L",
      application: "Foliar: 0.5-1.0 L/200 L. Fertirriego: 0.5 L/1000 L.",
      image: "/src/assets/magnesio.png"
    },
    "magnesio agrofer": {
      name: "Magnesio Agrofer",
      description: "Magnesio soluble altamente concentrado, ideal para la síntesis de clorofila y fotosíntesis activa.",
      composition: "Magnesio Total (MgO): 130 g/L, Nitrógeno (N): 100 g/L",
      application: "Foliar: 0.5-1.0 L/200 L. Fertirriego: 0.5 L/1000 L.",
      image: "/src/assets/magnesio.png"
    },
    "nutrifos k": {
      name: "Nutrifos K",
      description: "Fósforo y potasio de máxima concentración sinergizados con boro y zinc para el llenado.",
      composition: "Potasio (K2O): 600 g/L, Fósforo (P2O5): 400 g/L, Boro (B): 3 g/L, Zinc (Zn): 5 g/L",
      application: "Foliar o fertirriego en etapas de floración y fructificación.",
      image: "/src/assets/nutrifos.png"
    },
    "nutrifos-k": {
      name: "Nutrifos K",
      description: "Fósforo y potasio de máxima concentración sinergizados con boro y zinc para el llenado.",
      composition: "Potasio (K2O): 600 g/L, Fósforo (P2O5): 400 g/L, Boro (B): 3 g/L, Zinc (Zn): 5 g/L",
      application: "Foliar o fertirriego en etapas de floración y fructificación.",
      image: "/src/assets/nutrifos.png"
    },
    "bullterr k": {
      name: "Bullterr K",
      description: "Alta concentración de potasio sinergizado con magnesio, azufre y microelementos para el calibre.",
      composition: "Potasio (K2O): 500 g/L, Magnesio (MgO): 8 g/L, Azufre (S): 8 g/L, Boro (B): 17 g/L",
      application: "Foliar o fertirriego al inicio de fructificación y maduración.",
      image: "/src/assets/bullterr.png"
    },
    "bullterr-k": {
      name: "Bullterr K",
      description: "Alta concentración de potasio sinergizado con magnesio, azufre y microelementos para el calibre.",
      composition: "Potasio (K2O): 500 g/L, Magnesio (MgO): 8 g/L, Azufre (S): 8 g/L, Boro (B): 17 g/L",
      application: "Foliar o fertirriego al inicio de fructificación y maduración.",
      image: "/src/assets/bullterr.png"
    },
    "npk agrofert": {
      name: "NPK Agrofert",
      description: "Fertilizante complejo soluble con balance NPK y secundarios para vigor general.",
      composition: "Nitrógeno (N): 100 g/L, Fósforo (P2O5): 300 g/L, Potasio (K2O): 100 g/L, Calcio: 10 g/L",
      application: "Foliar o fertirriego en fases iniciales y desarrollo de brotes.",
      image: "/src/assets/npk.png"
    }
  };

  const getHotspotsForCrop = (): { name: string; x: number; y: number; w: number; h: number; showDot?: boolean; tooltipPosition?: "top" | "bottom" }[] => {
    if (id === "fresa") {
      return [
        // PLAN 1 (Fila Superior - Pink text) - Tooltips below
        // Col 1: NPK Agrofert + Hidrostar
        { name: "NPK Agrofert", x: 16, y: 28, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
        { name: "Hidrostar", x: 16, y: 33, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },

        // Col 2: Humifos-k + Creci Yan
        { name: "Humifos K", x: 33, y: 28, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
        { name: "Creci Yan", x: 33, y: 33, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },

        // Col 3: fCuaje Yan + Magnesio
        { name: "fCuaje Yan", x: 49, y: 28, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },
        { name: "Magnesio", x: 49, y: 33, w: 16, h: 5, showDot: false, tooltipPosition: "bottom" },

        // Col 4: Nutrifos-k + Starmin-k
        { name: "Nutrifos K", x: 65, y: 28, w: 14, h: 5, showDot: false, tooltipPosition: "bottom" },
        { name: "Starmin-k", x: 65, y: 33, w: 14, h: 5, showDot: false, tooltipPosition: "bottom" },

        // Col 5: Bullterr-k
        { name: "Bullterr K", x: 82, y: 30, w: 11, h: 7, showDot: false, tooltipPosition: "bottom" },

        // PLAN 2 (Fila Inferior - Green text) - Tooltips above
        // Col 1: Humifos-k
        { name: "Humifos K", x: 16, y: 42, w: 16, h: 6, showDot: false, tooltipPosition: "top" },

        // Col 2: Nitro + Magnesio
        { name: "Nitro", x: 33, y: 38, w: 16, h: 4, showDot: false, tooltipPosition: "top" },
        { name: "Magnesio", x: 33, y: 45.5, w: 16, h: 3, showDot: false, tooltipPosition: "top" },

        // Col 3: Starmin-k
        { name: "Starmin-k", x: 49, y: 42, w: 16, h: 6, showDot: false, tooltipPosition: "top" },

        // Col 4: Nutrifos-k
        { name: "Nutrifos K", x: 65, y: 42, w: 14, h: 6, showDot: false, tooltipPosition: "top" },

        // Col 5: Bullterr-k
        { name: "Bullterr K", x: 82, y: 42, w: 11, h: 6, showDot: false, tooltipPosition: "top" },
      ];
    }
    if (id === "tomate" || id === "pera") {
      return [
        { name: "Humifos K", x: 8, y: 65, w: 17, h: 22, showDot: true, tooltipPosition: "top" },
        { name: "Aminox V", x: 31.5, y: 65, w: 17, h: 22, showDot: true, tooltipPosition: "top" },
        { name: "Nutrifos K", x: 55, y: 65, w: 17, h: 22, showDot: true, tooltipPosition: "top" },
        { name: "NPK Agrofert", x: 78.5, y: 65, w: 17, h: 22, showDot: true, tooltipPosition: "top" },
      ];
    }
    if (id === "papa") {
      return [
        { name: "Humifos K", x: 13, y: 65, w: 21, h: 22, showDot: true, tooltipPosition: "top" },
        { name: "Nutrifos K", x: 44, y: 65, w: 21, h: 22, showDot: true, tooltipPosition: "top" },
        { name: "Bullterr K", x: 75, y: 65, w: 21, h: 22, showDot: true, tooltipPosition: "top" },
      ];
    }
    return [];
  };

  const hotspots = getHotspotsForCrop();

  const findProductFuzzy = (name: string) => {
    if (!productos || productos.length === 0) return null;
    const cleanSearch = name.toLowerCase().trim().replace(/[-_]/g, " ");
    let found = productos.find(p => p.name.toLowerCase().trim() === name.toLowerCase().trim());
    if (found) return found;
    found = productos.find(p => {
      const pName = p.name.toLowerCase().replace(/[-_]/g, " ");
      return pName.includes(cleanSearch) || cleanSearch.includes(pName);
    });
    return found;
  };

  const handleHotspotClick = (productName: string) => {
    const foundProduct = findProductFuzzy(productName);
    if (foundProduct) {
      setProductoSeleccionado(foundProduct);
    } else {
      const fallbackDetails = FALLBACK_PRODUCTS_DETAILS[productName.toLowerCase()];
      if (fallbackDetails) {
        setProductoSeleccionado({
          id: 999,
          name: fallbackDetails.name,
          description: fallbackDetails.description,
          composition: fallbackDetails.composition,
          application: fallbackDetails.application,
          image: fallbackDetails.image,
          category: "all",
          icon: Droplets
        } as any);
      } else {
        alert(`El producto "${productName}" está recomendado pero no se encontró en el catálogo de la distribuidora actualmente.`);
      }
    }
  };

  const handleProductClick = (productName: string) => {
    handleHotspotClick(productName);
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

            {/* SECCIÓN NUEVA: IMAGEN DEL PLAN DE FERTILIZACIÓN DINÁMICA CON CAPA DE CONTENEDORES ABSOLUTOS */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-2 text-gray-800 pb-2 border-b border-gray-100">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Plan de Fertilización Sugerido</h2>
              </div>

              <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl shadow-md relative p-4 flex items-center justify-center overflow-visible">
                <div className="relative w-full max-w-3xl">
                  <img
                    src={getPlanFertilizacionSrc()}
                    alt={`Plan de Fertilización para ${cropData.name}`}
                    className="w-full h-auto object-contain rounded-xl select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop";
                    }}
                  />

                  {/* Capa de Hotspots Absolutos */}
                  {hotspots.map((hotspot, idx) => {
                    const matchedProd = findProductFuzzy(hotspot.name);
                    const prodName = matchedProd?.name || FALLBACK_PRODUCTS_DETAILS[hotspot.name.toLowerCase()]?.name || hotspot.name;
                    const prodDesc = matchedProd?.description || FALLBACK_PRODUCTS_DETAILS[hotspot.name.toLowerCase()]?.description || "Suplemento nutricional balanceado de alta asimilación.";
                    const prodImg = matchedProd?.image || FALLBACK_PRODUCTS_DETAILS[hotspot.name.toLowerCase()]?.image || "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=200&auto=format&fit=crop";

                    const isTooltipBottom = hotspot.tooltipPosition === "bottom";
                    const tooltipClasses = isTooltipBottom
                      ? "absolute z-40 top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 scale-95 group-hover:scale-100 origin-top transition-all"
                      : "absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 scale-95 group-hover:scale-100 origin-bottom transition-all";

                    return (
                      <div
                        key={`${hotspot.name}-${idx}`}
                        style={{
                          left: `${hotspot.x}%`,
                          top: `${hotspot.y}%`,
                          width: `${hotspot.w}%`,
                          height: `${hotspot.h}%`
                        }}
                        className="absolute group"
                      >
                        <button
                          onClick={() => handleHotspotClick(hotspot.name)}
                          className={`w-full h-full border rounded-md transition-all duration-300 flex items-center justify-center cursor-pointer relative ${hotspot.showDot
                            ? "border-dashed border-green-500/50 bg-green-50/5 hover:border-green-600 hover:bg-green-600/15 hover:shadow-inner"
                            : "border-dashed border-green-500/0 hover:border-green-500/30 bg-transparent hover:bg-green-500/5 hover:shadow-xs"
                            }`}
                        >
                          <span className="opacity-0 group-hover:opacity-100 bg-green-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm transition-opacity absolute -top-7 whitespace-nowrap z-30">
                            {prodName}
                          </span>
                          {hotspot.showDot && (
                            <>
                              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping absolute" />
                              <span className="w-2 h-2 bg-green-600 rounded-full absolute" />
                            </>
                          )}
                        </button>

                        {/* Tooltip de Previsualización al pasar el mouse */}
                        <div className={tooltipClasses}>
                          <div className="flex gap-3 items-center">
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                              <img
                                src={prodImg}
                                alt={prodName}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 text-xs truncate">{prodName}</h4>
                              <p className="text-[10px] text-green-600 font-semibold uppercase truncate">
                                {matchedProd ? "Producto Agrofert" : "Especialidad"}
                              </p>
                            </div>
                          </div>
                          <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                            {prodDesc}
                          </p>
                          <div className="text-[10px] text-blue-600 font-bold flex items-center gap-1 mt-1 border-t border-gray-50 pt-2">
                            <span>Ver ficha técnica completa</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center italic">Esquema interactivo referencial de etapas y dosificación. Pasa el cursor por los puntos de control para ver detalles.</p>
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

      <ProductModal
        isOpen={!!productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        product={productoSeleccionado}
      />
    </div>
  );
}