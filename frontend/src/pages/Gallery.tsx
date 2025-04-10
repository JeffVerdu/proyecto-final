import GalleryGrid from "@/components/GalleryGrid";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/Default";
import { Product } from "@/types";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GalleryPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const handleClick = () => {
    navigate("/post");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>My Gallery</h1>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-8 px-4">
          {/* User info summary */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-[#8AB2A6] dark:bg-[#8AB2A6] flex items-center justify-center text-[#3E3F5B] dark:text-[#F6F1DE] text-2xl font-bold">
              JD
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="text-xl font-bold">Jane Doe</h2>
                <p className="">
                  <span className="font-medium">{products.length} posts</span> ·{" "}
                  <a href="/profile" className="hover:underline">
                    View Profile
                  </a>
                </p>
              </div>
              <Button
                size="lg"
                className="bg-[#ACD3A8] hover:brightness-95 font-bold"
                onPress={handleClick}
              >
                Nueva publicación
              </Button>
            </div>
          </div>

          {/* Gallery grid */}
          <GalleryGrid products={products} />

          {/* Load more button */}
          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 bg-[#ACD3A8] hover:brightness-95 font-medium rounded-full transition-all ease-in duration-200">
              Load More
            </button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
