import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import api from "@/config/axios";
import { useToast } from "@/hooks/useToast";

interface CartItem {
  producto_id: number;
  cantidad: number;
  producto: Product;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (producto: Product, cantidad?: number) => void;
  removeFromCart: (producto_id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [carritoId, setCarritoId] = useState<number | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const storedId = localStorage.getItem("carrito_id");
    if (storedId) {
      const id = Number(storedId);
      setCarritoId(id);
      api
        .get(`/carrito/${id}`)
        .then((res) => {
          const itemsBackend = Array.isArray(res.data?.items)
            ? res.data.items
            : [];
          const productos = itemsBackend.map((item: any) => ({
            producto_id: item.producto_id,
            cantidad: item.cantidad,
            producto: {
              id: item.producto_id,
              nombre: item.nombre,
              precio: item.precio,
              imagenes:
                typeof item.imagenes === "string"
                  ? JSON.parse(item.imagenes)
                  : item.imagenes || [],
            },
          }));
          setItems(productos);
        })
        .catch((err) => {
          console.error("Error al obtener el carrito:", err);
          setItems([]);
        });
    }
  }, []);

  const addToCart = async (producto: Product, cantidad = 1) => {
    try {
      let id = carritoId;
      if (!id) {
        const res = await api.post("/carrito/crear");
        id = res.data.carrito_id;
        setCarritoId(id);
        if (id !== null) {
          localStorage.setItem("carrito_id", id.toString());
        }
      }

      await api.post("/carrito/items", {
        carrito_id: id,
        producto_id: producto.id,
        cantidad,
      });

      setItems((prev) => {
        const existe = prev.find((i) => i.producto_id === producto.id);
        if (existe) {
          return prev.map((i) =>
            i.producto_id === producto.id
              ? { ...i, cantidad: i.cantidad + cantidad }
              : i
          );
        }
        return [...prev, { producto_id: producto.id, cantidad, producto }];
      });

      showToast({
        title: "Producto agregado al carrito",
        description: "",
        color: "success",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    }
  };

  const removeFromCart = async (producto_id: number) => {
    try {
      await api.delete("/carrito/item", {
        data: { carrito_id: carritoId, producto_id },
      });
      setItems((prev) => {
        return prev
          .map((item) => {
            if (item.producto_id === producto_id) {
              if (item.cantidad > 1) {
                return { ...item, cantidad: item.cantidad - 1 };
              }
              return null;
            }
            return item;
          })
          .filter((item): item is CartItem => item !== null);
      });
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
    }
  };

  const clearCart = async () => {
    if (!carritoId) return;
    try {
      await api.delete(`/carrito/${carritoId}/items`);
      setItems([]);
      console.log("🧹 Carrito vaciado exitosamente");
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.producto.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

function useCartHook() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}

export { useCartHook as useCart };
