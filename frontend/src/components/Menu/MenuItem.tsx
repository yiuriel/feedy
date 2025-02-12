interface MenuItemProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const MenuItem = ({
  onClick,
  disabled = false,
  children,
  className = "",
}: MenuItemProps) => {
  return (
    <button
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-700 ${className}`}
      onClick={onClick}
      disabled={disabled}
      role="menuitem"
    >
      {children}
    </button>
  );
};
