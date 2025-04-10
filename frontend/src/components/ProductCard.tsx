import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/skeleton";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  return (
    <Skeleton isLoaded={isLoaded} className="rounded-lg">
      <Link to={`/producto/${product.id}`}>
        <div
          key={product.id}
          className="w-56 h-[300px] shrink-0 bg-gray-100 rounded-xl shadow shadow-black p-4 snap-start hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out flex flex-col justify-between"
        >
          <div>
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
          </div>

          <div className="mt-2">
            {product.installments && (
              <p className="text-sm text-gray-600">{product.installments}</p>
            )}
            {product.shipping && (
              <p className="text-green-600 text-sm font-medium">
                {product.shipping}
              </p>
            )}
          </div>
        </div>
      </Link>
    </Skeleton>
  );
};

export default ProductCard;
