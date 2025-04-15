import { Product } from "@/types";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/skeleton";
import { motion } from "framer-motion";

interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
}


const ProductCard = ({
  product,
  isLoading = false,
}: ProductCardProps) => {
  const getImagenPrincipal = (imagenes: string[] | string): string => {
    try {
      if (Array.isArray(imagenes)) {
        return imagenes[0] || "/placeholder.svg";
      }
      if (typeof imagenes === "string" && imagenes.trim().startsWith("[")) {
        return JSON.parse(imagenes)[0] || "/placeholder.svg";
      }
      return imagenes || "/placeholder.svg";
    } catch {
      return "/placeholder.svg";
    }
  };

  const formatearPrecio = (precio: any) =>
    !isNaN(Number(precio)) ? `$${Number(precio).toLocaleString()}` : "Precio no disponible";

  return (
    <Skeleton isLoaded={!isLoading} className="bg-neutral-200 rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading || !product ? (
          // ⛔️ Estado de loading – estructura base vacía
          <article className="relative w-56 h-[300px] shrink-0 bg-gray-100 rounded-xl shadow p-4 flex flex-col justify-between animate-pulse">
            <div className="bg-gray-300 w-full h-36 rounded mb-2" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </article>
        ) : (
          // ✅ Estado normal con producto
          <Link to={`/producto/${product.id}`}>
            <article className="relative w-56 h-[300px] shrink-0 bg-gray-100 rounded-xl shadow p-4 snap-start hover:scale-105 transition-transform flex flex-col justify-between">
              <div>
                <img
                  src={getImagenPrincipal(product.imagenes)}
                  alt={product.nombre}
                  className="w-full h-36 object-cover rounded mb-2"
                />
                <h3 className="text-sm font-semibold mb-1 line-clamp-2">
                  {product.nombre}
                </h3>
                <p className="text-lg font-bold text-gray-800">
                  {formatearPrecio(product.precio)}
                </p>
                {product.nombre_usuario && (
                  <p className="text-xs text-gray-500 mt-1">
                    Vendido por{" "}
                    <span className="font-medium">{product.nombre_usuario}</span>
                  </p>
                )}
              </div>
              {product.envio_gratis && (
                <div className="mt-2">
                  <p className="text-green-600 text-sm font-medium">Envío gratis</p>
                </div>
              )}
            </article>
          </Link>
        )}
      </motion.div>
    </Skeleton>
  );
};

export default ProductCard;