import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import api from "@/config/axios"; // tu cliente Axios

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
  
    try {
      if (token) {
        const me = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        await api.post("/logs/logout", {
          user: me.data.email || `id:${me.data.id}`
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error("Error al registrar el logout:", err);
    }
  
    localStorage.removeItem("token");
    sessionStorage.clear();
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  
    navigate("/login");
  };
  
  return (
    <Button
      onPress={handleLogout}
      className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold shadow hover:brightness-90 transition"
    >
      Cerrar sesión
    </Button>
  );
}

