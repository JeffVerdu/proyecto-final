import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import DefaultLayout from "@/layouts/Default";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token } = response.data;

      if (!token) throw new Error("Token no recibido desde el servidor");

      localStorage.setItem("token", token);

      alert("Inicio de sesión exitoso");
      navigate("/profile");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      localStorage.removeItem("token");
      alert(error.response?.data?.message || "Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex items-start justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-[#3E3F5B] text-white font-bold"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
          <p className="text-center mt-4">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-primary">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}