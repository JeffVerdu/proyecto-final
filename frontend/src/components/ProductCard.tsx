import { Product } from "@/types";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/skeleton";
import { motion } from "framer-motion";

interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
  isFeatured?: boolean;
}

const ProductCard = ({
  product,
  isLoading = false,
  isFeatured,
}: ProductCardProps) => {
  return (
    <Skeleton isLoaded={!isLoading} className="bg-neutral-200 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/producto/${product?.id}`}>
          <article className="relative w-56 h-[300px] shrink-0 bg-gray-100 rounded-xl shadow shadow-black p-4 snap-start hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out flex flex-col justify-between">
            {/* Badge si existe */}
            {product?.badge && isFeatured && (
              <div className="absolute -top-3 left-4 bg-[#3E3F5B] text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                {product.badge}
              </div>
            )}

            <div>
              <img
                src={product?.image}
                alt={product?.title}
                className="w-full h-36 object-cover rounded mb-2"
              />
              <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                {product?.title}
              </h3>
              <p className="text-lg font-bold text-gray-800">
                ${product?.price?.toLocaleString()}
              </p>
            </div>

            <div className="mt-2">
              {product?.installments && (
                <p className="text-sm text-gray-600">{product.installments}</p>
              )}
              {product?.shipping && (
                <p className="text-green-600 text-sm font-medium">
                  {product.shipping}
                </p>
              )}
            </div>
          </article>
        </Link>
      </motion.div>
    </Skeleton>
  );
};

export default ProductCard;
