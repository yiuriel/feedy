import { FC, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  className?: string;
  variant?: "filled" | "outlined";
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = "filled",
  ...props
}) => {
  const baseClasses =
    "py-2 px-4 rounded-lg disabled:cursor-not-allowed border border-solid border-indigo-600";
  const filledClasses =
    "text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500";
  const outlinedClasses =
    "text-indigo-600 bg-transparent hover:bg-indigo-50 disabled:border-gray-300 disabled:text-gray-500";

  const variantClasses =
    variant === "outlined" ? outlinedClasses : filledClasses;

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
