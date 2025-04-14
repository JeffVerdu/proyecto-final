import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";

interface Props {
  products: Product[];
  onSearching: (isSearching: boolean) => void;
}

const ProductSearchInline = ({ products, onSearching }: Props) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    const query = search.trim().toLowerCase();
    const results = products.filter((p) =>
      p.title.toLowerCase().includes(query)
    );
    setFiltered(results);
    onSearching(query.length > 0); // comunica si estamos buscando
  }, [search, products, onSearching]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Input
        aria-label="Buscar"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />

      {search.trim().length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No se encontraron productos.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearchInline;
