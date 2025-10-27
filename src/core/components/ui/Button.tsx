import React from "react";
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    Text,
    View,
} from "react-native";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  slots: {
    container:
      "flex-row items-center justify-center rounded-xl active:opacity-90",
    label: "font-inter font-semibold text-base",
    indicator: "ml-2",
  },
  variants: {
    variant: {
      primary: {
        container: "bg-primary-600 dark:bg-primary-400",
        label: "text-white dark:text-black",
      },
      secondary: {
        container: "bg-secondary-200 dark:bg-secondary-800",
        label: "text-black dark:text-white",
      },
      outline: {
        container:
          "border-2 border-primary-500 dark:border-primary-300 bg-transparent",
        label: "text-primary-600 dark:text-primary-300",
      },
      ghost: {
        container: "bg-transparent",
        label: "text-primary-600 dark:text-primary-400",
      },
      destructive: {
        container: "bg-danger-600",
        label: "text-white",
      },
    },
    size: {
      sm: { container: "px-3 py-2", label: "text-sm" },
      md: { container: "px-4 py-3", label: "text-base" },
      lg: { container: "px-5 py-4", label: "text-lg" },
    },
    fullWidth: {
      true: { container: "w-full" },
    },
    rounded: {
      true: { container: "rounded-full" },
    },
    disabled: {
      true: {
        container: "opacity-60",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: true,
  },
});

type ButtonVariants = VariantProps<typeof button>;

// Override disabled manually (omit it from PressableProps)
interface ButtonProps
  extends Omit<PressableProps, "disabled">,
    Omit<ButtonVariants, "disabled"> {
  children?: React.ReactNode;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
}

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      label,
      children,
      variant,
      size,
      fullWidth,
      rounded,
      loading = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const styles = button({ variant, size, fullWidth, rounded, disabled });

    return (
      <Pressable
        ref={ref}
        disabled={disabled || loading}
        className={styles.container({ className })}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            className={styles.indicator()}
            color={variant === "secondary" ? "#000" : "#fff"}
          />
        ) : children ? (
          children
        ) : (
          <Text className={styles.label()}>{label}</Text>
        )}
      </Pressable>
    );
  }
);
