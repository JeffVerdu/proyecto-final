import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import api from "@/config/axios";
import { useToast } from "@/hooks/useToast";
import { useCart } from "@/context/CartContext";

export default function LogoutButton() {
  const { showToast } = useToast();
  const { resetAnonymousCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const me = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        await api.post(
          "/logs/logout",
          {
            user: me.data.email || `id:${me.data.id}`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        localStorage.removeItem("token");
        resetAnonymousCart();
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));

        navigate("/");

        showToast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión correctamente.",
          color: "success",
          variant: "flat",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (err) {
      showToast({
        title: "Error al cerrar sesión",
        description: "No se pudo cerrar sesión correctamente.",
        color: "danger",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      console.error("Error al registrar el logout:", err);
    }
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
