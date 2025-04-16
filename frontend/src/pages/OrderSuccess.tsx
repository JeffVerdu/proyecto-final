import DefaultLayout from "@/layouts/Default";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagenes?: string[];
  };
  cantidad: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  date: string;
}

const OrderSuccess = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");
    if (saved) {
      setOrder(JSON.parse(saved));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <DefaultLayout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">
          ¡Compra realizada con éxito!
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Tu número de compra es{" "}
          <span className="font-semibold">{order.id}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {order.items.map(({ producto, cantidad }, i) => (
            <div key={i} className="border rounded p-4 bg-white shadow">
              {producto.imagenes?.[0] ? (
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="w-full h-36 object-cover rounded mb-2"
                />
              ) : (
                <div className="w-full h-36 bg-gray-200 rounded mb-2 flex items-center justify-center text-sm text-gray-500">
                  Sin imagen
                </div>
              )}
              <h2 className="font-semibold">{producto.nombre}</h2>
              <p className="text-sm text-gray-500">Cantidad: {cantidad}</p>
              <p className="text-sm text-gray-700">
                Precio: ${producto.precio.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-right">
          <p className="text-lg font-bold">
            Total pagado: ${order.total.toLocaleString()}
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OrderSuccess;
