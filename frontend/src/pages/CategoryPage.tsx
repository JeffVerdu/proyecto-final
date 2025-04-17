import CategoryGrid from "@/components/CategoryGrid";
import HeroSection from "@/components/HeroSection";
import DefaultLayout from "@/layouts/Default";
import { quitarAcentos } from "@/utils/funciones";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();

  const normalizeCategory = quitarAcentos(category || "");

  return (
    <DefaultLayout>
      <HeroSection />
      <div className="relative z-20 -mt-48">
        <h2 className="text-center text-white text-6xl font-bold capitalize text-shadow-lg">
          {category}
        </h2>
        <CategoryGrid category={normalizeCategory || ""} />
      </div>
    </DefaultLayout>
  );
};

export default CategoryPage;
