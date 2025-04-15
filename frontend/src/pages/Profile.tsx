import { useEffect, useState } from "react";
import api from "@/config/axios";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/Default";
import { UserCircle, Mail, MapPin, Calendar, Briefcase, LinkIcon } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import { Link } from "react-router-dom";
import useAuthCheck from "@/hooks/useAuthCheck";

export default function ProfilePage() {
  useAuthCheck();
  const [user, setUser] = useState<any>(null);
  const [misProductos, setMisProductos] = useState<Producto[]>([]);

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

        const productosRes = await api.get(`/productos/usuario/${response.data.id}`);
        setMisProductos(productosRes.data);
  
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchUser();
  }, []);

  const handleEliminar = async (id: number) => {
    const confirmar = confirm("¿Estás seguro de que quieres eliminar esta publicación?");
    if (!confirmar) return;
  
    try {
      await api.delete(`/productos/${id}`);
      setMisProductos((prev) => prev.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Ocurrió un error al eliminar la publicación.");
    }
  };
  
  const getImagenPrincipal = (imagenes: any): string => {
    try {
      if (typeof imagenes === "string" && imagenes.trim().startsWith("[")) {
        const parsed = JSON.parse(imagenes);
        return Array.isArray(parsed) && parsed[0] ? parsed[0] : "/placeholder.svg";
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
          <div className="bg-[#F6F1DE] dark:bg-[#3E3F5B] rounded-xl shadow-md overflow-hidden">
            <div className="h-32 bg-[#ACD3A8] dark:bg-[#8AB2A6]"></div>
            <div className="relative px-6 py-4">
              <div className="absolute -top-16 left-4">
                <div className="h-32 w-32 rounded-full border-4 border-[#F6F1DE] dark:border-[#3E3F5B] bg-[#8AB2A6] dark:bg-[#8AB2A6] flex items-center justify-center">
                  <UserCircle className="h-36 w-24 text-[#3E3F5B] dark:text-[#F6F1DE]" />
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-2xl font-bold text-[#3E3F5B] dark:text-[#F6F1DE]">
                  {user ? user.nombre : "Cargando..."}
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">
                      {user ? user.email : "Cargando..."}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">San Francisco, CA</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">Joined January 2023</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-[#ACD3A8] dark:text-[#ACD3A8]" />
                    <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">
                      {user ? user.perfil : "Cargando..."}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/gallery"
                    className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-4 hover:underline transition"
                  >
                    Mis Publicaciones
                  </Link>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                          <h4 className="font-bold text-[#3E3F5B] dark:text-[#F6F1DE]">{prod.nombre}</h4>
                          <p className="text-sm text-[#8AB2A6]">${prod.precio}</p>
                        </Link>

                        <button
                          onClick={() => handleEliminar(prod.id)}
                          className="mt-2 text-sm bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition"
                        >
                          Eliminar publicación
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ➕ Botón Crear publicación */}
                <div className="mt-10 flex justify-center">
                  <Link
                    to="/post"
                    className="px-6 py-3 rounded-xl bg-[#ACD3A8] text-[#3E3F5B] font-semibold shadow hover:brightness-95 transition"
                  >
                    Crear publicación
                  </Link>
                </div>

                {/* 🔐 Botón de Cerrar Sesión */}
                <div className="mt-10 flex justify-center">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
