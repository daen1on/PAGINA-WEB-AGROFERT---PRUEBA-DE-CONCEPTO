import { useState, useEffect } from "react";
import { Link } from "react-router";
import { X, Droplets, FlaskConical, MessageCircle, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import ZoomableImage from "./ZoomableImage";
import { MappedProduct, EstrellaProduct } from "../interfaces/types/types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: MappedProduct | EstrellaProduct | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [product]);

  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  // Normalize product attributes
  const name = product.nombre || product.name || "";
  
  // Convert composition to list if it's not already
  const rawComposition = product.composicion || product.composition || "";
  const compositionList = Array.isArray(rawComposition) 
    ? rawComposition 
    : [rawComposition].filter(Boolean);

  const application = product.aplicacion || product.application || "";
  const rawDescription = product.descLarga || product.fullDescription || product.description || "";

  // Normalize images
  let galeriaImagenes: string[] = [];
  if (product.imagenes && Array.isArray(product.imagenes)) {
    galeriaImagenes = product.imagenes;
  } else if (product.images && Array.isArray(product.images)) {
    galeriaImagenes = product.images.map((img: any) => typeof img === "string" ? img : img.src);
  } else if (product.img) {
    galeriaImagenes = [product.img];
  } else if (product.image) {
    galeriaImagenes = [product.image];
  }
  galeriaImagenes = galeriaImagenes.filter(Boolean);

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

  const renderTextoConIcaDestacado = (texto: string) => {
    if (!texto) return null;

    const regexIca = /(REGISTRO DE VENTA ICA\s*(?:NO\.|N°|NUMERO)?\s*\d+)/i;
    const coincidencia = texto.match(regexIca);

    if (coincidencia) {
      const textoIca = coincidencia[1];
      const textoRestante = texto.replace(textoIca, "").replace(/^[\s.,;:-]+/, "");

      return (
        <div className="space-y-2">
          <div className="inline-block bg-green-100 text-green-800 font-bold rounded-md px-2.5 py-1 text-xs tracking-wide uppercase border border-green-200">
            {textoIca}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {textoRestante}
          </p>
        </div>
      );
    }

    return (
      <p className="text-gray-700 text-sm leading-relaxed">
        {texto}
      </p>
    );
  };

  const slug = name.toLowerCase().trim().replace(/\s+/g, "-");
  const productId = product.id || slug;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-200 cursor-pointer"
    >
      <div className="bg-white rounded-3xl max-w-5xl w-full relative flex flex-col md:flex-row overflow-hidden shadow-2xl max-h-[90vh] md:h-[650px] cursor-default animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-gray-900/20 hover:bg-gray-900/40 md:bg-gray-100 p-2.5 rounded-full hover:scale-105 transition z-50 shadow-md cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        {/* COLUMNA IZQUIERDA: Imagenes con Zoom Dinámico */}
        <div className="w-full md:w-1/2 bg-gray-50 relative flex items-center justify-center p-4 md:p-8 h-80 md:h-full border-b md:border-b-0 md:border-r border-gray-100 group/modal">
          {galeriaImagenes.length > 0 ? (
            <div className="w-full h-full flex items-center justify-center relative">
              <ZoomableImage
                src={galeriaImagenes[currentImgIndex]}
                alt={name}
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

        {/* COLUMNA DERECHA: REESTRUCTURADA CON SCROLL INDEPENDIENTE Y FOOTER FIJO */}
        <div className="w-full md:w-1/2 flex flex-col h-[calc(90vh-320px)] md:h-full">
          
          {/* Contenedor escroleable de la información */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 pb-28 scroll-smooth animate-in fade-in duration-200">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight pr-8">
                {name}
              </h3>
            </div>

            <div className="border-l-4 border-green-500 pl-4 bg-green-50/40 py-3.5 rounded-r-2xl">
              {renderTextoConIcaDestacado(rawDescription)}
            </div>

            <div className="space-y-4">
              {application && (
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <h4 className="font-bold text-gray-800 text-sm">Modo de Aplicación</h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{application}</p>
                </div>
              )}

              {compositionList.length > 0 && (
                <div className="bg-green-50/30 rounded-2xl p-4 border border-green-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="w-4 h-4 text-green-600" />
                    <h4 className="font-bold text-gray-800 text-sm">Composición Química</h4>
                  </div>
                  <div className="text-xs text-gray-700 leading-relaxed font-medium space-y-1">
                    {compositionList.map((comp, idx) => (
                      <div key={idx} className="flex items-start gap-1">
                        <span className="text-green-500">•</span>
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN DE BOTONES FIJOS (Grid de 3 Botones / Sticky Footer) */}
          <div className="flex flex-col gap-3 pt-6 border-t border-gray-100 bg-white sticky bottom-0 z-10 p-6 md:p-8">
            
            {/* Fila superior: Enlace a ProductDetails y Distribuidores */}
            <div className="flex flex-row gap-3">
              <Link
                to={`/producto/${productId}`}
                onClick={onClose}
                className="bg-green-600 text-white hover:bg-green-700 px-5 py-3.5 rounded-xl font-semibold flex-1 text-center transition border border-green-700 text-sm flex items-center justify-center gap-2"
              >
                Ver ficha completa
              </Link>

              <Link
                to="/distribuidores"
                onClick={onClose}
                className="bg-white text-gray-700 hover:bg-gray-50 px-5 py-3.5 rounded-xl font-semibold flex-1 text-center transition border border-gray-200 text-sm flex items-center justify-center"
              >
                Distribuidores
              </Link>
            </div>

            {/* Fila inferior: Botón completo para WhatsApp */}
            <a
              href={`https://wa.me/573202724352?text=Hola,%20vengo%20de%20la%20página%20web%20y%20estoy%20interesado%20en%20el%20producto%20*${name}*.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] px-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg text-sm cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              Cotizar por WhatsApp
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}
