import { motion } from "framer-motion";
import FloatingCard from "./FloatingCard";
import { useState } from "react";

interface SpecialtyCardProps {
  title: string;
  icon: string;
  gradient: string;
  index: number;
}

export default function SpecialtyCard({ title, icon, gradient, index }: SpecialtyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FloatingCard className="w-80 h-48">
        <div className="specialty-card glass rounded-2xl p-8 relative overflow-hidden group cursor-none w-full h-full">
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-20 rounded-2xl`}
            animate={{
              opacity: isHovered ? 0.2 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Border glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-transparent"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent, ${isHovered ? 'rgba(100, 255, 218, 0.3)' : 'transparent'}, transparent)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating particles on hover */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[hsl(var(--portfolio-accent))] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -30, -60],
                    x: [0, (Math.random() - 0.5) * 40]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
            {/* Icon container */}
            <motion.div
              className="mb-6 relative"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center relative`}
                animate={{
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                  scale: isHovered ? [1, 1.05, 1] : 1,
                }}
                transition={{ 
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="text-2xl text-white"
                  dangerouslySetInnerHTML={{ __html: icon }}
                  animate={{
                    textShadow: isHovered 
                      ? ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"]
                      : "0 0 0px rgba(255,255,255,0)"
                  }}
                  transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                />
                
                {/* Glow effect behind icon */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle, rgba(100, 255, 218, 0.3) 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
                  }}
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h3 
              className="font-poppins font-semibold text-xl text-slate-100 text-center"
              animate={{
                color: isHovered ? "#64ffda" : "#f1f5f9",
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>

            {/* Subtle description line that appears on hover */}
            <motion.div
              className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--portfolio-accent))] to-transparent mx-auto"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "60%" : "0%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* 3D shadow effect */}
          <motion.div
            className="absolute inset-0 bg-black/20 rounded-2xl -z-10"
            style={{
              transform: 'translateX(0px) translateY(10px) translateZ(-10px)',
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: isHovered ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </FloatingCard>
    </motion.div>
  );
}