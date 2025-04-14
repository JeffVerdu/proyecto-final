import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  shipping?: string;
  installments?: string;
  featured?: boolean;
  badge?: string;
  description?: string;
}
