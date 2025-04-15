import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
<<<<<<< Updated upstream
=======

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  imagenes: string[] | string;
  precio: number;
  condicion: string;
  ubicacion: string;
  usuario_id: number;
  nombre_usuario?: string;
  categoria: string;
  envio_gratis?: boolean;
}
>>>>>>> Stashed changes
