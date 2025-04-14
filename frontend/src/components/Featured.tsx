import { Product } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

const Featured = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const featured = data.filter((p) => p.featured).slice(0, 5);
        setFeaturedPosts(featured);
      });
  }, []);

  return (
    <section className="relative z-20 -mt-24 mb-8">
      <div className="overflow-x-auto">
        <div className="flex snap-x snap-mandatory mx-auto max-w-7xl py-5 gap-4 justify-center">
          {featuredPosts.map((product) => (
            <ProductCard key={product.id} product={product} isFeatured />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
