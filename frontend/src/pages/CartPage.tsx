import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/Default";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";

export default function CartPage() {
  const [confirmAction, setConfirmAction] = useState<"pago" | "vaciar" | null>(
    null
  );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { items, removeFromCart, clearCart, totalItems, totalPrice } =
    useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!Array.isArray(items)) return null;

  const onModalConfirm = () => {
    if (confirmAction === "pago") {
      const orderId = Math.floor(100000 + Math.random() * 900000);
      const order = {
        id: orderId,
        items,
        total: totalPrice,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      clearCart();
      navigate(`/checkout`);
      showToast({
        title: "Compra exitosa",
        description: `Tu número de compra es ${orderId}`,
        color: "success",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    if (confirmAction === "vaciar") {
      clearCart();
      navigate("/");
      showToast({
        title: "Vaciaste el carrito",
        description: `Todos los productos fueron eliminados.`,
        color: "warning",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Volver al inicio
        </button>

        <h1 className="text-2xl font-bold mb-8">Mi carrito</h1>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
            {items.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              items.map(({ producto, cantidad }, index) => (
                <div
                  key={`${producto.id}-${index}`}
                  className="bg-white border rounded-lg shadow p-4 flex flex-col"
                >
                  {producto.imagenes?.[0] ? (
                    <img
                      src={producto.imagenes[0]}
                      alt={producto.nombre}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500 text-sm">
                      Sin imagen
                    </div>
                  )}

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                    <p className="text-sm text-gray-500 mb-1">
                      Cantidad: {cantidad}
                    </p>
                    <p className="text-sm text-gray-700">
                      ${Number(producto.precio).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => removeFromCart(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Resumen */}
          {items.length > 0 && (
            <div className="bg-white border p-6 rounded shadow-sm w-full lg:w-80 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Resumen de compra</h2>
              <div className="text-sm space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Ítems:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-2"
                onClick={() => {
                  setConfirmAction("pago");
                  setShowConfirmModal(true);
                }}
              >
                Pagar
              </button>

              <button
                className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 rounded"
                onClick={() => {
                  setConfirmAction("vaciar");
                  setShowConfirmModal(true);
                }}
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setConfirmAction(null);
        }}
        onConfirm={onModalConfirm}
        title={
          confirmAction === "pago"
            ? "¿Deseas confirmar el pago?"
            : "¿Deseas vaciar el carrito?"
        }
        message={
          confirmAction === "pago"
            ? "Una vez confirmada la compra, no podrás modificar el carrito."
            : "Esta acción eliminará todos los productos del carrito."
        }
      />
    </DefaultLayout>
  );
}
