import PostCard from "./PostCard";
import { Product } from "@/types";

interface Props {
  products: Product[];
  userId?: number;
  onDelete?: (id: number) => void;
}

const GalleryGrid = ({ products, userId, onDelete }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8 max-w-7xl mx-auto">
      {products.map((product) => (
        <PostCard
          key={product.id}
          product={product}
          userId={userId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
