import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  shipping?: string;
  installments?: string;
};
