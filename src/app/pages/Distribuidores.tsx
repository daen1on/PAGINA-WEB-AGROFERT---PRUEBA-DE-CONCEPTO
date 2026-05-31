// src/components/Distribuidores.tsx
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Store } from "lucide-react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { infoTiendas } from "../../data/tiendasData";
import geojsonDeptos from "../../data/departamentos.json"; // Tu GeoJSON optimizado
import "leaflet/dist/leaflet.css";

export default function Contact() {
  // Estado para capturar qué departamento seleccionó el cliente en el mapa
  const [dptoSeleccionado, setDptoSeleccionado] = useState<string | null>("BOYACA"); // Iniciamos en Boyacá por defecto

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por contactarnos. Te responderemos pronto.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Lógica de interactividad para los polígonos del mapa
  const configurarInteraccionMapa = (feature: any, layer: any) => {
    const nombreDpto = feature.properties.NOMBRE_DPT; // Ej: "BOYACA"

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
          fillColor: dptoSeleccionado === nombreDpto ? "#16a34a" : "#22c55e", // Mantiene el color si está activo
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
            Estamos aquí para ayudarte. Encuéntranos en el punto más cercano interactuando con el mapa.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

          {/* Columna del Mapa (Ocupa 2/3 en pantallas grandes) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[500px]">
            <div className="w-full h-full z-10 relative">
              <MapContainer
                center={[4.570868, -74.297333]} // Centrado estratégico en Colombia
                zoom={5.8}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
              >
                {/* Mapa base minimalista (Diseño Light de CartoDB) */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {/* Capa que dibuja los polígonos usando tu GeoJSON real */}
                <GeoJSON
                  key={dptoSeleccionado} // Fuerza el re-render al cambiar de dpto para actualizar estilos estables
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

          {/* Columna de Información de Tiendas (Ocupa 1/3) */}
          <div className="lg:col-span-1 space-y-4 flex flex-col justify-between h-[500px] overflow-y-auto pr-1">

            <div className="space-y-4 flex-grow">
              {/* Título de la lista dinámico */}
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-600">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 tracking-tight uppercase">
                    {dptoSeleccionado && infoTiendas[dptoSeleccionado]
                      ? `Puntos en ${infoTiendas[dptoSeleccionado].nombreLegible}`
                      : "PUNTOS DE VENTA"}
                  </h3>
                </div>
              </div>

              {/* Render condicional de las tiendas asociadas al departamento cliqueado */}
              {dptoSeleccionado && infoTiendas[dptoSeleccionado] ? (
                infoTiendas[dptoSeleccionado].tiendas.map((tienda, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group animate-fadeIn"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-green-50 transition-colors">
                        <Store className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{tienda.nombre}</h3>
                        <div className="space-y-1">
                          <p className="text-gray-600 text-sm flex items-center gap-2">
                            <span className="font-semibold text-gray-800">Teléfono:</span>
                            <a href={`tel:${tienda.telefono}`} className="hover:underline text-green-700 font-medium">
                              {tienda.telefono}
                            </a>
                          </p>
                          <p className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="font-semibold text-gray-800">Dirección:</span> {tienda.direccion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center text-gray-400">
                  <p className="text-sm">Selecciona una región en el mapa para ver los distribuidores autorizados.</p>
                </div>
              )}
            </div>

            {/* Horario de Atención fijo al fondo de la columna */}
            <div className="bg-green-600 p-6 rounded-xl shadow-md text-white mt-auto">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold">Horario de Atención</h3>
              </div>
              <p className="text-green-50 text-sm">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-green-50 text-sm">Sábados: 8:00 AM - 1:00 PM</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}