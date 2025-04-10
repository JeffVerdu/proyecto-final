import { Product } from "@/types";
import PostCard from "./PostCard";

interface Props {
  products: Product[];
}

const GalleryGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 max-w-7xl mx-auto">
      {products.map((product) => (
        <PostCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default GalleryGrid;
