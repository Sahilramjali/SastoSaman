import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/utils";
import {FC, InputHTMLAttributes } from 'react';
const inputVariants = cva("w-full bg-transparent  text-sm", {
  variants: {
    variant: {
      underLine: " border-b  focus:border-primary",
      noBorder: "border-none outline-none focus:border-none focus:outline-none ",
    },
    sizes: {
      small: "py-1 px-2",
      medium: "py-2 px-4",
    },
  },
  defaultVariants: {
    variant: "underLine",
    sizes: "small",
  },
});
interface InputProps extends InputHTMLAttributes<HTMLInputElement>,VariantProps<typeof inputVariants> {}

const Input: FC<InputProps> = ({
  title,
  className,
  type,
  sizes,
  variant,
  ...props
}) => {
  return (
    <>
      <input
        type={type ?? "text"}
        {...props}
        className={cn(inputVariants({ variant, sizes, className }))}
      >
        {title}
      </input>
    </>
  );
};

export default Input;
