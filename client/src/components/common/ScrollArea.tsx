// ScrollArea.tsx
import { ReactNode, useEffect, useRef } from "react";

interface ScrollAreaProps {
  children: ReactNode;
  element?: string;
  className?: string;
}

export default function ScrollArea({
  children,
  element = "div",
  className = "",
}: ScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      el.classList.add("showScollbar");

      timeout = setTimeout(() => {
        el.classList.remove("showScollbar");
      }, 800);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  if (element === "span") {
    return (
      <span
        ref={scrollRef}
        className={`overflow-y-auto custom-scroll ${className}`}
      >
        {children}
      </span>
    );
  }
  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto custom-scroll ${className}`}
    >
      {children}
    </div>
  );
}
