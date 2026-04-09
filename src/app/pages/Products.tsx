import { useState } from "react";
import { Leaf, Droplet, Zap, Shield, Search } from "lucide-react";
import logo from '../../assets/Nutrifos.png';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "Todos" },
    { id: "nitrogenados", label: "Nitrogenados" },
    { id: "fosforados", label: "Fosforados" },
    { id: "potasicos", label: "Potásicos" },
    { id: "organicos", label: "Orgánicos" },
    { id: "micronutrientes", label: "Micronutrientes" },
  ];

  const products = [
    {
      id: 1,
      name: "Urea Granulada 46%",
      category: "nitrogenados",
      description: "Fertilizante nitrogenado de alta concentración para máximo rendimiento",
      composition: "46% Nitrógeno (N)",
      application: "Cereales, forrajes, cultivos extensivos",
      icon: Leaf,
    },
    {
      id: 2,
      name: "Nitrato de Amonio",
      category: "nitrogenados",
      description: "Acción rápida y sostenida para nutrición nitrogenada",
      composition: "33.5% Nitrógeno (N)",
      application: "Maíz, trigo, pasturas",
      icon: Leaf,
    },
    {
      id: 3,
      name: "Fosfato Diamónico (DAP)",
      category: "fosforados",
      description: "Fertilizante fosfatado con nitrógeno para arranque de cultivos",
      composition: "18% N - 46% P₂O₅",
      application: "Siembra de cereales, oleaginosas",
      icon: Droplet,
    },
    {
      id: 4,
      name: "Superfosfato Triple",
      category: "fosforados",
      description: "Alta concentración de fósforo para desarrollo radicular",
      composition: "46% P₂O₅",
      application: "Todos los cultivos en fase inicial",
      icon: Droplet,
    },
    {
      id: 5,
      name: "Cloruro de Potasio",
      category: "potasicos",
      description: "Fuente de potasio para calidad y resistencia del cultivo",
      composition: "60% K₂O",
      application: "Frutales, hortalizas, soja",
      icon: Zap,
    },
    {
      id: 6,
      name: "Sulfato de Potasio",
      category: "potasicos",
      description: "Potasio sin cloruro para cultivos sensibles",
      composition: "50% K₂O - 18% S",
      application: "Hortalizas, papa, tabaco",
      icon: Zap,
    },
    {
      id: 7,
      name: "Compost Orgánico Premium",
      category: "organicos",
      description: "Mejora la estructura y fertilidad del suelo",
      composition: "Materia orgánica 65%",
      application: "Todos los cultivos orgánicos",
      icon: Shield,
    },
    {
      id: 8,
      name: "Humus de Lombriz",
      category: "organicos",
      description: "Bioestimulante natural rico en microorganismos",
      composition: "Materia orgánica 55%",
      application: "Horticultura, jardinería",
      icon: Shield,
    },
    {
      id: 9,
      name: "Boro Soluble",
      category: "micronutrientes",
      description: "Esencial para floración y fructificación",
      composition: "17% Boro (B)",
      application: "Frutales, girasol, alfalfa",
      icon: Droplet,
    },
    {
      id: 10,
      name: "Zinc Quelado",
      category: "micronutrientes",
      description: "Previene y corrige deficiencias de zinc",
      composition: "14% Zinc (Zn) quelado",
      application: "Maíz, cítricos, vid",
      icon: Droplet,
    },
    {
      id: 11,
      name: "NPK 15-15-15",
      category: "all",
      description: "Fertilizante balanceado para mantenimiento general",
      composition: "15% N - 15% P₂O₅ - 15% K₂O",
      application: "Cultivos en general",
      icon: Leaf,
    },
    {
      id: 12,
      name: "NPK 20-10-10",
      category: "all",
      description: "Alto en nitrógeno para fase vegetativa",
      composition: "20% N - 10% P₂O₅ - 10% K₂O",
      application: "Cultivos en crecimiento vegetativo",
      icon: Leaf,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestro Catálogo de Productos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fertilizantes especializados para cada necesidad de tu campo
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
              >
                <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Composición: </span>
                    <span className="text-gray-600">{product.composition}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Aplicación: </span>
                    <span className="text-gray-600">{product.application}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                  Consultar Precio
                </button>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron productos con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
