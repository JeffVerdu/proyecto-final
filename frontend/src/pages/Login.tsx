import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import DefaultLayout from "@/layouts/Default";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-[#ACD3A8] rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
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
            <Button type="submit" className="w-full bg-[#8AB2A6]">Ingresar</Button>
          </form>
          <p className="text-center mt-4">
            ¿No tienes una cuenta? <Link href="/register" className="text-primary">Regístrate</Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}
