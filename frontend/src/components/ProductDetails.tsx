import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [category, setCategory] = useState("");
  const thumbnails = Array.isArray(product.imagenes) ? product.imagenes : [];
  const [mainImage, setMainImage] = useState(thumbnails[0]);
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => {
        const categoryName = data.find(
          (cat: { id: string }) => cat.id === product.categoria
        )?.title;
        if (categoryName) {
          setCategory(categoryName);
        } else {
          setCategory("Sin categoría");
        }
      })
      .catch((err) => {
        console.error("Error cargando categorías:", err);
      });
  }, [product]);

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-6">
      {/* Card: Fotos */}
      <div className="md:col-span-3 bg-white rounded-lg shadow p-4 flex gap-4">
        {/* Miniaturas */}
        <div className="flex flex-col gap-2">
          {thumbnails.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Miniatura ${i}`}
              onClick={() => setMainImage(img)}
              className={`w-14 h-14 object-cover border rounded cursor-pointer ${
                img === mainImage ? "ring-2 ring-blue-500" : "hover:opacity-75"
              }`}
            />
          ))}
        </div>

        {/* Imagen principal */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={mainImage}
            alt={product.nombre}
            className="w-full h-auto max-h-[500px] object-contain rounded"
          />
        </div>
      </div>

      {/* Card: Info del producto */}
      <div className="md:col-span-2 bg-white rounded-lg shadow p-6 flex flex-col gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold leading-none m-0 p-0">
            {product.nombre}
          </h1>
          <span className="text-xs m-0 p-0 leading-none text-gray-500">
            {category}
          </span>
        </div>

        {product.nombre_usuario && (
          <p className="text-sm text-gray-500">
            Publicado por{" "}
            <span className="font-medium">{product.nombre_usuario}</span>
          </p>
        )}

        <div>
          <p className="text-3xl font-bold text-gray-900">
            {product.precio !== undefined
              ? `$${product.precio.toLocaleString()}`
              : "Precio no disponible"}
          </p>
        </div>

        <p className="text-gray-600 text-sm whitespace-pre-line">
          {product.descripcion}
        </p>

        <button
          onClick={handleBuyNow}
          className="bg-[#8AB2A6] hover:brightness-95 text-white font-bold py-3 rounded-md transition shadow-sm"
        >
          Comprar ahora
        </button>
        <button
          onClick={() => {
            addToCart(product, 1);
          }}
          className="bg-[#8AB2A6] hover:brightness-95 text-white font-bold py-3 rounded-md transition shadow-sm"
        >
          Agregar al carrito
        </button>
        <p className="text-xs text-gray-500">
          🛡 Compra Protegida, recibí el producto que esperás o te devolvemos tu
          dinero.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
