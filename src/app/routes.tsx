import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Crops from "./pages/Crops";
import CropDetail from "./pages/CropDetail";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Distribuidores from "./pages/Distribuidores"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "productos", Component: Products },
      { path: "cultivos", Component: Crops },
      { path: "cultivos/:id", Component: CropDetail },
      { path: "nosotros", Component: AboutUs },
      { path: "distribuidores", Component: Distribuidores },
      { path: "contacto", Component: Contact },
      { path: "servicios", Component: Services },
    ],
  },
]);