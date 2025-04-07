import Featured from "@/components/Featured";
import HeroSection from "@/components/HeroSection";
import ProductCategoryCarousel from "@/components/ProductCategoryCarousel";
import DefaultLayout from "@/layouts/Default";

const products = [
  // 🟡 Inspirado en tus favoritos
  {
    id: 1,
    title: "Vidrio Puerta Horno Cocina Peabody",
    price: 55950,
    image: "/img/puerta1.jpg",
    category: "Inspirado en tus favoritos",
    shipping: "Envío gratis",
    installments: "en 6 cuotas de $12.397",
  },
  {
    id: 2,
    title: "Vidrio + Manija Para Horno Peabody",
    price: 59950,
    image: "/img/puerta2.jpg",
    category: "Inspirado en tus favoritos",
    shipping: "Envío gratis",
    installments: "en 6 cuotas de $13.283",
  },
  {
    id: 3,
    title: "Vidrio 55cm x 45cm para horno",
    price: 82380,
    image: "/img/puerta3.jpg",
    category: "Inspirado en tus favoritos",
    shipping: "Envío gratis",
    installments: "en 6 cuotas de $18.254",
  },
  {
    id: 4,
    title: "Vidrio horno Peabody con marco metálico",
    price: 72260,
    image: "/img/puerta4.jpg",
    category: "Inspirado en tus favoritos",
    shipping: "Envío gratis",
    installments: "3 cuotas sin interés",
  },
  {
    id: 5,
    title: "Vidrio repuesto horno cocina Coventry",
    price: 65560,
    image: "/img/puerta5.jpg",
    category: "Inspirado en tus favoritos",
    shipping: "Envío gratis",
    installments: "en 6 cuotas de $14.527",
  },

  // 🟢 Deportes
  {
    id: 6,
    title: "Zapatos deportivos para hombre",
    price: 32999,
    image: "/img/zapatillas1.jpg",
    category: "Deportes",
    shipping: "Envío gratis",
  },
  {
    id: 7,
    title: "Pelota de fútbol profesional",
    price: 18990,
    image: "/img/pelota.jpg",
    category: "Deportes",
    shipping: "Envío gratis",
  },
  {
    id: 8,
    title: "Conjunto deportivo térmico",
    price: 24999,
    image: "/img/conjunto.jpg",
    category: "Deportes",
    shipping: "Envío gratis",
  },
  {
    id: 9,
    title: "Mochila deportiva impermeable",
    price: 17990,
    image: "/img/mochila.jpg",
    category: "Deportes",
    shipping: "Envío gratis",
  },
  {
    id: 10,
    title: "Guantes de gimnasio con refuerzo",
    price: 10999,
    image: "/img/guantes.jpg",
    category: "Deportes",
  },

  // 🔵 Tecnología
  {
    id: 11,
    title: "Notebook HP 14 pulgadas",
    price: 279999,
    image: "/img/notebook.jpg",
    category: "Tecnología",
    shipping: "Envío gratis",
    installments: "en 12 cuotas sin interés",
  },
  {
    id: 12,
    title: "Auriculares Bluetooth con cancelación",
    price: 49999,
    image: "/img/auriculares.jpg",
    category: "Tecnología",
    shipping: "Envío gratis",
    installments: "en 3 cuotas sin interés",
  },
  {
    id: 13,
    title: "Monitor 24'' Full HD Samsung",
    price: 105990,
    image: "/img/monitor.jpg",
    category: "Tecnología",
    shipping: "Envío gratis",
  },
  {
    id: 14,
    title: "Mouse ergonómico inalámbrico",
    price: 23990,
    image: "/img/mouse.jpg",
    category: "Tecnología",
  },
  {
    id: 15,
    title: "Teclado mecánico retroiluminado",
    price: 45990,
    image: "/img/teclado.jpg",
    category: "Tecnología",
    shipping: "Envío gratis",
  },
];

export default function IndexPage() {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <DefaultLayout>
      <HeroSection />
      <Featured />
      {categories.map((category) => {
        const productsInCategory = products.filter(
          (p) => p.category === category
        );
        return (
          <ProductCategoryCarousel
            key={category}
            category={category}
            products={productsInCategory}
          />
        );
      })}
    </DefaultLayout>
  );
}
