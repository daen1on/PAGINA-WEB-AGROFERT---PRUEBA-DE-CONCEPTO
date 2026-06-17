import { useState, useRef } from "react";
import { ZoomIn } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
}

export default function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const toggleZoom = () => setZoom(!zoom);

  let lastTap = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      setZoom((prev) => !prev);
      if (containerRef.current && e.touches[0]) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.touches[0].clientX - left) / width) * 100;
        const y = ((e.touches[0].clientY - top) / height) * 100;
        setPosition({ x, y });
      }
    }
    lastTap = now;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!zoom || !containerRef.current || e.touches.length === 0) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    let x = ((e.touches[0].clientX - left) / width) * 100;
    let y = ((e.touches[0].clientY - top) / height) * 100;
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onClick={toggleZoom}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ cursor: zoom ? "zoom-out" : "zoom-in" }}
    >
      {!zoom && (
        <div className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full pointer-events-none z-10 flex items-center gap-1 text-xs backdrop-blur-xs md:flex hidden">
          <ZoomIn className="w-3.5 h-3.5" /> Haz click para zoom
        </div>
      )}
      {!zoom && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full pointer-events-none z-10 flex items-center gap-1 text-[11px] backdrop-blur-xs md:hidden">
          <ZoomIn className="w-3.5 h-3.5" /> Doble toque
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain drop-shadow-md transition-transform duration-150 ease-out"
        style={{
          transform: zoom ? `scale(2.2)` : `scale(1.05)`,
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
}
