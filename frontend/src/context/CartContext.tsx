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
  syncCartFromLogin: (carrito_id: number, itemsFromBackend: any[]) => void;
  resetAnonymousCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  syncCartFromLogin: () => {},
  resetAnonymousCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [carritoId, setCarritoId] = useState<number | null>(null);
  const { showToast } = useToast();

  function parseCarritoItems(itemsBackend: any[]): CartItem[] {
    return itemsBackend.map((item: any) => ({
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
        descripcion: item.descripcion || "",
        condicion: item.condicion || "nuevo",
        ubicacion: item.ubicacion || "",
        usuario_id: item.usuario_id || 0,
        categoria: item.categoria || "",
      },
    }));
  }

  useEffect(() => {
    const storedId = sessionStorage.getItem("carrito_id");
    const token = localStorage.getItem("token");

    if (storedId) {
      const id = Number(storedId);
      setCarritoId(id);
      api
        .get(`/carrito/${id}`)
        .then((res) => {
          const itemsBackend = Array.isArray(res.data?.items)
            ? res.data.items
            : [];
          const productos = parseCarritoItems(itemsBackend);
          setItems(productos);
        })
        .catch((err) => {
          console.error("Error al obtener el carrito:", err);
          setItems([]);
        });
    } else if (token) {
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const usuario_id = res.data.id;
          return api.get(`/carrito/usuario/${usuario_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
        .then((res) => {
          const carrito_id = res.data.carrito_id;
          const itemsBackend = Array.isArray(res.data?.items)
            ? res.data.items
            : [];
          const productos = parseCarritoItems(itemsBackend);

          sessionStorage.setItem("carrito_id", carrito_id.toString());
          setCarritoId(carrito_id);
          setItems(productos);
        })
        .catch((err) => {
          console.error("No se encontró carrito del usuario logueado:", err);
        });
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      const token = localStorage.getItem("token");
      const carrito_id = sessionStorage.getItem("carrito_id");

      if (token && carrito_id) {
        try {
          const me = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          await api.put("/carrito/asociar", {
            carrito_id,
            usuario_id: me.data.id,
          });
        } catch (err) {
          console.error("Error al asociar carrito antes de salir:", err);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const addToCart = async (producto: Product, cantidad = 1) => {
    try {
      let id = carritoId;
      if (!id) {
        const res = await api.post("/carrito/crear");
        id = res.data.carrito_id;
        setCarritoId(id);
        if (id !== null) {
          sessionStorage.setItem("carrito_id", id.toString());
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

  const syncCartFromLogin = (carrito_id: number, itemsFromBackend: any[]) => {
    setCarritoId(carrito_id);
    sessionStorage.setItem("carrito_id", carrito_id.toString());

    console.log(itemsFromBackend);

    const itemsParsed = itemsFromBackend.map((item: any) => ({
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
        descripcion: item.descripcion || "",
        condicion: item.condicion || "nuevo",
        ubicacion: item.ubicacion || "",
        usuario_id: item.usuario_id || 0,
        categoria: item.categoria || "",
      },
    }));

    setItems(itemsParsed);
  };

  const resetAnonymousCart = () => {
    sessionStorage.removeItem("carrito_id");
    setCarritoId(null);
    setItems([]);
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
        syncCartFromLogin,
        resetAnonymousCart,
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
