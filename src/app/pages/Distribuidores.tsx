import { Mail, Phone, MapPin, Clock, Send, Store } from "lucide-react"; // 1. Importamos 'Store'
import { useState } from "react";

export default function Contact() {
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

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Distribuidores</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Encuéntranos en el punto más cercano.
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Columna del Mapa (Ocupa 2/3 en pantallas grandes) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-gray-200 flex-grow min-h-[450px] flex items-center justify-center relative">
              <div className="text-center text-gray-500 z-10">
                <MapPin className="w-16 h-16 mx-auto mb-3 text-green-600 drop-shadow-sm" />
                <p className="text-xl font-bold text-gray-800">Mapa de ubicación</p>
                <p className="text-gray-600">Boyacá, Colombia</p>
                <p className="text-xs mt-4 text-gray-400 uppercase tracking-widest">[ Espacio para Google Maps ]</p>
              </div>
            </div>
          </div>

          {/* Columna de Información de Tiendas (Ocupa 1/3) */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Título de la lista */}
            <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-green-600">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 tracking-tight">PUNTOS DE VENTA</h3>
              </div>
            </div>

            {/* Tienda 1: Ahora con icono de Tienda y fondo gris sutil */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <Store className="w-6 h-6 text-gray-700" /> {/* Icono de tienda */}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Tienda Toro</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Teléfono:</span> +57 (3xx) xxx xxxx
                    </p>
                    <p className="text-gray-600 text-sm flex items-start gap-2">
                      <span className="font-semibold text-gray-800">Dirección:</span> Calle Principal, Boyacá
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tienda 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg group-hover:bg-gray-200 transition-colors">
                  <Store className="w-6 h-6 text-gray-700" /> {/* Icono de tienda */}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Tienda Mulato</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="font-semibold text-gray-800">Teléfono:</span> +57 (3xx) xxx xxxx
                    </p>
                    <p className="text-gray-600 text-sm flex items-start gap-2">
                      <span className="font-semibold text-gray-800">Dirección:</span> Av. Las Granjas, Boyacá
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horario de Atención (Mantenemos el verde aquí para que resalte como información útil) */}
            <div className="bg-green-600 p-6 rounded-xl shadow-md text-white">
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