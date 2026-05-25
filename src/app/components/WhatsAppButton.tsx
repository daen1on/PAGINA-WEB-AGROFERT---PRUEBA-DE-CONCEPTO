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
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 px-6 rounded-full shadow-lg transition-all hover:scale-110 z-50 flex items-center justify-center gap-3"
      aria-label="Contactar por WhatsApp"
    >
      <span className="font-medium">Chatea con nuestro asesor</span>
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
