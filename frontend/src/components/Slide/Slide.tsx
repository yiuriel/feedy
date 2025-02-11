import { FC, PropsWithChildren, useEffect, useRef } from "react";

export const Slide: FC<PropsWithChildren<{ in: boolean }>> = ({
  in: isVisible,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const ctrl = new AbortController();

    if (isVisible) {
      element?.classList.remove("invisible");
      element?.classList.add("animate-slide-in");
    } else {
      element?.classList.remove("animate-slide-in");
      element?.classList.add("invisible");
    }

    element?.addEventListener(
      "transitionend",
      () => {
        if (!isVisible) {
          element?.classList.add("hidden");
        } else {
          element?.classList.remove("hidden");
        }
      },
      { signal: ctrl.signal }
    );

    return () => {
      element?.classList.remove("animate-slide-in");
      ctrl.abort();
    };
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
      }`}
    >
      {children}
    </div>
  );
};
