import CategoryGrid from "@/components/CategoryGrid";
import HeroSection from "@/components/HeroSection";
import DefaultLayout from "@/layouts/Default";
import { Product } from "@/types";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <DefaultLayout>
      <HeroSection />
      <div className="relative z-20 -mt-48">
        <h2 className="text-center text-white text-6xl font-bold">Deportes</h2>
        <CategoryGrid products={products} />
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
