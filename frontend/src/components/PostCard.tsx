import { Product } from "@/types";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
  userId?: number;
  onDelete?: (id: number) => void;
}

export default function PostCard({ product, userId, onDelete }: Props) {
  const getImagenPrincipal = (imagenes: any): string => {
    try {
      if (Array.isArray(imagenes)) {
        return imagenes[0] || "/placeholder.svg";
      }

      if (typeof imagenes === "string" && imagenes.trim().startsWith("[")) {
        const parsed = JSON.parse(imagenes);
        return parsed[0] || "/placeholder.svg";
      }

      return imagenes || "/placeholder.svg";
    } catch (e) {
      return "/placeholder.svg";
    }
  };

  const formatearPrecio = (precio: any) =>
    !isNaN(Number(precio))
      ? `$${Number(precio).toLocaleString()}`
      : "Precio no disponible";

  return (
    <div className="border rounded-xl p-4 bg-white hover:shadow-md transition flex flex-col">
      <Link to={`/producto/${product.id}`}>
        <img
          src={getImagenPrincipal(product.imagenes)}
          alt={product.nombre}
          className="w-full h-40 object-cover rounded mb-2"
        />
        <h4 className="font-bold text-[#3E3F5B] dark:text-[#F6F1DE]">
          {product.nombre}
        </h4>
        <p className="text-sm text-[#8AB2A6]">
          {formatearPrecio(product.precio)}
        </p>

        {/* 👇 Agregado: nombre del vendedor */}
        {product.nombre_usuario && (
          <p className="text-xs text-gray-500 mt-1">
            Vendido por{" "}
            <span className="font-medium">{product.nombre_usuario}</span>
          </p>
        )}

        <button className="mt-2 bg-[#3E3F5B] text-white font-semibold py-2 rounded hover:brightness-105 transition w-full">
          Ver más
        </button>
      </Link>

      {userId && product.usuario_id === userId && (
        <div className="flex gap-2 mt-3">
          <Link
            to={`/editar/${product.id}`}
            className="flex-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded px-3 py-2 transition text-center"
          >
            Editar
          </Link>
          <button
            onClick={() => {
              const confirmar = confirm(
                "¿Estás seguro de eliminar esta publicación?"
              );
              if (confirmar) onDelete?.(product.id);
            }}
            className="flex-1 text-sm bg-red-500 text-white rounded px-3 py-2 hover:bg-red-600 transition"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
