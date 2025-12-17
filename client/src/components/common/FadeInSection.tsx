"use client";

import { motion, useInView } from "framer-motion";
import { FC, ReactNode, useRef } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  initial?: { opacity?: number; y?: number; x?: number };
  scrollTop?: { opacity?: number; y?: number; x?: number };
  scrollBottom?: { opacity?: number; y?: number; x?: number };
  margin?: `${number}px ${number}px ${number}px ${number}px`;
  delay?: number;
}

const FadeInSection: FC<FadeInSectionProps> = ({
  children,
  className = "",
  initial = { opacity: 0, y: 40 },
  scrollTop = { opacity: 1, y: 0 },
  scrollBottom = { opacity: 0, y: 80 },
  margin = "400px 0px -100px 0px" as const,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    margin,
  });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? scrollTop : scrollBottom}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
