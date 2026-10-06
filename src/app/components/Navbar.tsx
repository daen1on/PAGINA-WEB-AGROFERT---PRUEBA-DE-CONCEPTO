import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from '../../assets/logo-agrofert.svg';
import { cropDetailsData } from "../../data/crops";
import { preloadProducts } from "../services/productsService";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const location = useLocation();

  const cropLinks = Object.values(cropDetailsData).map((crop) => ({
    path: `/cultivos/${crop.slug}`,
    label: crop.name,
  }));

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/productos", label: "Productos" },
    {
      path: "/cultivos",
      label: "Cultivos",
      subItems: cropLinks,
    },
    { path: "/distribuidores", label: "Distribuidores" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/contacto", label: "Contacto" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const prefetchRouteData = (path: string) => {
    if (location.pathname === path) return;

    try {
      if (path === "/productos" || path === "/") {
        // Precarga unificada del catálogo sin exponer credenciales
        preloadProducts();
      }
    } catch (error) {
      // Carga silenciosa
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo Agrofert"
              className="h-16 w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  onMouseEnter={() => prefetchRouteData(link.path)} // Precarga con el mouse
                  onFocus={() => prefetchRouteData(link.path)}      // Precarga si navegan con teclado (Tab)
                  className={`flex items-center gap-1 py-2 transition-colors duration-300 ${isActive(link.path)
                    ? "text-green-600 font-bold"
                    : "text-gray-700 hover:text-green-600"
                    }`}
                >
                  {link.label}
                  {link.subItems && <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />}

                  {isActive(link.path) && !link.subItems && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-full" />
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {link.subItems && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[380px] bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top z-50 overflow-hidden">
                    <div className="grid grid-cols-2 gap-x-2 py-2">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg mx-2"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2">
            {navLinks.map((link) => (
              <div key={link.path}>
                <div className="flex items-center justify-between">
                  <Link
                    to={link.path}
                    onTouchStart={() => prefetchRouteData(link.path)} // Precarga cuando el dedo toca la pantalla antes de levantar
                    className={`flex-grow block py-3 px-2 transition-colors ${isActive(link.path)
                      ? "bg-green-50 text-green-600 font-semibold border-l-4 border-green-600"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                    onClick={() => !link.subItems && setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.subItems && (
                    <button
                      onClick={() => setOpenSubmenu(!openSubmenu)}
                      className="p-3 text-gray-500 bg-gray-50 hover:bg-gray-100"
                    >
                      <ChevronDown size={20} className={`transform transition-transform ${openSubmenu ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown */}
                {link.subItems && openSubmenu && (
                  <div className="bg-gray-50 pl-6 border-l-4 border-transparent">
                    {link.subItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block py-2 px-2 text-sm text-gray-600 hover:text-green-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}