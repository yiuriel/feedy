import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Menu = ({ trigger, children, className = "" }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  const handleClick = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const calculatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const menuWidth = 200; // Set to 200px as max width
      const menuHeight = 200; // Adjust this value based on your menu's height

      let top = rect.bottom + window.scrollY;
      let left = rect.left + rect.width / 2 + window.scrollX;

      if (left + menuWidth / 2 > windowWidth) {
        left = windowWidth - menuWidth / 2;
      } else if (left - menuWidth / 2 < 0) {
        left = menuWidth / 2;
      }

      if (top + menuHeight > windowHeight) {
        top = rect.top - menuHeight;
      }

      setPosition({ top, left });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener("resize", calculatePosition);
    }
    return () => window.removeEventListener("resize", calculatePosition);
  }, [isOpen, calculatePosition]);

  return (
    <>
      <div ref={triggerRef} className="flex" onClick={handleClick}>
        {trigger}
      </div>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
              zIndex: 1000,
              maxWidth: "200px",
              minWidth: "150px",
            }}
            className={`bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            onKeyDown={handleKeyDown}
          >
            <div className="py-1" onClick={() => setIsOpen(false)}>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
