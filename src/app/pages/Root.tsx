import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { ScrollToTop } from "../components/ScrollToTop";

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}