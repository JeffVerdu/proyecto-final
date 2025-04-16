import { Product } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ScrollShadow } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  category: string;
  products: Product[];
}

const ProductCategoryCarousel: React.FC<Props> = ({ category, products }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  const skeletons = Array.from({ length: 5 }).map((_, i) => (
    <ProductCard key={`skeleton-${i}`} isLoading />
  ));

  return (
    <ScrollShadow
      className="p-4 max-w-7xl mx-auto mb-8 last:mb-0 bg-white rounded-xl shadow-md shadow-black/70"
      orientation="horizontal"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold capitalize">{category}</h2>
        <button
          className="text-sm text-blue-600 font-medium"
          onClick={() => {
            navigate(`/categories/${category}`);
          }}
        >
          Ver más
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory py-4 px-8">
          {isLoading ? (
            skeletons
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-500 italic">
              No hay productos en esta categoría.
            </p>
          )}
        </div>
      </div>
    </ScrollShadow>
  );
};

export default ProductCategoryCarousel;
