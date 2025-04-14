import { Product } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ScrollShadow } from "@heroui/react";

interface Props {
  category: string;
  products: Product[];
}

const ProductCategoryCarousel: React.FC<Props> = ({ category, products }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <ScrollShadow
      className="p-4 max-w-7xl mx-auto mb-8 last:mb-0 bg-white rounded-xl shadow-md shadow-black/70"
      orientation="horizontal"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{category}</h2>
        <button
          className="text-sm text-blue-600 font-medium"
          onClick={() => {
            /* Add action here */
          }}
        >
          Ver más
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory py-4 px-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    </ScrollShadow>
  );
};

export default ProductCategoryCarousel;
