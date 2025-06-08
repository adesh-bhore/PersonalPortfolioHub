import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseEnter = () => setCursorVariant("hover");
    const mouseLeave = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .magnetic-btn');
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", mouseEnter);
      el.addEventListener("mouseleave", mouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", mouseEnter);
        el.removeEventListener("mouseleave", mouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1,
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      scale: 1.5,
      mixBlendMode: "difference" as const,
    }
  };

  return (
    <>
      <motion.div
        className="fixed w-5 h-5 bg-[hsl(var(--portfolio-accent))] rounded-full pointer-events-none z-[9999]"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.02, // fast reaction
        }}
      />
      {/* Cursor trail */}
      <motion.div
        className="fixed w-2 h-2 bg-[hsl(var(--portfolio-accent))] rounded-full pointer-events-none z-[9998] opacity-30"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "tween",
    ease: "linear",
    duration: 0.04,
        }}
      />
    </>
  );
}
