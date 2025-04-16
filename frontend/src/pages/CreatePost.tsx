import DefaultLayout from "@/layouts/Default";
import { useState } from "react";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "new",
    location: "",
    category: "",
  });

  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [previewImages, setPreviewImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFiles = [...imageFiles];
    const newPreviews = [...previewImages];

    newFiles[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setImageFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...previewImages];

    newFiles[index] = null;
    newPreviews[index] = null;

    setImageFiles(newFiles);
    setPreviewImages(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado.");
      setIsSubmitting(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("nombre", formData.title);
      form.append("descripcion", formData.description);
      form.append("precio", formData.price);
      form.append("condicion", formData.condition);
      form.append("ubicacion", formData.location);
      form.append("categoria", formData.category);

      imageFiles.forEach((file) => {
        if (file) {
          form.append("imagenes", file);
        }
      });

      const res = await api.post("/productos", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showToast({
        title: "Producto publicado!",
        description: "Tu publicación ha sido creada exitosamente.",
        color: "success",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      navigate(`/producto/${res.data.id}`);
    } catch (error: any) {
      console.error(error);

      showToast({
        title: "Error al crear publicación",
        description: error.response?.data?.message || "Error desconocido",
        color: "danger",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto p-10 bg-white rounded-xl shadow-md shadow-black">
        <h1 className="text-2xl font-bold mb-6">Crear nueva publicación</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium">Título</label>
            <input
              type="text"
              name="title"
              className="w-full border p-2 rounded"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Descripción</label>
            <textarea
              name="description"
              className="w-full border p-2 rounded"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Precio</label>
              <input
                type="number"
                name="price"
                className="w-full border p-2 rounded"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium">Condición</label>
              <select
                name="condition"
                className="w-full border p-2 rounded"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="new">Nuevo</option>
                <option value="used">Usado</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Ubicación</label>
              <input
                type="text"
                name="location"
                className="w-full border p-2 rounded"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium">Categoría</label>
              <select
                name="category"
                className="w-full border p-2 rounded"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="tecnologia">Tecnología</option>
                <option value="moda">Moda</option>
                <option value="hogar">Hogar</option>
                <option value="deportes">Deportes</option>
                <option value="electrodomesticos">Electrodomésticos</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Imágenes del producto (hasta 5)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {previewImages.map((preview, index) => (
                <div
                  key={index}
                  className="relative border border-dashed rounded aspect-square flex items-center justify-center overflow-hidden"
                >
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt={`img-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <label className="w-full h-full flex items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, index)}
                      />
                      <span className="text-gray-500">+</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-[#3E3F5B] text-white rounded hover:brightness-90 transition-all duration-200 ease-in-out disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publicando..." : "Publicar producto"}
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}
