import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetails from "@/components/ProductDetails";
import DefaultLayout from "@/layouts/Default";
import api from "@/config/axios";
import { Product } from "@/types";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // api.get(`/productos/${id}`)
    //   .then((res) => {
    //     setProduct(res.data);
    //   })
    //   .catch((err) => {
    //     console.error("Error al cargar producto:", err);
    //     setProduct(null);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    fetch(`/data/products.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p: Product) => p.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setProduct(null);
        }
      })
      .catch((err) => {
        console.error("Error al cargar producto:", err);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <DefaultLayout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Cargando producto...</p>
        </div>
      ) : product ? (
        <ProductDetails product={product} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Producto no encontrado.</p>
        </div>
      )}
    </DefaultLayout>
  );
}
