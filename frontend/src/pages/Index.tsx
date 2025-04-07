import Featured from "@/components/Featured";
import HeroSection from "@/components/HeroSection";
import ProductCategoryCarousel from "@/components/ProductCategoryCarousel";
import DefaultLayout from "@/layouts/Default";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <DefaultLayout>
      <HeroSection />
      <div className="container mx-auto">
        <Featured />
        {categories.map((category) => {
          const productsInCategory = products.filter(
            (p) => p.category === category
          );
          return (
            <ProductCategoryCarousel
              key={category}
              category={category}
              products={productsInCategory}
            />
          );
        })}
      </div>
    </DefaultLayout>
  );
}
