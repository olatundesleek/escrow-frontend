import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "info"
    | "link"
    | "auth";
  size?: "sm" | "md" | "lg" | "icon";
  textSize?: "xs" | "sm" | "base" | "lg" | "xl";
};

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "p-2",
};

const textSizes: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  textSize = "sm",
  className = "",
  ...props
}) => {
  const variants: Record<string, string> = {
    primary: "bg-db-primary text-white hover:bg-db-primary-hover shadow-sm",
    secondary:
      "bg-db-secondary text-db-surface hover:bg-db-secondary-hover shadow-sm",
    outline:
      "border border-db-border text-db-text-primary hover:bg-db-border/50",
    ghost: "text-db-text hover:bg-db-border/50",
    danger: "bg-db-error text-white hover:bg-db-error/80",
    success: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
    info: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    link: "text-secondary underline-offset-4 hover:underline bg-transparent",
    auth: `
      w-full flex justify-center items-center
      bg-db-accent text-white
      hover:bg-db-accent-hover hover:text-db-text
      transition-all duration-200
      h-[52px] rounded-lg m-0
    `,
  };

  return (
    <button
      className={`cursor-pointer ${baseStyles} ${variants[variant]} ${sizes[size]} ${textSizes[textSize]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
