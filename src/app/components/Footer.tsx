import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from '../../assets/logo-agrofert.svg';

export function Footer() {
  const quickLinks = [
    { path: "/", label: "Inicio" },
    { path: "/productos", label: "Productos" },
    { path: "/cultivos", label: "Cultivos" },
    { path: "/distribuidores", label: "Distribuidores" },
  ];
  
  const companyLinks = [
    { path: "/nosotros", label: "Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/contacto", label: "Contacto" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Reducimos padding vertical de py-16 a py-10 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Reducimos gap de 12 a 8 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 space-y-3">
            <img 
              src={logo} 
              alt="Logo Agrofert" 
              className="h-16 w-auto drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]" 
            />
            <p className="text-sm leading-relaxed italic">
              "¡Nutriendo el campo colombiano!"
            </p>
          </div>

          {/* Enlaces Rápidos (Mantenemos animación) */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2"> {/* Reducimos espacio entre links */}
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center hover:text-green-500 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 h-0.5 bg-green-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa (Mantenemos animación) */}
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center hover:text-green-500 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-0 h-0.5 bg-green-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Mantenemos iconos con hover verde) */}
          <div className="space-y-4"> {/* Reducimos de space-y-6 a 4 */}
            <h3 className="font-bold text-white text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm"> {/* Reducimos de space-y-4 a 2 */}
              <li className="flex items-center gap-3 group">
                <div className="bg-gray-800 p-1.5 rounded-lg group-hover:bg-green-600 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-green-500 group-hover:text-white" />
                </div>
                <span>+57 313 *** ****</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-gray-800 p-1.5 rounded-lg group-hover:bg-green-600 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-green-500 group-hover:text-white" />
                </div>
                <span>info@agrofert.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-gray-800 p-1.5 rounded-lg group-hover:bg-green-600 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-green-500 group-hover:text-white" />
                </div>
                <span>Colombia</span>
              </li>
            </ul>
            
            {/* Social Icons (Mantenemos efecto salto) */}
            <div className="flex gap-3 pt-1">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map(({ Icon, href }, index) => (
                <a 
                  key={index}
                  href={href} 
                  className="bg-gray-800 p-2.5 rounded-full hover:bg-green-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright - Reducimos margen superior */}
        <div className="border-t border-gray-900 mt-8 pt-6 text-[10px] text-center tracking-widest text-gray-500 uppercase">
          <p>&copy; 2026 AGROFERT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}