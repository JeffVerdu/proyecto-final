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
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/Theme-switch";
import { GithubIcon, SearchIcon } from "@/components/Icons";
import { Button } from "@heroui/button";
<<<<<<< Updated upstream

export const Navbar = () => {
=======
import { SearchIcon } from "./Icons";
import { useLocation } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";
import DropdownButton from "./DropdownButton";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";


export const Navbar = () => {
  const [options, setOptions] = useState([]);
  const location = useLocation();
  const { items } = useCart();


  useEffect(() => {
    fetch("/data/categories.json")
      .then((response) => response.json())
      .then((data) => {
        const categories = data.map(
          (category: { id: number; title: string; img: string }) =>
            category.title
        );
        setOptions(categories);
        console.log("Categories fetched:", categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const isNavbarTransparent =
    location.pathname === "/" || location.pathname === "/category";

  const isLoggedIn = !!localStorage.getItem("token");

>>>>>>> Stashed changes
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Buscar..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit">Fast MarketPlace</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="center"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

<<<<<<< Updated upstream
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <Button className="">Iniciar Sesión</Button>
        <Link className="cursor-pointer">Registrarse</Link>
      </NavbarContent>
=======
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
>>>>>>> Stashed changes

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
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
                href="#"
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
