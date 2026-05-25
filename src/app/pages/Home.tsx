import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Leaf, TrendingUp, Award, Users, X, ChevronLeft, ChevronRight, MessageCircle, CheckCircle, Droplets, FlaskConical } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from '../../assets/logo-agrofert.svg';

// Parser compartido: extrae APLICACIÓN y COMPOSICIÓN del campo description de WooCommerce
const parseWooCommerceDescription = (htmlDescription: string) => {
  if (!htmlDescription) return null;

  // PASO 1: Decodificar entidades HTML (incluyendo caracteres acentuados)
  const plainText = htmlDescription
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&Oacute;/gi, 'Ó')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&#211;/g, 'Ó')
    .replace(/&#243;/g, 'ó')
    .replace(/&Iacute;/gi, 'Í')
    .replace(/&iacute;/gi, 'í')
    .replace(/&eacute;/gi, 'é')
    .replace(/&Eacute;/gi, 'É')
    .replace(/&aacute;/gi, 'á')
    .replace(/&uacute;/gi, 'ú')
    // PASO 2: Convertir HTML a texto plano
    .replace(/<\/(p|div|li|ul|ol|h[1-6]|strong|b|em|span|sub|sup)[^>]*>/gi, ' ')
    .replace(/<(br|hr)[^>]*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const clean = (str: string) => str.replace(/\s+/g, ' ').trim();

  const formatComposition = (str: string) => {
    let c = clean(str).replace(/^[,:\s]+/, '');
    if (!c.includes(',')) {
      c = c
        .replace(/\s+(F[oó]sforo|Boro|Zinc|Solubilidad|Densidad|Nitr[oó]geno|Magnesio|Calcio|Azufre|Cobre|Manganeso|Potasio|pH|Carbono)/gi, ', $1')
        .replace(/^,\s*/, '');
    }
    return c;
  };

  const splitFirst = (str: string, regex: RegExp) => {
    const match = str.match(regex);
    if (!match) return [str];
    return [str.substring(0, match.index), str.substring(match.index! + match[0].length)];
  };

  const APP_REGEX = /APLICACI[OÓ]N/i;
  const COMP_REGEX = /COMPOSICI[OÓ]N(?:\s+GARANTIZADA)?/i;

  const partsApp = splitFirst(plainText, APP_REGEX);
  if (partsApp.length > 1) {
    const description = clean(partsApp[0]);
    const afterApp = partsApp[1];
    const partsComp = splitFirst(afterApp, COMP_REGEX);
    if (partsComp.length > 1) {
      return {
        description,
        application: clean(partsComp[0]).replace(/^[:\s]+/, ''),
        composition: formatComposition(partsComp[1]),
      };
    }
    const application = clean(afterApp).replace(/^[:\s]+/, '');
    if (application) return { description, application, composition: 'Ver especificaciones técnicas' };
  }

  const partsComp = splitFirst(plainText, COMP_REGEX);
  if (partsComp.length > 1) {
    const composition = formatComposition(partsComp[1]);
    if (composition) return { description: clean(partsComp[0]), application: 'Consulte con nuestros asesores', composition };
  }

  return null;
};


interface EstrellaProduct {
  id: number;
  nombre: string;
  descBreve: string;
  descLarga: string;
  aplicacion: string;
  composicion: string[];
  img?: string;
}

const productosEstrellaStatic: EstrellaProduct[] = [
  {
    id: 1,
    nombre: "Nutrifos K",
    descBreve: "Fósforo y potasio de máxima concentración sinergizados con boro y zinc.",
    descLarga: "Fósforo y potasio de máxima concentración sinergizados con boro, zinc y elementos orgánicos que optimizan los procesos productivos, al tiempo que mejora los balances metabólicos relacionados con el desarrollo, crecimiento y maduración de todo tipo de frutos.",
    aplicacion: "Manejar en la dosis recomendada ya que a mayor concentración puede acelerar la maduración de los frutos.",
    composicion: ["Potasio Total (K2O): 600 g/L", "Fosforo Total (P2O5): 400 g/L", "Boro (B): 3 g/L", "Zinc (Zn): 5 g/L", "Solubilidad en agua: 100%", "Densidad: 1,35 g/ml"],
    img: "/src/assets/nutrifos.png"
  },
  {
    id: 2,
    nombre: "Nitro",
    descBreve: "Alta concentración de nitrógeno, fósforo y magnesio. Estimula la clorofila.",
    descLarga: "Nutriente de alta concentración de nitrógeno, fósforo y magnesio. Estimula la síntesis clorofílica para un mayor desempeño y crecimiento.",
    aplicacion: "Foliar: 1 L/200 L, ó 3-4 L/Ha (sólo o en mezcla). Edáfica: 1,0 L/1000 L, en tanque para aplicación directa, ó 3 L/Ha.",
    composicion: ["Nitrógeno Total (K2O): 205 g/L", "Fosforo Total (P2O5): 40 g/L", "Magnesio (MgO): 40 g/L", "Solubilidad en agua: 99%", "Densidad: 1,29 g/ml"],
    img: "/src/assets/nitro.png"
  },
  {
    id: 3,
    nombre: "Magnesio Agrofer",
    descBreve: "Magnesio altamente concentrado, esencial para los procesos de fotosíntesis.",
    descLarga: "Magnesio altamente concentrado y de alta asimilación, esencial en todos los procesos de fotosíntesis: es el núcleo de la clorofila para tomar la energía solar, y suministro de la misma para todos los procesos metabólicos.",
    aplicacion: "Foliar: 0,5-1,0 L/200 L. Fertirrigación diaria recomendada: 0,5 L /1000 L.",
    composicion: ["Magnesio Total (MgO): 130 g/L", "Nitrógeno (N): 100 g/L", "Solubilidad en agua: 100%", "Densidad: 1,3 g/ml"],
    img: "/src/assets/magnesio.png"
  },
  {
    id: 4,
    nombre: "Bullterr K",
    descBreve: "Alta concentración de potasio para máxima respuesta en la carga de frutos.",
    descLarga: "Alta concentración de potasio, sinergizado con magnesio, boro y cobre. Eleva los promedios de rendimiento y calidad. Alta compatibilidad para mezclas sin restricciones con plaguicidas de uso común.",
    aplicacion: "Foliar: 0,5 a 1,0 L/200 L, ó 3-4 L/Ha. Edáfica: máx 1,0 L/1000 L ó 3 L/Ha. Aplicar al inicio del cuajado de frutos para favorecer el amarre.",
    composicion: ["Potasio Total (K2O): 500 g/L", "Magnesio (MgO): 8 g/L", "Azufre (S): 8 g/L", "Boro (B): 17 g/L", "Cobre (Cu): 1.5 g/L", "Manganeso (Mn): 4 g/L", "Solubilidad: 100%", "Densidad: 1,8 g/mL"],
    img: "/src/assets/bullterr.png"
  },
  {
    id: 5,
    nombre: "NPK Agrofert",
    descBreve: "Complejo de alta concentración para promover la diferenciación celular.",
    descLarga: "Fertilizante complejo de alta concentración con NPK, secundarios y micro-elementos. Ideal durante todo el ciclo de los cultivos, maximiza el metabolismo en las etapas críticas.",
    aplicacion: "Foliar: 1 L/200 L, ó 3-4 L/Ha (sólo o en mezcla). Edáfica: 1,0 L/1000 L en tanque ó 3 L/Ha.",
    composicion: ["Nitrógeno Total (N): 100.0 g/L", "Nitrógeno Nítrico (N): 14.5 g/L", "Nitrógeno Ureico (N): 85.5 g/L", "Fósforo Soluble (P2O5): 300.0 g/L", "Potasio Soluble (K2O): 100.0 g/L", "Calcio (CaO): 10.0 g/L"],
    img: "/src/assets/npk.png"
  },
  {
    id: 6,
    nombre: "Hidrafos Agrofert",
    descBreve: "Fuente fosfórica de alta concentración recomendada para etapas de máxima exigencia.",
    descLarga: "Fósforo es un elemento esencial en todos los procesos de la planta, dado que conforma la molécula energética básica. Ideal como alternativa para balances nutricionales exigentes.",
    aplicacion: "Foliar: 0,3-0.5 L/200 L, o en soluciones nutritivas según recomendación del plan nutricional.",
    composicion: ["Fósforo Total (P2O5): 616 g/L", "Solubilidad en agua: 100%", "Densidad: 1,37 g/mL"],
    img: "/src/assets/hidrafos.png"
  },
  {
    id: 7,
    nombre: "Nitrato de potasio",
    descBreve: "Ideal para cultivos sensibles al cloruro. Mejora calidad y tamaño de frutos.",
    descLarga: "Suministra potasio y nitrógeno a cultivos sensibles como tabaco, cítricos y frutales tropicales. No genera problemas de salinidad ni sulfatación al ser completamente asimilado. Aumenta el vigor y resistencia a enfermedades.",
    aplicacion: "Foliar: 1-2 Kg/200 L. Dosis efectiva general: 1000 ppm, ó 1 Kg por 1000 L.",
    composicion: ["Potasio Total (K): 46%", "Nitrógeno (N): 13%", "pH al 10%: 6.5"],
    img: "/src/assets/nitratodepotasio.png"
  }
];

export default function Home() {
  const [productoSeleccionado, setProductoSeleccionado] = useState<EstrellaProduct | null>(null);
  const [productos, setProductos] = useState<EstrellaProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const carruselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const customerKey = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_KEY || '';
    const customerSecret = import.meta.env.VITE_WOOCOMMERCE_CUSTOMER_SECRET || '';

    const isDev = import.meta.env.DEV || import.meta.env.VITE_ENV === 'development';
    const baseUrl = isDev ? '' : 'https://www.agrofert.com.co';

    // Consulta selectiva por los IDs de los 7 productos estrella específicos en WooCommerce
    const url = `${baseUrl}/wp-json/wc/v3/products?consumer_key=${customerKey}&consumer_secret=${customerSecret}&include=23376,23351,23394,23377,23332,23406,23419`;

    console.group("%c[Home Featured Products Fetch]", "color: #2563eb; font-weight: bold;");
    console.log("Iniciando consulta de los 7 productos estrella específicos por ID...");
    console.log("URL:", url);

    if (!customerKey || !customerSecret) {
      console.warn("Claves de WooCommerce no configuradas. Cargando productos destacados de contingencia...");
      setProductos(productosEstrellaStatic);
      setIsFallback(true);
      setLoading(false);
      console.groupEnd();
      return;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error de servidor: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Productos estrella cargados de WooCommerce:", data);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No se encontraron los productos estrella especificados en WooCommerce.");
        }

        const mappedData: EstrellaProduct[] = data.map((item: any) => {
          // Intentar extraer secciones del campo description usando el parser
          const parsed = parseWooCommerceDescription(item.description || '');

          let descLarga: string;
          let application: string;
          let compositionArray: string[];

          if (parsed) {
            descLarga = parsed.description || "Sin descripción detallada disponible.";
            application = parsed.application;
            compositionArray = parsed.composition
              ? parsed.composition.split(',').map((s: string) => s.trim()).filter(Boolean)
              : ["Ver especificaciones técnicas"];
          } else {
            // Fallback: limpiar el description completo como texto plano
            descLarga = (item.description || '')
              .replace(/<[^>]*>/g, ' ')
              .replace(/&nbsp;/g, ' ')
              .replace(/&amp;/g, '&')
              .replace(/\s+/g, ' ')
              .trim() || "Sin descripción detallada disponible.";
            application = "Consulte con nuestros asesores";
            compositionArray = ["Ver especificaciones técnicas"];

            // Fallback secundario: atributos de WooCommerce
            if (item.attributes && item.attributes.length > 0) {
              const compAttr = item.attributes.find((attr: any) =>
                attr.name.toLowerCase().includes("composic")
              );
              const appAttr = item.attributes.find((attr: any) =>
                attr.name.toLowerCase().includes("aplicac")
              );
              if (compAttr?.options?.length > 0) {
                compositionArray = compAttr.options.join(", ").split(",").map((s: string) => s.trim());
              }
              if (appAttr?.options?.length > 0) {
                application = appAttr.options.join(", ");
              }
            }
          }

          // Descripción breve: preferir short_description, sino recortar descLarga
          const rawBreve = (item.short_description || '')
            .replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
          const shortDesc = rawBreve
            ? (rawBreve.length > 120 ? rawBreve.substring(0, 117) + '...' : rawBreve)
            : (descLarga.length > 120 ? descLarga.substring(0, 117) + '...' : descLarga)
            || "Sin descripción corta disponible.";

          return {
            id: item.id,
            nombre: item.name,
            descBreve: shortDesc,
            descLarga,
            aplicacion: application,
            composicion: compositionArray,
            img: item.images && item.images.length > 0 ? item.images[0].src : undefined,
          };
        });

        // Ordenamos estrictamente los productos según el orden del carrusel original
        const desiredOrder = [23376, 23351, 23394, 23377, 23332, 23406, 23419];
        mappedData.sort((a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id));

        console.log(`Mapeados y ordenados ${mappedData.length} productos estrella con éxito.`);
        setProductos(mappedData);
        setLoading(false);
        console.groupEnd();
      })
      .catch((error) => {
        console.error("Fallo al consumir productos destacados (aplicando fallback):", error);
        setProductos(productosEstrellaStatic);
        setIsFallback(true);
        setLoading(false);
        console.groupEnd();
      });
  }, []);

  const moverCarrusel = (direccion) => {
    if (carruselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carruselRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (direccion === "derecha") {
        if (scrollLeft >= maxScroll - 10) {
          carruselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carruselRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      } else if (direccion === "izquierda") {
        if (scrollLeft <= 10) {
          carruselRef.current.scrollTo({ left: maxScroll, behavior: "smooth" });
        } else {
          carruselRef.current.scrollBy({ left: -320, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1775143305394-51365287542f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjBmZXJ0aWxpemVyJTIwZmFybSUyMGZpZWxkfGVufDF8fHx8MTc3NTYwNTY2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Campo agrícola"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <div className="flex justify-center gap-2">
            <img src={logo} alt="Logo Agrofert" className="h-24 md:h-34 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] object-contain" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Fertilizantes de Alta Calidad para tu Cultivo</h1>
          <p className="text-xl md:text-2xl mb-8">Potenciamos tu producción agrícola con soluciones innovadoras y sostenibles</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/productos" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2">
              Ver Productos <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contacto" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por Qué Elegir AGROFERT?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Más de 20 años de experiencia brindando soluciones nutricionales para el campo</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Leaf className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Productos Ecológicos</h3>
              <p className="text-gray-600">Fórmulas desarrolladas con respeto al medio ambiente</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><TrendingUp className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Mayor Rendimiento</h3>
              <p className="text-gray-600">Incrementa la productividad de tus cultivos hasta un 40%</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Award className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Calidad Certificada</h3>
              <p className="text-gray-600">Productos que certifican su calidad</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-green-600" /></div>
              <h3 className="text-xl font-semibold mb-2">Asesoría Técnica</h3>
              <p className="text-gray-600">Equipo de expertos para acompañarte en todo el proceso</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section CON CARRUSEL DE PRODUCTOS REALES */}
      <section className="py-20 bg-green-600 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Encuentra la solución ideal para tu cultivo</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Conoce nuestros productos estrella, diseñados para garantizar el éxito de tu cosecha.</p>

          <div className="relative bg-black/10 rounded-3xl p-6 md:p-8 shadow-2xl mb-12">
            <button onClick={() => moverCarrusel('izquierda')} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-white cursor-pointer text-green-700 p-3 rounded-full shadow-lg hover:bg-green-50 transition-colors hidden md:block border border-gray-200">
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div ref={carruselRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none' }}>
              {loading ? (
                // Skeletons de Carga
                [...Array(3)].map((_, i) => (
                  <div key={i} className="snap-center shrink-0 w-72 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 animate-pulse space-y-4">
                    <div className="w-full h-48 bg-gray-200 rounded-xl" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="pt-3 border-t border-gray-100 h-6 bg-gray-250 rounded w-1/2" />
                  </div>
                ))
              ) : (
                // Renderizado Dinámico de Productos Destacados
                productos.map((producto) => (
                  <div
                    key={producto.id}
                    onClick={() => setProductoSeleccionado(producto)}
                    className="snap-center shrink-0 w-72 bg-white text-gray-900 rounded-2xl p-0 cursor-pointer hover:-translate-y-2 transition-transform duration-350 text-left shadow-lg overflow-hidden flex flex-col border border-gray-100/50"
                  >
                    {/* Etiqueta Visual */}
                    <div className="relative">
                      {producto.img ? (
                        <img src={producto.img} alt={producto.nombre} className="w-full h-48 object-cover bg-gray-100" />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-green-50">
                          <Leaf className="w-12 h-12 text-green-600/40" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-white/90 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm uppercase tracking-wide">Destacado</span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{producto.nombre}</h3>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{producto.descBreve}</p>
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-green-600 font-bold text-sm hover:text-green-700">Ficha Técnica</span>
                        <ArrowRight className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => moverCarrusel('derecha')} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 bg-white cursor-pointer text-green-700 p-3 rounded-full shadow-lg hover:bg-green-50 transition-colors hidden md:block border border-gray-200">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <h3 className="text-2xl font-medium mb-6">Estos son solo nuestros recomendados. Descubre todo lo que tenemos para tu finca.</h3>
          <Link to="/productos" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 shadow-lg">
            Ir al Catálogo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Pilares / Metodología */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Compromiso con tu Campo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Trabajamos bajo tres pilares fundamentales para garantizar que tu inversión se traduzca en una cosecha abundante y de calidad.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0 group-hover:scale-110 transition-transform duration-500">01</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Agricultura Inteligente</h3>
                <p className="text-gray-600 leading-relaxed">Acompañamiento basado en las necesidades específicas de tu suelo para recomendarte la fórmula exacta que maximizará tu rendimiento.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group md:mt-12">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0 group-hover:scale-110 transition-transform duration-500">02</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Calidad Garantizada</h3>
                <p className="text-gray-600 leading-relaxed">Materias primas de primer nivel con procesos de fabricación certificados que aseguran una absorción eficiente en menos tiempo.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group md:mt-24">
              <div className="absolute -top-6 -right-6 text-9xl font-black text-green-50 z-0 group-hover:scale-110 transition-transform duration-500">03</div>
              <div className="relative z-10">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-md"><CheckCircle className="w-6 h-6 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Nutrición Sostenible</h3>
                <p className="text-gray-600 leading-relaxed">Cuidamos tu tierra a largo plazo. Fórmulas diseñadas para nutrir la planta sin degradar el suelo, asegurando cosechas prósperas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL TÉCNICO AVANZADO */}
      {productoSeleccionado && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setProductoSeleccionado(null); }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm cursor-pointer"
        >
          {/* Añadimos max-h-[90vh] y overflow-y-auto para que se pueda scrollear si la info es muy larga */}
          <div className="bg-white rounded-3xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh] shadow-2xl cursor-default animate-in fade-in zoom-in duration-200">

            {/* Cabecera con Imagen */}
            <div className="relative h-64 sm:h-72 bg-gray-100">
              {productoSeleccionado.img ? (
                <img src={productoSeleccionado.img} alt={productoSeleccionado.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-50">
                  <Leaf className="w-20 h-20 text-green-600/40" />
                </div>
              )}
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-gray-200 transition z-10 shadow-md"
              >
                <X className="w-5 h-5 text-gray-800" />
              </button>
              {/* Título superpuesto con gradiente */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{productoSeleccionado.nombre}</h3>
              </div>
            </div>

            {/* Contenido Técnico */}
            <div className="p-6 md:p-8">
              <p className="text-gray-700 text-lg mb-8 leading-relaxed border-l-4 border-green-500 pl-4 bg-green-50/50 py-2">
                {productoSeleccionado.descLarga}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Columna: Aplicación */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <h4 className="font-bold text-gray-900 text-lg">Modo de Aplicación</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {productoSeleccionado.aplicacion}
                  </p>
                </div>

                {/* Columna: Composición */}
                <div className="bg-green-50/30 rounded-2xl p-5 border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-gray-900 text-lg">Composición</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {productoSeleccionado.composicion.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Botones de Acción Mantenidos en la base */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/573000000000?text=Hola,%20vengo%20de%20la%20página%20web%20y%20estoy%20interesado%20en%20el%20producto%20*${productoSeleccionado.nombre}*.%20¿Me%20podrían%20dar%20más%20información?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white hover:bg-[#128C7E] px-6 py-4 rounded-xl font-bold flex-1 text-center transition shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-6 h-6" />
                  Cotizar por WhatsApp
                </a>
                <Link
                  to="/distribuidores"
                  onClick={() => {
                    setProductoSeleccionado(null); // Cerramos el modal para que no quede "fantasma"
                    window.scrollTo({ top: 0, behavior: 'instant' }); // Forzamos la pantalla a ir arriba
                  }}
                  className="bg-white text-gray-700 hover:bg-gray-50 px-6 py-4 rounded-xl font-semibold sm:w-1/3 text-center transition border border-gray-200"
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