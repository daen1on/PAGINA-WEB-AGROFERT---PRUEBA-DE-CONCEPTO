import heroImage from "../../assets/Background-2.jpeg";
import heroVideo from "../../assets/videos/Video-Agrofert-1.mp4";

const HeroBackground = () => {
  return (
    <>
      {/* Imagen de respaldo */}
      <img
        src={heroImage}
        alt="Cultivos AGROFERT"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Video solo para escritorio */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </>
  );
};

export default HeroBackground;