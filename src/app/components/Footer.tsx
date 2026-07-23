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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">

          {/* Company Info */}
          <div className="col-span-1 pt-5 space-y-3 flex justify-center md:justify-start">
            <img
              src={logo}
              alt="Logo Agrofert"
              className="h-28 w-auto drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
            />            
          </div>

          {/* Enlaces Rápidos (Mantenemos animación) */}
          <div className="max-w-xs mx-auto md:mx-0 translate-x-4 md:translate-x-0">
            <h3 className="font-bold text-white text-xl md:text-lg mb-5">Enlaces Rápidos</h3>
            <ul className="space-y-2 flex flex-col items-start w-fit mx-auto md:w-auto md:mx-0"> {/* Reducimos espacio entre links */}
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center hover:text-green-500 transition-all duration-300 md:hover:translate-x-2">
                    <span className="w-5 md:w-0 h-0.5 text-[17px] md:text-base bg-green-500 mr-3 md:mr-0 rounded-full transition-all md:group-hover:w-3 md:group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa (Mantenemos animación) */}
          <div className="max-w-xs mx-auto md:mx-0">
            <h3 className="font-bold text-white text-xl md:text-lg mb-5">Empresa</h3>
            <ul className="space-y-2 flex flex-col items-center md:items-start">
              {companyLinks.map((link) => (
                <li key={link.path} className="w-full">
                  <Link
                    to={link.path}
                    className="group flex items-center hover:text-green-500 transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="w-5 md:w-0 h-0.5 text-[17px] md:text-base bg-green-500 mr-3 md:mr-0 rounded-full transition-all md:group-hover:w-3 md:group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Mantenemos iconos con hover verde) */}
          <div className="max-w-xs mx-auto md:mx-0">
            <h3 className="font-bold text-white text-xl md:text-lg mb-5">Contacto</h3>
            <ul className="space-y-4 text-base flex flex-col items-start mx-auto w-fit md:w-auto md:mx-0">
              <li className="flex items-center gap-3 group">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-green-600 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-green-500 group-hover:text-white" />
                </div>
                <span>+57 320 272 4352</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-green-600 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-green-500 group-hover:text-white" />
                </div>
                <span>info@agrofert.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-green-600 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-green-500 group-hover:text-white" />
                </div>
                <span>Colombia</span>
              </li>
            </ul>

            {/* Social Icons (Mantenemos efecto salto) */}
            <div className="flex justify-center md:justify-start gap-4 pt-6 md:pt-8">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/AGROFERTCOL" },
                { Icon: Instagram, href: "https://www.instagram.com/agrofertcol/" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  className="bg-gray-800 p-3.5 rounded-full hover:bg-green-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright - Reducimos margen superior */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-center tracking-widest text-gray-500 uppercase">
          <p>&copy; 2026 AGROFERT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}