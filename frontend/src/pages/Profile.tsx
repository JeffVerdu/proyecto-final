import { useEffect, useState } from "react";
import api from "@/config/axios";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/Default";
import { UserCircle, Mail, MapPin, Calendar } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { Link } from "react-router-dom";
import useAuthCheck from "@/hooks/useAuthCheck";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { useToast } from "@/hooks/useToast";

export default function ProfilePage() {
  useAuthCheck();
  const [user, setUser] = useState<any>(null);
  const [misProductos, setMisProductos] = useState<Producto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState<number | null>(
    null
  );
  const { showToast } = useToast();

  type Producto = {
    id: number;
    nombre: string;
    imagenes: string;
    precio: number;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);

        const productosRes = await api.get(
          `/productos/usuario/${response.data.id}`
        );
        setMisProductos(productosRes.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchUser();
  }, []);

  const handleEliminarConfirmado = async () => {
    if (!productoAEliminar) return;

    try {
      await api.delete(`/productos/${productoAEliminar}`);
      setMisProductos((prev) =>
        prev.filter((prod) => prod.id !== productoAEliminar)
      );

      showToast({
        title: "Éxito",
        description: "La publicación ha sido eliminada.",
        color: "success",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      showToast({
        title: "Error",
        description: "No se pudo eliminar la publicación.",
        color: "danger",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setProductoAEliminar(null);
      setModalOpen(false);
    }
  };

  const abrirModalEliminacion = (id: number) => {
    setProductoAEliminar(id);
    setModalOpen(true);
  };

  const getImagenPrincipal = (imagenes: any): string => {
    try {
      if (typeof imagenes === "string" && imagenes.trim().startsWith("[")) {
        const parsed = JSON.parse(imagenes);
        return Array.isArray(parsed) && parsed[0]
          ? parsed[0]
          : "/placeholder.svg";
      }

      if (Array.isArray(imagenes)) {
        return imagenes[0] || "/placeholder.svg";
      }

      return imagenes || "/placeholder.svg";
    } catch (e) {
      console.warn("Error parseando imágenes:", e);
      return "/placeholder.svg";
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center py-8 md:py-1">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Profile</h1>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-xl shadow-md shadow-black overflow-hidden">
            <div className="h-32 bg-[#ACD3A8]"></div>
            <div className="relative px-6 py-4">
              <div className="absolute -top-16 left-4">
                <div className="h-32 w-32 rounded-full border-4 border-[#F6F1DE] dark:border-[#3E3F5B] bg-[#8AB2A6] dark:bg-[#8AB2A6] flex items-center justify-center">
                  <UserCircle className="h-36 w-24 text-[#3E3F5B]" />
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold text-[#3E3F5B]">
                  {user ? user.nombre : "Cargando..."}
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B]">
                      {user ? user.email : "Cargando..."}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B]">San Francisco, CA</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B]">Joined January 2023</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/gallery"
                    className="text-lg font-semibold text-[#3E3F5B] mb-4 hover:underline transition"
                  >
                    Mis Publicaciones
                  </Link>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {misProductos.map((prod) => (
                      <div
                        key={prod.id}
                        className="border rounded-xl p-4 bg-white hover:shadow-md transition flex flex-col"
                      >
                        <Link to={`/producto/${prod.id}`}>
                          <img
                            src={getImagenPrincipal(prod.imagenes)}
                            alt={prod.nombre}
                            className="w-full h-40 object-cover rounded mb-2"
                          />
                          <h4 className="font-bold text-[#3E3F5B]">
                            {prod.nombre}
                          </h4>
                          <p className="text-sm text-[#8AB2A6]">
                            ${prod.precio}
                          </p>
                        </Link>

                        <button
                          onClick={() => abrirModalEliminacion(prod.id)}
                          className="mt-2 text-sm bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition"
                        >
                          Eliminar publicación
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex justify-center">
                  <Link
                    to="/post/new"
                    className="px-6 py-3 rounded-xl bg-[#ACD3A8] text-[#3E3F5B] font-semibold shadow hover:brightness-95 transition"
                  >
                    Crear publicación
                  </Link>
                </div>

                <div className="mt-10 flex justify-center">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ConfirmDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleEliminarConfirmado}
      />
    </DefaultLayout>
  );
}
