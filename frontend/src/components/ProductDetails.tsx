import React, { useState } from "react";
import { Product } from "@/types";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.image);
  const thumbnails = product.gallery || [product.image];

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
            alt={product.title}
            className="w-full h-auto max-h-[500px] object-contain rounded"
          />
        </div>
      </div>

      {/* Card: Info del producto */}
      <div className="md:col-span-2 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <p className="text-sm text-gray-500">Nuevo</p>
        <h1 className="text-2xl font-semibold leading-tight">
          {product.title}
        </h1>

        <div>
          <p className="text-3xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </p>
          {product.installments && (
            <p className="text-sm text-gray-600">{product.installments}</p>
          )}
        </div>

        {product.shipping && (
          <p className="text-green-600 font-medium">{product.shipping}</p>
        )}
        <p className="text-sm text-gray-600">
          Entrega a acordar con el vendedor
          <br />
          Ciudad Ejemplo, País
        </p>

        <p className="text-red-600 font-semibold">¡Última disponible!</p>

        <button className="bg-[#8AB2A6] text-white font-bold py-3 rounded-md transition shadow-sm">
          Comprar ahora
        </button>

        <div className="text-xs text-gray-600 mt-2">
          Vendido por{" "}
          <span className="text-blue-600 font-semibold">Tienda Ejemplo</span>
          <br />
          +500 ventas
        </div>

        <p className="text-xs text-gray-500">
          🛡 Compra Protegida, recibí el producto que esperás o te devolvemos tu
          dinero.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
