import React from "react";
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    View,
} from "react-native";
import { tv, VariantProps } from "tailwind-variants";
import { Text } from "./Text";

const input = tv({
  slots: {
    container: "w-full",
    input:
      "font-inter text-base rounded-md border px-3 py-2 focus:outline-none",
    error: "mt-1 text-sm text-danger-600 dark:text-danger-400",
  },
  variants: {
    variant: {
      default: {
        input: "border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900",
      },
      outlined: {
        input: "border-2 border-primary-500 dark:border-primary-300 bg-transparent",
      },
      filled: {
        input: "bg-neutral-200 dark:bg-neutral-800 border-none",
      },
    },
    size: {
      sm: { input: "px-2 py-1 text-sm" },
      md: { input: "px-3 py-2 text-base" },
      lg: { input: "px-4 py-3 text-lg" },
    },
    disabled: {
      true: {
        input: "opacity-60 cursor-not-allowed",
      },
    },
    error: {
      true: {
        input: "border-danger-600 dark:border-danger-400",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
    error: false,
  },
});

type InputVariants = VariantProps<typeof input>;

export interface InputProps
  extends RNTextInputProps,
    Omit<InputVariants, "disabled" | "error"> {
  label?: string;
  error?: string;
  disabled?: boolean;
}

export const Input = React.forwardRef<RNTextInput, InputProps>(
  ({ label, error, variant, size, disabled = false, ...props }, ref) => {
    const styles = input({ variant, size, disabled, error: !!error });

    return (
      <View className={styles.container()}>
        {label && <Text className="mb-1" weight="medium">{label}</Text>}
        <RNTextInput
          ref={ref}
          editable={!disabled}
          className={styles.input()}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {error && <Text className={styles.error()}>{error}</Text>}
      </View>
    );
  }
);
