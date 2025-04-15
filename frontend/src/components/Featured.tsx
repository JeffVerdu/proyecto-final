import { Product } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import api from "@/config/axios";

const Featured = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/productos")
      .then((res) => {
        const destacados = res.data
          .sort((a: Product, b: Product) => Number(a.precio) - Number(b.precio))
          .slice(0, 5);
        setFeaturedPosts(destacados);
      })
      .catch((err) => console.error("Error al cargar destacados:", err));
  }, []);

  return (
    <section className="relative z-20 -mt-24 mb-8">
      <div className="overflow-x-auto">
        <div className="flex snap-x snap-mandatory mx-auto max-w-7xl py-5 gap-4 justify-center">
          {featuredPosts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
