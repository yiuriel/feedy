import { FC, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`text-white bg-indigo-600 py-2 px-4
      hover:bg-indigo-700 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500
      rounded-lg
      ${className}
    `}
      {...props}
    >
      {children}
    </button>
  );
};
