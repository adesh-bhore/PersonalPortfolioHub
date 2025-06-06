import { motion } from "framer-motion";
import { useState } from "react";

interface HexagonalSkillProps {
  name: string;
  icon: string;
  color: string;
  index: number;
}

export default function HexagonalSkill({ name, icon, color, index }: HexagonalSkillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="hexagon-skill relative group cursor-none"
      initial={{ opacity: 0, scale: 0, rotate: 180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 150
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.15,
        y: -10,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
    >
      {/* Hexagon SVG Background */}
      <motion.svg
        className="w-24 h-24 relative z-10"
        viewBox="0 0 100 100"
        animate={{
          rotate: isHovered ? [0, 10, -10, 0] : 0,
        }}
        transition={{ 
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(55, 65, 81, 0.9)" />
            <stop offset="100%" stopColor="rgba(75, 85, 99, 0.9)" />
          </linearGradient>
          <filter id={`glow-${index}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main hexagon */}
        <motion.polygon
          points="50,5 85,25 85,75 50,95 15,75 15,25"
          fill={`url(#gradient-${index})`}
          stroke="rgba(100, 255, 218, 0.3)"
          strokeWidth="1"
          filter={isHovered ? `url(#glow-${index})` : "none"}
          animate={{
            stroke: isHovered ? "rgba(100, 255, 218, 0.8)" : "rgba(100, 255, 218, 0.3)",
            strokeWidth: isHovered ? 2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Inner hexagon for depth */}
        <motion.polygon
          points="50,12 78,28 78,72 50,88 22,72 22,28"
          fill="rgba(17, 34, 64, 0.6)"
          animate={{
            fill: isHovered ? "rgba(17, 34, 64, 0.8)" : "rgba(17, 34, 64, 0.6)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>

      {/* Icon container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.i
          className={`${icon} text-2xl ${color}`}
          animate={{
            textShadow: isHovered 
              ? ["0 0 0px currentColor", "0 0 15px currentColor", "0 0 0px currentColor"]
              : "0 0 0px currentColor",
            scale: isHovered ? [1, 1.1, 1] : 1,
          }}
          transition={{ 
            textShadow: { duration: 1.5, repeat: isHovered ? Infinity : 0 },
            scale: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }
          }}
        />
      </motion.div>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[hsl(var(--portfolio-accent))] rounded-full"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -25, -50],
                x: [0, (Math.random() - 0.5) * 30]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Skill name tooltip */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-[hsl(var(--portfolio-bg-primary))] text-[hsl(var(--portfolio-accent))] px-3 py-1 rounded-lg text-sm whitespace-nowrap border border-[hsl(var(--portfolio-accent))]/30 backdrop-blur-sm">
          {name}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-[hsl(var(--portfolio-accent))]/30"></div>
        </div>
      </motion.div>

      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-0 z-0"
        style={{
          background: `radial-gradient(circle, ${color.includes('blue') ? '#3b82f6' : 
                       color.includes('green') ? '#10b981' : 
                       color.includes('yellow') ? '#f59e0b' :
                       color.includes('purple') ? '#8b5cf6' :
                       color.includes('red') ? '#ef4444' :
                       color.includes('cyan') ? '#06b6d4' :
                       color.includes('orange') ? '#f97316' : '#64ffda'}20, transparent 70%)`,
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}