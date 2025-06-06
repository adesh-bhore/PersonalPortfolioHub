import { motion } from "framer-motion";
import { useState } from "react";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    color: string;
  };
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="skill-card glass p-6 rounded-xl text-center group magnetic-btn relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.08,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--portfolio-accent))]/20 to-purple-500/20 rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
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
                y: [0, -20, -40]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        <motion.div
          className="mb-4 relative"
          whileHover={{ 
            rotate: skill.name === "React" ? 360 : skill.name === "Node.js" ? 180 : 0,
            scale: 1.2
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <motion.i
            className={`${skill.icon} text-5xl ${skill.color}`}
            animate={isHovered ? {
              textShadow: [
                "0 0 0px currentColor",
                "0 0 10px currentColor",
                "0 0 20px currentColor",
                "0 0 10px currentColor",
                "0 0 0px currentColor"
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          />
          
          {/* Skill level indicator */}
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "80%" : "0%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-1 bg-gradient-to-r from-[hsl(var(--portfolio-accent))] to-purple-500 rounded-full"></div>
          </motion.div>
        </motion.div>

        <motion.h3 
          className="font-semibold text-slate-200 relative"
          animate={{
            color: isHovered ? "#64ffda" : "#e2e8f0"
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.name}
          
          {/* Tooltip with expertise level */}
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[hsl(var(--portfolio-bg-primary))] text-[hsl(var(--portfolio-accent))] px-3 py-1 rounded-lg text-xs whitespace-nowrap border border-[hsl(var(--portfolio-accent))]/30"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: "none" }}
          >
            {/* Dynamic expertise levels */}
            {skill.name === "React" && "Expert Level"}
            {skill.name === "TypeScript" && "Advanced"}
            {skill.name === "Next.js" && "Proficient"}
            {skill.name === "Tailwind" && "Expert Level"}
            {skill.name === "Node.js" && "Advanced"}
            {skill.name === "Python" && "Intermediate"}
            {skill.name === "PostgreSQL" && "Advanced"}
            {skill.name === "MongoDB" && "Intermediate"}
            {skill.name === "AWS" && "Intermediate"}
            {skill.name === "Docker" && "Proficient"}
            {skill.name === "Git" && "Expert Level"}
            {skill.name === "Figma" && "Proficient"}
            
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[hsl(var(--portfolio-accent))]/30"></div>
          </motion.div>
        </motion.h3>
      </div>

      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-[hsl(var(--portfolio-accent))]/30"
        animate={{
          boxShadow: isHovered 
            ? ["0 0 0px hsl(var(--portfolio-accent))", "0 0 20px hsl(var(--portfolio-accent))", "0 0 0px hsl(var(--portfolio-accent))"]
            : "0 0 0px hsl(var(--portfolio-accent))"
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
}
