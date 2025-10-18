import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const text = tv({
  base: "font-inter text-base text-neutral-900 dark:text-neutral-100",
  variants: {
    variant: {
      default: "text-neutral-900 dark:text-neutral-100",
      muted: "text-neutral-500 dark:text-neutral-400",
      success: "text-success-600 dark:text-success-400",
      warning: "text-warning-600 dark:text-warning-400",
      danger: "text-danger-600 dark:text-danger-400",
      primary: "text-primary-600 dark:text-primary-400",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    uppercase: {
      true: "uppercase",
    },
  },
  defaultVariants: {
    variant: "default",
    weight: "regular",
    size: "md",
    align: "left",
  },
});

type TextVariants = VariantProps<typeof text>;

export interface TextProps extends RNTextProps, TextVariants {
  children: React.ReactNode;
}

export function Text({
  children,
  variant,
  weight,
  size,
  align,
  uppercase,
  className,
  ...props
}: TextProps) {
  return (
    <RNText
      className={text({ variant, weight, size, align, uppercase, className })}
      {...props}
    >
      {children}
    </RNText>
  );
}
