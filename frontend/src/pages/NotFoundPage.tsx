import { Link } from "react-router-dom";
import DefaultLayout from "@/layouts/Default";

const NotFoundPage = () => {
  return (
    <DefaultLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-16">
        <h1 className="text-9xl font-black text-gray-800 mb-4">ERROR 404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-500 max-w-md mb-8">
          Lo sentimos, la página que estás buscando no existe o fue movida.
          Podés volver al inicio o seguir navegando.
        </p>
        <Link to="/">
          <button className="px-6 py-3 bg-[#3E3F5B] hover:brightness-95 text-white font-bold rounded-xl transition-all duration-200 ease-out">
            Volver al inicio
          </button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default NotFoundPage;
