import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  imagenes: string;
  precio: number;
  condicion: string;
  ubicacion: string;
  usuario_id: number;
  nombre_usuario?: string;
}

