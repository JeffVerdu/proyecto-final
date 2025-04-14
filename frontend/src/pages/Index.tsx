import { useEffect, useState } from "react";
import { Product } from "@/types";
import DefaultLayout from "@/layouts/Default";
import HeroSection from "@/components/HeroSection";
import Featured from "@/components/Featured";
import ProductCategoryCarousel from "@/components/ProductCategoryCarousel";
import ProductCard from "@/components/ProductCard";
import { useSearchStore } from "@/store/useSearchStore";

export default function Index() {
  const { term } = useSearchStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(term.toLowerCase())
  );

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <DefaultLayout>
      <HeroSection />

      {term.trim() !== "" ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">
            Resultados para: <span className="text-primary">{term}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-gray-500 text-center">
                No se encontraron productos.
              </p>
            )}
          </div>
        </div>
      ) : (
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
      )}
    </DefaultLayout>
  );
}
