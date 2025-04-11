// Navbar.tsx
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
import { Button } from "@heroui/button";
import { SearchIcon } from "./Icons";
import { useLocation } from "react-router-dom";
import LogoutButton from "@/components/LogoutButton";

export const Navbar = () => {
  const location = useLocation();

  const isNavbarTransparent =
    location.pathname === "/" || location.pathname === "/category";

  const isLoggedIn = !!localStorage.getItem("token");

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
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-white font-medium"
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
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Opciones según si el usuario está logueado */}
      {isLoggedIn ? (
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <Link href="/profile">
            <Button className="bg-white text-[#3E3F5B] font-semibold">
              Mi Perfil
            </Button>
          </Link>
          <LogoutButton />
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
