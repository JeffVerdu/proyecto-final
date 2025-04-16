import GalleryGrid from "@/components/GalleryGrid";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/Default";
import { Product } from "@/types";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios"; // usamos tu cliente axios real
import { Link } from "@heroui/react";

export default function GalleryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get("/auth/me");
        setUser(userRes.data);

        const productosRes = await api.get(
          `/productos/usuario/${userRes.data.id}`
        );
        setProducts(productosRes.data);
      } catch (error) {
        console.error("Error al cargar perfil o productos:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/productos/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      alert("Error al eliminar");
    }
  };

  const handleClick = () => {
    navigate("/post/new");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Galería de publicaciones</h1>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-8 px-4">
          {/* User info summary */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-full bg-[#8AB2A6] dark:bg-[#8AB2A6] flex items-center justify-center text-[#3E3F5B] dark:text-[#F6F1DE] text-2xl font-bold">
              {user ? user.nombre.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="text-xl font-bold">
                  {user ? user.nombre : "Cargando..."}
                </h2>
                <p>
                  <span className="font-medium">
                    {products.length} publicaciones
                  </span>{" "}
                  ·{" "}
                  <Link href="/profile" className="hover:underline">
                    Ver perfil
                  </Link>
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

          <GalleryGrid
            products={products}
            userId={user?.id}
            onDelete={handleDelete}
          />

          <div className="flex justify-center mt-10">
            <button className="px-6 py-2 bg-[#ACD3A8] hover:brightness-95 font-medium rounded-full transition-all ease-in duration-200">
              Cargar más
            </button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
