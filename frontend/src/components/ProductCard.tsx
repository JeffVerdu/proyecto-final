import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div
      key={product.id}
      className="w-56 shrink-0 bg-white rounded-lg shadow p-4 snap-start"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-36 object-cover rounded mb-2"
      />
      <h3 className="text-sm font-semibold mb-1 line-clamp-2">
        {product.title}
      </h3>
      <p className="text-lg font-bold text-gray-800">
        ${product.price.toLocaleString()}
      </p>
      {product.installments && (
        <p className="text-sm text-gray-600">{product.installments}</p>
      )}
      {product.shipping && (
        <p className="text-green-600 text-sm font-medium">{product.shipping}</p>
      )}
    </div>
  );
};

export default ProductCard;
