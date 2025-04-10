import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

const CategoryGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-4 py-8 max-w-7xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CategoryGrid;
