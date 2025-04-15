import DefaultLayout from "@/layouts/Default";
<<<<<<< Updated upstream

export default function IndexPage() {
  return <DefaultLayout>Index</DefaultLayout>;
=======
import { Product } from "@/types";
import { useEffect, useState } from "react";
import api from "@/config/axios";

export default function IndexPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/productos")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(products.map((p) => p.categoria || "Sin categoría"))];

  return (
    <DefaultLayout>
      <HeroSection />
      <div className="container mx-auto">
        <Featured />
        {loading ? (
          <p className="text-center mt-10">Cargando productos...</p>
        ) : (
          categories.map((categoria) => {
            const productsInCategory = products.filter(p => (p.categoria || "Sin categoría") === categoria);
            return (
              <ProductCategoryCarousel
                key={categoria}
                category={categoria}
                products={productsInCategory}
              />
            );
          })
        )}
      </div>
    </DefaultLayout>
  );
>>>>>>> Stashed changes
}
