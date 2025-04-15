import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import { SearchIcon } from "./Icons";
import { useLocation } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";
import DropdownButton from "./DropdownButton";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const [options, setOptions] = useState([]);
  const location = useLocation();

  const { items } = useCart();
  const { term, setTerm } = useSearchStore();

  useEffect(() => {
    fetch("/data/categories.json")
      .then((response) => response.json())
      .then((data) => {
        const categories = data.map(
          (category: { id: number; title: string; img: string }) =>
            category.title
        );
        setOptions(categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const isNavbarTransparent =
    location.pathname === "/" || location.pathname === "/category";

  const isLoggedIn = !!localStorage.getItem("token");

  const searchInput = (
    <Input
      aria-label="Buscar"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      placeholder="Buscar..."
      value={term}
      onChange={(e) => setTerm(e.target.value)}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      shouldHideOnScroll
      className={`${isNavbarTransparent ? "bg-transparent" : "bg-[#3E3F5B]"}`}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit text-white">
              Fast
              <strong
                className={`${
                  isNavbarTransparent ? "text-[#3E3F5B]" : "text-white"
                }`}
              >
                MarketPlace
              </strong>
            </p>
          </Link>
        </NavbarBrand>
        <div className="hidden md:flex gap-2 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Button
                variant="light"
                className="text-white font-semibold text-base"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </NavbarItem>
          ))}
          <NavbarItem>
            <DropdownButton title="Categorias" options={options} />
          </NavbarItem>
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="center"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {isLoggedIn ? (
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <Link href="/profile">
            <Button className="bg-white text-[#3E3F5B] font-semibold">
              Mi Perfil
            </Button>
          </Link>
          <LogoutButton />
          <Link href="/carrito" className="relative">
            <Button
              aria-label="Ver carrito"
              className="bg-white text-[#3E3F5B] font-semibold relative overflow-visible"
            >
              🛒
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full translate-x-1/2 -translate-y-1/2">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
        </NavbarContent>
      ) : (
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <Link href="/login">
            <Button className="bg-white text-[#3E3F5B] font-semibold">
              Iniciar Sesión
            </Button>
          </Link>
          <Link
            href="/register"
            className="cursor-pointer text-white font-semibold"
          >
            Registrarse
          </Link>
        </NavbarContent>
      )}

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
