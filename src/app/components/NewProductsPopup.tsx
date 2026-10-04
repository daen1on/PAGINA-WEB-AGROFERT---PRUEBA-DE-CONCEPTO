import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import { useProducts } from "../hooks/useProducts";

export default function NewProductsPopup() {
    const { productos, loading } = useProducts();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [productosNuevos, setProductosNuevos] = useState<typeof productos>([]);
    const popupMostrado = useRef(false);

    useEffect(() => {
        if (loading || popupMostrado.current) return;

        const nuevosProductos = productos.filter((producto) =>
            producto.tags?.some(
                (tag) => tag.name.toLowerCase().trim() === "nuevo"
            )
        );

        if (nuevosProductos.length === 0) return;

        const productosAMostrar = nuevosProductos.slice(0, 2);

        setProductosNuevos(productosAMostrar);
        setIsOpen(true);
        popupMostrado.current = true;
    }, [loading, productos]);

    if (!isOpen || productosNuevos.length === 0) {
        return null;
    }

    const handleProductClick = (id: number) => {
        setIsOpen(false);
        navigate(`/producto/${id}`);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-3 sm:p-4">
            <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl border border-white/30 shadow-[0_0_60px_rgba(255,255,255,0.14)]">
                
                {/* Botón cerrar */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 text-gray-700 shadow-md hover:bg-gray-100 hover:text-green-700 transition-colors cursor-pointer"
                    aria-label="Cerrar"
                >
                    <X size={21} />
                </button>

                {/* Encabezado */}
                <div className="text-center px-5 pt-6 pb-3 sm:px-6 sm:pt-8 sm:pb-5">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-green-600">
                        ¡Novedades!
                    </p>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mt-1 pr-8 sm:pr-10">
                        Conoce nuestros nuevos productos
                    </h2>
                </div>

                {/* Productos */}
                <div
                    className={`grid gap-4 sm:gap-5 px-3 sm:px-6 pb-5 sm:pb-7 ${
                        productosNuevos.length === 2
                            ? "grid-cols-1 md:grid-cols-2"
                            : "grid-cols-1 max-w-2xl mx-auto"
                    }`}
                >
                    {productosNuevos.map((producto) => (
                        <button
                            key={producto.id}
                            onClick={() => handleProductClick(producto.id)}
                            className="group w-full text-left rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            {/* Imagen */}
                            <div className="relative mx-3 mt-3 sm:mx-4 sm:mt-4 rounded-2xl border border-gray-100 bg-gray-50 shadow-sm flex items-center justify-center p-3 sm:p-5 aspect-[16/9] sm:aspect-[4/3] overflow-hidden">
                                
                                {/* Sello NUEVO */}
                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
                                    <span
                                        className="inline-flex items-center justify-center bg-green-600 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-lg"
                                        style={{
                                            width: "62px",
                                            height: "62px",
                                            clipPath:
                                                "polygon(50% 0%, 58% 8%, 69% 4%, 75% 14%, 87% 12%, 90% 24%, 100% 30%, 94% 41%, 100% 50%, 94% 59%, 100% 70%, 90% 76%, 87% 88%, 75% 86%, 69% 96%, 58% 92%, 50% 100%, 42% 92%, 31% 96%, 25% 86%, 13% 88%, 10% 76%, 0% 70%, 6% 59%, 0% 50%, 6% 41%, 0% 30%, 10% 24%, 13% 12%, 25% 14%, 31% 4%, 42% 8%)",
                                        }}
                                    >
                                        NUEVO
                                    </span>
                                </div>

                                {producto.image ? (
                                    <img
                                        src={producto.image}
                                        alt={producto.name}
                                        className="w-[82%] h-[82%] sm:w-[90%] sm:h-[90%] object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-gray-400 text-sm">
                                        Sin imagen
                                    </div>
                                )}
                            </div>

                            {/* Información */}
                            <div className="px-4 pt-3 pb-4 sm:px-5 sm:pt-4 sm:pb-5 flex flex-col min-h-[150px] sm:min-h-[175px]">
                                
                                <h3 className="text-center text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-1">
                                    {producto.name}
                                </h3>

                                {producto.description && (
                                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-600 text-center line-clamp-2">
                                        {producto.description}
                                    </p>
                                )}

                                {/* Botón visual */}
                                <div className="mt-auto pt-3 sm:pt-4 flex justify-center">
                                    <span className="inline-flex items-center gap-2 bg-green-600 group-hover:bg-green-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm group-hover:shadow-md transition-all duration-200">
                                        Ver producto
                                        <span>→</span>
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}