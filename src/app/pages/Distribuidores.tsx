// src/app/pages/Distribuidores.tsx
import { useState, useMemo } from "react";
import { MapPin, Clock, MessageCircle, ShieldCheck, CheckCircle2 } from "lucide-react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import geojsonDeptos from "../../data/departamentos.json";
import "leaflet/dist/leaflet.css";

const DEPARTAMENTOS_NOMBRES: Record<string, string> = {
  "BOYACA": "Boyacá",
  "SANTAFE DE BOGOTA D.C": "Bogotá D.C.",
  "BOGOTA D.C.": "Bogotá D.C.",
  "BOGOTA": "Bogotá D.C.",
  "CESAR": "Cesar",
  "CUNDINAMARCA": "Cundinamarca",
  "NORTE DE SANTANDER": "Norte de Santander",
  "SANTANDER": "Santander",
  "ARAUCA": "Arauca",
  "CASANARE": "Casanare",
  "NARIÑO": "Nariño",
  "PUTUMAYO": "Putumayo",
  "ANTIOQUIA": "Antioquia",
  "ATLANTICO": "Atlántico",
  "BOLIVAR": "Bolívar",
  "CALDAS": "Caldas",
  "CAQUETA": "Caquetá",
  "CAUCA": "Cauca",
  "CHOCO": "Chocó",
  "CORDOBA": "Córdoba",
  "GUAINIA": "Guainía",
  "GUAVIARE": "Guaviare",
  "HUILA": "Huila",
  "LA GUAJIRA": "La Guajira",
  "MAGDALENA": "Magdalena",
  "META": "Meta",
  "QUINDIO": "Quindío",
  "RISARALDA": "Risaralda",
  "SAN ANDRES Y PROVIDENCIA": "San Andrés y Providencia",
  "SUCRE": "Sucre",
  "TOLIMA": "Tolima",
  "VALLE DEL CAUCA": "Valle del Cauca",
  "VAUPES": "Vaupés",
  "VICHADA": "Vichada",
  "AMAZONAS": "Amazonas",
};

export function formatearNombreDepartamento(nombreDpto: string | null): string {
  if (!nombreDpto) return "Colombia";
  const clean = nombreDpto.trim().toUpperCase();
  if (DEPARTAMENTOS_NOMBRES[clean]) {
    return DEPARTAMENTOS_NOMBRES[clean];
  }
  return clean
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const WHATSAPP_PHONE = "573103406250";

export default function Distribuidores() {
  // Estado para capturar qué departamento seleccionó el cliente en el mapa
  const [dptoSeleccionado, setDptoSeleccionado] = useState<string>("BOYACA"); // Iniciamos en Boyacá por defecto

  // Lista única de departamentos ordenados alfabéticamente
  const listaDepartamentos = useMemo(() => {
    const rawNames = (geojsonDeptos.features as Array<{ properties: { NOMBRE_DPT: string } }>).map(
      (f) => f.properties.NOMBRE_DPT
    );
    const unique = Array.from(new Set(rawNames));
    return unique.sort((a, b) =>
      formatearNombreDepartamento(a).localeCompare(formatearNombreDepartamento(b))
    );
  }, []);

  const nombreLegible = formatearNombreDepartamento(dptoSeleccionado);

  const mensajeWhatsApp = dptoSeleccionado
    ? `Hola, me gustaría solicitar información sobre los puntos de venta y distribuidores autorizados de Agrofert en el departamento de ${nombreLegible}.`
    : "Hola, me gustaría solicitar información sobre los puntos de venta y distribuidores autorizados de Agrofert.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(mensajeWhatsApp)}`;

  // Lógica de interactividad para los polígonos del mapa
  const configurarInteraccionMapa = (feature: any, layer: any) => {
    const nombreDpto = feature.properties.NOMBRE_DPT;

    layer.on({
      click: () => {
        setDptoSeleccionado(nombreDpto);
      },
      mouseover: (e: any) => {
        const capa = e.target;
        capa.setStyle({
          fillColor: "#16a34a", // Verde esmeralda vivo al pasar el mouse
          fillOpacity: 0.7,
          weight: 3,
        });
      },
      mouseout: (e: any) => {
        const capa = e.target;
        capa.setStyle({
          fillColor: dptoSeleccionado === nombreDpto ? "#16a34a" : "#22c55e",
          fillOpacity: dptoSeleccionado === nombreDpto ? 0.6 : 0.4,
          weight: 2,
        });
      },
    });
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Distribuidores</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Encuentra tu punto más cercano interactuando con el mapa o contáctanos por WhatsApp.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* Columna del Mapa (Ocupa 2/3 en pantallas grandes) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[560px]">
            <div className="w-full h-full z-10 relative">
              <MapContainer
                center={[4.570868, -74.297333]} // Centrado estratégico en Colombia
                zoom={5.8}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                  className="grayscale contrast-125 brightness-95"
                />

                {/* Capa que dibuja los polígonos usando GeoJSON */}
                <GeoJSON
                  key={dptoSeleccionado} // Fuerza el re-render al cambiar de dpto para actualizar estilos
                  data={geojsonDeptos as any}
                  style={(feature) => ({
                    fillColor: dptoSeleccionado === feature?.properties?.NOMBRE_DPT ? "#16a34a" : "#22c55e",
                    weight: 2,
                    opacity: 1,
                    color: "#4b5563", // Bordes de departamento gris medio
                    fillOpacity: dptoSeleccionado === feature?.properties?.NOMBRE_DPT ? 0.6 : 0.4,
                  })}
                  onEachFeature={configurarInteraccionMapa}
                />
              </MapContainer>
            </div>
          </div>

          {/* Columna de Información y Contacto WhatsApp (Ocupa 1/3) */}
          <div className="lg:col-span-1 flex flex-col justify-between space-y-4 min-h-[560px]">
            
            <div className="space-y-4">
              {/* Selector Rápido de Departamento */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <label
                  htmlFor="select-departamento"
                  className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
                >
                  Seleccionar Departamento
                </label>
                <select
                  id="select-departamento"
                  value={dptoSeleccionado}
                  onChange={(e) => setDptoSeleccionado(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm font-medium rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all cursor-pointer outline-none"
                >
                  {listaDepartamentos.map((dpto) => (
                    <option key={dpto} value={dpto}>
                      {formatearNombreDepartamento(dpto)}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  <span>O haz clic directamente sobre el mapa</span>
                </p>
              </div>

              {/* Tarjeta de Información y Botón de WhatsApp */}
              <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-600 flex flex-col space-y-5">
                <div>
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Red de Distribución Autorizada</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    Puntos de venta en {nombreLegible}
                  </h2>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    Para brindarte una atención personalizada y conectarte con el distribuidor oficial más cercano con stock garantizado de fertilizantes Agrofert, solicita la ubicación por WhatsApp.
                  </p>
                </div>

                {/* Beneficios / Garantías */}
                <div className="space-y-2.5 bg-gray-50 p-4 rounded-lg border border-gray-100 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Ubicación y contacto del distribuidor más cercano a tu predio.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Disponibilidad inmediata y portafolio completo Agrofert.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Asesoría técnica y recomendaciones nutricionales.</span>
                  </div>
                </div>

                {/* Botón WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center group"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                  <span className="text-sm sm:text-base">
                    Consultar puntos en {nombreLegible}
                  </span>
                </a>

                <div className="text-center">
                  <span className="text-xs text-gray-400">
                    Respuesta directa con un asesor comercial
                  </span>
                </div>
              </div>
            </div>

            {/* Horario de Atención fijo al fondo */}
            <div className="bg-green-700 p-5 rounded-xl shadow-md text-white mt-auto">
              <div className="flex items-center gap-2.5 mb-2">
                <Clock className="w-4 h-4 text-green-200" />
                <h3 className="font-bold text-sm tracking-wide">Horario de Atención</h3>
              </div>
              <p className="text-green-100 text-xs">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-green-100 text-xs">Sábados: 8:00 AM - 1:00 PM</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}