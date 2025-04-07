import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "@/components/ProductDetails";
import DefaultLayout from "@/layouts/Default";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find(
          (p: { id: number }) => p.id === parseInt(id || "0")
        );
        setProduct(found);
      });
  }, [id]);

  return (
    <DefaultLayout>
      {product ? (
        <ProductDetails product={product} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Cargando producto...</p>
        </div>
      )}
    </DefaultLayout>
  );
}
