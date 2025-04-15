import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/config/axios";
import DefaultLayout from "@/layouts/Default";

export default function EditarProductoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    condicion: "",
    ubicacion: "",
    imagenes: [""],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await api.get(`/productos/${id}`);
        const producto = res.data;

        setForm({
          nombre: producto.nombre || "",
          descripcion: producto.descripcion || "",
          precio: producto.precio || "",
          condicion: producto.condicion || "",
          ubicacion: producto.ubicacion || "",
          imagenes: Array.isArray(producto.imagenes)
            ? producto.imagenes
            : JSON.parse(producto.imagenes || "[]"),
        });

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar producto:", error);
        alert("No se pudo cargar el producto.");
        navigate("/gallery");
      }
    };

    fetchProducto();
  }, [id, navigate]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await api.put(`/productos/${id}`, {
        ...form,
        imagenes: JSON.stringify(form.imagenes),
      });

      alert("Producto actualizado correctamente.");
      navigate("/gallery");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el producto.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando producto...</p>;
  }

  return (
    <DefaultLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
        <h1 className="text-xl font-bold mb-4">Editar publicación</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="border p-2 rounded"
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="border p-2 rounded"
          />
            <label className="text-sm font-medium text-gray-700">Condición</label>
            <select
            name="condicion"
            value={form.condicion}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
            >
            <option value="">Seleccionar condición</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Como nuevo">Como nuevo</option>
            <option value="Buen estado">Buen estado</option>
            <option value="Estado aceptable">Estado aceptable</option>
            <option value="Necesita reparación">Necesita reparación</option>
            </select>
          <input
            type="text"
            name="ubicacion"
            value={form.ubicacion}
            onChange={handleChange}
            placeholder="Ubicación"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-[#8AB2A6] text-white py-2 rounded hover:brightness-95 transition"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
