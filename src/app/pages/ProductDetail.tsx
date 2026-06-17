// app/pages/ProductDetail.tsx
import { useParams, Link, Navigate } from "react-router";
import { useState, useEffect } from "react";
import {
    ArrowLeft, Leaf, Droplets, FlaskConical, MessageCircle,
    ChevronLeft, ChevronRight
} from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import ZoomableImage from "../components/ZoomableImage";
// NOTA: Ajusta la importación de 'useProducts' o 'useFeaturedProducts' 
// según dónde tengas toda tu base de datos de productos.

export default function ProductDetail() {
    const { id } = useParams();
    const { productos } = useProducts(); // Reemplaza por tu hook real que devuelva el catálogo completo

    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    // BÚSQUEDA ROBUSTA: Busca tanto por ID como por nombre formateado (slug)
    const productoSeleccionado = productos.find(p => {
        // @ts-ignore
        const nameToSlug = (p.name || p.nombre || "").toLowerCase().trim().replace(/\s+/g, "-");
        const idParam = String(id).toLowerCase().trim().replace(/\s+/g, "-");

        return String(p.id) === String(id) || nameToSlug === idParam;
    });

    useEffect(() => {
        // Scroll al top de la página al cargar un producto
        window.scrollTo(0, 0);
    }, [id]);

    // 1. REGLA DE CARGA: Espera a que los datos existan para decidir redirección
    if (productos.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Leaf className="w-16 h-16 text-green-600 animate-pulse mb-4" />
                <p className="text-green-800 font-semibold text-lg tracking-wide">Abonando los servidores...</p>
            </div>
        );
    }

    // 2. REGLA DE SEGURIDAD: Si no encuentra el producto, redirige al catálogo
    if (!productoSeleccionado) {
        console.warn(`No se encontró el producto con ID o slug: ${id}`);
        return <Navigate to="/productos" replace />;
    }

    // Compatibilidad de Nombres: Algunas bases de datos usan "nombre" y otras "name"
    // @ts-ignore
    const nombreProducto = productoSeleccionado.nombre || productoSeleccionado.name;
    // @ts-ignore
    const descLarga = productoSeleccionado.descLarga || productoSeleccionado.fullDescription || productoSeleccionado.description;
    // @ts-ignore
    const aplicacion = productoSeleccionado.aplicacion || productoSeleccionado.application;
    // @ts-ignore
    const composicion = productoSeleccionado.composicion || productoSeleccionado.composition;

    // Normaliza la composición a un array limpio sin importar si viene como string o array
    const composicionLista: string[] = Array.isArray(composicion)
        ? composicion.filter(Boolean)
        : typeof composicion === "string" && composicion.trim()
            ? composicion
                .split(/,\s*(?=[A-ZÁÉÍÓÚÜÑ])/u)   // parte por coma seguida de mayúscula (inicio de nuevo elemento)
                .flatMap(item => item.split(/;\s*/))  // también por punto y coma
                .map(s => s.trim())
                .filter(Boolean)
            : [];

    // Lógica para el formato del Registro ICA
    const renderTextoConIcaDestacado = (texto: string) => {
        if (!texto) return null;
        const regexIca = /(REGISTRO DE VENTA ICA\s*(?:NO\.|N°|NUMERO)?\s*\d+)/i;
        const coincidencia = texto.match(regexIca);

        if (coincidencia) {
            const textoIca = coincidencia[1];
            const textoRestante = texto.replace(textoIca, "").replace(/^[\s.,;:-]+/, "");
            return (
                <div className="space-y-4">
                    <div className="inline-block bg-green-100 text-green-800 font-bold rounded-md px-3 py-1.5 text-sm tracking-wide uppercase border border-green-200 shadow-sm">
                        {textoIca}
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">{textoRestante}</p>
                </div>
            );
        }
        return <p className="text-gray-700 text-base leading-relaxed">{texto}</p>;
    };

    // Obtener Galería
    const obtenerGaleriaUnificada = (): string[] => {
        let listaUrls: string[] = [];
        if (productoSeleccionado.images && Array.isArray(productoSeleccionado.images) && productoSeleccionado.images.length > 0) {
            listaUrls = productoSeleccionado.images.map(img => typeof img === 'string' ? img : img.src);
        }
        // @ts-ignore
        else if (productoSeleccionado.imagenes && Array.isArray(productoSeleccionado.imagenes)) {
            // @ts-ignore
            listaUrls = productoSeleccionado.imagenes;
        }

        if (listaUrls.length === 0) {
            // @ts-ignore
            if (productoSeleccionado.img) listaUrls = [productoSeleccionado.img];
            // @ts-ignore
            else if (productoSeleccionado.image) listaUrls = [productoSeleccionado.image];
        }
        return listaUrls.filter(url => !!url);
    };

    const galeriaImagenes = obtenerGaleriaUnificada();

    const siguienteImagen = () => {
        if (galeriaImagenes.length > 1) setCurrentImgIndex((prev) => (prev + 1) % galeriaImagenes.length);
    };

    const anteriorImagen = () => {
        if (galeriaImagenes.length > 1) setCurrentImgIndex((prev) => (prev - 1 + galeriaImagenes.length) % galeriaImagenes.length);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">

            {/* HERO BANNER SUTIL (Ajustado para que el texto marca de agua se vea bien) */}
            <div className="relative h-[160px] md:h-[220px] bg-green-50 border-b-2 border-green-100 overflow-hidden">

                {/* Botón Volver */}
                <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-30">
                    <Link to="/productos" className="text-green-700 hover:text-green-900 bg-white/80 hover:bg-white px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-sm backdrop-blur-md text-sm font-semibold border border-green-200">
                        <ArrowLeft size={18} /> Volver a Productos
                    </Link>
                </div>

                {/* Título de fondo semi-transparente (MARCA DE AGUA) */}
                <h1 className="text-5xl md:text-8xl font-black text-green-800/10 uppercase tracking-widest text-center select-none absolute top-16 md:top-14 left-1/2 -translate-x-1/2 w-full px-4 whitespace-nowrap z-10 pointer-events-none">
                    {nombreProducto}
                </h1>
            </div>

            {/* Contenedor principal superpuesto sobre el banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-20 relative z-20">

                {/* CONTENEDOR PRINCIPAL TIPO FICHA */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col lg:flex-row">

                    {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES — STICKY */}
                    <div className="w-full lg:w-1/2 bg-gray-50/50 relative border-b lg:border-b-0 lg:border-r border-gray-100 p-6 md:p-10 min-h-[360px] lg:min-h-0 lg:max-h-[calc(100vh-6rem)] flex items-center justify-center group overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none self-start lg:sticky lg:top-4">
                        {galeriaImagenes.length > 0 ? (
                            <div className="w-full h-full flex items-center justify-center relative">
                                <ZoomableImage
                                    src={galeriaImagenes[currentImgIndex]}
                                    alt={nombreProducto}
                                />

                                {galeriaImagenes.length > 1 && (
                                    <>
                                        <button
                                            onClick={anteriorImagen}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl hover:scale-110 transition-all z-20 cursor-pointer border border-gray-100"
                                            aria-label="Imagen anterior"
                                        >
                                            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                                        </button>
                                        <button
                                            onClick={siguienteImagen}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl hover:scale-110 transition-all z-20 cursor-pointer border border-gray-100"
                                            aria-label="Siguiente imagen"
                                        >
                                            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                                        </button>

                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-4 py-1.5 rounded-full font-semibold tracking-wider backdrop-blur-sm">
                                            {currentImgIndex + 1} / {galeriaImagenes.length}
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-green-50/50">
                                <Leaf className="w-24 h-24 text-green-600/20" />
                            </div>
                        )}
                    </div>

                    {/* COLUMNA DERECHA: INFORMACIÓN TÉCNICA Y ACCIONES */}
                    <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-between">

                        <div className="space-y-8">
                            {/* Título Principal */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Ficha Técnica</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                                    {nombreProducto}
                                </h2>
                            </div>

                            {/* Descripción e ICA */}
                            <div className="border-l-4 border-green-500 pl-5 bg-green-50/40 py-5 rounded-r-2xl">
                                {renderTextoConIcaDestacado(descLarga)}
                            </div>

                            {/* Grid de Características */}
                            <div className="flex flex-col gap-6 pt-4">

                                {/* Modo de Aplicación */}
                                <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-blue-100 p-2 rounded-full shrink-0">
                                            <Droplets className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-base">Modo de Aplicación</h4>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{aplicacion || "Consulte con nuestros asesores técnicos."}</p>
                                </div>

                                {/* Composición Química */}
                                <div className="bg-green-50/50 rounded-2xl p-5 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-green-200/60 p-2 rounded-full shrink-0">
                                            <FlaskConical className="w-5 h-5 text-green-700" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-base">Composición Química</h4>
                                    </div>

                                    {composicionLista.length > 0 ? (
                                        <ul className="space-y-2">
                                            {composicionLista.map((item, i) => {
                                                // Intenta separar el nombre del valor si viene con patrón "Nombre: valor" o "Nombre valor g/L"
                                                const colonIdx = item.indexOf(":");
                                                const label = colonIdx > -1 ? item.slice(0, colonIdx).trim() : null;
                                                const value = colonIdx > -1 ? item.slice(colonIdx + 1).trim() : item;
                                                return (
                                                    <li key={i} className="flex items-center justify-between gap-3 py-1.5 border-b border-green-100/70 last:border-0">
                                                        <span className="text-sm text-gray-700 font-medium flex-1 leading-snug">
                                                            {label ?? value}
                                                        </span>
                                                        {label && (
                                                            <span className="text-xs font-bold text-green-800 bg-green-100 border border-green-200 rounded-full px-2.5 py-0.5 whitespace-nowrap shrink-0">
                                                                {value}
                                                            </span>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">Ver especificaciones técnicas en el envase.</p>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* BOTONES DE ACCIÓN */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                            <a
                                href={`https://wa.me/573202724352?text=Hola,%20estoy%20interesado%20en%20el%20producto%20*${nombreProducto}*%20que%20vi%20en%20su%20sitio%20web.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] text-white hover:bg-[#128C7E] px-6 py-4 rounded-xl font-bold flex-1 text-center transition shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-base cursor-pointer"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Cotizar por WhatsApp
                            </a>

                            <Link
                                to="/distribuidores"
                                className="bg-white text-gray-700 hover:bg-gray-50 px-6 py-4 rounded-xl font-semibold sm:w-1/3 text-center transition border border-gray-200 shadow-sm hover:shadow-md text-base flex items-center justify-center"
                            >
                                Distribuidores
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}