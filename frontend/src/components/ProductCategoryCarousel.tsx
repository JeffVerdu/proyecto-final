import { Product } from "@/types";
import React from "react";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  products: Product[];
}

const ProductCategoryCarousel: React.FC<Props> = ({ category, products }) => {
  return (
    <section className="px-4 max-w-7xl mx-auto mb-8 last:mb-0">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{category}</h2>
        <a href="#" className="text-sm text-blue-600 font-medium">
          Ver más
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory py-4">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoryCarousel;
