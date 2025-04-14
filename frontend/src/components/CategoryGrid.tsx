import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

interface CategoryGridProps {
  category: string;
}

const CategoryGrid = ({ category }: CategoryGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter(
          (p) => p.category.toLowerCase() === category?.toLowerCase()
        );

        setTimeout(() => {
          setProducts(filtered);
          setIsLoading(false);
        }, 1200);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
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
