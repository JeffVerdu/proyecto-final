// src/hooks/useToast.ts
import { addToast } from "@heroui/react";

interface ToastOptions {
  title: string;
  description: string;
  color?: "success" | "danger" | "warning" | "default";
  variant?: "flat" | "solid" | "bordered";
  timeout?: number;
  shouldShowTimeoutProgress?: boolean;
}

export function useToast() {
  const showToast = ({
    title = "Listo",
    description = "Operación exitosa",
    color = "default",
    variant = "flat",
    timeout = 3000,
    shouldShowTimeoutProgress = true,
  }: ToastOptions) => {
    addToast({
      title,
      description,
      color,
      variant,
      timeout,
      shouldShowTimeoutProgress,
    });
  };

  return { showToast };
}
