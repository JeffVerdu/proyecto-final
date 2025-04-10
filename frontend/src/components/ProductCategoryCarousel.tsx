import { Product } from "@/types";
import React from "react";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
  products: Product[];
}

const ProductCategoryCarousel: React.FC<Props> = ({ category, products }) => {
  return (
    <section className="p-4 max-w-7xl mx-auto mb-8 last:mb-0 bg-white rounded-xl shadow-md">
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
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoryCarousel;
