import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface Category {
  id: number;
  title: string;
  img: string;
}

export default function HeroSection() {
  const location = useLocation();
  const { category } = useParams();
  const [backgroundUrl, setBackgroundUrl] = useState(
    "https://i.pinimg.com/originals/2b/6f/a8/2b6fa8769c110a8c8a06c6221d37dc5f.jpg"
  );

  useEffect(() => {
    if (location.pathname.startsWith("/categories/") && category) {
      fetch("/data/categories.json")
        .then((res) => res.json())
        .then((data: Category[]) => {
          const currentCategory = data.find(
            (cat) => cat.title.toLowerCase() === category.toLowerCase()
          );
          if (currentCategory?.img) {
            setBackgroundUrl(currentCategory.img);
          } else {
            setBackgroundUrl(
              "https://i.pinimg.com/originals/2b/6f/a8/2b6fa8769c110a8c8a06c6221d37dc5f.jpg"
            );
          }
        })
        .catch((err) => {
          console.error("Error cargando categorías:", err);
        });
    } else {
      setBackgroundUrl(
        "https://i.pinimg.com/originals/2b/6f/a8/2b6fa8769c110a8c8a06c6221d37dc5f.jpg"
      );
    }
  }, [location.pathname, category]);

  return (
    <section
      className="relative w-full min-h-dvh md:min-h-[600px] bg-no-repeat bg-top bg-cover mt-[-8rem]"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_80%,rgba(246,241,222,1)_100%)]"></div>
    </section>
  );
}
