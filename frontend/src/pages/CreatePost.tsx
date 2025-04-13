import type React from "react";
import { useState } from "react";
import DefaultLayout from "@/layouts/Default";
import api from "@/config/axios";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Phone,
  Mail,
  MapPin,
  ImageIcon,
  X,
  Info,
} from "lucide-react";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("form");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    condition: "new",
    location: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
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

    const validImages = images.filter((img) => img !== null);

    try {
      const body = {
        nombre: formData.title,
        descripcion: formData.description,
        imagenes: validImages,
        precio: formData.price,
        condicion: formData.condition,
        ubicacion: formData.location,
      };
    
      const response = await api.post("/productos", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      const id = response.data.id;
      alert("Publicación creada exitosamente");
      setIsSubmitting(false);
      navigate(`/producto/${id}`); // sin espacio al final
    } catch (error: any) {
      console.error("Error al crear publicación:", error);
      alert(error.response?.data?.error || "Error al crear publicación.");
      setIsSubmitting(false);
    }
  }
  return (
    <DefaultLayout>
      <div className="bg-[#F6F1DE] dark:bg-[#3E3F5B] min-h-screen rounded-3xl">
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center dark:text-[#F6F1DE] mb-8">
            Crear nueva publicación de venta
          </h1>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-[#8AB2A6]/30">
            <button
              onClick={() => setActiveTab("form")}
              className={`py-3 px-6 font-medium text-lg rounded-t-2xl ${
                activeTab === "form"
                  ? "bg-white dark:bg-[#3E3F5B]/70 dark:text-[#F6F1DE] border-t border-l border-r border-[#8AB2A6]/30"
                  : "hover:text-[#3E3F5B] dark:hover:text-[#F6F1DE]"
              }`}
            >
              Formulario
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`py-3 px-6 font-medium text-lg rounded-t-2xl ${
                activeTab === "preview"
                  ? "bg-white dark:bg-[#3E3F5B]/70 dark:text-[#F6F1DE] border-t border-l border-r border-[#8AB2A6]/30"
                  : "hover:text-[#3E3F5B] dark:hover:text-[#F6F1DE]"
              }`}
            >
              Vista Previa
            </button>
          </div>

          {activeTab === "form" ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#3E3F5B]/70 rounded-2xl shadow-md p-6"
            >
              <div className="space-y-8">
                {/* Título */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                  >
                    Título de la publicación
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                    required
                  />
                  <p className="mt-1 text-sm text-[#8AB2A6]">
                    Un título claro y conciso que describa tu producto.
                  </p>
                </div>

                {/* Descripción */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                    required
                  />
                  <p className="mt-1 text-sm text-[#8AB2A6]">
                    Una buena descripción aumenta las probabilidades de venta.
                  </p>
                </div>

                {/* Precio, Categoría, Condición, Ubicación */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                    >
                      Precio
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-[#8AB2A6]" />
                      </div>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                        placeholder="$$$"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                    >
                      Categoría
                    </label>
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="electronics">Electrónica</option>
                      <option value="clothing">Ropa</option>
                      <option value="home">Hogar</option>
                      <option value="sports">Deportes</option>
                      <option value="other">Otros</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="condition"
                      className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                    >
                      Condición
                    </label>
                    <select
                      name="condition"
                      id="condition"
                      value={formData.condition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                      required
                    >
                      <option value="new">Nuevo</option>
                      <option value="like-new">Como nuevo</option>
                      <option value="good">Buen estado</option>
                      <option value="fair">Estado aceptable</option>
                      <option value="poor">Necesita reparación</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                    >
                      Ubicación
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-[#8AB2A6]" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                        placeholder="Ciudad, Estado"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Información de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contactPhone"
                      className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                    >
                      Teléfono de contacto
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-[#8AB2A6]" />
                      </div>
                      <input
                        type="tel"
                        name="contactPhone"
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contactEmail"
                      className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2"
                    >
                      Email de contacto
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[#8AB2A6]" />
                      </div>
                      <input
                        type="email"
                        name="contactEmail"
                        id="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 bg-white dark:bg-[#3E3F5B]/50 border border-[#8AB2A6] rounded-xl shadow-sm focus:ring-[#ACD3A8] focus:border-[#ACD3A8] text-[#3E3F5B] dark:text-[#F6F1DE]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Fotografías */}
                <div>
                  <label className="block text-lg font-medium text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">
                    Fotografías
                  </label>
                  <p className="mb-3 text-sm text-[#8AB2A6]">
                    Sube hasta 5 imágenes. La primera será la principal.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative border-2 ${index === 0 ? "border-[#ACD3A8]" : "border-[#8AB2A6]/30"} rounded-2xl overflow-hidden aspect-square flex items-center justify-center bg-white dark:bg-[#3E3F5B]/50`}
                      >
                        {image ? (
                          <>
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Imagen ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-[#3E3F5B] dark:bg-[#F6F1DE] text-[#F6F1DE] dark:text-[#3E3F5B] p-1 rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleImageChange(e, index)}
                            />
                            <ImageIcon className="h-8 w-8 text-[#8AB2A6]" />
                            {index === 0 && (
                              <span className="mt-1 text-xs text-[#8AB2A6] text-center">
                                Principal
                              </span>
                            )}
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end space-x-4">
                <button
                  type="button"
                  className="py-3 px-6 border border-[#8AB2A6] rounded-xl shadow-sm text-[#3E3F5B] dark:text-[#F6F1DE] hover:bg-[#8AB2A6]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ACD3A8] font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-6 border border-transparent rounded-xl shadow-sm bg-[#ACD3A8] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ACD3A8] font-medium transition-all ease-in duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#3E3F5B]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Publicando...
                    </span>
                  ) : (
                    "Publicar anuncio"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white dark:bg-[#3E3F5B]/70 rounded-2xl shadow-md p-6">
              {formData.title ||
              formData.description ||
              images.some((img) => img !== null) ? (
                <div className="space-y-6">
                  <div className="border-b border-[#8AB2A6]/30 pb-4">
                    <h2 className="text-2xl font-bold text-[#3E3F5B] dark:text-[#F6F1DE]">
                      {formData.title || "Título de la publicación"}
                    </h2>

                    <div className="flex items-center mt-2">
                      <DollarSign className="h-5 w-5 text-[#ACD3A8] mr-1" />
                      <span className="text-xl font-semibold text-[#3E3F5B] dark:text-[#F6F1DE]">
                        {formData.price || "$$$"}
                      </span>
                    </div>

                    {formData.location && (
                      <div className="flex items-center mt-2 text-[#8AB2A6]">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{formData.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Imágenes */}
                  {images.some((img) => img !== null) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <img
                          src={images[0] || "/placeholder.svg"}
                          alt="Imagen principal"
                          className="w-full h-64 object-contain bg-[#8AB2A6]/10 rounded-2xl"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {images.slice(1).map(
                          (image, index) =>
                            image && (
                              <div key={index} className="aspect-square">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Imagen ${index + 2}`}
                                  className="w-full h-full object-cover rounded-xl"
                                />
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Descripción */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">
                      Descripción
                    </h3>
                    <p className="text-[#3E3F5B] dark:text-[#F6F1DE] whitespace-pre-line">
                      {formData.description ||
                        "Aquí aparecerá la descripción de tu producto."}
                    </p>
                  </div>

                  {/* Detalles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">
                        Detalles
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-[#8AB2A6] font-medium mr-2">
                            Categoría:
                          </span>
                          <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">
                            {formData.category || "No especificada"}
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#8AB2A6] font-medium mr-2">
                            Condición:
                          </span>
                          <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">
                            {formData.condition === "new"
                              ? "Nuevo"
                              : formData.condition === "like-new"
                                ? "Como nuevo"
                                : formData.condition === "good"
                                  ? "Buen estado"
                                  : formData.condition === "fair"
                                    ? "Estado aceptable"
                                    : formData.condition === "poor"
                                      ? "Necesita reparación"
                                      : "No especificada"}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">
                        Contacto
                      </h3>
                      <ul className="space-y-2">
                        {formData.contactPhone && (
                          <li className="flex items-center">
                            <Phone className="h-4 w-4 text-[#8AB2A6] mr-2" />
                            <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">
                              {formData.contactPhone}
                            </span>
                          </li>
                        )}
                        {formData.contactEmail && (
                          <li className="flex items-center">
                            <Mail className="h-4 w-4 text-[#8AB2A6] mr-2" />
                            <span className="text-[#3E3F5B] dark:text-[#F6F1DE]">
                              {formData.contactEmail}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Info className="h-12 w-12 text-[#8AB2A6] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[#3E3F5B] dark:text-[#F6F1DE] mb-2">
                    Vista previa no disponible
                  </h3>
                  <p className="text-[#8AB2A6] max-w-md mx-auto">
                    Complete el formulario para ver una vista previa de cómo se
                    verá su publicación.
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </DefaultLayout>
  );
}
