import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappNumber = "573202724352";
  const message = "Hola, estoy interesado en sus productos fertilizantes.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 md:bottom-6 right-4 md:right-6 bg-green-500/80 md:bg-green-500 backdrop-blur-sm hover:bg-green-600 text-white p-3 md:p-4 px-4 md:px-6 rounded-full shadow-lg transition-all hover:scale-105 z-50 flex items-center justify-center gap-2 md:gap-3"
      aria-label="Contactar por WhatsApp"
    >
      <span className="hidden md:inline font-medium">Chatea con nuestro asesor</span>
      <MessageCircle className="w-6 h-6 md:w-6 md:h-6" />
    </a>
  );
}
