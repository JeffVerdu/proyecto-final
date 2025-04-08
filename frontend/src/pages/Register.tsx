import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import DefaultLayout from "@/layouts/Default";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      alert("La contraseña debe tener entre 6 y 12 caracteres, incluir al menos una mayúscula y una minúscula.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    console.log("Registro exitoso:", form);
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen bg-[#F6F1DE]">
        <div className="w-full max-w-md p-6 bg-[#ACD3A8] rounded-lg shadow-md">
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
            <Button type="submit" className="w-full bg-[#8AB2A6]">Registrarse</Button>
          </form>
          <p className="text-center mt-4">
            ¿Ya tienes una cuenta? <Link href="/login" className="text-primary">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}