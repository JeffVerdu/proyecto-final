import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/react";
import DefaultLayout from "@/layouts/Default";
import { useState } from "react";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(form.password)) {
      showToast({
        title: "Registro incorrecto",
        description:
          "La contraseña debe tener entre 6 y 12 caracteres, incluir al menos una mayúscula y una minúscula.",
        color: "danger",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      showToast({
        title: "Registro incorrecto",
        description: "Las contraseñas no coinciden.",
        color: "danger",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        nombre: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
        perfil: "usuario",
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      alert("Registro exitoso");
      navigate("/profile");
    } catch (error: any) {
      console.error("Error en el registro:", error);
      showToast({
        title: "Registro incorrecto",
        description: "Error al registrar usuario.",
        color: "danger",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <DefaultLayout>
      <div className="flex items-start justify-center min-h-screen bg-[#F6F1DE]">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nombre"
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Apellido"
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Repetir Contraseña"
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              className="w-full bg-[#3E3F5B] text-white font-bold"
            >
              Registrarse
            </Button>
          </form>
          <p className="text-center mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="text-primary">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
