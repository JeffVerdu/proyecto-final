import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import api from "@/config/axios";

interface CategoryGridProps {
  category: string;
}

const CategoryGrid = ({ category }: CategoryGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    api.get("/productos")
      .then((res) => {
        const filtered = res.data.filter(
          (p: Product) => p.categoria?.toLowerCase() === category?.toLowerCase()
        );
        setProducts(filtered);
      })
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setIsLoading(false));
  }, [category]);

  const skeletons = Array.from({ length: 5 }).map((_, i) => (
    <ProductCard key={`skeleton-${i}`} isLoading />
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-4 py-8 max-w-7xl mx-auto">
      {isLoading
        ? skeletons
        : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
};

export default CategoryGrid;
