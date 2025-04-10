import { Product } from "@/types";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

const PostCard = ({ product }: Props) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]">
      {/* Imagen */}
      <div className="relative h-64 w-full">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE]">
          {product.title}
        </h3>

        <p className="text-2xl font-bold text-gray-900">
          ${product.price.toLocaleString()}
        </p>

        {product.installments && (
          <p className="text-sm text-gray-600">{product.installments}</p>
        )}

        {product.shipping && (
          <p className="text-green-600 text-sm font-medium">
            {product.shipping}
          </p>
        )}

        <Link
          to={`/producto/${product.id}`}
          className="mt-2 w-full inline-block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
